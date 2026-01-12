import * as Utils from "./utils.a36cfcb5.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("settings-btn").addEventListener("click", () => {
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `settings.html?redirect=${redirectUrl}`;
    });
    Utils.applyLanguage(Utils.language());
});
