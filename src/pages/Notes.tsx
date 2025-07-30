import NotesList from "@/components/shared/NotesList";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Button } from "@/components/ui/button";
import { useAppBar } from "@/context/AppBarContext";
import { useNotes } from "@/features/notes/useNotes";
import { Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

function NotesPage() {
  const { setConfig } = useAppBar();
  const navigate = useNavigate();
  const notes = useNotes();

  const AddButton = useMemo(() => {
    return (
      <Button
        variant={"ghost"}
        onClick={() => {
          navigate("/editor/add");
        }}
      >
        <Plus />
      </Button>
    );
  }, [navigate]);

  useEffect(() => {
    setConfig({
      title: "My Notebook",
      isBorderBottom: false,
    });
  }, [setConfig, AddButton]);

  if (notes.isLoading) return <SkeletonCard />;
  if (notes.isError || !Array.isArray(notes.data)) {
    return (
      <div className="text-center text-red-500 mt-8">
        Failed to load notes. Please try again.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3 max-w-6xl">
      <div className="mb-8">
        <NotesList notes={notes.data} />
      </div>
    </div>
  );
}

export default NotesPage;
