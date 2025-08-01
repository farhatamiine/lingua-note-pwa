import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { Note } from "@/types";
import { useMemo } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useSavedCategories = (notes: Note[] | undefined) => {
  return useMemo(() => {
    if (!notes) {
      return [];
    }
    const counts: Record<string, number> = {};

    notes
      .filter((note) => note.category)
      .forEach((note) => {
        counts[note.category] = (counts[note.category] || 0) + 1;
      });

    const distinctWithCount = Object.entries(counts).map(([label, count]) => ({
      label,
      count,
    }));

    return distinctWithCount;
  }, [notes]);
};
