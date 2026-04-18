"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggleDefault({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("border border-bluelight-1/50 rounded-full p-2 backdrop-blur-sm opacity-50", className)}>
        <Sun size={30} color="var(--color-bluelight-1)" />
      </div>
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div
      onClick={toggleTheme}
      className={cn("border border-bluelight-1/50 rounded-full p-2 backdrop-blur-sm hover:bg-bluelight-1/10 cursor-pointer", className)}
    >
      {isDark ? <Sun size={30} color="var(--color-bluelight-1)" /> : <Moon size={30} color="var(--color-bluelight-1)" />}
    </div>
  );
}