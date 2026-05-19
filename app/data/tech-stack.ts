import type { TechCategory } from "@/app/types";

export const TECH_STACK: TechCategory[] = [
  {
    category: "Frontend",
    color: "#00D4FF",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  },
  {
    category: "Backend",
    color: "#7C3AED",
    items: ["Node.js", "Python", "PostgreSQL", "GraphQL", "REST APIs"],
  },
  {
    category: "DevOps",
    color: "#10B981",
    items: ["Docker", "AWS", "CI/CD", "Linux", "Vercel"],
  },
  {
    category: "Databases",
    color: "#F59E0B",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  },
  {
    category: "Tools",
    color: "#EC4899",
    items: ["Git", "VS Code", "Figma", "Linear", "Notion"],
  },
];
