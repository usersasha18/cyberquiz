import ThemeToggle from "./ui/ThemeToggle";
import { Link } from "../router.jsx";
import { useRouter } from "../routerContext.js";

export default function Header() {
  const { navigate } = useRouter();

  const handleLogout = () => {
    // Очищаем данные игрока
    localStorage.removeItem('playerData');
    // Перенаправляем на страницу выбора игр
    navigate("/choose-game");
  };

  return (
    <header className="theme-header absolute z-50 w-full border-b border-b-[3px] px-6 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-colors">
      <div className="w-4/5 mx-auto flex items-center justify-between">
        <Link to="/" className="theme-primary-text font-bold italic text-[40px] transition-colors">
          КиберКвест
        </Link>
        <nav className="flex items-center gap-[30px]">
          {localStorage.getItem('playerData') && (
            <button
              onClick={handleLogout}
              className="theme-primary-text font-bold italic text-[16px] hover:opacity-70 transition"
            >
              Выход
            </button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
