"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  CalendarCheck,
  AlertCircle,
  MapPin,
  LogIn,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Good afternoon, Amey!
          </h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle size={14} className="text-amber-500" />
            You have{" "}
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
              2 leave requests
            </span>{" "}
            pending.
          </p>
        </div>

        {/* Live Clock Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-4 text-white shadow-lg shadow-blue-200 min-w-[280px]">
          {/* decorative circles */}
          <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-white/5" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums tracking-wide">
                {formattedTime}
              </p>
              <p className="text-xs text-blue-200">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Actions Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Clock In / Out */}
        <button
          onClick={() => setIsClockedIn(!isClockedIn)}
          className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-200 cursor-pointer ${isClockedIn
              ? "border-red-200 bg-red-50 hover:shadow-md hover:shadow-red-100"
              : "border-emerald-200 bg-emerald-50 hover:shadow-md hover:shadow-emerald-100"
            }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isClockedIn
                ? "bg-red-100 text-red-600"
                : "bg-emerald-100 text-emerald-600"
              }`}
          >
            {isClockedIn ? <LogOut size={20} /> : <LogIn size={20} />}
          </div>
          <div className="text-left">
            <p
              className={`text-sm font-semibold ${isClockedIn ? "text-red-700" : "text-emerald-700"
                }`}
            >
              {isClockedIn ? "Clock Out" : "Clock In"}
            </p>
            <p className="text-xs text-gray-500">
              {isClockedIn ? "End your shift" : "Start your shift"}
            </p>
          </div>
        </button>

        {/* Today's Status */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Present</p>
            <p className="text-xs text-gray-500">Today&apos;s Status</p>
          </div>
        </div>

        {/* Hours Worked */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">4h 32m</p>
            <p className="text-xs text-gray-500">Hours Worked</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Office — HQ</p>
            <p className="text-xs text-gray-500">Work Location</p>
          </div>
        </div>
      </div>

      {/* ── Attendance Summary Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* This Month */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            This Month
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">22</span>
            <span className="mb-1 text-sm text-gray-500">/ 23 days</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
              style={{ width: "96%" }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            96% attendance rate
          </p>
        </div>

        {/* Average Check-in */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Avg. Check-in Time
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">9:04</span>
            <span className="mb-1 text-sm text-gray-500">AM</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <p className="text-xs text-emerald-600 font-medium">
              On time — within 10 min window
            </p>
          </div>
        </div>

        {/* Leave Balance */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Leave Balance
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">12</span>
            <span className="mb-1 text-sm text-gray-500">days remaining</span>
          </div>
          <div className="mt-3 flex gap-3 text-xs text-gray-500">
            <span>
              Casual:{" "}
              <span className="font-semibold text-gray-700">5</span>
            </span>
            <span>
              Sick:{" "}
              <span className="font-semibold text-gray-700">4</span>
            </span>
            <span>
              Earned:{" "}
              <span className="font-semibold text-gray-700">3</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Recent Activity Table ── */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-800">
            Recent Attendance Log
          </h2>
          <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Check In</th>
                <th className="px-5 py-3">Check Out</th>
                <th className="px-5 py-3">Hours</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                {
                  date: "29 Apr 2026",
                  checkIn: "9:02 AM",
                  checkOut: "—",
                  hours: "4h 32m",
                  status: "In Progress",
                  color: "blue",
                },
                {
                  date: "28 Apr 2026",
                  checkIn: "8:58 AM",
                  checkOut: "6:12 PM",
                  hours: "9h 14m",
                  status: "Completed",
                  color: "emerald",
                },
                {
                  date: "27 Apr 2026",
                  checkIn: "9:15 AM",
                  checkOut: "6:05 PM",
                  hours: "8h 50m",
                  status: "Completed",
                  color: "emerald",
                },
                {
                  date: "26 Apr 2026",
                  checkIn: "—",
                  checkOut: "—",
                  hours: "—",
                  status: "Weekend",
                  color: "gray",
                },
                {
                  date: "25 Apr 2026",
                  checkIn: "9:30 AM",
                  checkOut: "5:45 PM",
                  hours: "8h 15m",
                  status: "Late",
                  color: "amber",
                },
              ].map((row) => (
                <tr
                  key={row.date}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {row.date}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{row.checkIn}</td>
                  <td className="px-5 py-3 text-gray-600">{row.checkOut}</td>
                  <td className="px-5 py-3 text-gray-600">{row.hours}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${row.color === "emerald"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : row.color === "blue"
                            ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                            : row.color === "amber"
                              ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                              : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
