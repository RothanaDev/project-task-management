import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Drop existing tables to allow schema changes
        // WARNING: This deletes existing data in the DB.
        await sql`DROP TABLE IF EXISTS tasks;`;
        await sql`DROP TABLE IF EXISTS projects;`;

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
        project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
        priority TEXT,
        status TEXT,
        due_date TEXT,
        tags JSONB,
        assignee TEXT,
        subtasks JSONB,
        comments JSONB
      );
    `;

        return NextResponse.json({ message: "Tables created and reset successfully" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
