import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    async (currentUser) => {

      setUser(currentUser);

      if (currentUser) {

        try {

          const response = await fetch(
            `https://sypsy-ia-mayo26-frontend-backend.onrender.com/api/users/${currentUser.uid}`
          );

          const data = await response.json();

          setProfile(data);

        } catch (error) {

          console.error(
            "Error obteniendo perfil:",
            error
          );

        }

      } else {

        setProfile(null);

      }

      setLoading(false);

    }
  );

  return () => unsubscribe();

}, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        logout,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 🔥 IMPORTANTE: hook seguro para evitar errores futuros
export const useAuth = () => useContext(AuthContext);