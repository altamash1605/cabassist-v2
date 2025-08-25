"use client";

import { useEffect, useMemo, useState } from "react";
import PreviewTable from "./PreviewTable";
import { Download, Share2, Eye } from "lucide-react";
import { toast } from "sonner";

/** Utility helpers */
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseEmployeeIds(raw) {
  return Array.from(
    new Set(
      raw
        .split(/[\s,;\n]+/)
        .map(s => s.trim())
        .filter(Boolean)
    )
  );
}

function formatDMY(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${d}/${m}/${y}`; // MoveInSync sample uses D/M/YYYY (no leading zeros)
}

function* eachDateInclusive(startISO, endISO) {
  const d = new Date(startISO);
  const end = new Date(endISO);
  d.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  while (d.getTime() <= end.getTime()) {
    yield new Date(d);
    d.setDate(d.getDate() + 1);
  }
}

function buildRows({ ids, start, end, login, logout, skipDays, nextDayLogout }) {
  // Build rows in the format: EmployeeId, LogIn, LogOut, LogInVenue, LogOutVenue, ShiftDate, EditType
  const rows = [];
  for (const date of eachDateInclusive(start, end)) {
    const dow = date.getDay();
    if (skipDays.has(dow)) continue;

    const shiftDate = formatDMY(date);
    const inTime = login || "";
    const outTime = logout || "";

    for (const eid of ids) {
      rows.push({
        EmployeeId: eid,
        LogIn: inTime || "",
        LogOut: outTime || "",
        LogInVenue: "",
        LogOutVenue: "",
        ShiftDate: shiftDate,
        EditType: "ADD",
      });
    }
  }

  // Optional: If nextDayLogout is true and you want an extra "logout-only" row
  // for the day AFTER the end date (matches some night-shift patterns),
  // uncomment the block below:
  //
  // if (nextDayLogout && logout) {
  //   const extra = new Date(end);
  //   extra.setDate(extra.getDate() + 1);
  //   const shiftDate = formatDMY(extra);
  //   for (const eid of ids) {
  //     rows.push({
  //       EmployeeId: eid,
  //       LogIn: "",
  //       LogOut: logout,
  //       LogInVenue: "",
  //       LogOutVenue: "",
  //       ShiftDate: shiftDate,
  //       EditType: "ADD",
  //     });
  //   }
  // }

  return rows;
}

function toCSV(rows) {
  const header = ["EmployeeId", "LogIn", "LogOut", "LogInVenue", "LogOutVenue", "ShiftDate", "EditType"];
  const escape = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(header.map(h => escape(r[h])).join(","));
  }
  return lines.join("\r\n");
}

export default function CSVGenerator() {
  // form state
  const [employeeInput, setEmployeeInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [skip, setSkip] = useState(new Set()); // numbers 0..6 (Sun..Sat)
  const [nextDay, setNextDay] = useState(false);

  // mobile preview panel
  const [showPreview, setShowPreview] = useState(false);

  const ids = useMemo(() => parseEmployeeIds(employeeInput), [employeeInput]);

  const previewRows = useMemo(() => {
    if (!ids.length || !startDate || !endDate) return [];
    return buildRows({
      ids,
      start: startDate,
      end: endDate,
      login: loginTime,
      logout: logoutTime,
      skipDays: skip,
      nextDayLogout: nextDay,
    });
  }, [ids, startDate, endDate, loginTime, logoutTime, skip, nextDay]);

  function toggleSkip(dayIndex) {
    setSkip(prev => {
      const next = new Set(prev);
      if (next.has(dayIndex)) next.delete(dayIndex);
      else next.add(dayIndex);
      return next;
    });
  }

  function downloadCSV() {
    if (!previewRows.length) {
      toast.info("Nothing to download. Fill the form first.");
      return;
    }
    const csv = toCSV(previewRows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fileName = `moveinsync_schedule_${Date.now()}.csv`;
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded");
  }

  async function shareCSV() {
    if (!previewRows.length) {
      toast.info("Nothing to share. Fill the form first.");
      return;
    }
    try {
      const csv = toCSV(previewRows);
      const blob = new Blob([csv], { type: "text/csv" });
      const file = new File([blob], "schedule.csv", { type: "text/csv" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "MoveInSync Schedule",
          text: "CSV generated from dashboard",
          files: [file],
        });
      } else {
        // Fallback: just trigger download
        downloadCSV();
        return;
      }
      toast.success("Shared successfully");
    } catch (err) {
      toast.error(err?.message || "Sharing failed");
    }
  }

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">CSV Generator</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Generate MoveInSync schedule: EmployeeId, LogIn, LogOut, LogInVenue, LogOutVenue, ShiftDate, EditType
          </p>
        </div>

        {/* Mobile preview button */}
        <button
          onClick={() => setShowPreview(true)}
          className="sm:hidden inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm hover:border-neutral-700"
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>
      </div>

      {/* Layout: form + preview */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1fr_560px] gap-6">
        {/* Left: form card */}
        <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 backdrop-blur p-5">
          {/* Employee IDs */}
          <label className="block text-sm text-neutral-300 mb-2">Employee IDs (comma, space or new line)</label>
          <textarea
            value={employeeInput}
            onChange={e => setEmployeeInput(e.target.value)}
            className="w-full h-28 rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 focus:ring-2 focus:ring-indigo-500/40"
            placeholder="850969, 123456, 789012"
          />

          {/* Dates */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Shift start date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm outline-none focus:border-neutral-700 focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Shift end date</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm outline-none focus:border-neutral-700 focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
          </div>

          {/* Times */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Shift login (24h)</label>
              <input
                type="time"
                value={loginTime}
                onChange={e => setLoginTime(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm outline-none focus:border-neutral-700 focus:ring-2 focus:ring-indigo-500/40"
                placeholder="22:30"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Shift logout (24h)</label>
              <input
                type="time"
                value={logoutTime}
                onChange={e => setLogoutTime(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm outline-none focus:border-neutral-700 focus:ring-2 focus:ring-indigo-500/40"
                placeholder="08:00"
              />
            </div>
          </div>

          {/* Days to skip */}
          <div className="mt-4">
            <label className="block text-sm text-neutral-300 mb-2">Days to skip</label>
            <div className="flex flex-wrap gap-2">
              {DAY_LABELS.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleSkip(i)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition
                    ${skip.has(i)
                      ? "bg-neutral-800 border-neutral-700 text-neutral-200"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Next day logout */}
          <div className="mt-4 flex items-center gap-3">
            <input
              id="next-day"
              type="checkbox"
              checked={nextDay}
              onChange={e => setNextDay(e.target.checked)}
              className="h-4 w-4 accent-indigo-600"
            />
            <label htmlFor="next-day" className="text-sm text-neutral-300">
              Next day logout
            </label>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={downloadCSV}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_6px_16px_-6px_rgba(99,102,241,0.6)] hover:from-indigo-500 hover:to-indigo-600"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </button>
            <button
              onClick={shareCSV}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-2.5 text-sm hover:border-neutral-700"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>

            <div className="text-xs text-neutral-500 ml-auto">
              {ids.length ? `${ids.length} employee${ids.length>1?"s":""}` : "0 employees"} • {previewRows.length} rows
            </div>
          </div>
        </div>

        {/* Right: desktop preview */}
        <div className="hidden xl:block">
          <PreviewTable rows={previewRows} />
        </div>
      </div>

      {/* Mobile slide-in preview */}
      <div
        className={`xl:hidden fixed top-0 right-0 h-full w-full max-w-[560px] transform transition-transform duration-300
          ${showPreview ? "translate-x-0" : "translate-x-full"}
          bg-neutral-950/95 backdrop-blur z-40 border-l border-neutral-900`}
        aria-hidden={!showPreview}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900">
          <div className="text-sm text-neutral-300">Live Preview</div>
          <button
            onClick={() => setShowPreview(false)}
            className="rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 py-1.5 text-sm hover:border-neutral-700"
          >
            Close
          </button>
        </div>
        <div className="p-4">
          <PreviewTable rows={previewRows} />
        </div>
      </div>
    </div>
  );
}
