"use client";

import { Task } from "@/lib/types";
import {
  ClipboardCheck,
  Check,
  Clock,
  ListTodo,
  Flag,
  TrendingUp,
} from "lucide-react";

export default function TaskSummary({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  // const todo = tasks.filter((t) => t.status === "todo").length;
  const overdue = tasks.filter(
    (t) => t.dueDate < new Date().toISOString() && t.status !== "done"
  ).length;

  return (
    <div>
      <ul className="space-y-2 sm:space-y-4">
        <li className="border pb-2 px-5 rounded-lg bg-sidebar">
          <div className="flex items-center justify-between">
            <h3 className="text-md text-gray-600 font-bold">Total Tasks</h3>
            <span>
              <ClipboardCheck className="w-10 h-10 text-blue-700 bg-blue-100 rounded-full p-2" />
            </span>
          </div>
          <p className="text-3xl font-bold">{total}</p>
          <div className="*:flex items-center text-sm text-gray-500">
            <p>
              <TrendingUp className="w-5 h-5 text-green-700" />
              <span className="font-bold mx-2 text-green-700">+12%</span> from
              last week
            </p>
          </div>
        </li>
        <li className="border pt-1 pb-4 px-5 rounded-lg bg-sidebar">
          <div className="flex items-center justify-between">
            <h3 className="text-md text-gray-600 font-bold">Completed</h3>
            <span>
              <Check className="w-10 h-10 text-green-700 bg-green-100 rounded-full p-2" />
            </span>
          </div>
          <p className="text-3xl font-bold">{completed}</p>
          <div className="*:flex items-center text-sm text-gray-500">
            <p>
              <TrendingUp className="w-5 h-5 text-green-700" />
              <span className="font-bold mx-2 text-green-700">+8%</span> from
              last week
            </p>
          </div>
        </li>
        <li className="border pt-1 pb-4 px-5 rounded-lg bg-sidebar">
          <div className="flex items-center justify-between">
            <h3 className="text-md text-gray-600 font-bold">In Progress</h3>
            <span>
              <Clock className="w-10 h-10 text-orange-700 bg-orange-100 rounded-full p-2" />
            </span>
          </div>
          <p className="text-3xl font-bold">{inProgress}</p>
          <div className="*:flex items-center text-sm text-gray-500">
            <p>
              <TrendingUp className="w-5 h-5 text-green-700" />
              <span className="font-bold mx-2 text-green-700">+5%</span> from
              last week
            </p>
          </div>
        </li>
        {/* <li className="border pt-1 pb-4 px-10 rounded-lg bg-sidebar">
          <div className="flex items-center justify-between">
            <h3 className="text-md text-gray-600 font-bold">Todo</h3>
            <span>
              <ListTodo className="w-10 h-10 text-yellow-700 bg-yellow-100 rounded-full p-2" />
            </span>
          </div>
          <p className="text-3xl font-bold">{todo}</p>
          <div className="mt-2 *:flex items-center text-sm text-gray-500">
            <p>
              <TrendingUp className="w-5 h-5 text-green-700" />
              <span className="font-bold mx-2 text-green-700">-2%</span> from
              last week
            </p>
          </div>
        </li> */}
        <li className="border pt-1 pb-4 px-5 rounded-lg bg-sidebar">
          <div className="flex items-center justify-between">
            <h3 className="text-md text-gray-600 font-bold">Overdue</h3>
            <span>
              <Flag className="w-10 h-10 text-red-700 bg-red-100 rounded-full p-2" />
            </span>
          </div>
          <p className="text-3xl font-bold">{overdue}</p>
          <div className="*:flex items-center text-sm text-gray-500">
            <p>
              <TrendingUp className="w-5 h-5 text-green-700" />
              <span className="font-bold mx-2 text-green-700">-2%</span> from
              last week
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
