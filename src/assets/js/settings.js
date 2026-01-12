import * as Utils from "./utils.a36cfcb5.js";
document.addEventListener("DOMContentLoaded", async () => {
    const backBtn = document.getElementById("back-btn");

    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect") || "/index.html";
    if (backBtn) {
        backBtn.addEventListener("click", (e) => {
            e.preventDefault(); // prevent default link behavior
            window.location.href = redirect;
        });
    }
    Utils.applyLanguage(Utils.language());
});
