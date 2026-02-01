const getBaseUrl = () => {
  if (typeof window !== "undefined") return "/api"

  // If we are on the server, we need the full URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`

  // For local development, try to detect the port or default to 3000
  // Note: If you run on 3002, you can set PORT=3002 in your .env
  const port = process.env.PORT || 3000
  return `http://localhost:${port}/api`
}

const API_BASE_URL = getBaseUrl()

import type { TaskFormValues } from "@/lib/validators/task"
import { TaskUpdateFormValues } from "./validators/taskUpdateSchema"

export async function fetchProjects() {
  try {
    // We add a special header to bypass Vercel's deployment protection if it exists
    const headers: Record<string, string> = {}
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    }

    const response = await fetch(`${API_BASE_URL}/projects`, {
      cache: 'no-store',
      headers
    })

    if (response.status === 401) {
      console.error("401 Unauthorized: Vercel Deployment Protection is blocking this fetch. Please disable it in Project Settings > Security.")
    }

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  } catch (error) {
    console.error("fetchProjects error:", error)
    return []
  }
}

export async function fetchProject(id: string) {
  try {
    const headers: Record<string, string> = {}
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    }

    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      cache: 'no-store',
      headers
    })
    if (!response.ok) throw new Error("Project not found")
    return response.json()
  } catch (error) {
    console.error("fetchProject error:", error)
    return null
  }
}

export async function fetchTasks() {
  try {
    const headers: Record<string, string> = {}
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    }

    const response = await fetch(`${API_BASE_URL}/tasks`, {
      cache: 'no-store',
      headers
    })

    if (response.status === 401) {
      console.error("401 Unauthorized: Vercel Deployment Protection is blocking this fetch.")
    }

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  } catch (error) {
    console.error("fetchTasks error:", error)
    return []
  }
}

export async function fetchTask(id: string) {
  try {
    const headers: Record<string, string> = {}
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    }

    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      cache: 'no-store',
      headers
    })
    if (!response.ok) throw new Error("Task not found")
    return response.json()
  } catch (error) {
    console.error("fetchTask error:", error)
    return null
  }
}

export async function fetchTasksByProject(projectId: string) {
  try {
    const headers: Record<string, string> = {}
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    }

    const response = await fetch(`${API_BASE_URL}/tasks?projectId=${projectId}`, {
      cache: 'no-store',
      headers
    })
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
    throw error
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
