import {useState} from "react";

export default function PlayerForm({ onRegister }){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "Введите имя";
        if (!lastName.trim()) newErrors.lastName = "Введите фамилию";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const data = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            timestamp: new Date().toISOString()
        };

        // Сохраняем в localStorage
        localStorage.setItem('playerData', JSON.stringify(data));

        console.log("Игрок зарегистрирован:", data);
        
        // Вызываем callback для перехода к выбору игр
        if (onRegister) {
            onRegister();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <>
            <h2 className="theme-primary-text text-[55px] font-black italic mb-[40px] text-center leading-[60px]">
                Создание аккаунта
            </h2>

            <div className="space-y-[30px]">
                {/* Имя и Фамилия */}
                <div className="flex flex-col gap-[25px]">
                    <div>
                        <label className="theme-muted-text text-[18px] font-extrabold mb-[12px] block">
                            Ваше имя
                        </label>
                        <input
                            type="text"
                            placeholder="Введите имя"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                if (errors.firstName) setErrors({...errors, firstName: null});
                            }}
                            onKeyPress={handleKeyPress}
                            className={`w-full px-[20px] py-[14px] border-[3px] rounded-2xl theme-surface theme-muted-text outline-none transition font-extrabold text-[16px] ${
                                errors.firstName 
                                    ? 'border-red-500 focus:border-red-600' 
                                    : 'border-[var(--theme-border)] focus:border-[var(--theme-primary)]'
                            }`}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-[14px] font-bold mt-[8px]">{errors.firstName}</p>
                        )}
                    </div>

                    <div>
                        <label className="theme-muted-text text-[18px] font-extrabold mb-[12px] block">
                            Ваша фамилия
                        </label>
                        <input
                            type="text"
                            placeholder="Введите фамилию"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                if (errors.lastName) setErrors({...errors, lastName: null});
                            }}
                            onKeyPress={handleKeyPress}
                            className={`w-full px-[20px] py-[14px] border-[3px] rounded-2xl theme-surface theme-muted-text outline-none transition font-extrabold text-[16px] ${
                                errors.lastName 
                                    ? 'border-red-500 focus:border-red-600' 
                                    : 'border-[var(--theme-border)] focus:border-[var(--theme-primary)]'
                            }`}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-[14px] font-bold mt-[8px]">{errors.lastName}</p>
                        )}
                    </div>
                </div>

                {/* Кнопка отправки */}
                <button
                    onClick={handleSave}
                    className="w-full py-[12px] rounded-full transition theme-button font-bold italic text-[22px] hover:scale-105 active:scale-95 outline outline-[5px] outline-offset-4 transition-colors"
                >
                    Начать обучаться
                </button>

                <p className="text-center theme-muted-text text-[14px] font-extrabold">
                    Ваши данные сохраняются локально
                </p>
            </div>
        </>
    )
}