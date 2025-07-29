"use client";

import { Volume2 } from "lucide-react";
import { Button } from "../ui/button";

interface NoteExampleItemProps {
  nativeText: string;
  learningText: string;
  languageLabel?: string;
  onPlay?: () => void;
}

export function NoteExampleItem({
  nativeText,
  learningText,
  languageLabel = "Darija",
  onPlay,
}: NoteExampleItemProps) {
  return (
    <div className="flex w-full justify-between items-center my-2">
      <div>
        <p className="font-medium">{nativeText}</p>
        <p className="text-gray-500 font-sans text-sm">{learningText}</p>
        <small className="text-green-600 font-bold text-xs">
          {languageLabel}
        </small>
      </div>
      <Button variant="outline" onClick={onPlay}>
        <Volume2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
