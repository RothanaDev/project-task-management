import React from "react";

import { fetchProjects, fetchTasks } from "@/lib/api";
import { BellRing } from "lucide-react";
import Link from "next/link";


export default async function DashboardPage() {
  const tasks = await fetchTasks();
  const projects = await fetchProjects();
  return (
    <main className="flex-1 bg-gray-100 min-h-screen">
      <div className="mb-6 bg-sidebar p-2 flex items-center justify-between shadow z-10 top-0 px-10">
        <div>
          <h1 className="text-2xl font-bold m-2">Dashboard</h1>
          <p className="text-gray-600 m-2">
            Welcome back! Here's an overview of your tasks.
          </p>
        </div>
        <div className="space-x-4 flex items-center">
          <span>
            <BellRing className="hover:scale-106" />
          </span>
          <Link href="/tasks/new">
            <button className="bg-blue-500 text-white px-4 py-2 shadow rounded-md hover:bg-blue-600 hover:scale-105 transition-transform">
              New Task
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
