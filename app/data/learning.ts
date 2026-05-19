import type { LearningItem } from "@/app/types";

export const LEARNING_ITEMS: LearningItem[] = [
  { name: "System Design", status: "advanced", progress: 75 },
  { name: "Rust", status: "intermediate", progress: 40 },
  { name: "Kubernetes", status: "intermediate", progress: 50 },
  { name: "AWS Solutions Architect", status: "beginner", progress: 25 },
];

export const STATUS_COLORS: Record<string, string> = {
  advanced: "#00D4FF",
  intermediate: "#7C3AED",
  beginner: "#10B981",
};

export const STATUS_LABELS: Record<string, string> = {
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Exploring",
};
