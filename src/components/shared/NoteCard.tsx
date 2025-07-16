import { Note } from "@/types";
import { Badge } from "../ui/badge";
import { BookOpen, FileText, MessageSquare, Zap } from "lucide-react";


const typeIcons = {
  word: BookOpen,
  phrase: MessageSquare,
  sentence: FileText,
  grammar: Zap,
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
}
function NoteCard({ note }: { note: Note }) {

  const Icon = typeIcons[note.noteType as keyof typeof typeIcons]
  return (
    <div key={note.id} className="bg-card border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-medium truncate">{note.learningText}</h3>
            <Badge variant="outline" className="text-xs capitalize">
              {note.noteType}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{note.nativeText}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {note.difficulty && (
              <Badge className={`text-xs ${difficultyColors[note.difficulty]}`}>{note.difficulty}</Badge>
            )}
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
