import { screen } from "@testing-library/react";

import { vi } from "vitest";
import {
  createMockNote,
  createMockUser,
  renderWithProviders,
} from "@/__tests__/utils/test-utils";

import NoteCard from "@/components/shared/NoteCard";

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()), // ✅ mock hook that returns a mock function
  };
});

const User = createMockUser();

const mockedNote = createMockNote({ user_id: User.id });

describe("Note Card tests", () => {
  it("renders the given note", () => {
    renderWithProviders(<NoteCard note={mockedNote} />);
    expect(screen.getByText("سلام")).toBeInTheDocument();
    expect(screen.getByText("Bonjour")).toBeInTheDocument();
    expect(screen.getByText("beginner")).toBeInTheDocument();
  });
  it("renders diffrent types display ", () => {
    renderWithProviders(<NoteCard note={mockedNote} />);
    expect(screen.getByText("expression")).toBeInTheDocument();
  });
});
