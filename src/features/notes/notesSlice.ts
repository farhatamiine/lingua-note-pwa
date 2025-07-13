import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Note } from "@/types";

interface NoteState {
  isModalOpen: boolean;
  selectedNote?: Note | null;
  modalContent: "edit" | null | "add";
}

const initialState: NoteState = {
  isModalOpen: false,
  selectedNote: null,
  modalContent: null,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setModalContent: (state, action: PayloadAction<"edit" | null | "add">) => {
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
      state.isModalOpen = true;
    },
  },
});

export const { closeModal, setModalOpen, setSelectedNote, setModalContent } =
  noteSlice.actions;
export const selectNote = (state: RootState) => state.note.selectedNote;
export default noteSlice.reducer;
