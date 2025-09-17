"use client";

import { useMemo, useState } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";
import { toast } from "sonner";

export default function AccountPage() {
  const supabase = useMemo(() => getBrowserClient(), []);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleChangePassword(e) {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.info("Fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setBusy(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="p-4 max-w-md ml-6">
      <h1 className="text-base font-semibold mb-4">Manage Account</h1>
      <form
        onSubmit={handleChangePassword}
        className="space-y-3 bg-neutral-900/40 p-4 rounded-xl border border-neutral-800"
      >
        <div>
          <label className="block text-xs mb-1">New Password</label>
          <input
            type="password"
            className="w-full rounded-md bg-neutral-800 border border-neutral-700 p-2 text-sm"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full rounded-md bg-neutral-800 border border-neutral-700 p-2 text-sm"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 py-2 rounded-md font-medium text-sm"
        >
          {busy ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
