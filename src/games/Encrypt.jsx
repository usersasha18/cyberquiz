import { useState } from "react";
import { useRouter } from "../routerContext.js";
import EncryptData from "./logic/EncryptData.js";
import definitions from "./logic/definitions.js";

const ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

// Шифр Цезаря: сдвиг алфавита на shift позиций
const caesarCipher = (letter, shift) => {
    const index = ALPHABET.indexOf(letter.toUpperCase());
    if (index === -1) return letter;
    const newIndex = (index + shift + ALPHABET.length) % ALPHABET.length;
    return ALPHABET[newIndex];
};

const encryptString = (str, shift) => {
    return str.split("").map(char => caesarCipher(char, shift)).join("");
};

export default function Encrypt() {
    const { navigate } = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [xp, setXp] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [mode, setMode] = useState("encrypt"); // "encrypt" или "decrypt"
    const [shift, setShift] = useState(3);
    const [hoveredLetter, setHoveredLetter] = useState(null);

    const question = EncryptData[currentQuestion];
    const isChoice = question.type === "choice";

    const handleSubmit = () => {
        if (isChoice && selectedIndex === null) return;
        if (!isChoice && userAnswer.trim() === "") return;

        setIsAnswered(true);

        const isCorrect = isChoice
            ? selectedIndex === (question.correct || 0)
            : userAnswer.trim().toUpperCase() === question.correctAnswer.trim().toUpperCase();
        const deltaXp = isCorrect ? 100 : -50;
        const newXp = xp + deltaXp;
        const newScore = isCorrect ? score + 1 : score;
        setScore(newScore);
        setXp(newXp);

        setTimeout(() => {
            if (currentQuestion < EncryptData.length - 1) {
                setCurrentQuestion((q) => q + 1);
                setSelectedIndex(null);
                setUserAnswer("");
                setIsAnswered(false);
                setShowHint(false);
            } else {
                const rawPlayer = localStorage.getItem('playerData');
                let playerName = 'Игрок';
                if (rawPlayer) {
                    try {
                        const pd = JSON.parse(rawPlayer);
                        playerName = `${pd.firstName || ''} ${pd.lastName || ''}`.trim() || 'Игрок';
                    } catch (e) {
                        return e.error();
                    }
                }

                const result = {
                    name: playerName,
                    correct: newScore,
                    total: EncryptData.length,
                    xp: newXp
                };

                localStorage.setItem('lastGameResult', JSON.stringify(result));
                navigate("/final");
            }
        }, 700);
    };


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
                                        Шифруемся
                                    </h1>
                                    <div className="flex-grow">
                                        <div className="flex justify-between mb-[8px]">
                                            <span className="theme-muted-text font-bold text-[12px]">Вопрос {currentQuestion + 1} из {EncryptData.length}</span>
                                            <span className="theme-muted-text font-bold text-[12px]">{Math.round(((currentQuestion + 1) / EncryptData.length) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-[var(--theme-toggle-bg)] rounded-full h-[12px] border-[2px] border-[var(--theme-border)] overflow-hidden">
                                            <div
                                                className="rainbow-fill h-full transition-all"
                                                style={{ width: `${((currentQuestion + 1) / EncryptData.length) * 100}%` }}
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
                                    {isChoice ? (
                                        question.answers.map((answer, index) => {
                                            const correctIndex = question.correct || 0;
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
                                                    onClick={() => !isAnswered && setSelectedIndex(index)}
                                                    className={`w-full theme-surface border-[3px] border-[var(--theme-border)] rounded-2xl px-[25px] py-[18px] text-left font-bold text-[16px] hover:border-[var(--theme-primary)] hover:scale-105 transition theme-muted-text italic ${extra}`}
                                                >
                                                    {answer}
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <input
                                            type="text"
                                            value={userAnswer}
                                            onChange={(e) => !isAnswered && setUserAnswer(e.target.value)}
                                            disabled={isAnswered}
                                            placeholder="Введите зашифрованное слово..."
                                            className={`w-full px-[25px] py-[18px] border-[3px] rounded-2xl theme-surface theme-muted-text outline-none transition font-extrabold text-[16px] italic ${
                                                isAnswered
                                                    ? userAnswer.trim().toUpperCase() === question.correctAnswer.trim().toUpperCase()
                                                        ? "!border-green-500 !bg-green-500 !text-white"
                                                        : "!border-red-500 !bg-red-500 !text-white"
                                                    : "border-[var(--theme-border)] focus:border-[var(--theme-primary)]"
                                            }`}
                                        />
                                    )}
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
                                                Используй таблицу шифра Цезаря справа, чтобы расшифровать сообщение.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="theme-surface border-[3px] rounded-3xl px-[30px] py-[30px] transition-colors">
                                <div className="space-y-[20px]">
                                    <h3 className="theme-primary-text text-[22px] font-black italic">
                                        {mode === "encrypt" ? "Таблица шифрования" : "Таблица дешифровки"}
                                    </h3>

                                    {/* Выбор сдвига */}
                                    {/*
                                    <div className="flex items-center gap-[15px]">
                                        <label className="theme-muted-text font-bold text-[14px]">
                                            Сдвиг:
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="32"
                                            value={shift}
                                            onChange={(e) => setShift(Number(e.target.value))}
                                            className="flex-grow accent-[var(--theme-button)]"
                                        />
                                        <span className="theme-primary-text font-black italic text-[18px] w-[30px] text-center">
                                            {shift}
                                        </span>
                                    </div>
                                    */}

                                    {/* Кнопки переключения режима */}
                                    <div className="flex gap-[10px]">
                                        <button
                                            onClick={() => setMode("encrypt")}
                                            className={`flex-1 py-[10px] px-[15px] rounded-xl border-[2px] font-bold text-[14px] transition-all ${
                                                mode === "encrypt"
                                                    ? "border-[var(--theme-primary)] bg-[var(--theme-button)] text-[var(--theme-button-text)]"
                                                    : "border-[var(--theme-border)] theme-muted-text hover:border-[var(--theme-primary)]"
                                            }`}
                                        >
                                            Зашифровать
                                        </button>
                                        <button
                                            onClick={() => setMode("decrypt")}
                                            className={`flex-1 py-[10px] px-[15px] rounded-xl border-[2px] font-bold text-[14px] transition-all ${
                                                mode === "decrypt"
                                                    ? "border-[var(--theme-primary)] bg-[var(--theme-button)] text-[var(--theme-button-text)]"
                                                    : "border-[var(--theme-border)] theme-muted-text hover:border-[var(--theme-primary)]"
                                            }`}
                                        >
                                            Расшифровать
                                        </button>
                                    </div>

                                    {/* Подсказка при наведении */}
                                    <div className="theme-badge rounded-xl px-[16px] py-[12px] border-[2px] text-center min-h-[56px] flex items-center justify-center">
                                        {hoveredLetter ? (
                                            <span className="text-[18px] font-black italic">
                                                {mode === "encrypt"
                                                    ? `${hoveredLetter} - ${caesarCipher(hoveredLetter, shift)}`
                                                    : `${hoveredLetter} - ${caesarCipher(hoveredLetter, -shift)}`
                                                }
                                            </span>
                                        ) : (
                                            <span className="theme-muted-text text-[14px] font-bold">
                                                {mode === "encrypt" ? "Наведите для шифрования" : "Наведите для дешифровки"}
                                            </span>
                                        )}
                                    </div>

                                    {/* Сетка алфавита */}
                                    <div className="grid grid-cols-6 gap-[6px]">
                                        {ALPHABET.map((letter) => {
                                            const displayLetter = mode === "encrypt"
                                                ? letter
                                                : caesarCipher(letter, shift);
                                            return (
                                                <div
                                                    key={displayLetter}
                                                    onMouseEnter={() => setHoveredLetter(displayLetter)}
                                                    onMouseLeave={() => setHoveredLetter(null)}
                                                    className={`aspect-square flex items-center justify-center rounded-lg border-[2px] font-black italic text-[16px] cursor-pointer transition-all ${
                                                        hoveredLetter === displayLetter
                                                            ? "border-[var(--theme-primary)] bg-[var(--theme-button)] text-[var(--theme-button-text)] scale-110"
                                                            : "border-[var(--theme-border)] theme-muted-text hover:border-[var(--theme-primary)]"
                                                    }`}
                                                >
                                                    {displayLetter}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}