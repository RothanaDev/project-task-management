import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import db from '@/db.json';

export async function GET() {
    try {
        // Seed Projects
        for (const project of db.projects) {
            await sql`
        INSERT INTO projects (id, slug, name, description, color, status, tasks_total, tasks_completed, due_date)
        VALUES (${project.id}, ${project.slug}, ${project.name}, ${project.description}, ${project.color}, ${project.status}, ${project.tasksTotal}, ${project.tasksCompleted}, ${project.dueDate})
        ON CONFLICT (id) DO NOTHING;
      `;
        }

        // Seed Tasks
        for (const task of db.tasks) {
            await sql`
        INSERT INTO tasks (id, title, description, project_id, priority, status, due_date, tags, assignee, subtasks, comments)
        VALUES (
          ${task.id}, 
          ${task.title}, 
          ${task.description}, 
          ${task.projectId}, 
          ${task.priority}, 
          ${task.status}, 
          ${task.dueDate}, 
          ${task.tags as any}, 
          ${task.assignee}, 
          ${JSON.stringify(task.subtasks)}, 
          ${JSON.stringify(task.comments)}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
        }

        return NextResponse.json({ message: "Data seeded successfully" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
