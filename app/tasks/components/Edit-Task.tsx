"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DueDate } from "./DueDate";
import { Separator } from "@/components/ui/separator";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "antd";
import { BreadcrumbTask } from "./Breadcrumb-Task";
import {
  TaskUpdateFormValues,
  taskUpdateSchema,
} from "@/lib/validators/taskUpdateSchema";
import { AntdMultiSelect } from "./AntdMultipleSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { updateTask } from "@/lib/api";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";
import SkeletonLoading from "./SkeletonLoading";
import { useRouter } from "next/navigation";
import { useTask, useProjects } from "@/hooks/use-queries";

// Dummy data for selects
const assigneesData = [
  { title: "Phorn Rothana", value: "phorn-rothana" },
  { title: "So Bunleng", value: "so-bunleng" },
  { title: "Chory Chanrady", value: "chory-chanrady" },
  { title: "Yoeurn Kimsan", value: "yoeurn-kimsan" },
];
const statusData = [
  { title: "Done", value: "done" },
  { title: "Todo", value: "todo" },
  { title: "In progress", value: "in-progress" },
];
const priorityData = [
  { title: "High", value: "high" },
  { title: "Medium", value: "medium" },
  { title: "Low", value: "low" },
];
const TagsData = [
  { value: "design", label: "Design" },
  { value: "accessibility", label: "Accessibility" },
  { value: "documentation", label: "Documentation" },
  { value: "research", label: "Research" },
  { value: "ux", label: "UX" },
];

export function EditTask({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading } = useTask(id);
  const { data: projects = [] } = useProjects();

  const { control, handleSubmit, reset } = useForm<TaskUpdateFormValues>({
    resolver: zodResolver(taskUpdateSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      status: "in-progress",
      priority: "high",
      dueDate: undefined,
      projectId: "",
      tags: [],
      subtasks: [],
      comments: [],
    },
  });

  // Reset form when task data loads
  useEffect(() => {
    if (data) {
      reset({
        title: data.title ?? "",
        description: data.description ?? "",
        assignee: data.assignee ?? "",
        status: data.status ?? "in-progress",
        priority: data.priority ?? "high",
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        projectId: data.projectId ?? "",
        tags: data.tags ?? [],
        subtasks: data.subtasks ?? [],
        comments: data.comments ?? [],
      });
    }
  }, [data, reset]);

  const { fields } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit = async (formData: TaskUpdateFormValues) => {
    try {
      const payload = {
        ...formData,
        dueDate: formData.dueDate ? formData.dueDate.toISOString() : undefined,
      };

      await updateTask(id, payload);

      queryClient.invalidateQueries({ queryKey: ["task", id], exact: true });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toast.success(`Task ${id} updated successfully!`);

      router.push(`/tasks/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Something went wrong while updating the task");
    }
  };

  if (isLoading) return <SkeletonLoading />;
  if (!data) return <div className="p-8 text-gray-500">Task not found</div>;

  return (
    <Card className="w-full border-none h-full bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-xl">Edit Task #{id}</CardTitle>
        <CardDescription>Edit daily Task.</CardDescription>
      </CardHeader>

      <Separator className="mb-4" />
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 grid grid-cols-2 gap-2"
        >
          {/* Title */}
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Title" />}
            />
          </div>

          {/* Assignee */}
          <div className="flex flex-col gap-2 col-span-1">
            <Label>Assignee</Label>
            <Controller
              name="assignee"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onChange={field.onChange}
                  placeholder="Select assignee"
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                >
                  {assigneesData.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2 col-span-1">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onChange={field.onChange}
                  placeholder="Select status"
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                >
                  {statusData.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-2 col-span-1">
            <Label>Priority</Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onChange={field.onChange}
                  placeholder="Select priority"
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                >
                  {priorityData.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Due Date */}
          <div className="col-span-1">
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DueDate value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Project */}
          <div className="flex flex-col gap-2 col-span-1">
            <Label>Project</Label>
            <Controller
              name="projectId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onChange={field.onChange}
                  placeholder="Select project"
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                >
                  {projects.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2 col-span-2">
            <Label>Tags</Label>
            <AntdMultiSelect
              control={control}
              initialOptions={TagsData}
              placeholder="Select multiple tags"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Description" />
              )}
            />
          </div>

          {/* Subtasks */}
          <div className="col-span-2">
            <Label>Subtasks</Label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-3 p-3 rounded bg-background border group"
              >
                <Controller
                  name={`subtasks.${index}.completed`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Checkbox
                        id={`subtask-${field.id}`}
                        checked={value ?? false}
                        onCheckedChange={onChange}
                        className="h-5 w-5 rounded-full data-[state=checked]:bg-primary"
                      />
                      <Label
                        htmlFor={`subtask-${field.id}`}
                        className={cn(
                          "text-sm font-medium cursor-pointer flex-1 select-none",
                          value && "text-muted-foreground/80"
                        )}
                      >
                        {field.title ?? `Subtask ${index + 1}`}
                      </Label>
                    </>
                  )}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-3">
            <Link
              href="/tasks"
              className="max-w-xl border flex items-center justify-center rounded-sm px-7 text-sm"
            >
              Back to Tasks
            </Link>
            <Button
              type="submit"
              className="px-7 max-w-xl rounded-sm cursor-pointer"
            >
              Save Edit
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <BreadcrumbTask id={id} />
      </CardFooter>
    </Card>
  );
}
