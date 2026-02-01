import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"
import { Check } from "lucide-react"

export default function SkeletonLoading() {
    return (
        <div className="rounded-md overflow-hidden">
            <div className="overflow-x-auto">
                <Table className="w-full">
                    {/* <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="w-12 text-center p-3">
                                <Checkbox />
                            </TableHead>
                            <TableHead className="font-bold text-center min-w-32.5 p-3">Asignee</TableHead>
                            <TableHead className="font-bold text-center min-w-30 p-3">Title</TableHead>
                            <TableHead className="font-bold text-center min-w-37.5 p-3">Description</TableHead>
                            <TableHead className="font-bold text-center min-w-30 p-3">Status</TableHead>
                            <TableHead className="font-bold text-center min-w-30 p-3">Priority</TableHead>
                            <TableHead className="font-bold text-center w-24 p-3">Comments</TableHead>
                            <TableHead className="font-bold text-center w-24 p-3">Due Date</TableHead>
                            <TableHead className="font-bold text-center min-w-25 p-3">Action</TableHead>
                        </TableRow>
                    </TableHeader> */}
                    <TableBody>
                        {[0, 1, 2, 3, 4, 5, 6].map((val) => (
                            <TableRow key={val} className="hover:bg-gray-50">
                                <TableCell className="text-center">
                                    <div className="flex items-center gap-6">

                                        <span className=" border p-1 rounded-full">
                                            <Check size={12} className="text-white" />
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className="font-medium p-3 flex items-center gap-2">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-37.5" />
                                        <Skeleton className="h-4 w-25" />
                                    </div>

                                </TableCell>
                                <TableCell className="text-center font-medium p-3">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-37.5" />
                                        <Skeleton className="h-4 w-25" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center p-3">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-37.5" />
                                        <Skeleton className="h-4 w-25" />
                                    </div>
                                </TableCell>

                                {/* Status Cell */}
                                <TableCell className="text-center p-3">
                                    <Skeleton className="w-25 h-7" />
                                </TableCell>
                                <TableCell className="text-center p-3">
                                    <Skeleton className="w-25 h-7" />
                                </TableCell>
                                <TableCell className="text-center p-3">
                                    <Skeleton className="w-17.5 h-7" />
                                </TableCell>
                                <TableCell className="text-center p-3">
                                    <Skeleton className="w-17.5 h-7" />
                                </TableCell>
                                <TableCell className="text-center p-3">
                                    <Skeleton className="w-17.5 h-7" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
