"use client";
import React, { useState } from "react";
import Subtask from "./Subtask";
import Comment from "./Comment";
import SortingComponent from "./Sorting";
import { useProjects, useTask } from "@/hooks/use-queries";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Calendar,
  Clock1,
  Dot,
  Tag,
  User,
  UserRoundPlus,
  Trash2,
  FolderGit,
  Settings2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BreadcrumbTask } from "./Breadcrumb-Task";
import SkeletonTaskDetail from "./SkeletonTaskDetail";
import { useHandleDeleteTask } from "./HandleDeleteTask";
import { EditTask } from "./Edit-Task";
import Link from "next/link";
type ChildrenProps = {
  id: string;
};

interface StatusProp {
  name: string;
  url: string;
}
const items = [
  {
    name: "Subtask",
    url: "subtask",
  },
  {
    name: "Comment",
    url: "comment",
  },
];

export default function ContentRendering({ id }: ChildrenProps) {
  const [status, setStatus] = useState<StatusProp>({
    name: "Subtask",
    url: "subtask",
  });
  const { data, isLoading, error } = useTask(id);
  const { data: projects } = useProjects();
  const { handleDelete, isPending } = useHandleDeleteTask();
  const projectName = projects.find(
    (project) => project.id === data?.projectId
  )?.name;
  // if(isLoading)return <div>Loading...</div>
  if (isLoading) return <SkeletonTaskDetail />;

  return (
    <>
      <BreadcrumbTask id={id} />
      <Item className="h-auto py-1 px-4">
        <ItemContent className="">
          <div className="flex items-center justify-between">
            <ItemTitle className="text-xl font-bold">{data?.title}</ItemTitle>
            <div className="flex items-center gap-2">
              <Link href={`/tasks/edit/${id}`}>
                  <Settings2 size={20} className="text-blue-500 hover:text-blue-700-700" />
              </Link>
              <button
                onClick={() => handleDelete(id)}
                disabled={isPending}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete task"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <ItemDescription className="text-sm">
            {data?.description}
          </ItemDescription>
        </ItemContent>
      </Item>

      <div className="flex col-span-1 flex-col gap-1">
        <Item>
          <ItemContent className="">
            <div className="flex gap-1">
              <ItemTitle>Priority</ItemTitle>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${
                  data?.priority === "high"
                    ? "bg-green-100 text-green-800"
                    : data?.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    data?.priority === "high"
                      ? "bg-green-500"
                      : data?.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></span>
                {data?.priority}
              </span>
            </div>
          </ItemContent>
          <div className="flex items-center gap-1">
            <span className="flex text-sm justify-center items-center text-sky-500">
              <Dot />
              Following
            </span>
            <div className="*:data-[slot=avatar]:ring-background flex items-center -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Item>
        <Item>
          <ItemContent className="flex flex-col gap-2">
            <div className="flex ">
              <ItemTitle className="text-gray-500 w-34">
                <User size={18} />
                Assignees
              </ItemTitle>
              <div className="flex items-center gap-2">
                <div className="avatar-username  text-xs flex items-center gap-1.5 p-1 bg-gray-300/20 rounded-full">
                  <Avatar className="w-7 h-7">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="lowercase">{data?.assignee}</span>
                </div>
                <div className="avatar-username cursor-pointer text-sky-500 text-xs flex items-center gap-1.5 p-1 rounded-full">
                  <UserRoundPlus size={18} />
                  <span className="lowercase">Invite People</span>
                </div>
              </div>
            </div>
            <div className="flex ">
              <ItemTitle className="text-gray-500 w-34">
                <FolderGit size={18} />
                Project
              </ItemTitle>
              <div className="flex items-center gap-2">
                <div className="avatar-username  text-xs flex items-center gap-1.5 p-1 bg-gray-300/20 rounded-full">
                  <span className="text-md text-green-500 font-bold">
                    {projectName}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex ">
              <ItemTitle className="text-gray-500 w-34">
                <Calendar size={18} />
                Due Date
              </ItemTitle>
              <div className="flex items-center gap-2">{data?.dueDate}</div>
            </div>
            <div className="flex">
              <ItemTitle className="text-gray-500 w-34">
                <Clock1 size={18} />
                Status
              </ItemTitle>
              <div className="flex items-center gap-2">
                <div className="inline-flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${
                      data?.status === "done"
                        ? "bg-green-100 text-green-800"
                        : data?.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        data?.status === "done"
                          ? "bg-green-500"
                          : data?.status === "in-progress"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    ></span>
                    {data?.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <ItemTitle className="text-gray-500 w-34">
                <Tag size={18} />
                Tags
              </ItemTitle>
              <div className="flex items-center gap-2">
                <div className="inline-flex justify-center gap-1">
                  {data?.tags.map((val, idx) => (
                    <span
                      key={idx}
                      className="inline-flex font-medium uppercase items-center gap-1.5 p-1.5 rounded-sm text-xs bg-green-100 text-green-800"
                    >
                      website
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ItemContent>
        </Item>
        <Item className="flex flex-col items-start">
          <SortingComponent
            setStatus={setStatus}
            status={status}
            sorting={items}
          />
          <div className=" rounded-b w-full p-3">
            {status.url === "subtask" && <Subtask subtasks={data?.subtasks} />}
            {status.url === "comment" && <Comment comments={data?.comments} />}
          </div>
        </Item>
      </div>
    </>
  );
}
