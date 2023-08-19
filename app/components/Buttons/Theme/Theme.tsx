"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Icon from "../../Icon/Icon";

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="bg-grey100 dark:bg-slate700 p-4 rounded-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Icon iconVariant="sun" />
      ) : (
        <Icon iconVariant="moon" />
      )}
    </button>
  );
}
