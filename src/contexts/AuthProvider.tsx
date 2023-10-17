import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import { supabaseClient } from "../api/supabase-client";

const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
  id: string | undefined;
}>({ session: null, user: null, signOut: () => {}, id: undefined });

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [id, setId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();

      if (error) throw error;

      setSession(session);
      setUser(session?.user);
      setId(session?.user?.id);
      setLoading(false);
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        if (_event === "SIGNED_OUT") {
          localStorage.removeItem("user");
        }
        setSession(session);
        setUser(session?.user);
        setId(session?.user?.id);
        setLoading(false);
      },
    );
    setData();
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signOut: () => supabaseClient.auth.signOut(),
    id,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
