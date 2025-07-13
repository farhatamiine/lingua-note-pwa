import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setModalOpen } from "@/features/notes/notesSlice";

interface ModalNoteProps {
  children: React.ReactNode;
}

export const ModalNote = ({ children }: ModalNoteProps) => {
  const isModalOpen = useSelector((state: RootState) => state.note.isModalOpen);
  const modalContent = useSelector(
    (state: RootState) => state.note.modalContent
  );
  const dispatch = useDispatch();
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => dispatch(setModalOpen(open))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modalContent === "add" ? "Add new note" : "Edit note"}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
