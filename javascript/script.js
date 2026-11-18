const burger = document.querySelector(".burger");
const theme = document.querySelector("#theme");
const html = document.documentElement;
const boutonLangue = document.querySelector("#langue")

function fermerMenu() {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
};

function themeSombre() {
    html.classList.add("sombre");
    theme.textContent = "mode clair";
};

function themeClair() {
    html.classList.remove("sombre");
    theme.textContent = "mode sombre";
};

function traduire(langue) {
    document.querySelectorAll("[data-trad]").forEach(function (trad) {
        const cle = trad.getAttribute("data-trad");
        trad.textContent = traductions[langue][cle];
    });
}

if (html.classList.contains("sombre")) {
    themeSombre();
}
;

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
        themeClair();
        localStorage.setItem("theme", "clair");
    } else {
        themeSombre();
        localStorage.setItem("theme", "sombre");
    }
});

function langueAnglais() {
    traduire("en");
    html.setAttribute("lang", "en");
    boutonLangue.textContent = "français";
    localStorage.setItem("langue", "en")
}

function langueFrancais() {
    traduire("fr");
    html.setAttribute("lang", "fr");
    boutonLangue.textContent = "english";
    localStorage.setItem("langue", "fr")
}

boutonLangue.addEventListener("click", function langueChange() {
    if (html.getAttribute("lang") === "fr") {
        langueAnglais();
    } else {
        langueFrancais();
    }
});
