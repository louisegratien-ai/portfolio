const burger = document.querySelector(".burger");
const theme = document.querySelector("#theme");
const html = document.documentElement;

function fermerMenu() {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
};

function themeSombre() {
    html.classList.add("sombre");
    theme.setAttribute("aria-pressed", "true");
}

if (html.classList.contains("sombre")) {
    themeSombre();
}

burger.addEventListener("click", function menuBurger() {
    if (burger.getAttribute("aria-expanded") === "true") {
        fermerMenu();
        burger.focus();
    } else {
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Fermer le menu");
    }
});

document.addEventListener("keydown", function keyboard(event) {
    if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        fermerMenu();
        burger.focus();
    }
});

theme.addEventListener("click", function themeChange() {
    if (html.classList.contains("sombre")) {
        html.classList.remove("sombre");
        theme.setAttribute("aria-pressed", "false");
        localStorage.setItem("theme", "clair");
    } else {
        themeSombre();
        localStorage.setItem("theme", "sombre");
    }
});


