"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCog, Save, Trash2 } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase-browser";
import { toast } from "sonner";

export default function ShiftsPage() {
  const supabase = useMemo(() => getBrowserClient(), []);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shifts, setShifts] = useState([]);

  // Load user's saved shifts
  useEffect(() => {
    async function loadShifts() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data, error } = await supabase
        .from("shifts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error("Failed to load shifts");
      } else {
        setShifts(data || []);
      }
      setLoading(false);
    }
    loadShifts();
  }, [supabase]);

  // Save new shift
  async function handleSave() {
    if (!startTime || !endTime) {
      toast.error("Please select both start and end time");
      return;
    }

    setSaving(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError;

      const { data, error } = await supabase.from("shifts").insert([
        {
          user_id: user.id,
          start_time: startTime,
          end_time: endTime,
        },
      ]).select();

      if (error) throw error;

      toast.success("Shift saved successfully");
      setStartTime("");
      setEndTime("");
      setShifts((prev) => [...data, ...prev]); // prepend new shift
    } catch (err) {
      console.error(err);
      toast.error("Failed to save shift");
    } finally {
      setSaving(false);
    }
  }

  // Delete shift
  async function handleDelete(id) {
    try {
      const { error } = await supabase.from("shifts").delete().eq("id", id);
      if (error) throw error;
      toast.success("Shift deleted");
      setShifts((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete shift");
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <CalendarCog className="h-6 w-6 text-neutral-400" />
        <h1 className="text-xl font-semibold">Customise Shifts</h1>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6 max-w-md mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Shift Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Shift End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Shift"}
          </button>
        </div>
      </div>

      {/* Saved shifts */}
      <div>
        <h2 className="text-lg font-medium mb-3">Your Saved Shifts</h2>
        {loading ? (
          <p className="text-sm text-neutral-500">Loading shifts...</p>
        ) : shifts.length === 0 ? (
          <p className="text-sm text-neutral-500">No shifts saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {shifts.map((shift) => (
              <li
                key={shift.id}
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm"
              >
                <span>
                  {shift.start_time} → {shift.end_time}
                </span>
                <button
                  onClick={() => handleDelete(shift.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
