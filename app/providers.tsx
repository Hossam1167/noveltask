"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { displayFontMapper, defaultFontMapper } from "@/styles/fonts";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";

export const AppContext = createContext<{
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
  selectedText: string;
  setSelectedText: Dispatch<SetStateAction<string>>;
}>({
  font: "Default",
  setFont: () => {},
  selectedText: "",
  setSelectedText: () => {},
});

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} />;
};

export default function Providers({ children }: { children: ReactNode }) {
  const [font, setFont] = useLocalStorage<string>("novel__font", "Default");
  const [selectedText, setSelectedText] = useState<string>();

  return (
    <ThemeProvider
      attribute="class"
      value={{
        light: "light-theme",
        dark: "dark-theme",
      }}
    >
      <AppContext.Provider
        value={{
          font,
          setFont,
          selectedText,
          setSelectedText,
        }}
      >
        <ToasterProvider />
        <div className={cn(displayFontMapper[font], defaultFontMapper[font])}>
          {children}
        </div>
        <Analytics />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
