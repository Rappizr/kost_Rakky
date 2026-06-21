import React from "react";

export const StatusBadge = ({ status = "Available" }: { status?: string }) => {
  // Memastikan huruf pertama selalu kapital agar cocok dengan objek cfg
  // Contoh: "pending" -> "Pending", "AVAILABLE" -> "Available"
  const safeStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "Available";

  const cfg: Record<string, string> = {
    Available: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Occupied: "bg-slate-100 text-slate-500 border border-slate-200",
    Paid: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending: "bg-rose-50 text-rose-600 border border-rose-200",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg[safeStatus] || cfg.Available}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${safeStatus === "Available" || safeStatus === "Paid" ? "bg-emerald-500" : safeStatus === "Pending" ? "bg-rose-400" : "bg-slate-400"}`} />
      {safeStatus}
    </span>
  );
};