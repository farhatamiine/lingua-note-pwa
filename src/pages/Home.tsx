import NotesList from "@/components/shared/NotesList";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Button } from "@/components/ui/button";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { useAppBar } from "@/context/AppBarContext";
import { useNotes } from "@/features/notes/useNotes";
import { Notebook, Search } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
function HomePage() {
  const { setConfig } = useAppBar();
  const navigate = useNavigate();

  const notes = useNotes();

  const SearchButton = useMemo(() => {
    return (
      <Button variant={"ghost"} onClick={() => navigate("/search")}>
        <span className="sr-only">Search</span>
        <Search />
      </Button>
    );
  }, [navigate]);

  const addNewNote = () => {
    navigate("/editor/add");
  };

  useEffect(() => {
    setConfig({
      leftContent: <Notebook />,
      isBorderBottom: true,
      title: "Lingua Note",
      rightContent: SearchButton,
    });
  }, [setConfig, SearchButton]);

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
      <NotesList notes={notes.data} />
      <FloatingActionButton onClick={addNewNote} />
    </div>
  );
}

export default HomePage;
