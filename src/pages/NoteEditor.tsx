import NoteForm from "@/components/shared/NoteForm";
import { useAppBar } from "@/context/AppBarContext";
import { InsertNoteFormData, NoteFormData } from "@/schemas";
import { useEffect } from "react";
import { useParams } from "react-router";
interface NoteEditorProps {
  initialData?: NoteFormData;
}

function NoteEditor({ initialData }: NoteEditorProps) {
  const param = useParams();
  const { setConfig } = useAppBar();
  const title = param.action === "add" ? "Add new note" : "Edit note";

  useEffect(() => {
    setConfig({
      title: title,
    });
  }, [setConfig, title]);

  const handleSubmit = async (data: InsertNoteFormData) => {
    try {
      console.log(param.action);

      console.log(data);
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      console.log("Done");
    }
  };
  return (
    <NoteForm
      onSubmit={handleSubmit}
      isLoading={false}
      initialData={initialData}
    />
  );
}

export default NoteEditor;
