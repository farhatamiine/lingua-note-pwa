import { Button } from "@/components/ui/button";
import { Speech, Volume2 } from "lucide-react";
import { Note } from "@/types";

interface WordCardProps {
  note: Note;
}

export const WordCard = ({ note }: WordCardProps) => {
  return (
    <div className="space-y-5">
      <div className="flex w-full justify-between items-center bg-[#f9fafb] rounded-xl p-5">
        <div className="w-full">
          <p className="font-bold text-xl rubik">{note.learningText}</p>
          <div className="flex items-center  text-sm text-gray-600 mt-2">
            <Speech size={21} className="mr-2" />
            <span className="font-light"> {note.pronunciation}</span>
          </div>
        </div>
        <Button variant="outline">
          <Volume2 />
        </Button>
      </div>

      <div className="flex w-full justify-between items-center bg-[#f9fafb] rounded-xl p-5">
        <div>
          <p className="font-bold text-xl">{note.nativeText}</p>
        </div>
      </div>
    </div>
  );
};
