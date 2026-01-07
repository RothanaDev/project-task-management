// components/task-detail-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonTaskDetail() {
  return (
    <>
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-40 mb-4" />

      {/* Title + Description */}
      <div className="space-y-2 px-4 py-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="flex flex-col gap-3 mt-4">

        {/* Priority + Following */}
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex -space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>

        {/* Assignees */}
        <div className="flex items-center gap-4 px-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>

        {/* Due Date */}
        <div className="flex items-center gap-4 px-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Status */}
        <div className="flex items-center gap-4 px-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Tags */}
        <div className="flex items-center gap-4 px-4">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-sm" />
            <Skeleton className="h-6 w-16 rounded-sm" />
            <Skeleton className="h-6 w-16 rounded-sm" />
          </div>
        </div>

        {/* Sorting Tabs */}
        <div className="flex gap-2 px-4 mt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* Content Area */}
        <div className="px-4 space-y-3">
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>

      </div>
    </>
  )
}
