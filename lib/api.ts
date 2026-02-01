const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
import type { TaskFormValues } from "@/lib/validators/task"
import { TaskUpdateFormValues } from "./validators/taskUpdateSchema"

export async function fetchProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`)
    if (!response.ok) throw new Error("Failed to fetch projects")
    return response.json()
  } catch (error) {
    console.error("fetchProjects error:", error)
    return []
  }
}

export async function fetchProject(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`)
    if (!response.ok) throw new Error("Project not found")
    return response.json()
  } catch (error) {
    console.error("fetchProject error:", error)
    return null
  }
}

export async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) throw new Error("Failed to fetch tasks")
    return response.json()
  } catch (error) {
    console.error("fetchTasks error:", error)
    return []
  }
}

export async function fetchTask(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
    if (!response.ok) throw new Error("Task not found")
    return response.json()
  } catch (error) {
    console.error("fetchTask error:", error)
    return null
  }
}

export async function fetchTasksByProject(projectId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks?projectId=${projectId}`)
    if (!response.ok) throw new Error("Failed to fetch tasks")
    return response.json()
  } catch (error) {
    console.error("fetchTasksByProject error:", error)
    return []
  }
}

export async function deleteTask(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error("Failed to delete task")
    return response.json()
  } catch (error) {
    console.error("deleteTask error:", error)
    throw error // Re-throw for mutation error handling
  }
}

export async function getProject(id: string) {
  return fetchProject(id)
}

export async function getTask(id: string) {
  return fetchTask(id)
}

export async function getTasksByProject(projectId: string) {
  return fetchTasksByProject(projectId)
}


export async function createTask(data: TaskFormValues) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error("Failed to create task")
    return res.json()
  } catch (error) {
    console.error("createTask error:", error)
    throw error
  }
}

type TaskUpdateApiPayload = Omit<TaskUpdateFormValues, 'dueDate'> & {
  dueDate?: string;   // or string | null if your backend wants null
};

export async function updateTask(id: string, data: TaskUpdateApiPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error("Failed to update task")
    return res.json()
  } catch (error) {
    console.error("updateTask error:", error)
    throw error
  }
}
