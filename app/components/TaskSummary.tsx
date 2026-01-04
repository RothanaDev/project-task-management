"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

type Task = {
  status: "todo" | "in-progress" | "done";
  dueDate: string;
};

export default function TaskSummary({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const overdue = tasks.filter(
    (t) => t.dueDate < new Date().toISOString() && t.status !== "done"
  ).length;

  const chartData = [
    { name: "Total", value: total, fill: "hsl(240, 50%, 64%)" },
    { name: "Completed", value: completed, fill: "hsl(142, 76%, 36%)" },
    { name: "In Progress", value: inProgress, fill: "hsl(221, 83%, 53%)" },
    { name: "To Do", value: todo, fill: "hsl(48, 96%, 53%)" },
    { name: "Overdue", value: overdue, fill: "hsl(0, 84%, 60%)" },
  ];

  return (
    <div className="w-full">
      <ChartContainer
        config={{
          value: {
            label: "Tasks",
          },
        }}
        className="h-[300px] w-full"
      >
        <BarChart data={chartData} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Bar
            dataKey="value"
            radius={8}
            label={{
              position: "top",
              style: { fontSize: "12px", fontWeight: "bold", fill: "#000" },
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
