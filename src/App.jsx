import HomePage from "./pages/HomePage.jsx";
import ChooseGame from "./pages/ChooseGame.jsx";
import GamePages from "./pages/GamePages.jsx";
import FinalPage from "./pages/FinalPage.jsx";
import { Router } from "./router.jsx";
import { useRouter } from "./routerContext.js";

function AppRoutes() {
  const { path } = useRouter();

  // Проверяем точные маршруты первыми
  if (path === "/") return <HomePage />;
  if (path === "/choose-game") return <ChooseGame />;
  if (path === "/final") return <FinalPage />;
  
  // Проверяем динамические маршруты (типа /game/save-account)
  if (path.startsWith("/game/")) return <GamePages />;
  
  // По умолчанию возвращаем главную страницу
  return <HomePage />;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
