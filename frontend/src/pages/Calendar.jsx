
import { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import BackButton from "../components/BackButton";
import Appbar from "../components/Appbar"

dayjs.extend(isBetween);
export default function Calendar() {

  const users = ["Regular User1",];

  const tasks = [
    {

      id: 1,
      title: "Sample Task",
      assigned: "Regular User",
      start: "2025-09-10",
      end: "2025-09-20",
      status: "in_progress",
    },
    
  ];

  const [month, setMonth] = useState("2025-09");

  const startDate = dayjs(month + "-01");
  const endDate = startDate.endOf("month");
  const daysInMonth = endDate.date();

  const taskForDate = (user, date) => {
    return tasks.filter(
      (t) =>
        t.assigned === user &&
        dayjs(date).isBetween(t.start, t.end, "day", "[]")
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Appbar/>
      <div className="head mb-5 flex items-center justify-between">
                    
              <h1 className="text-xl font-bold mb-4">
                Calendar: {startDate.format("YYYY-MM-DD")} → {endDate.format("YYYY-MM-DD")}
              </h1>
              <BackButton link = "/home"/>
      </div>
      <div className="flex gap-3 mb-6">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">User / Date</th>
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = startDate.add(i, "day");
                return (
                  <th key={i} className="border px-3 py-2 text-center">
                    {day.format("MMM DD")}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-2 font-semibold">{user}</td>
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const date = startDate.add(i, "day");
                  const tasksForDay = taskForDate(user, date);
                  return (
                    <td key={i} className="border px-2 py-2 text-sm">
                      {tasksForDay.map((t) => (
                        <div
                          key={t.id}
                          className="bg-blue-100 border border-blue-400 text-blue-700 px-2 py-1 rounded"
                        >
                          {t.title} ({t.status})
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
