const getBaseUrl = () => {
  // 1. Browser: Always use relative path
  if (typeof window !== "undefined") return "/api"

  // 2. Production: Use Vercel's automatic environment variable
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`

  // 3. User Defined: Use custom env var if provided
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL

  // 4. Local: Standard development port
  return "http://localhost:3001/api" // Fallback to your local json-server or handle via route
}

const API_BASE_URL = getBaseUrl()

import type { TaskFormValues } from "@/lib/validators/task"
import { TaskUpdateFormValues } from "./validators/taskUpdateSchema"

export async function fetchProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, { cache: 'no-store' })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const text = await response.text(); // Get text first to debug if it's not JSON
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("fetchProjects: Received HTML instead of JSON from", `${API_BASE_URL}/projects`);
      return [];
    }
  } catch (error) {
    console.error("fetchProjects error:", error)
    return []
  }
}

export async function fetchProject(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, { cache: 'no-store' })
    if (!response.ok) throw new Error("Project not found")
    return response.json()
  } catch (error) {
    console.error("fetchProject error:", error)
    return null
  }
}

export async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, { cache: 'no-store' })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("fetchTasks: Received HTML instead of JSON from", `${API_BASE_URL}/tasks`);
      return [];
    }
  } catch (error) {
    console.error("fetchTasks error:", error)
    return []
  }
}

export async function fetchTask(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, { cache: 'no-store' })
    if (!response.ok) throw new Error("Task not found")
    return response.json()
  } catch (error) {
    console.error("fetchTask error:", error)
    return null
  }
}

export async function fetchTasksByProject(projectId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks?projectId=${projectId}`, { cache: 'no-store' })
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
      method: "DELETE",
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

type TaskUpdateApiPayload = Omit<TaskUpdateFormValues, "dueDate"> & {
  dueDate?: string
}

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
