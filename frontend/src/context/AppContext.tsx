import React, { createContext, useContext, useState } from "react";
import type { AppContext, MessageToast } from "../lib/definitions";
import { Toaster } from "sonner";

// TODO: create a customhook  useAppContext with a value
//       of type AppContext

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<MessageToast | undefined>(undefined);
  console.log({ toast });
  return (
    <AppContext.Provider
      value={{
        showToast: (messageToast) => {
          setToast(messageToast);
        },
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
