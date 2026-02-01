import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Task } from '@/lib/types';

const dbPath = path.resolve(process.cwd(), 'db.json');

function getLocalData() {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

const isPostgresConfigured = !!process.env.POSTGRES_URL;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (isPostgresConfigured) {
            const { rows } = await sql`SELECT * FROM tasks WHERE id = ${id};`;
            if (rows.length === 0) return NextResponse.json({ error: "Task not found" }, { status: 404 });
            return NextResponse.json(rows[0]);
        } else {
            const db = getLocalData();
            const task = db.tasks.find((t: Task) => t.id === id);
            if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
            return NextResponse.json(task);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (isPostgresConfigured) {
            const { rows } = await sql`
        UPDATE tasks 
        SET 
          title = COALESCE(${body.title}, title),
          description = COALESCE(${body.description}, description),
          project_id = COALESCE(${body.projectId}, project_id),
          priority = COALESCE(${body.priority}, priority),
          status = COALESCE(${body.status}, status),
          due_date = COALESCE(${body.dueDate}, due_date),
          tags = COALESCE(${JSON.stringify(body.tags)}::jsonb, tags),
          assignee = COALESCE(${body.assignee}, assignee),
          subtasks = COALESCE(${JSON.stringify(body.subtasks)}::jsonb, subtasks),
          comments = COALESCE(${JSON.stringify(body.comments)}::jsonb, comments)
        WHERE id = ${id}
        RETURNING *;
      `;
            if (rows.length === 0) return NextResponse.json({ error: "Task not found" }, { status: 404 });
            return NextResponse.json(rows[0]);
        } else {
            const db = getLocalData();
            const index = db.tasks.findIndex((t: Task) => t.id === id);
            if (index === -1) return NextResponse.json({ error: "Task not found" }, { status: 404 });
            db.tasks[index] = { ...db.tasks[index], ...body };
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            return NextResponse.json(db.tasks[index]);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (isPostgresConfigured) {
            await sql`DELETE FROM tasks WHERE id = ${id};`;
        } else {
            const db = getLocalData();
            db.tasks = db.tasks.filter((t: Task) => t.id !== id);
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        }
        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
