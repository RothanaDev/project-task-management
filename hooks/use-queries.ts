"use client"


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import * as api  from "@/lib/api"
import type { Project, Task } from "@/lib/types"
import { useRouter } from "next/dist/client/components/navigation"
import { TaskFormValues } from "@/lib/validators/task"

export function useProjects() {
   const {
    data = [],
    isLoading,
    error,
   }  = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: api.fetchProjects,
   })

   return { data, isLoading, error }
}

export function useProject(id: string) {
   const {
    data,
    isLoading,
    error,
   }  = useQuery<Project | undefined>({
    queryKey: ["project", id],
    queryFn: () => api.fetchProject(id),
    enabled: !!id,
   })
    return { data, isLoading, error }
}

export function useTasks(){
    const {
    data = [] as Task[],
    isLoading,
    error,
    } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: api.fetchTasks,
    })
    return { data, isLoading, error }
}
export function useTask(id: string) {
   const {
    data,
    isLoading,
    error,
   }  = useQuery<Task | undefined>({
    queryKey: ["task", id],
    queryFn: () => api.fetchTask(id),
    enabled: !!id.trim(),
   })
    return { data, isLoading, error }
}
export function useTasksByProject(projectId: string) {
    const {
        data= [] as Task[],
        isLoading,
        error,
    } = useQuery<Task[]>({
        queryKey :["tasks", "byProject", projectId],
        queryFn: () => api.fetchTasksByProject(projectId),
        enabled: !!projectId,
    })

    return { data, isLoading, error }
}



export function useCreateTask() {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: TaskFormValues) => api.createTask(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] })
      qc.invalidateQueries({ queryKey: ["projects"] })
      router.push("/tasks")
    },
  })
}

export function useUpdateTask(id: string) {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: TaskFormValues) => api.updateTask(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] })
      qc.invalidateQueries({ queryKey: ["task", id] })
      qc.invalidateQueries({ queryKey: ["projects"] })
      router.push(`/tasks/${id}`)
    },
  })
}
export function useDeleteTask() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => api.deleteTask(id),
        onSuccess: () => {
            // Invalidate and refetch tasks
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
    })

}