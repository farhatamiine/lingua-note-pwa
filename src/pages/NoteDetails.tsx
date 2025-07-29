import { NoteExampleItem } from "@/components/shared/NoteExampleItem";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Button } from "@/components/ui/button";
import { useAppBar } from "@/context/AppBarContext";
import { useNoteBySlug } from "@/features/notes/useNotes";
import { NotebookPen, Trash, Volume2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

function NoteDetailsPage() {
  const params = useParams<{ noteSlug: string }>();

  const { setConfig } = useAppBar();
  const navigate = useNavigate();
  const note = useNoteBySlug(params.noteSlug || "");

  const RemoveNote = useMemo(() => {
    return (
      <Button
        variant={"destructive"}
        onClick={() => {
          navigate("/editor/add");
        }}
      >
        <Trash />
      </Button>
    );
  }, [navigate]);

  useEffect(() => {
    setConfig({
      leftContent: <NotebookPen />,
      title: "My Notes",
      rightContent: RemoveNote,
    });
  }, [setConfig, RemoveNote]);

  if (note.isLoading) return <SkeletonCard />;
  if (note.isError || !note.data) {
    return (
      <div className="text-center text-red-500 mt-8">
        Failed to load notes. Please try again.
      </div>
    );
  }

  const currentNote = note.data;

  return (
    <section className="container">
      <div className="p-5">
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-5">
          Word
        </h2>
        <div className="space-y-5">
          <div className="flex w-full justify-between items-center">
            <div>
              <p className="font-medium">{currentNote.learningText}</p>
              <small className="text-gray-500 font-medium">Darija</small>
            </div>
            <Button variant={"outline"}>
              <Volume2 />
            </Button>
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              <p className="font-medium">{currentNote.nativeText}</p>
              <small className="text-gray-500 font-medium">French</small>
            </div>
            <Button variant={"outline"}>
              <Volume2 />
            </Button>
          </div>
        </div>
      </div>
      <div className=" p-5">
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight my-5">
          Examples
        </h2>
        <div className="overflow-y-scroll h-[300px]">
          {currentNote.NoteExample?.map((notexample) => {
            return (
              <NoteExampleItem
                key={notexample.id}
                nativeText={notexample.native}
                learningText={notexample.learning}
                languageLabel="Darija"
                onPlay={() => {
                  // optional play logic here (e.g., play audio)
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
