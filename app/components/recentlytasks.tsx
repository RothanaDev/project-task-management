import {
  CardHeader,
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

type Task = {
  id: string;
  title: string;
  status: string;
  dueDate: string;
  description: string;
};
import { ChevronRight } from "lucide-react";

const statusStyle: Record<string, string> = {
  todo: "bg-blue-300 text-blue-800",
  "in-progress": "bg-orange-100 text-orange-600",
  done: "bg-green-100 text-green-600",
};
// const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

export default function RecentlyTasks({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      <div className="justify-center items-center flex flex-col px-10 mb-5 text-gray-600">
        <h2 className="text-xl font-bold mb-1">Recent Tasks</h2>
        <a href="./tasks" className="hover:text-blue-600 font-bold flex">
          View All <span><ChevronRight /></span>
        </a>
      </div>
      <Card className="px-10">
        <ul className="space-y-2">
          {tasks.slice(0, 5).map((task) => (
            <li
              key={task.id}
              className="border-b border-b-gray-300 pb-4 last:border-b-0"
            >
              <div className="flex items-baseline justify-around">
                <input type="checkbox" />
                <CardHeader>#{task.id}</CardHeader>
                <CardTitle className="flex-1">{task.title}</CardTitle>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    statusStyle[task.status]
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="justify-between items-baseline flex">
                <CardDescription>{task.description}</CardDescription>
                <span>{task.dueDate}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
