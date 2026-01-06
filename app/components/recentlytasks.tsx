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
      <Card className="px-10">
        <div className="justify-center items-center flex flex-col px-10 text-gray-600">
          <h2 className="text-xl font-bold mb-1">Recent Tasks</h2>
          <a href="./tasks" className="hover:text-blue-600 font-bold flex">
            View All{" "}
            <span>
              <ChevronRight />
            </span>
          </a>
        </div>
        <div>
          <ul className="space-y-2 sm:space-y-4">
            {tasks.slice(0, 5).map((task) => (
              <li
                key={task.id}
                className="border p-4 rounded-lg"
              >
                <div className="flex items-baseline justify-around">
                  <input type="checkbox" />
                  <CardHeader>#{task.id}</CardHeader>
                  <CardTitle className="flex-1">{task.title}</CardTitle>
                  <span
                    className={`text-sm px-3 py-1 rounded-lg ${
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
        </div>
      </Card>
    </div>
  );
}
