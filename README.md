# TaskFlow - Task Management Application

## Team Members
- Phorn Rothana
- Yeourn Kimsan
- So Bunleng
- Chory Chanrady

## Tech Stack
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 
- **UI Components:** shadcn/ui
- **Data Fetching:** tanstack
- **Backend:** JSON Server (mock API)
- **Date Handling:** date-fns
- **sweetalert2:** used for alert
- **Lucide:** used for icon

## Features

### Pages
1. **Dashboard** (`/`) - Overview with statistics and recent tasks  
2. **Tasks List** (`/tasks`) - Filterable task view with status filters
3. **Task Detail** (`/tasks/[id]`) - Detailed task view with subtasks and comments
4. **Create Task** (`/tasks/new`) - Form to create new tasks
5. **Edit Task** (`/tasks/edit/[id]`) - Form to edit task
6. **Projects List** (`/projects`) - Grid view of all projects with progress
7. **Project Detail** (`/projects/[id]`) - Project overview with task list



```bash
npm run dev
```

This will:
- Start Next.js dev server on `http://localhost:3000`
- Start JSON Server on `http://localhost:3001`


## API Endpoints

- `GET /projects` - Get all projects
- `GET /projects/:id` - Get specific project
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get specific task
- `GET /tasks?projectId=:id` - Get tasks by project