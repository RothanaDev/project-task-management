import {
  CardHeader,
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, FolderOpenDot } from "lucide-react";

type Project = {
  id: string;
  name: string;
  status: string;
  dueDate: string;
  description: string;
  color: string;
};

export default function RecentlyProjects({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div>
      <Card className="px-10 ">
        <div className="justify-center items-center flex flex-col px-10 text-gray-600">
          <h2 className="text-xl font-bold mb-1">Recent Projects</h2>
          <a href="./projects" className="hover:text-blue-600 font-bold flex">
            View All{" "}
            <span>
              <ChevronRight />
            </span>
          </a>
        </div>
        <ul className="space-y-2 sm:space-y-4">
          {projects.slice(0, 5).map((project) => (
            <li
              key={project.id}
              className="border p-4 rounded-lg"
            >
              <div className="flex items-baseline justify-around">
                <input type="checkbox" />
                <CardHeader>#{project.id}</CardHeader>
                <CardTitle className="flex-1">{project.name}</CardTitle>
                <span className="text-sm px-3 py-1 rounded-full flex items-center gap-2 ">
                  <FolderOpenDot />
                  {project.status}
                </span>
              </div>
              <div className="justify-between items-baseline flex">
                <CardDescription>{project.description}</CardDescription>
                <span>{project.dueDate}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
