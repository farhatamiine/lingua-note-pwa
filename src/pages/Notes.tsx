import NotesList from "@/components/shared/NotesList";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Button } from "@/components/ui/button";
import { useAppBar } from "@/context/AppBarContext";
import { setModalContent, setModalOpen } from "@/features/notes/notesSlice";
import { useNotes } from "@/features/notes/useNotes";
import { Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

function NotesPage() {
  const { setConfig } = useAppBar();
  const dispatch = useDispatch();
  const notes = useNotes();

  const AddButton = useMemo(() => {
    return (
      <Button
        variant={"ghost"}
        onClick={() => {
          dispatch(setModalOpen(true));
          dispatch(setModalContent("add"));
        }}
      >
        <Plus />
      </Button>
    );
  }, [dispatch]);

  useEffect(() => {
    setConfig({
      title: "My Notes",
      rightContent: AddButton,
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
