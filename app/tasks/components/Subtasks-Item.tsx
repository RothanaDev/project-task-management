
import { Subtask } from "@/lib/types"
import { Check } from "lucide-react";
interface ChildProps {
    getSubtask: Subtask;
}

export default function SubtaskItems({ getSubtask }: ChildProps) {

    return (
        <div className="flex items-center gap-6">
            {
                getSubtask.completed &&
                <span className="bg-blue-500 border border-blue-500 p-1 rounded-full">
                    <Check size={12} className="text-white" />
                </span>
            }
            {
                !getSubtask.completed &&
                <span className=" border p-1 rounded-full">
                    <Check size={12} className="text-white" />
                </span>
            }
            <span>
                {
                    getSubtask.title
                }
            </span>
        </div>
    )
}
