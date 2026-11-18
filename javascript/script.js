// script principal du portfolio, chargé en bas de toutes les pages
// il a besoin du dictionnaire : traductions.js doit être chargé juste avant lui


// ---------- les éléments de la page ----------

const burger = document.querySelector(".burger");
const theme = document.querySelector("#theme");
const html = document.documentElement;
const boutonLangue = document.querySelector("#langue");
// ces deux-là n'existent que sur la page contact : ailleurs, ils valent null
const message = document.querySelector("#message");
const compteur = document.querySelector("#compteur");


// ---------- traduction ----------

// remplace chaque texte étiqueté par sa version dans la langue demandée ("fr" ou "en")
function traduire(langue) {
    // les textes visibles : data-trad
    document.querySelectorAll("[data-trad]").forEach(function (trad) {
        const cle = trad.getAttribute("data-trad");
        trad.textContent = traductions[langue][cle];
    });
    // les textes cachés dans les attributs : même principe, mais avec setAttribute
    document.querySelectorAll("[data-trad-label]").forEach(function (trad) {
        const cle = trad.getAttribute("data-trad-label");
        trad.setAttribute("aria-label", traductions[langue][cle]);
    });
    document.querySelectorAll("[data-trad-alt]").forEach(function (trad) {
        const cle = trad.getAttribute("data-trad-alt");
        trad.setAttribute("alt", traductions[langue][cle]);
    });
}


// ---------- menu burger ----------
// le JS change seulement aria-expanded : c'est le CSS qui affiche ou cache le menu

function fermerMenu() {
    burger.setAttribute("aria-expanded", "false");
    // le label change d'étiquette, puis on retraduit pour l'avoir dans la langue actuelle
    burger.setAttribute("data-trad-label", "menu-ouvrir");
    traduire(html.getAttribute("lang"));
}

burger.addEventListener("click", function menuBurger() {
    if (burger.getAttribute("aria-expanded") === "true") {
        fermerMenu();
        burger.focus();
    } else {
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("data-trad-label", "menu-fermer");
        traduire(html.getAttribute("lang"));
    }
});

// au clavier : Échap ferme le menu et ramène le focus sur le burger
document.addEventListener("keydown", function keyboard(event) {
    if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        fermerMenu();
        burger.focus();
    }
});


// ---------- mode sombre ----------
// le texte du bouton dit ce qu'il va faire : il change d'étiquette selon le mode

function themeSombre() {
    html.classList.add("sombre");
    theme.setAttribute("data-trad", "theme-clair");
    traduire(html.getAttribute("lang"));
}

function themeClair() {
    html.classList.remove("sombre");
    theme.setAttribute("data-trad", "theme-sombre");
    traduire(html.getAttribute("lang"));
}

// au chargement : head.js a déjà posé la classe sombre (avant l'affichage, pas de flash),
// il ne reste qu'à mettre le bouton à jour
if (html.classList.contains("sombre")) {
    themeSombre();
}

// le choix est rangé dans le carnet (localStorage) pour les autres pages et les prochaines visites
theme.addEventListener("click", function themeChange() {
    if (html.classList.contains("sombre")) {
        themeClair();
        localStorage.setItem("theme", "clair");
    } else {
        themeSombre();
        localStorage.setItem("theme", "sombre");
    }
});


// ---------- version anglaise ----------
// le français est la langue par défaut (celle du HTML) : l'anglais seulement si on clique

function langueAnglais() {
    traduire("en");
    html.setAttribute("lang", "en");
    // après le lang : majCompteur lit la langue de la page
    majCompteur();
    // le bouton affiche la langue vers laquelle il emmène, avec son lang pour la bonne prononciation
    boutonLangue.textContent = "français";
    boutonLangue.setAttribute("lang", "fr");
    localStorage.setItem("langue", "en");
}

function langueFrancais() {
    traduire("fr");
    html.setAttribute("lang", "fr");
    majCompteur();
    boutonLangue.textContent = "english";
    boutonLangue.setAttribute("lang", "en");
    localStorage.setItem("langue", "fr");
}

// au chargement : head.js a caché la page pendant la traduction, on la réaffiche une fois en anglais
if (localStorage.getItem("langue") === "en") {
    langueAnglais();
    html.classList.remove("traduction-en-cours");
}

// la langue actuelle se lit dans l'attribut lang de <html>
boutonLangue.addEventListener("click", function langueChange() {
    if (html.getAttribute("lang") === "fr") {
        langueAnglais();
    } else {
        langueFrancais();
    }
});


// ---------- apparitions au scroll ----------
// le surveillant ajoute la classe visible quand un quart de l'élément entre dans l'écran

const surveillant = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
            entree.target.classList.add("visible");
            // il est apparu : plus besoin de le surveiller
            surveillant.unobserve(entree.target);
        }
    });
}, {threshold: 0.25});

// sur une page sans .apparition, la liste est vide et rien ne se passe
document.querySelectorAll(".apparition").forEach(function (element) {
    surveillant.observe(element);
});


// ---------- compteur du formulaire ----------

function majCompteur() {
    // le compteur n'existe que sur la page contact
    if (message !== null) {
        const longueur = message.value.length;
        compteur.textContent = longueur + " / 1000 " + traductions[html.getAttribute("lang")]["contact-caracteres"];
    }
}

if (message !== null) {
    // au chargement : si le navigateur a gardé un texte (bouton retour), le compteur est juste tout de suite
    majCompteur();
    message.addEventListener("input", function () {
        majCompteur();
    });
}
