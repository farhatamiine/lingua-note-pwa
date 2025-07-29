import {
  Difficulty,
  InsertNoteFormData,
  insertNoteSchema,
  NoteType,
} from "@/schemas";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus, X, Mic, Loader2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import { FormError } from "../ui/FormError";

interface NoteFormProps {
  initialData?: Partial<InsertNoteFormData>;
  onSubmit: (data: InsertNoteFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

function NoteForm({ initialData, onSubmit, isLoading = false }: NoteFormProps) {
  const [newTag, setNewTag] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InsertNoteFormData>({
    resolver: zodResolver(insertNoteSchema),
    defaultValues: {
      nativeText: "",
      learningText: "",
      pronunciation: "",
      voiceUrl: "",
      noteType: "word",
      difficulty: "beginner",
      ...initialData,
      tags: initialData?.tags ?? [],
    },
  });

  const watchedTags = watch("tags") || [];
  const watchedNoteType = watch("noteType");
  const watchedDifficulty = watch("difficulty");

  const onFormSubmit = (data: InsertNoteFormData) => {
    onSubmit(data);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue("tags", [...watchedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove)
    );
  };
  return (
    <div className="p-5">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-4 animate-in fade-in slide-in-from-bottom-6"
      >
        <div className="space-y-1">
          <Label htmlFor="nativeText">Native Text *</Label>
          <Input
            id="nativeText"
            {...register("nativeText")}
            placeholder="Enter text in your native language"
            className={cn(errors.nativeText && "border-red-500")}
          />
          {errors.nativeText && (
            <FormError message={errors.nativeText.message} />
          )}
        </div>
        {/* Learning Text */}
        <div className="space-y-1">
          <Label htmlFor="learningText">Learning Text *</Label>
          <Input
            id="learningText"
            {...register("learningText")}
            placeholder="Enter text in the language you're learning"
            className={cn(errors.learningText && "border-red-500")}
          />
          {errors.learningText && (
            <FormError message={errors.learningText.message} />
          )}
        </div>
        {/* Pronunciation */}
        <div className="space-y-1">
          <Label htmlFor="pronunciation">Pronunciation</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="pronunciation"
              {...register("pronunciation")}
              placeholder="Enter pronunciation guide"
              className="flex-1  px-4 py-2"
            />
          </div>
        </div>
        {/* Voice URL */}
        <div className="space-y-1">
          <Label htmlFor="voiceUrl">Voice URL</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="voiceUrl"
              {...register("voiceUrl")}
              placeholder="https://example.com/audio.mp3"
              type="url"
              className={cn(errors.voiceUrl && "border-red-500")}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-muted"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          {errors.voiceUrl && <FormError message={errors.voiceUrl.message} />}
        </div>

        {/* Note Type */}
        <div className="space-y-1 w-full">
          <Label>Note Type *</Label>
          <Select
            value={watchedNoteType}
            onValueChange={(value: NoteType) => setValue("noteType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select note type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="word">Word</SelectItem>
              <SelectItem value="phrase">Phrase</SelectItem>
              <SelectItem value="sentence">Sentence</SelectItem>
              <SelectItem value="grammar">Grammar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div className="space-y-1 w-full">
          <Label>Difficulty Level</Label>
          <Select
            value={watchedDifficulty || ""}
            onValueChange={(value: Difficulty) => setValue("difficulty", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddTag}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {watchedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {watchedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-sm bg-muted text-muted-foreground"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90"
        >
          <Loader2Icon
            className={cn("animate-spin", {
              hidden: !isLoading,
              inline: isLoading,
            })}
          />
          Submit
        </Button>
      </form>
    </div>
  );
}

export default NoteForm;
