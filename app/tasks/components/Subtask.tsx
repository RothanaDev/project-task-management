import { Subtask as SubTasksType } from "@/lib/types";
import SubtaskItems from "./Subtasks-Item";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableOfContents } from "lucide-react";
import { ProgressBar } from "./Progress-Bar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DrawerAddNewSubtask } from "./Drawer-Add-New-Subtask";

interface SubtaskProps {
  subtasks: SubTasksType[] | undefined;
}

export default function Subtask({ subtasks }: SubtaskProps) {
  const completed = subtasks?.filter((task) => task.completed).length || 0;
  const incompleted = subtasks?.filter((task) => !task.completed).length || 0;
  const total = subtasks?.length || 0;
  const percentag = total > 0 ? (completed / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-3">
      <Card className="w-full border-none relative bg-transparent gap-2 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TableOfContents size={17} />
            Subtasks
          </CardTitle>
          <CardAction className="font-bold">
            {`${completed}/${total}`}
            {/* done/total */}
          </CardAction>
        </CardHeader>
        <CardContent className="gap-3 flex flex-col">
          <ProgressBar percentag={percentag} />
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-4 relative">
            <CardAction className="font-bold items-center absolute gap-1 flex bottom-0 right-0">
              <Badge
                className="h-5 float-end min-w-5 bg-blue-500 rounded-full px-1 font-mono tabular-nums"
                variant="destructive"
              >
                {completed}
              </Badge>
              /
              <Badge
                className="h-5 float-end min-w-5 text-gray-300 bg-transparent border border-gray-300 rounded-full px-1 font-mono tabular-nums"
                variant="destructive"
              >
                {incompleted}
              </Badge>
            </CardAction>
            {subtasks?.map((sTask, idx) => (
              <SubtaskItems key={sTask.id ?? idx} getSubtask={sTask} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {/* Drawer Add new Subtask */}
          <DrawerAddNewSubtask />
        </CardFooter>
      </Card>
    </div>
  );
}
