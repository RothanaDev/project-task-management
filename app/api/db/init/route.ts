import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Create Projects table
        await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        slug TEXT,
        name TEXT,
        description TEXT,
        color TEXT,
        status TEXT,
        tasks_total INTEGER,
        tasks_completed INTEGER,
        due_date TEXT
      );
    `;

        // Create Tasks table
        await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        project_id TEXT REFERENCES projects(id),
        priority TEXT,
        status TEXT,
        due_date TEXT,
        tags TEXT[],
        assignee TEXT,
        subtasks JSONB,
        comments JSONB
      );
    `;

        return NextResponse.json({ message: "Tables created successfully" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
