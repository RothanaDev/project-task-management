'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DueDate } from "./DueDate"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { useTask } from "@/hooks/use-queries"
import { Select } from 'antd';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BreadcrumbTask } from "./Breadcrumb-Task"
import { TaskUpdateFormValues, taskUpdateSchema } from "@/lib/validators/taskUpdateSchema"
import { AntdMultiSelect } from "./AntdMultipleSelect"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { updateTask } from "@/lib/api"
import { queryClient } from "@/lib/query-client"
import { toast } from "sonner"
import SkeletonLoading from "./SkeletonLoading"
// import MultipleSelect from "./MultipleSelect"

const assigneesData = [
    {
        title: "Phorn Rothana",
        value: "phorn-rothana"
    },
    {
        title: "So Bunleng",
        value: "so-bunleng"
    },
    {
        title: "Chory Chanrady",
        value: "chory-chanrady"
    },
    {
        title: "Yoeurn Kimsan",
        value: "yoeurn-kimsan"
    },
]
const statusData = [
    {
        title: "Done",
        value: "done"
    },
    {
        title: "Todo",
        value: "todo"
    },
    {
        title: "In progress",
        value: "in-progress"
    },
]
const priorityData = [
    {
        title: "High",
        value: "high"
    },
    {
        title: "Medium",
        value: "medium"
    },
    {
        title: "Low",
        value: "low"
    },
]

const TagsData = [
    { value: 'design', label: 'Design' },
    { value: 'accessibility', label: 'Accessibility' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'research', label: 'Research' },
    { value: 'ux', label: 'UX' },
    // ... more
]




export function EditTask({ id }: { id: string }) {


    const { data, isLoading, error } = useTask(id)




    const { control, handleSubmit, formState: { errors }, reset } = useForm<TaskUpdateFormValues>({
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
            comments: []
        },
        values: {
            title: data?.title ?? "",
            description: data?.description ?? "",
            assignee: data?.assignee ?? "",
            status: data?.status ?? "in-progress",
            priority: data?.priority ?? "high",
            dueDate: data?.dueDate ? new Date(data.dueDate) : undefined,
            projectId: data?.projectId ?? "",
            tags: data?.tags ?? [],
            subtasks: data?.subtasks ?? [],
            comments: data?.comments ?? []
        }
    });



    const { fields } = useFieldArray({
        control,
        name: 'subtasks'
    })







    const onsubmit = async (data: TaskUpdateFormValues) => {
        try {
            console.log("Form data before conversion:", data);

            // Create proper payload for API (convert Date → ISO string)
            const payload = {
                ...data,
                dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
                // ↑↑↑ Never send null, use undefined instead
            };


            // Use payload instead of data
            await updateTask(id, payload );

            // Refresh data
            queryClient.invalidateQueries({
                queryKey: ["task", id],     // ← single task detail (most common)
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: ["tasks"],        // ← task list / all tasks
            });

            // Success feedback
            toast.success(`Task ${id} updated successfully!`);

        } catch (error) {
            console.error("Update failed:", error);

            toast.error(
                "Something went wrong while updating the task"
            );
        }
    };

    if (isLoading) return <SkeletonLoading />

    if (!data) {
        return <div className="p-8 text-gray-500">Task not found</div>
    }


    return (
        <Card className="w-full border-none  h-full bg-transparent shadow-none">
            <CardHeader>

                <CardTitle className="text-center text-xl">Edit Task# {id}</CardTitle>
                <CardDescription>
                    Edit daily Task.
                </CardDescription>
            </CardHeader>
            <Separator className="mb-4" />



            <CardContent>
                <div className="px-4">
                    <form onSubmit={handleSubmit(onsubmit
                    )}>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid gap-2 col-span-1">
                                <Label htmlFor="content">Title</Label>
                                <Controller
                                    defaultValue=""
                                    name="title"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Input
                                            {
                                            ...field
                                            }
                                            value={field.value ?? ""}
                                            placeholder="Title"
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex col-span-1 flex-col gap-2">
                                <Label className="">Assignee</Label>
                                {/* Select Tags */}
                                {/* <DropdownSelectTags/> */}
                                <Controller
                                    name="assignee"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            placeholder="Select assignee"
                                            disabled={isLoading}
                                            style={{ width: '100%', height: '100%' }}
                                            allowClear
                                            showSearch
                                        >
                                            {assigneesData.map((item) => (
                                                <Select.Option key={item.value} value={item.value} label={item.title}>
                                                    {item.title}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="flex col-span-1 flex-col gap-2">
                                <Label htmlFor="description">Status</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            placeholder="Select assignee"
                                            disabled={isLoading}
                                            style={{ width: '100%', height: '100%' }}
                                            allowClear
                                            showSearch
                                        >
                                            {statusData.map((item) => (
                                                <Select.Option key={item.value} value={item.value} label={item.title}>
                                                    {item.title}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="flex col-span-1 flex-col gap-2">
                                <Label htmlFor="description">Priority</Label>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            placeholder="Select priority"
                                            disabled={isLoading}
                                            style={{ width: '100%', height: '100%' }}
                                            allowClear
                                            showSearch
                                        >
                                            {priorityData.map((item) => (
                                                <Select.Option key={item.value} value={item.value} label={item.title}>
                                                    {item.title}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="col-span-1">
                                {/* Due Date */}
                                <Controller
                                    name="dueDate"
                                    control={control}
                                    render={({ field }) => (
                                        <DueDate
                                            value={field.value}
                                            onChange={(date) => field.onChange(date)}
                                        />
                                    )}
                                />

                            </div>
                            <div className="flex col-span-1 flex-col gap-2">
                                <Label className="">Tags</Label>

                                <AntdMultiSelect
                                    control={control}
                                    initialOptions={TagsData}
                                    placeholder="Select multiple tags"
                                />
                            </div>
                            <div className="grid gap-2 col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Textarea
                                            {
                                            ...field
                                            }
                                            value={field.value ?? ""}
                                            placeholder="Description"
                                            className=""
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="content">Subtask</Label>
                            </div>
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded",
                                        "bg-background border  ",
                                        "group" // optional: for hover effects
                                    )}
                                >
                                    <Controller
                                        name={`subtasks.${index}.completed`}
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                                <Checkbox
                                                    id={`subtask-${field.id}`}
                                                    checked={value ?? false}           // safe fallback
                                                    onCheckedChange={onChange}
                                                    className="h-5 rounded-full w-5 data-[state=checked]:bg-primary"
                                                />

                                                <Label
                                                    htmlFor={`subtask-${field.id}`}
                                                    className={cn(
                                                        "text-sm font-medium cursor-pointer flex-1 select-none",
                                                        value && " text-muted-foreground/80"
                                                    )}
                                                >
                                                    {field.title}
                                                </Label>
                                            </>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="w-full mt-3 flex  justify-end gap-3">
                            <Link href={'/tasks'} type="submit" className=" max-w-xl border flex items-center justify-center rounded-sm px-7 text-sm">
                                Back to Tasks
                            </Link>
                            <Button type="submit" className="px-7 max-w-xl rounded-sm cursor-pointer">
                                Save Edit
                            </Button>
                        </div>
                    </form>
                </div>
            </CardContent>

            <CardFooter>
                <BreadcrumbTask id={id} />
            </CardFooter>
        </Card>
    )
}
