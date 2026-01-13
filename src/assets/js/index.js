import * as Utils from "./utils.js";
function animateRow(rowId, direction = "ltr", pxPerSecond = 150) {
    const row = document.getElementById(rowId);
    const wrapperWidth = row.parentNode.offsetWidth;
    const rowWidth = row.scrollWidth;

    let fromX, toX;
    if (direction === "ltr") {
        fromX = wrapperWidth;
        toX = -rowWidth;
    } else {
        fromX = -rowWidth;
        toX = wrapperWidth;
    }

    gsap.set(row, { x: fromX });

    const distance = Math.abs(toX - fromX);
    const duration = distance / pxPerSecond; // seconds = distance / speed

    function loop() {
        gsap.to(row, {
            x: toX,
            duration: duration,
            ease: "linear",
            onComplete: () => {
                gsap.set(row, { x: fromX });
                loop();
            },
        });
    }

    loop();
}
document.addEventListener("DOMContentLoaded", () => {
    const row1Images = Array(10).fill("images/cards/default.avif");
    const row2Images = Array(10).fill("images/cards/default.avif");

    function populateRow(rowId, images, repeat = 10) {
        const row = document.getElementById(rowId);
        for (let i = 0; i < repeat; i++) {
            images.forEach((src) => {
                const img = document.createElement("img");
                img.src = src;
                row.appendChild(img);
            });
        }
    }

    populateRow("row1", row1Images, 10); // 10 * 10 = 100
    populateRow("row2", row2Images, 10);

    // Top row: right → left
    animateRow("row1", "ltr", 150);

    // Bottom row: left → right
    animateRow("row2", "rtl", 150);
    const languageSelect = document.getElementById("language-select");
    const savedLang = localStorage.getItem("language") || "en";

    // Populate option text on page load
    languageSelect.querySelectorAll("option").forEach((opt) => {
        const key = opt.dataset.i18n;
        opt.textContent = Utils.translations[savedLang][key] || opt.value;
    });

    // Set select to saved language
    languageSelect.value = savedLang;
    Utils.applyLanguage(savedLang);
    // Listen for change
    languageSelect.addEventListener("change", (e) => {
        const lang = e.target.value;
        localStorage.setItem("language", lang);

        // Update page texts
        Utils.applyLanguage(lang);

        // Update option text to match selected language
        languageSelect.querySelectorAll("option").forEach((opt) => {
            const key = opt.dataset.i18n;
            opt.textContent = translations[lang][key] || opt.value;
        });
    });
    Utils.applyLanguage(Utils.language());
    document.getElementById("settings-btn").addEventListener("click", () => {
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `settings.html?redirect=${redirectUrl}`;
    });
});
