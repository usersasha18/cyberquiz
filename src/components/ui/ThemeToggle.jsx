
import { useEffect, useState } from "react";
import themeToggle from "../../assets/themeButton.svg";

const applyTheme = (isDark) => {
  document.documentElement.classList.toggle("dark", isDark);
};

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    applyTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleClick = () => {
    setIsDark((currentTheme) => {
      const nextTheme = !currentTheme;

      applyTheme(nextTheme);

      return nextTheme;
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Включить светлую тему" : "Включить темную тему"}
      className="theme-toggle py-2 px-2 text-center rounded-lg border-[3px] transition hover:scale-105"
    >
      <img className="w-[2rem] h-[2rem]" src={themeToggle} alt="" />
    </button>
  );
}
