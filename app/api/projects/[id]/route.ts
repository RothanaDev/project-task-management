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

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (isPostgresConfigured) {
            const { rows } = await sql`SELECT * FROM projects WHERE id = ${id};`;
            if (rows.length === 0) return NextResponse.json({ error: "Project not found" }, { status: 404 });
            return NextResponse.json(rows[0]);
        } else {
            const db = getLocalData();
            const project = db.projects.find((p: any) => p.id === id);
            if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
            return NextResponse.json(project);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
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
        UPDATE projects 
        SET 
          slug = COALESCE(${body.slug}, slug),
          name = COALESCE(${body.name}, name),
          description = COALESCE(${body.description}, description),
          color = COALESCE(${body.color}, color),
          status = COALESCE(${body.status}, status),
          tasks_total = COALESCE(${body.tasksTotal}, tasks_total),
          tasks_completed = COALESCE(${body.tasksCompleted}, tasks_completed),
          due_date = COALESCE(${body.dueDate}, due_date)
        WHERE id = ${id}
        RETURNING *;
      `;
            if (rows.length === 0) return NextResponse.json({ error: "Project not found" }, { status: 404 });
            return NextResponse.json(rows[0]);
        } else {
            const db = getLocalData();
            const index = db.projects.findIndex((p: any) => p.id === id);
            if (index === -1) return NextResponse.json({ error: "Project not found" }, { status: 404 });
            db.projects[index] = { ...db.projects[index], ...body };
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            return NextResponse.json(db.projects[index]);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (isPostgresConfigured) {
            await sql`DELETE FROM projects WHERE id = ${id};`;
        } else {
            const db = getLocalData();
            db.projects = db.projects.filter((p: any) => p.id !== id);
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        }
        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
