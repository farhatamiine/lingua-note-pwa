import { vi } from "vitest";

export const supabase = {
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: { user: { id: "66a480d0-ab8f-4a58-8255-e2aa12854fcb" } },
      error: null,
    }),
  },
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: [
                  {
                    id: "1",
                    nativeText: "Merci",
                    learningText: "شكرا لك",
                    noteType: "word",
                    tags: ["greeting"],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    pronunciation: "chokran",
                    voiceUrl: "",
                    slug: "merci-ar",
                    user_id: "66a480d0-ab8f-4a58-8255-e2aa12854fcb",
                    reviewCount: 0,
                    ease: null,
                    lastReviewedAt: null,
                    nextReviewAt: null,
                  },
                ],
                error: null,
              });
            }, 1000);
          })
      ),
    })),
  })),
};
