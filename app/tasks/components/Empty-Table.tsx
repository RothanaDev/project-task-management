
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { LucideIcon } from "lucide-react";

interface EmtyProps{
    title: string;
    description: string;
    icon: LucideIcon
}

export function EmptyTable({title, description, icon: Icon} : EmtyProps) {
  return (
    <Empty className="border border-dashed h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-red-500/10">
          <Icon color="red"/>
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
            {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
