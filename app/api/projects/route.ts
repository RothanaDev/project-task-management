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

export async function GET() {
    try {
        if (isPostgresConfigured) {
            const { rows } = await sql`
        SELECT 
          id, slug, name, description, color, status, 
          tasks_total as "tasksTotal", 
          tasks_completed as "tasksCompleted", 
          due_date as "dueDate" 
        FROM projects 
        ORDER BY id ASC;
      `;
            return NextResponse.json(rows);
        } else {
            const db = getLocalData();
            return NextResponse.json(db.projects);
        }
    } catch (error) {
        console.error("API Projects GET error:", error);
        try {
            const db = getLocalData();
            return NextResponse.json(db.projects);
        } catch (_e) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return NextResponse.json({ error: message }, { status: 500 });
        }
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const id = body.id || Math.random().toString(36).substr(2, 9);

        if (isPostgresConfigured) {
            const { rows } = await sql`
        INSERT INTO projects (id, slug, name, description, color, status, tasks_total, tasks_completed, due_date)
        VALUES (${id}, ${body.slug}, ${body.name}, ${body.description}, ${body.color}, ${body.status}, ${body.tasksTotal || 0}, ${body.tasksCompleted || 0}, ${body.dueDate})
        RETURNING id, slug, name, description, color, status, tasks_total as "tasksTotal", tasks_completed as "tasksCompleted", due_date as "dueDate";
      `;
            return NextResponse.json(rows[0], { status: 201 });
        } else {
            const db = getLocalData();
            const newProject = { ...body, id };
            db.projects.push(newProject);
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            return NextResponse.json(newProject, { status: 201 });
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
