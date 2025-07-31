import { Note } from "@/types";

import NoteCard from "./NoteCard";

function NotesList({ notes }: { notes: Note[] }) {
  return (
    <div className="overflow-y-auto h-full space-y-4">
      {notes.map((note) => {
        return <NoteCard note={note} key={note.id} />;
      })}
    </div>
  );
}

export default NotesList;
