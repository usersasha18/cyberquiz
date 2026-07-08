import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Button from "../components/ui/Button.jsx";
import HomeImage from '../assets/home.svg';
import { createConfetti } from "../games/logic/confetti.js";

// Сохраняет уникальное имя ученика, прошедшего тест
const recordStudent = (name) => {
    if (!name || name === 'Игрок') return;
    try {
        const raw = localStorage.getItem('completedStudents');
        const students = raw ? JSON.parse(raw) : [];
        // Проверяем по имени и фамилии (без учёта регистра)
        const exists = students.some(
            (s) => s.trim().toLowerCase() === name.trim().toLowerCase()
        );
        if (!exists) {
            students.push(name);
            localStorage.setItem('completedStudents', JSON.stringify(students));
        }
    } catch (e) {
        // ignore
    }
};

export default function FinalPage() {
    const [result, setResult] = useState({ name: 'Игрок', xp: 0, correct: 0, total: 0, score: 0 });

    useEffect(() => {
        // Запускаем конфети
        createConfetti();

        // Загружаем результат из localStorage
        try {
            const raw = localStorage.getItem('lastGameResult');
            const rawPlayer = localStorage.getItem('playerData');
            let playerName = 'Игрок';
            if (rawPlayer) {
                const pd = JSON.parse(rawPlayer);
                playerName = `${pd.firstName || ''} ${pd.lastName || ''}`.trim() || 'Игрок';
            }
            if (raw) {
                const r = JSON.parse(raw);
                const finalName = r.name || playerName;
                setResult({
                    name: finalName,
                    xp: typeof r.xp === 'number' ? r.xp : 0,
                    correct: typeof r.correct === 'number' ? r.correct : 0,
                    total: typeof r.total === 'number' ? r.total : 0,
                });
                // Записываем ученика в список прошедших
                recordStudent(finalName);
            } else {
                setResult((s) => ({ ...s, name: playerName }));
                recordStudent(playerName);
            }
        } catch (e) {
            // ignore parse errors
            return e.error()
        }
    }, []);

    const levelFromXp = (xp) => {
        if (xp >= 1500) return 'Легенда';
        if (xp >= 1000) return 'Эксперт';
        if (xp >= 500) return 'Продвинутый';
        return 'Начинающий';
    }

    const percent = result.total ? Math.round((result.correct / result.total) * 100) : 0;

    return (
        <>
            <div className="confetti-container fixed inset-0 pointer-events-none"></div>
            <Header />
            <main className="theme-page-gradient min-h-screen flex flex-col items-center justify-center gap-10 px-6 pt-32 pb-12">
                <div className=" text-center">
                    <h1 className="theme-primary-text text-[69px] font-black italic transition-colors leading-8">
                        Поздравляю!
                    </h1>
                    <p className="theme-primary-text text-[50px] font-light italic transition-colors">Ты успешно прошел тест</p>
                </div>
                <div className="w-4/5 max-w-[1200px] grid grid-cols-[0.8fr_1.2fr] gap-10 items-stretch">
                    <div className="theme-surface border-[3px] rounded-3xl p-10 flex flex-col items-center justify-center gap-8 transition-colors">
                        <div className="w-[180px] h-[180px] rounded-full border-[5px] border-[var(--theme-border)] bg-[var(--theme-badge-bg)] flex items-center justify-center transition-colors">
                            <div className="theme-primary-text text-[64px] font-black italic">
                                {result.name ? result.name[0].toUpperCase() : 'A'}
                            </div>
                        </div>
                        <h2 className="theme-primary-text text-[34px] font-black italic text-center leading-[40px] transition-colors">
                            {result.name}
                        </h2>
                    </div>
                    <div className="theme-surface border-[3px] rounded-3xl p-10 flex flex-col gap-8 transition-colors">
                        <h2 className="theme-primary-text text-[40px] font-black italic leading-[46px] transition-colors">
                            Результаты тестирования
                        </h2>
                        <div className="overflow-hidden rounded-2xl border-[3px] border-[var(--theme-border)] transition-colors">
                            {/* Радужный бар прогресса */}
                            <div className="w-full p-3 bg-[var(--theme-toggle-bg)] rounded-t-2xl">
                                <div className="h-[18px] rounded-xl overflow-hidden border-[2px] border-[var(--theme-border)]">
                                    <div className="rainbow-fill h-full" style={{width: `${percent}%`}}></div>
                                </div>
                            </div>

                            <div className="p-4">
                                <table className="w-full border-collapse">
                                    <tbody>
                                    <tr className="border-b-[3px] border-[var(--theme-border)]">
                                        <td className="theme-muted-text border-r-[3px] border-[var(--theme-border)] p-5 text-[22px] font-extrabold transition-colors">
                                            <span>XP</span>
                                        </td>
                                        <td className="theme-primary-text p-5 text-[22px] font-black transition-colors">
                                            <span>{result.xp}</span>
                                        </td>
                                    </tr>

                                    <tr className="border-b-[3px] border-[var(--theme-border)]">
                                        <td className="theme-muted-text border-r-[3px] border-[var(--theme-border)] p-5 text-[22px] font-extrabold transition-colors">
                                            <span>Итоговый уровень</span>
                                        </td>
                                        <td className="theme-primary-text p-5 text-[22px] font-black transition-colors">
                                            <span>{levelFromXp(result.xp)}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="theme-muted-text border-r-[3px] border-[var(--theme-border)] p-5 text-[22px] font-extrabold transition-colors">
                                            <span>Правильные ответы</span>
                                        </td>
                                        <td className="theme-primary-text p-5 text-[22px] font-black transition-colors">
                                            <span>{result.correct} из {result.total}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Button title="Перейти на главную" to="/" img={HomeImage} />
                    </div>
                </div>
            </main>
        </>
    )
}

//  Сделать логику прохождения теста, набор очков и переход на последнюю страницу после прохождения теста.
// Вять UI из старого проекта для набора очков и прогресс бара
// Внести изменения для игры шифруемся, поменять содержимое теста
