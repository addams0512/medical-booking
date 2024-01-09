import React, { createContext, useContext, useEffect, useState } from "react";
import type { AppContext, MessageToast } from "../lib/definitions";
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
  const [toast, setToast] = useState<MessageToast | undefined>(undefined);
  useEffect(() => {
    console.log({ toast });
  }, [toast, setToast]);

  const { isError } = useQuery("validateToken", validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (messageToast) => {
          setToast(messageToast);
        },
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
