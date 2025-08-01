import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "@/context/AuthContext";
import { AppBarProvider } from "@/context/AppBarContext";
import { store } from "@/store";
import { RootState } from "@/store";
import { Note } from "@/types";
import { User } from "@supabase/supabase-js";

// Create a test query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface RenderOptions {
  initialState?: Partial<RootState>;
  route?: string;
  user?: User | null;
}

interface TestWrapperProps {
  children: React.ReactNode;
  options?: RenderOptions;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  const TestWrapper = ({ children }: TestWrapperProps) => {
    return (
      <AuthContextProvider>
        <Provider store={store}>
          <AppBarProvider>
            <QueryClientProvider client={queryClient}>
              <MemoryRouter initialEntries={[options?.route || "/"]}>
                {children}
              </MemoryRouter>
            </QueryClientProvider>
          </AppBarProvider>
        </Provider>
      </AuthContextProvider>
    );
  };

  return render(ui, { wrapper: TestWrapper, ...options });
};

export const createMockUser = (): User => {
  return {
    id: "mock-user-id-123",
    aud: "authenticated",
    role: "authenticated",
    email: "testuser@example.com",
    email_confirmed_at: "2025-08-01T00:00:00.000Z",
    phone: "",
    confirmation_sent_at: "2025-07-31T23:50:00.000Z",
    confirmed_at: "2025-08-01T00:00:00.000Z",
    created_at: "2025-07-31T23:45:00.000Z",
    last_sign_in_at: "2025-08-01T08:00:00.000Z",
    app_metadata: {
      provider: "email",
      providers: ["email"],
    },
    user_metadata: {
      full_name: "Mock User",
      avatar_url: "https://ui-avatars.com/api/?name=Mock+User",
    },
    identities: [],
    factors: [],
  };
};
export const createMockNote = (overrides: Partial<Note> = {}): Note => {
  const now = new Date().toISOString();
  return {
    id: "1",
    slug: "salut",
    learningText: "سلام",
    nativeText: "Bonjour",
    pronunciation: "salaam",
    noteType: "expression",
    category: "",
    tags: ["greeting", "basic"],
    reviewCount: 0,
    lastReviewedAt: null,
    nextReviewAt: null,
    difficulty: "beginner",
    ease: 0,
    createdAt: now,
    updatedAt: now,
    user_id: "mocked-user",
    ...overrides,
  };
};
