export interface TechCategory {
  category: string;
  color: string;
  items: string[];
}

export interface LearningItem {
  name: string;
  status: "advanced" | "intermediate" | "beginner";
  progress: number;
}

export interface NavItem {
  label: string;
  href: string;
}
