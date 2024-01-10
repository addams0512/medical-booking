import React, { createContext, useContext } from "react";
import type { AppContext } from "../lib/definitions";
import { Toaster } from "sonner";
import { useQuery } from "react-query";
import { validateToken } from "../lib/action";

// TODO: create a customhook  useAppContext with a value
//       of type AppContext

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery("validateToken", validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
      }}
    >
      <Toaster richColors />
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context as AppContext;
};
