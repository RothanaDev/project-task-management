import { Briefcase, CheckCircle, Clock } from "lucide-react";

type Project = {
  id: string;
  title: string;
  status: "active" | "Completed";
};

export default function ProjectSummary({
  projects = [],
}: { projects?: Project[] } = {}) {
  const total = projects.length;
  const active = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "Completed").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
      <ProjectCard
        icon={<Briefcase className="w-6 h-6" />}
        label="Total Projects"
        value={total}
        color="bg-blue-500"
      />
      <ProjectCard
        icon={<Clock className="w-6 h-6" />}
        label="Active Projects"
        value={active}
        color="bg-yellow-500"
      />
      <ProjectCard
        icon={<CheckCircle className="w-6 h-6" />}
        label="Completed Projects"
        value={completed}
        color="bg-green-500"
      />
    </div>
  );
}

function ProjectCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`${color} p-6 rounded-2xl shadow-md text-white`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{label}</h3>
        <div className="text-white/80">{icon}</div>
      </div>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}
