"use client"

import * as React from "react"
import {  Plus } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ToggleSwitch } from "./ToggleSwitch"
import { Separator } from "@/components/ui/separator"
import { DueDate } from "./DueDate"
import { Selector } from "./Selector"

const presetOptions = {
    status: [
        { value: 'done', label: 'Done', color: 'bg-green-600' },
        { value: 'todo', label: 'Todo', color: 'bg-blue-600' },
        { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-600' },
    ],
    priority: [
        { value: 'high', label: 'High', color: 'bg-green-600' },
        { value: 'medium', label: 'Medium', color: 'bg-blue-600' },
        { value: 'low', label: 'Low', color: 'bg-yellow-600' },
    ]
    ,
    "income-expense": [
        { value: 'income', label: 'Income', color: 'bg-green-600' },
        { value: 'expense', label: 'Expense', color: 'bg-red-600' },
    ]
} as const; // Add `as const` for literal types

// Selector Data
const data = [
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

export function DrawerAddNewTask() {
    const [toggleActive, setToggleActive] = React.useState<'done' | 'todo' | 'in-progress'>('in-progress')
    const [togglePriority, setTogglePriority] = React.useState<'high' | 'medium' | 'low'>('medium')



    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="p-5 cursor-pointer hover:bg-opacity-80 hover:text-gray-300 rounded bg-black text-white"
                >
                    <Plus />
                    New Task
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto  w-full max-w-sm

                   overflow-y-auto
                hover:overflow-y-scroll
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full">
                    <DrawerHeader>
                        <DrawerTitle>New Task</DrawerTitle>
                        <DrawerDescription>Add New daily Task.</DrawerDescription>
                    </DrawerHeader>
                    <Separator className="mb-4" />
                    <div className="px-4">
                        <form>
                            <div className="flex flex-col gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="content">Title</Label>
                                    <Input
                                        id="content"
                                        type="text"
                                        placeholder="Title"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        placeholder="Description"
                                        required
                                    />
                                </div>
                                <div className="">
                                    <Label htmlFor="description">Status</Label>
                                    <div className="w-full rounded-sm mt-2">
                                        <ToggleSwitch<"done" | "todo" | "in-progress">
                                            options={presetOptions.status}
                                            value={toggleActive}
                                            setToggle={setToggleActive}
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <Label htmlFor="description" className="">Priority</Label>
                                    <div className="w-full rounded-sm mt-2">
                                        <ToggleSwitch<"high" | "medium" | "low">
                                            options={presetOptions.priority}
                                            value={togglePriority}
                                            setToggle={setTogglePriority}
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    {/* Due Date */}
                                    {/* <DueDate /> */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label  className="">Tags</Label>
                                    {/* Select Tags */}
                                    {/* <DropdownSelectTags/> */}
                                    <Selector items= {data} placeholder="Select tags" selectLabel="Tags"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label  className="">Assignee</Label>
                                    {/* Select Tags */}
                                    {/* <DropdownSelectTags/> */}
                                    <Selector items= {assigneesData} placeholder="Select assignees" selectLabel="Assignee"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
