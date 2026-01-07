"use client"

import * as React from "react"
import { Plus } from "lucide-react"


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


export function DrawerAddNewSubtask() {
    const [toggleActive, setToggleActive] = React.useState<'done' | 'unfinished'>('unfinished')



    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full cursor-pointer">
                    <Plus />
                    Add new subtask
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add Subtask</DrawerTitle>
                        <DrawerDescription>Set your daily subtasks.</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-0">
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Input
                                        id="content"
                                        type="text"
                                        placeholder=""
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="content">Complete{" "}/{" "}Incomplete</Label>
                                    <div className="w-90 rounded-sm p-1">
                                        <div className="relative flex h-10 items-center rounded-sm bg-gray-200/50">
                                            {/* Sliding indicator */}
                                            <div
                                                className={`
                                                        absolute h-full w-1/2 rounded-sm transition-all duration-350 ease-[cubic-bezier(0.65,0,0.35,1)]
                                                        ${toggleActive === 'done'
                                                        ? 'left-0 bg-green-700'
                                                        : 'left-1/2 bg-red-700'}`}
                                            />
                                            {/* Buttons */}
                                            <button
                                                type="button"
                                                onClick={() => setToggleActive('done')}
                                                className={`
                                                            flex-1 text-center leading-10 cursor-pointer z-10 transition-colors
                                                            ${toggleActive === 'done' ? 'text-white' : 'text-gray-600'}
                                                        `}
                                            >
                                                Complete
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setToggleActive('unfinished')}
                                                className={`
            flex-1 text-center leading-10 cursor-pointer z-10 transition-colors
            ${toggleActive === 'unfinished' ? 'text-white' : 'text-gray-600'}
          `}
                                            >
                                                Incomplete
                                            </button>
                                        </div>
                                    </div>

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
