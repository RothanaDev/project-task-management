import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useDeleteTask } from "@/hooks/use-queries";

interface childProps {
  id: string;
}

export function ActionBtnRedirect({ id }: childProps) {
  const deleteTaskMutation = useDeleteTask();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="cursor-pointer shadow-none outline-0 ring-0"
          aria-label="Open menu"
        >
          <MoreHorizontalIcon size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>About task</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href={`/tasks/${id}`}>
            <DropdownMenuItem>
              View
              <DropdownMenuShortcut>⇧⌘V</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={`/tasks/edit/${id}`}>
            <DropdownMenuItem>
              Edit
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 hover:text-red-600"
          disabled={deleteTaskMutation.isPending}
          onClick={async () => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this task?"
            );
            if (confirmed) {
              try {
                await deleteTaskMutation.mutateAsync(id);
                // The mutation will handle invalidating queries and updating the UI
              } catch (error) {
                console.error("Failed to delete task:", error);
                // You might want to show an error message to the user here
              }
            }
          }}
        >
          Delete
          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
