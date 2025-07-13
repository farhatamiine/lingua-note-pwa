import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

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
