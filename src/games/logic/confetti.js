export function createConfetti() {
    const container = document.querySelector(".confetti-container");
    
    if (!container) return;

    const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#4dabf7", "#b197fc"];

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

        confetti.style.left = Math.random() * 100 + "vw";

        const size = Math.random() * 6 + 4;
        confetti.style.width = size + "px";
        confetti.style.height = size * 1.5 + "px";

        confetti.style.animationDuration = (Math.random() * 2 + 3) + "s";

        confetti.style.animationDelay = Math.random() * 2 + "s";

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 6000);
    }
}