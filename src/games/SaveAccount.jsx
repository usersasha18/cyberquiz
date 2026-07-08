import { useState } from "react";
import { useRouter } from "../routerContext.js";
import SaveAccountData from "./logic/SaveAccountData.js";
import definitions from "./logic/definitions.js";

export default function SaveAccount() {
    const { navigate } = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [xp, setXp] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const question = SaveAccountData[currentQuestion];

    const handleSelect = (index) => {
        if (isAnswered) return;
        setSelectedIndex(index);
    }

    const handleSubmit = () => {
        if (selectedIndex === null) return; 
        setIsAnswered(true);

        const correctIndex = (question.correct || 1) - 1; // data is 1-based
        const isCorrect = selectedIndex === correctIndex;

        // Compute new score/xp locally so we can save them before navigation
        const newScore = isCorrect ? score + 1 : score;
        const deltaXp = isCorrect ? 100 : -50;
        const newXp = xp + deltaXp;

        setScore(newScore);
        setXp(newXp);

        // показаем результат и переходим к следующему вопросу через паузу
        setTimeout(() => {
            if (currentQuestion < SaveAccountData.length - 1) {
                setCurrentQuestion((q) => q + 1);
                setSelectedIndex(null);
                setIsAnswered(false);
                setShowHint(false);
            } else {
                // Сохраняем результат в localStorage для страницы финала
                const rawPlayer = localStorage.getItem('playerData');
                let playerName = 'Игрок';
                if (rawPlayer) {
                    try {
                        const pd = JSON.parse(rawPlayer);
                        playerName = `${pd.firstName || ''} ${pd.lastName || ''}`.trim() || 'Игрок';
                    } catch (e) {
                        return e.error()
                    }
                }

                const result = {
                    name: playerName,
                    correct: newScore,
                    total: SaveAccountData.length,
                    xp: newXp
                };

                localStorage.setItem('lastGameResult', JSON.stringify(result));

                // Отмечаем, что тест "Спаси аккаунт" пройден
                localStorage.setItem('saveAccountCompleted', 'true');

                // переход на финальную страницу
                navigate("/final");
            }
        }, 700);
    }

    return (
        <main className="relative min-h-screen overflow-hidden">
            <div className="theme-page-gradient absolute inset-0 -z-10 rotate-[135deg] scale-[4] transition-colors"></div>
            <div className="relative min-h-screen flex flex-col pt-[30px] pb-[50px]">
                <div className="w-4/5 max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate("/choose-game")}
                        className="mb-[30px] theme-primary-text font-bold italic text-[20px] hover:opacity-70 transition"
                    >
                        ← Назад
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
                        {/* блок прогесс бара>*/}
                        <div className="lg:col-span-3">
                            <div className="theme-surface border-[3px] rounded-3xl px-[30px] py-[25px] transition-colors">
                                <div className="flex items-center justify-between gap-[40px]">
                                    {/* Навание*/}
                                    <h1 className="theme-primary-text text-[28px] font-black italic flex-shrink-0">
                                        Спаси аккаунт
                                    </h1>
                                    <div className="flex-grow">
                                        <div className="flex justify-between mb-[8px]">
                                            <span className="theme-muted-text font-bold text-[12px]">Вопрос {currentQuestion + 1} из {SaveAccountData.length}</span>
                                            <span className="theme-muted-text font-bold text-[12px]">{Math.round(((currentQuestion + 1) / SaveAccountData.length) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-[var(--theme-toggle-bg)] rounded-full h-[12px] border-[2px] border-[var(--theme-border)] overflow-hidden">
                                            <div
                                                className="rainbow-fill h-full transition-all"
                                                style={{ width: `${((currentQuestion + 1) / SaveAccountData.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* XP */}
                                    <div className="flex-shrink-0 flex items-center gap-[10px]">
                                        <span className="theme-muted-text font-bold text-[16px]">XP:</span>
                                        <div className="theme-badge px-[16px] py-[8px] rounded-full font-black italic border-[2px] text-[18px]">
                                            {xp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="theme-surface border-[3px] rounded-3xl px-[40px] py-[40px] transition-colors min-h-[600px]">
                                <h2 className="theme-primary-text text-[44px] font-black italic mb-[25px]">
                                    {question.question}
                                </h2>
                                <p className="theme-primary-text text-[28px] font-black italic mb-[40px]">
                                    {question.text}
                                </p>
                                <div className="space-y-[15px]">
                                    {question.answers.map((answer, index) => {
                                        const correctIndex = (question.correct || 1) - 1;
                                        let extra = "";
                                        if (isAnswered) {
                                            if (index === correctIndex) extra = "!border-green-500 !bg-green-500 !text-white";
                                            else if (index === selectedIndex && selectedIndex !== correctIndex) extra = "border-red-500 bg-red-500 !text-white ";
                                        } else if (index === selectedIndex) {
                                            extra = "border-[var(--theme-primary)]";
                                        }

                                        return (
                                            <button 
                                                key={index}
                                                onClick={() => handleSelect(index)}
                                                className={`w-full theme-surface border-[3px] border-[var(--theme-border)] rounded-2xl px-[25px] py-[18px] text-left font-bold text-[16px] hover:border-[var(--theme-primary)] hover:scale-105 transition theme-muted-text italic ${extra}`}
                                            >
                                                {answer}
                                            </button>
                                        )
                                    })}
                                </div>

                                {/* Кнопки подсказки и ответить */}
                                <div className="flex justify-between items-center mt-[40px]">
                                    <button onClick={handleSubmit} className="inline-flex justify-center items-center gap-3 py-1 rounded-full theme-button font-bold italic text-[20px] hover:scale-105 transition outline outline-[5px] outline-offset-4 px-[40px]">
                                        Ответить
                                    </button>
                                    <div>
                                        <button onClick={() => setShowHint((s) => !s)} className="flex items-center gap-[8px] theme-primary-text font-bold italic text-[18px] hover:opacity-70 transition">
                                            💡 Подсказка
                                        </button>
                                        {showHint && (
                                            <div className="mt-3 theme-surface border-[2px] border-[var(--theme-border)] rounded-xl p-3 text-[14px] theme-muted-text">
                                                Подумай про отправителя, ссылку и срочность сообщения.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="theme-surface border-[3px] rounded-3xl px-[30px] py-[30px] transition-colors">
                                <div className="space-y-[20px]">
                                    {definitions.map((def, index) => (
                                        <div key={index}>
                                            <h3 className="theme-primary-text text-[16px] font-black italic mb-[8px]">
                                                {def.title}
                                            </h3>
                                            <p className="theme-muted-text text-[13px] font-extrabold leading-[18px]">
                                                {def.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
    )
}