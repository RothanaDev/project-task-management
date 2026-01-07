import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ItemProp {
    title: string;
    value: string;
}
interface SelectorProps {
    items: ItemProp[];
    selectLabel: string;
    placeholder: string
}


export function Selector({ items, selectLabel, placeholder }: SelectorProps) {
    return (
        <Select >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{selectLabel}</SelectLabel>
                    {
                        items?.map((item, idx) => (
                            <SelectItem key={idx} value={item.value}>{item.title}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
