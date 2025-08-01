# Test Folder Structure Guide for Lingua App

## Recommended Structure

```
src/
├── __tests__/                          # Main test directory
│   ├── components/                     # Component tests
│   │   ├── shared/                     # Shared components
│   │   │   ├── NoteCard.test.tsx
│   │   │   ├── NoteForm.test.tsx
│   │   │   ├── NotesList.test.tsx
│   │   │   ├── NoteModal.test.tsx
│   │   │   ├── WordCard.test.tsx
│   │   │   └── SkeletonCard.test.tsx
│   │   ├── ui/                         # UI components
│   │   │   ├── Button.test.tsx
│   │   │   ├── FormError.test.tsx
│   │   │   ├── FloatingActionButton.test.tsx
│   │   │   └── BottomNavigation.test.tsx
│   │   └── PrivateRoute.test.tsx       # Route protection
│   │
│   ├── pages/                          # Page component tests
│   │   ├── Home.test.tsx
│   │   ├── NoteEditor.test.tsx
│   │   ├── NoteDetails.test.tsx
│   │   ├── NoteBook.test.tsx
│   │   ├── Review.test.tsx
│   │   ├── Profile.test.tsx
│   │   ├── auth/                       # Auth-related pages
│   │   │   ├── Signin.test.tsx
│   │   │   └── Signup.test.tsx
│   │
│   ├── features/                       # Feature-based tests
│   │   ├── notes/                      # Notes feature
│   │   │   ├── notesSlice.test.ts
│   │   │   ├── useNotes.test.ts
│   │   │   └── noteUtils.test.ts
│   │   ├── auth/                       # Auth feature (if you add it)
│   │   │   ├── authSlice.test.ts
│   │   │   └── useAuth.test.ts
│   │   └── search/                     # Search feature (future)
│   │       ├── searchSlice.test.ts
│   │       └── useSearch.test.ts
│   │
│   ├── context/                        # Context provider tests
│   │   ├── AuthContext.test.tsx
│   │   └── AppBarContext.test.tsx
│   │
│   ├── hooks/                          # Custom hooks tests
│   │   └── hooks.test.ts
│   │
│   ├── lib/                           # Utility function tests
│   │   ├── utils.test.ts
│   │   └── supabaseClient.test.ts
│   │
│   ├── integration/                    # Integration tests
│   │   ├── auth-flow.test.tsx
│   │   ├── note-management.test.tsx
│   │   └── review-system.test.tsx
│   │
│   ├── utils/                         # Test utilities
│   │   ├── test-utils.tsx             # Custom render functions
│   │   ├── mocks/                     # Mock configurations
│   │   │   ├── handlers.ts            # MSW handlers
│   │   │   ├── server.ts              # MSW server setup
│   │   │   └── data.ts                # Mock data
│   │   ├── factories/                 # Test data factories
│   │   │   ├── noteFactory.ts
│   │   │   ├── userFactory.ts
│   │   │   └── index.ts
│   │   └── helpers/                   # Test helper functions
│   │       ├── auth-helpers.ts
│   │       └── dom-helpers.ts
│   │
├── __mocks__/                         # Global mocks (keep existing)
│   └── supabaseClient.ts
│
└── tests/                            # Legacy test folder (migrate from here)
    └── Notes.test.tsx                # Move to __tests__/components/shared/

# Cypress E2E Tests (separate folder)
cypress/
├── e2e/                              # End-to-end test specs
│   ├── auth/
│   │   ├── signin.cy.ts
│   │   └── signup.cy.ts
│   ├── notes/
│   │   ├── create-note.cy.ts
│   │   ├── edit-note.cy.ts
│   │   ├── delete-note.cy.ts
│   │   └── note-list.cy.ts
│   ├── review/
│   │   ├── review-session.cy.ts
│   │   └── spaced-repetition.cy.ts
│   └── navigation/
│       └── app-navigation.cy.ts
├── fixtures/                         # Test data files
│   ├── notes.json
│   ├── users.json
│   └── auth.json
├── support/                          # Cypress commands and utilities
│   ├── commands.ts                   # Custom Cypress commands
│   ├── e2e.ts                       # Global setup
│   └── index.ts
└── cypress.config.ts                 # Cypress configuration
```

## Why This Structure Works

### 1. **Mirrors Source Structure**

- Easy to find tests for specific components
- Maintains logical organization
- Scales well as app grows

### 2. **Feature-Based Organization**

- Groups related functionality together
- Makes it easy to test entire features
- Supports domain-driven development

### 3. **Clear Separation of Concerns**

- **Unit tests**: Individual components/functions
- **Integration tests**: Feature workflows
- **E2E tests**: Complete user journeys (in cypress/ folder)
- **Utils**: Reusable test helpers

## Migration Plan

### Step 1: Create New Structure

```bash
mkdir -p src/__tests__/{components/{shared,ui},pages/auth,features/notes,context,hooks,lib,integration,utils/{mocks,factories,helpers}}
```

### Step 2: Move Existing Tests

```bash
# Move your current test
mv src/tests/Notes.test.tsx src/__tests__/pages/Home.test.tsx
```

### Step 3: Update Test Imports

Update import paths in moved tests to reflect new structure.

## Naming Conventions

### Test Files

- **Component tests**: `ComponentName.test.tsx`
- **Hook tests**: `useHookName.test.ts`
- **Utility tests**: `utilityName.test.ts`
- **Integration tests**: `feature-workflow.test.tsx`
- **E2E tests**: `feature.cy.ts` (in cypress/ folder)

### Test Suites

```typescript
// Good: Descriptive test suite names
describe("NoteCard Component", () => {
  describe("Rendering", () => {
    // Rendering tests
  });

  describe("User Interactions", () => {
    // Interaction tests
  });

  describe("Error States", () => {
    // Error handling tests
  });
});
```

## Alternative Approaches

### Co-located Tests (Alternative)

```
src/
├── components/
│   ├── shared/
│   │   ├── NoteCard.tsx
│   │   ├── NoteCard.test.tsx        # Test next to component
│   │   ├── NoteForm.tsx
│   │   └── NoteForm.test.tsx
```

**Pros**: Tests are right next to the code
**Cons**: Can clutter source folders, harder to run all tests

### Feature-First Structure (Alternative)

```
src/
├── features/
│   ├── notes/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── tests/                   # All note tests here
│   │   │   ├── components.test.tsx
│   │   │   ├── hooks.test.tsx
│   │   │   └── integration.test.tsx
```

**Pros**: Everything for a feature in one place
**Cons**: Can become unwieldy for shared components

## Best Practices for Learning

### 1. Start Simple

Begin with the basic structure and add folders as needed:

```
src/__tests__/
├── components/
├── pages/
├── utils/
└── integration/
```

### 2. Use Consistent Patterns

- Always end test files with `.test.tsx` or `.test.ts`
- Group related tests in `describe` blocks
- Use descriptive test names

### 3. Create Test Utilities Early

Set up your test utilities first - they'll save you time later:

```typescript
// src/__tests__/utils/test-utils.tsx
export const renderWithProviders = (ui, options) => {
  // Your custom render function
};
```

### 4. Mock External Dependencies

Keep mocks organized in the `utils/mocks/` folder:

```typescript
// src/__tests__/utils/mocks/handlers.ts
export const handlers = [
  rest.get("/api/notes", (req, res, ctx) => {
    return res(ctx.json(mockNotes));
  }),
];
```

## Tools Integration

### Vitest Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/__tests__/**/*.{test,spec}.{js,ts,tsx}"],
  },
});
```

### VS Code Settings

```json
// .vscode/settings.json
{
  "testing.automaticallyOpenPeekView": "never",
  "testing.defaultGutterClickAction": "run",
  "files.associations": {
    "*.test.tsx": "typescriptreact",
    "*.test.ts": "typescript"
  }
}
```

## Summary

For your learning phase, I recommend:

1. **Start with the recommended structure** - it's industry standard
2. **Begin with component tests** - they're easiest to understand
3. **Set up test utilities early** - they'll make everything easier
4. **Add integration tests gradually** - as you understand the patterns
5. **Keep mocks organized** - in dedicated folders

This structure will serve you well as you learn and as your app grows!

## Cypress Integration

Since you're using Cypress, here's how it fits with your testing strategy:

### Cypress Folder Structure

Your Cypress tests should be organized by feature/workflow:

```
cypress/
├── e2e/
│   ├── auth/                         # Authentication flows
│   ├── notes/                        # Note management
│   ├── review/                       # Review system
│   └── navigation/                   # App navigation
├── fixtures/                         # Test data
├── support/                          # Custom commands
└── cypress.config.ts
```

### Test Distribution

- **Unit/Integration tests** (Vitest): `src/__tests__/`
- **E2E tests** (Cypress): `cypress/e2e/`

### Custom Cypress Commands

Create reusable commands in `cypress/support/commands.ts`:

```typescript
// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      createNote(noteData: object): Chainable<void>;
      deleteAllNotes(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/signin");
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="signin-button"]').click();
});

Cypress.Commands.add("createNote", (noteData) => {
  cy.get('[data-testid="add-note-button"]').click();
  cy.get('[data-testid="native-text-input"]').type(noteData.nativeText);
  cy.get('[data-testid="learning-text-input"]').type(noteData.learningText);
  cy.get('[data-testid="save-note-button"]').click();
});
```

### Cypress Test Example

```typescript
// cypress/e2e/notes/create-note.cy.ts
describe("Create Note Flow", () => {
  beforeEach(() => {
    cy.login("test@example.com", "password123");
  });

  it("should create a new note successfully", () => {
    cy.createNote({
      nativeText: "Hello",
      learningText: "مرحبا",
    });

    cy.get('[data-testid="note-card"]')
      .should("contain", "Hello")
      .and("contain", "مرحبا");
  });
});
```

### Running Tests

```bash
# Unit/Integration tests
npm run test

# E2E tests
npm run cypress:open
# or
npm run cypress:run
```
