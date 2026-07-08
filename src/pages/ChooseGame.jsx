import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import PlayerForm from "../components/PlayerForm.jsx";
import { useRouter } from "../routerContext.js";

export default function ChooseGame() {
    const [playerRegistered, setPlayerRegistered] = useState(() => {
        // Проверяем есть ли данные игрока в localStorage
        const savedData = localStorage.getItem('playerData');
        return !!savedData;
    });
    const [saveAccountCompleted, setSaveAccountCompleted] = useState(() => {
        return localStorage.getItem('saveAccountCompleted') === 'true';
    });
    const { navigate } = useRouter();

    const games = [
        {
            id: 1,
            title: "Спаси аккаунт",
            description: "Научись распозновать фишинговые сайты, мошенников",
            icon: "🎣",
            level: "Начальный",
            path: "/game/save-account"
        },
        {
            id: 2,
            title: "Шифуемся",
            description: "Создавай надежные пароли и защищай свои аккаунты",
            icon: "🔐",
            level: "Начальный",
            path: "/game/encrypt",
            locked: !saveAccountCompleted,
        },
    ];

    return (
        <>
            <Header />
            <main className="relative min-h-screen overflow-hidden">
                <div className="theme-page-gradient absolute inset-0 -z-10 rotate-[135deg] scale-[4] transition-colors"></div>
                <div className="relative min-h-screen flex flex-col items-center justify-center pt-[80px] pb-[50px]">
                    {!playerRegistered ? (
                        <div className="flex flex-col items-center justify-center flex-1">
                            <div className="w-4/5 max-w-3xl">
                                <h1 className="theme-primary-text text-[74px] font-black italic text-center mb-[40px] leading-[80px]">
                                    Начните свой путь
                                </h1>
                                <div className="theme-surface border-[3px] rounded-3xl px-[70px] py-[50px] transition-colors">
                                    <PlayerForm onRegister={() => {
                                        setPlayerRegistered(true);
                                    }} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-4/5 mx-auto">
                            <div className="flex justify-between items-center mb-[30px]">
                                <h1 className="theme-primary-text text-[74px] font-black italic leading-[80px]">
                                    Выберите квест
                                </h1>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('playerData');
                                        setPlayerRegistered(false);
                                    }}
                                    className="theme-primary-text font-bold italic text-[16px] hover:opacity-70 transition px-[20px] py-[10px] border-[2px] border-[var(--theme-primary)] rounded-lg"
                                >
                                    Новый игрок
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                                {games.map((game) => (
                                    <div
                                        key={game.id}
                                        className={`theme-surface border-[3px] rounded-3xl px-[40px] py-[35px] transition-colors ${
                                            game.locked
                                                ? 'opacity-50 cursor-not-allowed grayscale'
                                                : 'hover:scale-105 cursor-pointer group'
                                        }`}
                                    >
                                        <div className="text-[60px] mb-[15px]">{game.icon}</div>
                                        <h2 className="theme-primary-text text-[22px] font-black italic mb-[12px]">
                                            {game.title}
                                        </h2>
                                        <p className="theme-muted-text text-[14px] font-extrabold leading-[20px] mb-[25px]">
                                            {game.description}
                                        </p>
                                        <div className="flex justify-between items-center gap-3">
                                            <span className="theme-badge px-[15px] py-[6px] rounded-full text-[12px] font-bold border-[2px]">
                                                {game.level}
                                            </span>
                                            {game.locked ? (
                                                <span className="inline-flex justify-center items-center gap-2 py-1 rounded-full font-bold italic text-[16px] px-[30px] bg-gray-500 text-white cursor-not-allowed">
                                                    Закрыто
                                                </span>
                                            ) : (
                                                <button 
                                                    onClick={() => navigate(game.path)}
                                                    className="inline-flex justify-center items-center gap-2 py-1 rounded-full theme-button font-bold italic text-[16px] hover:scale-105 transition outline outline-[4px] outline-offset-2 px-[30px]"
                                                >
                                                    Начать
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
