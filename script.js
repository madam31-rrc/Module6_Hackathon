// COOKIE Helpers
function setCookie(name, value, days = 30) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '');
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Load Name from Cookie
function loadName() {
    const name = getCookie("username");
    if (name) {
        document.getElementById("greeting").textContent = `Welcome back, ${name}!`;
    }
}

// Save Name to Cookie
document.getElementById("saveNameBtn").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value;
    setCookie("username", name);
    loadName();
});

// Clear Name
document.getElementById("clearNameBtn").addEventListener("click", () => {
    deleteCookie("username");
    document.getElementById("greeting").textContent = "Welcome!";
});

// Load Theme from localStorage
function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.add("light-mode");
    }
}

// Apply Theme
function applyTheme(theme) {
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(`${theme}-mode`);
    localStorage.setItem("theme", theme);
}

// Event Listeners
document.getElementById("lightModeBtn").addEventListener("click", () => applyTheme("light"));
document.getElementById("darkModeBtn").addEventListener("click", () => applyTheme("dark"));
document.getElementById("clearThemeBtn").addEventListener("click", () => {
    localStorage.removeItem("theme");
    document.body.classList.remove("dark-mode", "light-mode");
});

// Initial Load
loadName();
loadTheme();
