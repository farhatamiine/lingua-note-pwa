import { supabase } from "@/lib/supabaseClient";
import { Note } from "@/types";
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
    mutationFn: async (newNote: Note) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: Notes, error } = await supabase
        .from("Notes")
        .insert([])
        .select("*")
        .eq("user_id", user?.id);
      if (error) {
        return error;
      }
      return Notes;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      }),
  });
};
