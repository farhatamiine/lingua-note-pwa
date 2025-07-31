import NoteForm from "@/components/shared/NoteForm";
import { useAppBar } from "@/context/AppBarContext";
import { InsertNoteFormData } from "@/schemas";
import {
  useAddNote,
  useNoteById,
  useUpdateNote,
} from "@/features/notes/useNotes";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import GoBackButton from "@/components/shared/GoBackButton";

function NoteEditor() {
  const { action, noteId } = useParams();
  const navigate = useNavigate();
  const { setConfig } = useAppBar();
  const title = action === "add" ? "Add new note" : "Edit note";
  const [initialData, setInitialData] = useState<
    InsertNoteFormData | undefined
  >(undefined);

  const addNoteMutation = useAddNote();
  const updateNoteMutation = useUpdateNote();

  const { data: noteToEdit, isLoading } = useNoteById(noteId || "");

  useEffect(() => {
    setConfig({
      leftContent: <GoBackButton route="back" />,
      title: title,
    });
    if (!isLoading && noteToEdit) {
      setInitialData(noteToEdit);
    }
  }, [setConfig, title, isLoading, noteToEdit]);

  const handleSubmit = async (data: InsertNoteFormData) => {
    try {
      if (action === "add") {
        await addNoteMutation.mutateAsync(data);
      } else if (action === "edit" && noteId) {
        await updateNoteMutation.mutateAsync({ ...data, id: noteId });
      }

      // Navigate back to notes list after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const isNoteLoading =
    addNoteMutation.isPending || updateNoteMutation.isPending;

  return (
    <NoteForm
      onSubmit={handleSubmit}
      isLoading={isLoading || isNoteLoading}
      initialData={initialData}
      isEditMode={action === "edit"}
    />
  );
}

export default NoteEditor;
