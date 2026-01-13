'use client'
import SkeletonLoading from "./components/SkeletonLoading";
import { SortingGroup } from "./components/Sorting-Group";
import { TableContent } from "./components/Table-Content";
import { useTasks } from "@/hooks/use-queries";
import { useState } from "react";
interface StatusProp {
    name: string;
    url: string;
}
const items = [
    {
        name: "All",
        url: "all"
    },
    {
        name: "In Process",
        url: "in-progress"
    },
    {
        name: "Done",
        url: "done"
    },
    {
        name: "Todo",
        url: "todo"
    }
]
export default function TasksPage() {
    const { isLoading, data } = useTasks();
    const [status, setStatus] = useState<StatusProp>({ name: "All", url: "all" });
    const [search, setSearch] = useState<string>("");

    if (isLoading) return <SkeletonLoading />

    return (
        <div>
            <SortingGroup sorting={items} status={status} setSearch={setSearch} setStatus={setStatus} />
            <TableContent search={search} tasks={data} status={status} />
        </div>
    );
}
