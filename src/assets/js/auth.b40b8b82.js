(() => {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const html = document.documentElement;
    toggle.addEventListener("click", () => {
        const isDark = html.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
})();
const languageSelect = document.getElementById("language-select");
const savedLang = localStorage.getItem("language") || "en";

// Populate option text on page load
languageSelect.querySelectorAll("option").forEach((opt) => {
    const key = opt.dataset.i18n;
    opt.textContent = translations[savedLang][key] || opt.value;
});

// Set select to saved language
languageSelect.value = savedLang;
applyLanguage(savedLang);

// Listen for change
languageSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("language", lang);

    // Update page texts
    applyLanguage(lang);

    // Update option text to match selected language
    languageSelect.querySelectorAll("option").forEach((opt) => {
        const key = opt.dataset.i18n;
        opt.textContent = translations[lang][key] || opt.value;
    });
});
applyLanguage(language());
