"use client";
import { Bell, Plus, CircleX } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useTasks } from "@/hooks/use-queries";
import Link from "next/link";
import { EmptyTable } from "./components/Empty-Table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data, isLoading, error } = useTasks();

  if (error)
    return (
      <div className="p-6 flex flex-col w-full h-full">
        <EmptyTable
          icon={CircleX}
          title={error.message}
          description="Oops! Something went wrong"
        />
      </div>
    );

  return (
    <div className="w-full">
      <header className="bg-white border-b border-gray-200 px-8 py-2 fixed top-0 left-64 right-0 z-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-sm text-gray-500 mt-1">
              {data.length} tasks
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
      <div className="p-6 flex flex-col w-full pt-25">{children}</div>
      <Toaster/>
    </div>
  );
}
