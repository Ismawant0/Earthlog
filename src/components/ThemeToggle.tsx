"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ThemeToggle({ className, style }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") document.documentElement.classList.add("dark");
    } else if (systemDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    // Trigger the rotation animation
    setRotating(true);

    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Reset rotation after animation completes
    setTimeout(() => setRotating(false), 400);
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className={className || "interactive p-2 rounded-full border cursor-pointer flex items-center justify-center w-9 h-9"}
      style={style}
      aria-label="Toggle theme"
    >
      <span
        className="inline-block transition-all duration-[400ms]"
        style={{
          transform: rotating ? "rotate(180deg)" : "rotate(0deg)",
          transitionTimingFunction: "var(--joy-bezier, cubic-bezier(0.34, 1.56, 0.64, 1))",
        }}
      >
        {theme === "light" ? (
          <Sun className="h-4 w-4" style={{ color: "var(--accent-light)" }} />
        ) : (
          <Moon className="h-4 w-4" style={{ color: "var(--primary)" }} />
        )}
      </span>
    </button>
  );
}
