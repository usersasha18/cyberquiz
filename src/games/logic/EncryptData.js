import definitions from "./definitions.js";

const EncryptData = [
    {
        type: "choice",
        question: "Задание 1. Зашифруй слово",
        text: "Слово: КОТ",
        answers: ["НРХ", "МПУ", "ЛПФ"],
        correct: 0,
    },

    {
        type: "input",
        question: "Задание 2. Расшифруй слово",
        text: "Шифр: ЫНСОГ",
        correctAnswer: "ШКОЛА"
    },
    {
        type: "choice",
        question: "Задание 3. Зашифруй слово",
        text: "Слово: АЛГОРИТМ",
        answers: ["ГОЁСУПХЛ", "ГОЁСУЛХП", "ГЁСУЛХП"],
        correct: 1,
    },
    {
        type: "input",
        question: "Задание 4. Расшифруй слово",
        text: "Шифр: В ОБДОБ НГРЛНЦОЮ",
        correctAnswer: "Я ЛЮБЛЮ КАНИКУЛЫ"
    },
    {
        type: "choice",
        question: "Задание 5. Зашифруй слово",
        text: "Слово: ШЕПАЛОВО",
        answers: ["ГНГПЗЖЛВ", "ГНГЖЗПЛВ", "ЫЗТГОСЕС"],
        correct: 2,
    },
    {
        type: "input",
        question: "Задание 6. Расшифруй слово",
        text: "Шифр: ОЗХС",
        correctAnswer: "ЛЕТО"
    },
    {
        type: "input",
        question: "Задание 67. Расшифруй слово",
        text: "Шифр: ЪЗУЗПЫГ",
        correctAnswer: "ЧЕРЕМША"
    },
    {
        type: "choice",
        question: "Задание 7. Зашифруй слово",
        text: "Слово: ИГРА",
        answers: ["ЛЁУГ", "ЛНУГ", "ЛФНУГ"],
        correct: 0,
    },
    {
        type: "input",
        question: "Задание 8. Расшифруй слово",
        text: "Шифр: НГУХГ",
        correctAnswer: "КАРТА"
    },
    {
        type: "choice",
        question: "Задание 9. Зашифруй слово",
        text: "Слово: ЦЕЗАРЬ",
        answers: ["ЩЗКГУ", "ЩЗКГУЯ", "ЩЕЗХСН"],
        correct: 1,
    },
    {
        type: "choice",
        question: "Задание 10. Зашифруй слово",
        text: "Слово: ЛАГЕРЬ",
        answers: ["ОГТНГ", "ОСЙНГ", "ОГЁЗУЯ"],
        correct: 2,
    },
    {
        type: "input",
        question: "Задание 11. Расшифруй слово",
        text: "Шифр: УСДОСНФ",
        correctAnswer: "РОБЛОКС"
    },
    {
        type: "input",
        question: "Задание 12. Расшифруй слово",
        text: "Шифр: ПСУЗ",
        correctAnswer: "МОРЕ"
    },
    {
        type: "choice",
        question: "Задание 13. Зашифруй слово",
        text: "Слово: КАБИНЕТ",
        answers: ["НГДЛРЗХ", "НГДЛРГ", "НГУХЛРГ"],
        correct: 0,
    },
    {
        type: "input",
        question: "Задание 14. Расшифруй слово",
        text: "Шифр: ФЛНФ ФЗЕЗР",
        correctAnswer: "СИКС СЕВЕН"
    },
    {
        type: "choice",
        question: "Задание 15. Зашифруй слово",
        text: "Слово: СЧАСТЬЕ",
        answers: ["35 45 36 11 35 53 16", "35 45 11 35 36 53 16", "16 53 36 35 11 45 35"],
        img: "img/i_010.jpg",
        correct: 1,
    },
];


export default EncryptData;