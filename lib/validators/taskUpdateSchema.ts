import z from "zod"


const subtaskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  completed: z.boolean(),
})

const commentSchema = z.object({
  id: z.string().optional(),
  content: z.string(),
  author: z.string(),
  createdAt: z.string().optional(),
})

export const taskUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectId: z.string().min(1, "Project is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in-progress", "done"]),
  dueDate: z.date().optional(),
  tags: z.array(z.string()),
  assignee: z.string(),
  subtasks: z.array(subtaskSchema),
  comments: z.array(commentSchema),
})
export type TaskUpdateFormValues = z.infer<typeof taskUpdateSchema>
