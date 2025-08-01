import CategorieList from "@/components/shared/CategorieList";
import { WithBottomNavPadding } from "@/components/ui/WithBottomNavPadding";
import { useAppBar } from "@/context/AppBarContext";
import { useNotes } from "@/features/notes/useNotes";
import { useSavedCategories } from "@/hooks/hooks";
import { useEffect } from "react";
function NoteBookPage() {
  const { setConfig } = useAppBar();
  const { data: notes, error, isLoading, isPending } = useNotes();

  const savedCategories = useSavedCategories(notes);

  useEffect(() => {
    setConfig({
      title: "My Notebook",
      isBorderBottom: true,
    });
  }, [setConfig]);

  if (isLoading || isPending) {
    return (
      <div className="p-4 text-muted-foreground">Loading saved notes...</div>
    );
  }

  // ✅ Early return for error state
  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading notes: {error.message}
      </div>
    );
  }

  // ✅ Early return if no data
  if (!notes || notes.length === 0) {
    return (
      <div className="p-4 text-muted-foreground">No saved notes found.</div>
    );
  }

  return (
    <div className="container mx-auto p-3 max-w-6xl overflow-y-auto bg-gray-50">
      <h2 className="pb-2 text-xl font-medium tracking-tight first:mt-0">
        Categories
      </h2>
      <div className="h-[calc(100vh-8rem)] overflow-y-auto">
        <WithBottomNavPadding>
          <CategorieList
            categories={savedCategories}
            onCategoryClick={(category) => console.log("Clicked:", category)}
          />
        </WithBottomNavPadding>
      </div>
    </div>
  );
}

export default NoteBookPage;
