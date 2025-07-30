import { NoteExampleItem } from "@/components/shared/NoteExampleItem";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { WordCard } from "@/components/shared/WordCard";
import { Button } from "@/components/ui/button";
import { useAppBar } from "@/context/AppBarContext";
import { useDeleteNote, useNoteBySlug } from "@/features/notes/useNotes";
import { Note } from "@/types";
import {
  ArrowLeft,
  EllipsisVertical,
  Pencil,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
function NoteDetailsPage() {
  const params = useParams<{ noteSlug: string }>();

  const { setConfig } = useAppBar();
  const deleteNoteQuery = useDeleteNote();
  const navigate = useNavigate();
  const note = useNoteBySlug(params.noteSlug || "");
  const currentNote = note.data;

  const ReturnHome = useMemo(
    () => (
      <Button
        variant={"ghost"}
        onClick={() => {
          navigate("/");
        }}
      >
        <ArrowLeft />
      </Button>
    ),
    [navigate]
  );

  const deleteNote = useCallback(() => {
    if (params.noteSlug) {
      deleteNoteQuery.mutateAsync(params.noteSlug).then(() => navigate("/"));
    }
  }, [params?.noteSlug, deleteNoteQuery, navigate]);

  useEffect(() => {
    setConfig({
      leftContent: ReturnHome,
      title: "Note Details",
      rightContent: null,
    });
  }, [setConfig, ReturnHome]);

  if (note.isLoading) return <SkeletonCard />;
  if (note.isError || !note.data) {
    return (
      <div className="text-center text-red-500 mt-8">
        Failed to load notes. Please try again.
      </div>
    );
  }

  return (
    <section className="container relative">
      <div className="p-5 ">
        <div className="flex justify-between items-center mb-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight ">
            Word
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="outline-0">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10" align="end">
              <DropdownMenuItem className="font-medium">
                <Pencil /> Edit Note
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={deleteNote}>
                <Trash color="red" /> Delete Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <WordCard note={currentNote || ({} as Note)} />
      </div>
      <div className=" p-5">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight my-5">
            Examples
          </h2>
          <Button variant={"outline"}>
            <PlusIcon />
          </Button>
        </div>
        <div className="overflow-y-scroll h-[300px]">
          {currentNote?.NoteExample?.map((notexample) => {
            return (
              <NoteExampleItem
                key={notexample.id}
                nativeText={notexample.native}
                learningText={notexample.learning}
                languageLabel="Darija"
                onPlay={() => {
                  console.log("Play audio");
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NoteDetailsPage;
