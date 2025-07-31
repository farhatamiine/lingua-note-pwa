import NoteForm from "@/components/shared/NoteForm";
import { useAppBar } from "@/context/AppBarContext";
import { InsertNoteFormData } from "@/schemas";
import { useAddNote, useUpdateNote } from "@/features/notes/useNotes";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import GoBackButton from "@/components/shared/GoBackButton";
interface NoteEditorProps {
  initialData?: InsertNoteFormData;
}

function NoteEditor({ initialData }: NoteEditorProps) {
  const param = useParams();
  const navigate = useNavigate();
  const { setConfig } = useAppBar();
  const title = param.action === "add" ? "Add new note" : "Edit note";

  const addNoteMutation = useAddNote();
  const updateNoteMutation = useUpdateNote();

  useEffect(() => {
    setConfig({
      leftContent: <GoBackButton route="/" />,
      title: title,
    });
  }, [setConfig, title]);

  const handleSubmit = async (data: InsertNoteFormData) => {
    try {
      if (param.action === "add") {
        await addNoteMutation.mutateAsync(data);
        console.log("Note created successfully!");
      } else if (param.action === "edit" && initialData?.id) {
        await updateNoteMutation.mutateAsync({ ...data, id: initialData.id });
        console.log("Note updated successfully!");
      }

      // Navigate back to notes list after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error saving note:", error);
      console.error("Failed to save note. Please try again.");
    }
  };

  const isLoading = addNoteMutation.isPending || updateNoteMutation.isPending;

  return (
    <NoteForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      initialData={initialData}
    />
  );
}

export default NoteEditor;
