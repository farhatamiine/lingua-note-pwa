# Implementation Plan

- [ ] 1. Create enhanced note validation schema

  - Create Zod schema for note form validation with all required fields
  - Add validation for native text, learning text, and optional fields
  - Export TypeScript types from the schema
  - _Requirements: 1.2, 2.2_

- [ ] 2. Implement note form component

  - Create NoteForm component using React Hook Form
  - Integrate Zod schema validation with form
  - Add form fields for all note properties (native text, learning text, pronunciation, tags, etc.)
  - Implement form submission handling
  - Add form reset functionality
  - _Requirements: 1.1, 1.3, 2.1, 2.2_

- [ ] 3. Create note modal component

  - Build NoteModal component that integrates with existing Redux modal state
  - Support both create and edit modes based on modal content state
  - Integrate NoteForm component within the modal
  - Handle modal close with unsaved changes confirmation

  - _Requirements: 1.1, 2.1_

- [x] 4. Enhance note mutation hooks

  - Fix the existing useAddNote hook implementation (currently has incomplete insert)
  - Create useUpdateNote hook for updating existing notes
  - Add proper error handling and loading states
  - Implement optimistic updates for better UX
  - _Requirements: 1.3, 1.4, 2.3, 2.4_

- [ ] 5. Implement auto-save functionality

  - Create useAutoSave custom hook with debounced saving
  - Add auto-save to note form with visual feedback
  - Handle auto-save errors gracefully
  - Implement save status indicator
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 6. Add note actions component

  - Create NoteActions component with edit and delete buttons
  - Integrate edit action with Redux modal state
  - Add click handlers to open modal in edit mode
  - Update NoteCard to include action buttons
  - _Requirements: 2.1, 3.3_

- [ ] 7. Enhance notes list with empty state

  - Update NotesList component to handle empty notes array
  - Add empty state message when no notes exist
  - Style empty state with appropriate messaging
  - _Requirements: 3.4_

- [ ] 8. Create comprehensive test suite

  - Write unit tests for NoteForm component
  - Write unit tests for note validation schema
  - Write unit tests for useAutoSave hook
  - Write integration tests for note creation and update workflows
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4_

- [ ] 9. Update existing components integration
  - Ensure NoteModal is properly imported and used in NotesPage
  - Update Redux store to include the modal in the root reducer
  - Verify modal state management works with existing button actions
  - Test complete user flow from notes list to creation/editing
  - _Requirements: 1.1, 2.1, 3.1, 3.3_
