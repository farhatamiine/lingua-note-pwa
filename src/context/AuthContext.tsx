import { supabase } from "@/lib/supabaseClient";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  signUpNewUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: User; error?: AuthError }>;

  signInUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: User; error?: AuthError }>;

  session: Session | undefined | null;

  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | undefined | null>(undefined);

  // Sign up
  const signUpNewUser = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; data?: User; error?: AuthError }> => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data: data.user ?? undefined };
  };

  const signInUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data: data.user };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null); // ✅ use null, not undefined
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null); // ✅ again, null not undefined
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signUpNewUser, signInUser, session, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
