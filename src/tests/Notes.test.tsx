/* import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import NotesPage from "@/pages/Notes";
import { expect, test, vi } from "vitest";
import NoteCard from "@/components/shared/NoteCard";
import NotesList from "@/components/shared/NotesList";
import { MemoryRouter } from "react-router-dom";

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </MemoryRouter>
  );
};

vi.mock("@/lib/supabaseClient", async () => {
  const mock = await import("@/__mocks__/supabaseClient");
  return mock;
});

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

const mockedNoteArray = [
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
  {
    id: "2",
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
];

test("show all notes of connected user", async () => {
  render(<HomePage />, { wrapper });
  await waitFor(() => {
    expect(screen.getByText("Merci")).toBeInTheDocument();
  });
});

test("NoteCard renders nativeText and learningText", async () => {
  render(<NoteCard note={mockedNoteArray[0]} />);

  await waitFor(() => {
    expect(screen.getByText("Merci")).toBeInTheDocument();
    expect(screen.getByText("شكرا لك")).toBeInTheDocument();
  });
});

test("NoteCard displays correct review status badge", async () => {
  render(<NoteCard note={mockedNoteArray[0]} />);
  await waitFor(() => {
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});

test("NotesList renders list of NoteCard items", async () => {
  render(<NotesList notes={mockedNoteArray} />);
  await waitFor(() => {
    const noteCardSize = screen.getAllByTestId("note-card").length;
    expect(noteCardSize).toBe(2);
  });
});

test("NotesPage shows skeleton during loading", async () => {
  render(<NotesPage />, { wrapper });

  await waitFor(() => {
    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
 */
