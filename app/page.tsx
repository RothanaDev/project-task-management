import React from "react";
export const dynamic = "force-dynamic";

import { fetchProjects, fetchTasks } from "@/lib/api";
import { Bell, BellRing, Plus } from "lucide-react";
import Link from "next/link";
import RecentlyTasks from "./components/recentlytasks";
import RecentlyProjects from "./components/recentlyprojects";
import TaskSummary from "./components/TaskSummary";
import { Button } from "@/components/ui/button";
// import { Skeletons } from "./components/skeleton";

export default async function DashboardPage() {
  const tasks = await fetchTasks();
  const projects = await fetchProjects();
  return (
    <main className="flex-1 bg-gray-100 min-h-screen">
      {/* <div className="mb-4 bg-sidebar flex items-center justify-between shadow z-10 top-0 px-10">
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
            <button className="bg-black text-white px-4 py-2 shadow rounded-md hover:bg-gray-700 hover:scale-105 transition-transform">
              <Plus className="inline mr-2" /> New Task
            </button>
          </Link>
        </div>
      </div> */}

      <header className="bg-white border-b border-gray-200 px-8 py-2 fixed top-0 left-64 right-0 z-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! s an overview of your tasks.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Link
              href={"/tasks/new"}
              className="py-2 px-4  cursor-pointer flex items-center gap-1 hover:bg-opacity-80 hover:text-gray-300 rounded bg-black text-white"
            >
              <Plus className="inline mr-2" />
              New Task
            </Link>
          </div>
        </div>
      </header>

      <div className="px-10 pt-20">
        <div className="mb-5">
          <TaskSummary tasks={tasks} />
        </div>

        <div>
          <RecentlyTasks tasks={tasks} />
        </div>
        <div className="mt-5">
          <RecentlyProjects projects={projects} />
        </div>
      </div>
    </main>
  );
}
