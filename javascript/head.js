// mini-script chargé dans le <head> de toutes les pages, AVANT l'affichage
// il ne peut toucher qu'à <html> : le body n'existe pas encore, ni les fonctions de script.js
// pas de const ici : les variables sont partagées avec script.js (une const en double ferait tout planter)

// le JS est là : le CSS peut cacher ce que le JS sait réafficher (menu burger, apparitions)
document.documentElement.classList.add("js");

// mode sombre : le choix enregistré, sinon le réglage de l'appareil à la première visite
if (localStorage.getItem("theme") === "sombre") {
    document.documentElement.classList.add("sombre");
} else if (localStorage.getItem("theme") === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("sombre");
}

// version anglaise : la page est cachée le temps que script.js la traduise (pas de flash du français)
if (localStorage.getItem("langue") === "en") {
    document.documentElement.classList.add("traduction-en-cours");
    // filet de sécurité : si script.js plante, la page réapparaît quand même au bout d'une seconde
    setTimeout(function () {
        document.documentElement.classList.remove("traduction-en-cours");
    }, 1000);
}
