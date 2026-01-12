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
import { useEffect, useRef, useState } from "react"
import { Selector } from "./Selector"
import { ToggleSwitch } from "./ToggleSwitch"
import { Separator } from "@/components/ui/separator"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Paperclip } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { TaskFormValues, taskSchema } from "@/lib/validators/task"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { useTask } from "@/hooks/use-queries"
import { title } from "process"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const presetOptions = {
    status: [
        { value: 'done', label: 'Done', color: 'bg-green-600' },
        { value: 'todo', label: 'Todo', color: 'bg-blue-600' },
        { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-600' },
    ],
    priority: [
        { value: 'high', label: 'High', color: 'bg-green-600' },
        { value: 'medium', label: 'Medium', color: 'bg-yellow-600' },
        { value: 'low', label: 'Low', color: 'bg-red-600' },
    ],
    subtask: [

        { value: 'done', label: 'Complete', color: 'bg-sky-500' },
        { value: 'incomplete', label: 'Inomplete', color: 'bg-red-500' },
    ]
    ,
    "income-expense": [
        { value: 'income', label: 'Income', color: 'bg-green-600' },
        { value: 'expense', label: 'Expense', color: 'bg-red-600' },
    ]
} as const; // Add `as const` for literal types

const TagsData = [
    {
        title: "Design",
        value: "design"
    },
    {
        title: "Accessibility",
        value: "accessibility"
    },
    {
        title: "Documentation",
        value: "documentation"
    },
    {
        title: "Research",
        value: "research"
    },
    {
        title: "UX",
        value: "ux"
    },
]
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

const assigneeTitleToValue = (value: string) => {
    return assigneesData.find(
        assignee => assignee.value === value
    )?.value;
};

export function EditTask({ id }: { id: string }) {
    const { data, isLoading, error } = useTask(id)



    const { control, handleSubmit, formState: { errors }, reset } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: data?.title,
            description: "",
            assignee: ""
        }
    });

    console.log('Asignee fn', assigneeTitleToValue(data?.assignee ?? ""));



    const onsubmit = (data: TaskFormValues) => {
        console.log('Form-Data: ', data);

    }

    const [toggleActive, setToggleActive] = useState<'done' | 'todo' | 'in-progress'>('in-progress')
    const [togglePriority, setTogglePriority] = useState<'high' | 'medium' | 'low'>('medium')
    const [toggleSubtask, setToggleSubtask] = useState<'done' | 'incomplete'>('incomplete')


    const hasResetRef = useRef(false);

    useEffect(() => {
        if (!data || isLoading || hasResetRef.current) return;

        reset({
            title: data.title ?? '',
            description: data.description ?? '',
            assignee: data.assignee ?? '',
        });

        hasResetRef.current = true;
    }, [data, isLoading, reset]);




    return (
        <Card className="w-full border-none  h-full bg-transparent shadow-none">
            <CardHeader >
                <CardTitle className="text-center text-xl">Edit Task# {id}</CardTitle>
                <CardDescription>
                    Edit daily Task.
                </CardDescription>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent>
                <div className="px-4">
                    <form onSubmit={handleSubmit(onsubmit, (errors) => console.log('form-error', errors)
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
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isLoading}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select assignee" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Assignee</SelectLabel>
                                                    {assigneesData.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {item.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="description">Status</Label>
                                <div className="w-full rounded-sm mt-2">
                                    <ToggleSwitch<"done" | "todo" | "in-progress">
                                        options={presetOptions.status}
                                        value={toggleActive}
                                        setToggle={setToggleActive}
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="description" className="">Priority</Label>
                                <div className="w-full rounded-sm mt-2">
                                    <ToggleSwitch<"high" | "medium" | "low">
                                        options={presetOptions.priority}
                                        value={togglePriority}
                                        setToggle={setTogglePriority}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                {/* Due Date */}
                                <DueDate />
                            </div>
                            <div className="flex flex-col col-span-1 gap-2">
                                <Label className="">Tags</Label>
                                {/* Select Tags */}
                                {/* <DropdownSelectTags/> */}
                                {/* <Selector items={TagsData} placeholder="Select tags" selectLabel="Tags" /> */}
                            </div>
                            <div className="grid gap-2 col-span-1">
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
                                            className="min-h-9.5"
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid gap-2 col-span-1">
                                <Label htmlFor="content">Attachments</Label>
                                <InputGroup className="w-full rounded focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0">
                                    <InputGroupInput
                                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                        placeholder="Search title..."
                                        id="picture"
                                        type="file"
                                    // onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <InputGroupAddon className="">
                                        <Paperclip size={18} />
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="content">Subtask</Label>
                            </div>
                            <div className="grid grid-cols-2 gap-2 col-span-2 p-3 border-x">
                                <div className="grid gap-2 col-span-1">
                                    <Label htmlFor="content">Content</Label>
                                    <Input
                                        id="content"
                                        type="text"
                                        placeholder="Content"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2 col-span-1">
                                    <Label htmlFor="content">Complete / Incomplete</Label>
                                    <div className="w-full rounded-sm ">
                                        <ToggleSwitch<'done' | 'incomplete'>
                                            options={presetOptions.subtask}
                                            value={toggleSubtask}
                                            setToggle={setToggleSubtask}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="w-full max-w-xl">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}
