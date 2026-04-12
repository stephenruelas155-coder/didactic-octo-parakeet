export function saveTheme(theme) {
    localStorage.setItem("theme", theme);
}

export function getTheme() {
    return localStorage.getItem("theme") || "light";
}

export function applyTheme(theme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
}