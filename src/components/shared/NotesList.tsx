import { Note } from "@/types";

import NoteCard from "./NoteCard";

function NotesList({ notes }: { notes: Note[] }) {
  return notes.map((note) => {
    return <NoteCard note={note} key={note.id} />;
  });
}

export default NotesList;
