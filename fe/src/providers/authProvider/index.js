import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setUpdateAuthUser] = useState(null);

  const setAuthUser = async (user) => {
    setUpdateAuthUser(user);
  };

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("authUser"));
    if (userLocal) {
      setAuthUser(userLocal);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
