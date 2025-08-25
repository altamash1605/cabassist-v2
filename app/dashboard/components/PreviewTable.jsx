"use client";

export default function PreviewTable({ rows }) {
  const header = ["EmployeeId", "LogIn", "LogOut", "LogInVenue", "LogOutVenue", "ShiftDate", "EditType"];
  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 backdrop-blur p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Preview</h3>
        <div className="text-xs text-neutral-500">{rows.length} rows</div>
      </div>
      <div className="mt-3 overflow-auto max-h-[70vh] rounded-xl ring-1 ring-neutral-800">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-900/70 sticky top-0">
            <tr>
              {header.map(h => (
                <th key={h} className="px-3 py-2 text-left font-medium text-neutral-300 border-b border-neutral-800">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={header.length} className="px-3 py-6 text-center text-neutral-500">
                  Fill the form to see rows here.
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="odd:bg-neutral-950/40">
                  {header.map(h => (
                    <td key={h} className="px-3 py-2 text-neutral-200">{r[h] ?? ""}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
