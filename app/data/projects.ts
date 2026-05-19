export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  href: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Kronos",
    description:
      "Real-time project management platform with collaborative boards, sprint planning, and analytics dashboards.",
    longDescription:
      "Built from the ground up with Next.js and TypeScript, Kronos features drag-and-drop Kanban boards, real-time collaboration via WebSockets, automated sprint burndown charts, and role-based access control. The backend uses PostgreSQL with Prisma ORM and Redis for caching.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket", "Redis"],
    color: "#00D4FF",
    href: "https://github.com/Jhon-Acunn",
    github: "https://github.com/Jhon-Acunn",
  },
  {
    title: "Pulse API",
    description:
      "High-performance REST/GraphQL API gateway with rate limiting, caching, and real-time monitoring.",
    longDescription:
      "A production-grade API gateway handling 10k+ requests per second. Features intelligent request routing, Redis-backed rate limiting, response caching, and a real-time metrics dashboard powered by Server-Sent Events. Built with Node.js and Fastify for maximum throughput.",
    tags: ["Node.js", "GraphQL", "Redis", "Docker", "Fastify"],
    color: "#7C3AED",
    href: "https://github.com/Jhon-Acunn",
    github: "https://github.com/Jhon-Acunn",
  },
  {
    title: "Terraform",
    description:
      "Infrastructure-as-Code toolkit automating multi-cloud deployments with built-in cost optimization.",
    longDescription:
      "An open-source CLI tool that codifies cloud infrastructure across AWS, GCP, and Azure. Features modular resource definitions, automated cost estimation, drift detection, and a plugin system for custom providers. Used by 200+ developers in production.",
    tags: ["AWS", "Terraform", "CI/CD", "Linux", "Python"],
    color: "#10B981",
    href: "https://github.com/Jhon-Acunn",
    github: "https://github.com/Jhon-Acunn",
  },
];
