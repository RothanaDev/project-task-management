import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

function getLocalData() {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

const isPostgresConfigured = !!process.env.POSTGRES_URL;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        if (isPostgresConfigured) {
            let query;
            if (projectId) {
                query = sql`
          SELECT 
            id, title, description, project_id as "projectId", 
            priority, status, due_date as "dueDate", 
            tags, assignee, subtasks, comments 
          FROM tasks 
          WHERE project_id = ${projectId} 
          ORDER BY id DESC;
        `;
            } else {
                query = sql`
          SELECT 
            id, title, description, project_id as "projectId", 
            priority, status, due_date as "dueDate", 
            tags, assignee, subtasks, comments 
          FROM tasks 
          ORDER BY id DESC;
        `;
            }
            const { rows } = await query;
            return NextResponse.json(rows);
        } else {
            const db = getLocalData();
            let tasks = db.tasks;
            if (projectId) {
                tasks = tasks.filter((t: any) => t.projectId === projectId);
            }
            return NextResponse.json(tasks);
        }
    } catch (error: any) {
        console.error("API Tasks GET error:", error);
        try {
            const db = getLocalData();
            return NextResponse.json(db.tasks);
        } catch (e) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const id = Math.random().toString(36).substr(2, 9);

        if (isPostgresConfigured) {
            const { rows } = await sql`
        INSERT INTO tasks (id, title, description, project_id, priority, status, due_date, tags, assignee, subtasks, comments)
        VALUES (
          ${id}, 
          ${body.title}, 
          ${body.description}, 
          ${body.projectId}, 
          ${body.priority}, 
          ${body.status}, 
          ${body.dueDate}, 
          ${body.tags || []}, 
          ${body.assignee || ''}, 
          ${JSON.stringify(body.subtasks || [])}, 
          ${JSON.stringify(body.comments || [])}
        )
        RETURNING id, title, description, project_id as "projectId", priority, status, due_date as "dueDate", tags, assignee, subtasks, comments;
      `;
            return NextResponse.json(rows[0], { status: 201 });
        } else {
            const db = getLocalData();
            const newTask = { ...body, id };
            db.tasks.push(newTask);
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            return NextResponse.json(newTask, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
