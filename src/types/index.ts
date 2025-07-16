export interface Note {
  id: string;
  nativeText: string;
  learningText: string;
  pronunciation: string;
  voiceUrl: string;
  noteType: string;
  reviewCount: number;
  lastReviewedAt: string | null;
  nextReviewAt: string | null;
  ease: number | null;
  tags: string[];
  difficulty: "beginner"| "intermediate"| "advanced",
  createdAt: string;
  updatedAt: string;
  slug: string;
  user_id: string;
}
