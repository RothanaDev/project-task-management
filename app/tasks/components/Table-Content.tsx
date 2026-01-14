"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Check, MessageSquareText, SquareX } from "lucide-react";
import { ActionBtnRedirect } from "./Action-Btn-Redirection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "@/lib/types";
import { EmptyTable } from "./Empty-Table";
import { useProjects } from "@/hooks/use-queries";

interface StatusProps {
  name: string;
  url: string;
}
interface TaskProps {
  tasks: Task[];
  status: StatusProps;
  onTaskClick?: (task: Task) => void;
  onStatusChange?: (taskId: string, status: Task["status"]) => void;
  search: string;
}

export function TableContent({ tasks, status, search }: TaskProps) {
  const getFilteredTasks = () => {
    let rs = tasks;

    if (status.url !== "all") {
      rs = rs.filter((tasks) => tasks.status === status.url);
    }

    if (search.trim() !== "") {
      const term = search.toLowerCase();
      rs = rs.filter((task) => task.title.toLowerCase().includes(term));
    }

    return rs;
  };

  const filteredTasks = getFilteredTasks();
  const { data: projects } = useProjects();
  const projectName = (projectId: string) =>
    projects.find((project) => project.id === projectId)?.name || "Unknown";

  return (
    <div className="rounded-md overflow-hidden">
      <div className="overflow-x-auto h-full">
        {filteredTasks.length > 0 && (
          <Table className="w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-12 text-center p-3">
                  <div className="flex items-center gap-6">
                    <span className=" border p-1 rounded-full">
                      <Check size={10} className="text-white" />  
                    </span>
                  </div>
                </TableHead>
                <TableHead className="font-bold text-center min-w-32.5 p-3">
                  Asignee
                </TableHead>
                <TableHead className="font-bold text-center min-w-30 p-3">
                  Title
                </TableHead>
                <TableHead className="font-bold text-center min-w-37.5 p-3">
                  Project Name
                </TableHead>
                <TableHead className="font-bold text-center min-w-10 p-3">
                  Status
                </TableHead>
                <TableHead className="font-bold text-center min-w-10 p-3">
                  Priority
                </TableHead>
                <TableHead className="font-bold text-center w-20 p-3">
                  Comments
                </TableHead>
                <TableHead className="font-bold text-center w-24 p-3">
                  Due Date
                </TableHead>
                <TableHead className="font-bold text-center min-w-25 p-3">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-gray-50">
                  <TableCell className="text-center py-3 px-3">
                    <div className="flex items-center gap-6">
                      {task.status === "done" && (
                        <span className="bg-blue-500 border border-blue-500 p-1 rounded-full">
                          <Check size={10} className="text-white" />
                        </span>
                      )}
                      {task.status !== "done" && (
                        <span className=" border p-1 rounded-full">
                          <Check size={10} className="text-white" />
                        </span>
                      )}
                    </div>
                    {/* <Checkbox disabled checked={task.status === 'done'} id={`checkbox`} /> */}
                  </TableCell>

                  <TableCell className="font-medium py-3 flex items-center gap-2">
                    <Avatar className="">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{task.assignee}</span>
                  </TableCell>
                  <TableCell className="text-center font-medium p-1">
                    {task.title}
                  </TableCell>
                  <TableCell className="text-center py-3 max-w-60 truncate">
                    {projectName(task.projectId)}
                  </TableCell>

                  {/* Status Cell */}
                  <TableCell className="text-center py-3">
                    <div className="inline-flex justify-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${
                          task.status === "done"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            task.status === "done"
                              ? "bg-green-500"
                              : task.status === "in-progress"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        ></span>
                        {task.status}
                      </span>
                    </div>
                  </TableCell>

                  {/* Priority Cell */}
                  <TableCell className="text-center py-3">
                    <div className="inline-flex justify-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${
                          task.priority === "high"
                            ? "bg-green-100 text-green-800"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            task.priority === "high"
                              ? "bg-green-500"
                              : task.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        ></span>
                        {task.priority}
                      </span>
                    </div>
                  </TableCell>

                  {/* Comments Cell */}
                  <TableCell className="text-center py-3">
                    <div className="flex justify-center items-center">
                      <div className="relative cursor-pointer">
                        <MessageSquareText
                          size={18}
                          className="text-gray-600"
                        />
                        <span className="absolute top-1.5 -right-3 flex items-center justify-center text-xs bg-white/10 backdrop-blur-sm  border border-gray-300 text-gray-800 w-5 h-5 rounded-full">
                          {task?.comments?.length}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-3">
                    <div className="flex justify-center items-center">
                      <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                        <Calendar size={18} className="text-gray-600" />
                        <span className=" p-0.5 flex items-center justify-center text-xs bg-white/10 backdrop-blur-sm  border border-gray-300 text-gray-800  rounded-full">
                          {task.dueDate
                            ? new Date(task.dueDate).toISOString().split("T")[0]
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-medium py-3">
                    <ActionBtnRedirect id={task.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {/* For empty data */}
        {filteredTasks.length === 0 && (
          <EmptyTable
            icon={SquareX}
            title="No any records"
            description="Create new tasks to see them here."
          />
        )}
      </div>
    </div>
  );
}
