"use client"

import * as React from "react"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}
interface DueDateProps {
    value?: Date
    onChange: (date?: Date) => void,
}

export function DueDate({ value, onChange }: DueDateProps) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(value)
    const [inputValue, setInputValue] = React.useState(
        value ? formatDate(value) : ""
    )


    React.useEffect(() => {
        setInputValue(value ? formatDate(value) : "")
        setMonth(value)
    }, [value])



    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="date">Due Date</Label>

            <div className="relative  flex gap-2">
                <Input
                    id="date"
                    value={inputValue}
                    placeholder="Tomorrow or next week"
                    className="bg-background pr-10"
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        const parsed = parseDate(e.target.value)
                        if (parsed) {
                            onChange(parsed)
                            setMonth(parsed)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            mode="single"
                            selected={value}
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                onChange(date)
                                setInputValue(formatDate(date))
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <p className="text-muted-foreground px-1 text-sm">
                This will be expired on{" "}
                <span className="font-medium">{formatDate(value)}</span>.
            </p>
        </div>
    )
}
