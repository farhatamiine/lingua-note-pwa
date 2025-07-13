import { Note } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

function NoteCard({ note }: { note: Note }) {
  const getReviewStatus = (note: Note) => {
    if (note.reviewCount === 0) return "New";
    if (note.nextReviewAt && new Date(note.nextReviewAt) < new Date())
      return "Due";
    return "Reviewed";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Due":
        return "bg-red-100 text-red-800";
      case "Reviewed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      data-testid="note-card"
      key={note.id}
      className="hover:shadow-md transition-shadow cursor-pointer"
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Main content */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate">
                {note.nativeText}
              </h3>
              <p
                className="text-lg font-medium text-primary truncate"
                dir="rtl"
              >
                {note.learningText}
              </p>
              <p className="text-xs text-muted-foreground italic">
                /{note.pronunciation}/
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 ml-2">
              <Badge variant="outline" className="text-xs capitalize">
                {note.noteType}
              </Badge>
              <Badge
                className={`text-xs ${getReviewStatusColor(
                  getReviewStatus(note)
                )}`}
              >
                {getReviewStatus(note)}
              </Badge>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0"
              >
                {tag}
              </Badge>
            ))}
            {note.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0">
                +{note.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Footer info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>{note.reviewCount} reviews</span>
            <span>{formatDate(note.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoteCard;
