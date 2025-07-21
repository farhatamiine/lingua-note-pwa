import { supabase } from "@/lib/supabaseClient";
import { InsertNoteFormData } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: Notes, error } = await supabase
        .from("Notes")
        .select("*")
        .eq("user_id", user?.id);
      if (error) {
        return error;
      }
      return Notes;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newNote: InsertNoteFormData) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log(newNote);

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      const noteData = {
        ...newNote,
        user_id: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("Notes")
        .insert([noteData])
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: (error) => {
      console.error("Error adding note:", error);
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: InsertNoteFormData & { id: string }) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      const noteData = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("Notes")
        .update(noteData)
        .eq("id", id)
        .eq("user_id", user.id)
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: (error) => {
      console.error("Error updating note:", error);
    },
  });
};
