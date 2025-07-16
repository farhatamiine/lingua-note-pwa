# Design Document - Note Management Enhancement

## Overview

This design enhances the existing note management system in the Lingua application to provide comprehensive create and update functionality. The current system has basic note display and modal infrastructure but lacks complete CRUD operations. This enhancement will build upon the existing architecture using React, TypeScript, Redux Toolkit, React Query, and Supabase.

## Architecture

### Current Architecture Analysis
The application uses:
- **Frontend**: React 19 with TypeScript, Vite build system
- **State Management**: Redux Toolkit for UI state, React Query for server state
- **Database**: Supabase (PostgreSQL) with real-time capabilities
- **UI Components**: Radix UI with Tailwind CSS styling
- **Routing**: React Router v7
- **Forms**: React Hook Form with Zod validation

### Enhanced Architecture Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
├─────────────────────────────────────────────────────────────┤
│ NotesPage → NoteModal → NoteForm → FormFields              │
│     ↓           ↓          ↓           ↓                    │
│ NotesList → NoteCard → NoteActions                          │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                     │
├─────────────────────────────────────────────────────────────┤
│ useNotes → useAddNote → useUpdateNote → useDeleteNote      │
│     ↓           ↓           ↓              ↓               │
│ React Query Cache Management                                │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Data Access Layer                        │
├─────────────────────────────────────────────────────────────┤
│ Supabase Client → Notes Table → RLS Policies               │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Enhanced Note Form Component
**Location**: `src/components/shared/NoteForm.tsx`

A comprehensive form component that handles both create and update operations:
- Uses React Hook Form for form state management
- Zod schema validation for data integrity
- Auto-save functionality with debounced input
- Rich text editing capabilities for note content
- Tag management with autocomplete
- Audio recording/playback for pronunciation

### 2. Note Modal Enhancement
**Location**: `src/components/shared/NoteModal.tsx`

Enhanced modal component that:
- Integrates with existing Redux modal state
- Supports both create and edit modes
- Handles form submission and error states
- Provides confirmation dialogs for destructive actions

### 3. Enhanced Note Actions
**Location**: `src/components/shared/NoteActions.tsx`

Action buttons for note operations:
- Edit button that opens modal in edit mode
- Delete button with confirmation
- Duplicate note functionality
- Share/export options

### 4. Auto-save Hook
**Location**: `src/hooks/useAutoSave.ts`

Custom hook for automatic saving:
- Debounced save operations
- Visual feedback for save status
- Error handling and retry logic
- Conflict resolution for concurrent edits

## Data Models

### Enhanced Note Schema
```typescript
// src/schemas/noteSchema.ts
export const noteSchema = z.object({
  id: z.string().uuid().optional(),
  nativeText: z.string().min(1, "Native text is required"),
  learningText: z.string().min(1, "Learning text is required"),
  pronunciation: z.string().optional(),
  voiceUrl: z.string().url().optional(),
  noteType: z.enum(["word", "phrase", "sentence", "grammar"]),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(), // Additional notes field
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  context: z.string().optional(), // Usage context
  examples: z.array(z.string()).default([]), // Example sentences
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  user_id: z.string().uuid().optional(),
});

export type NoteFormData = z.infer<typeof noteSchema>;
```

### Form State Interface
```typescript
// src/types/forms.ts
export interface NoteFormState {
  data: NoteFormData;
  isDirty: boolean;
  isSubmitting: boolean;
  lastSaved: Date | null;
  autoSaveEnabled: boolean;
  errors: Record<string, string>;
}
```

## Error Handling

### Client-Side Error Handling
- Form validation errors displayed inline
- Network errors with retry mechanisms
- Optimistic updates with rollback on failure
- User-friendly error messages with actionable guidance

### Server-Side Error Handling
- Supabase RLS policy violations
- Database constraint violations
- Authentication/authorization errors
- Rate limiting and quota management

### Error Recovery Strategies
```typescript
// src/utils/errorHandling.ts
export const errorRecoveryStrategies = {
  NETWORK_ERROR: 'retry',
  VALIDATION_ERROR: 'show_form_errors',
  AUTH_ERROR: 'redirect_to_login',
  CONFLICT_ERROR: 'show_merge_dialog',
  QUOTA_ERROR: 'show_upgrade_prompt'
};
```

## Testing Strategy

### Unit Tests
- Component rendering and interaction tests
- Form validation logic tests
- Custom hook behavior tests
- Utility function tests

### Integration Tests
- Complete note creation workflow
- Note update and auto-save functionality
- Modal state management
- API integration with mocked Supabase

### End-to-End Tests
- User journey from note creation to update
- Cross-browser compatibility
- Mobile responsiveness
- Offline functionality (PWA features)

### Test Structure
```
src/tests/
├── components/
│   ├── NoteForm.test.tsx
│   ├── NoteModal.test.tsx
│   └── NoteActions.test.tsx
├── hooks/
│   ├── useAutoSave.test.ts
│   └── useNotes.test.ts
├── utils/
│   └── noteValidation.test.ts
└── integration/
    └── noteManagement.test.tsx
```

## Performance Considerations

### Optimization Strategies
- React Query caching for note data
- Debounced auto-save to reduce API calls
- Virtual scrolling for large note lists
- Image/audio lazy loading
- Code splitting for note editing components

### Caching Strategy
```typescript
// React Query configuration
const noteQueryConfig = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
  retry: 3,
};
```

### Bundle Size Management
- Dynamic imports for heavy components
- Tree shaking for unused utilities
- Optimized image formats and sizes
- Minimal external dependencies

## Security Considerations

### Data Validation
- Client-side validation with Zod schemas
- Server-side validation in Supabase
- SQL injection prevention through parameterized queries
- XSS prevention through proper escaping

### Authentication & Authorization
- Row Level Security (RLS) policies in Supabase
- User session validation
- CSRF protection
- Rate limiting for API endpoints

### Data Privacy
- User data encryption at rest
- Secure audio file storage
- GDPR compliance for user data
- Audit logging for data changes

## Accessibility Features

### WCAG 2.1 AA Compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management in modals
- Semantic HTML structure
- ARIA labels and descriptions

### Internationalization
- RTL language support (existing)
- Localized error messages
- Date/time formatting
- Number formatting
- Pluralization rules