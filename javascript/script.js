const burger = document.querySelector(".burger");

document.documentElement.classList.add("js");

burger.addEventListener("click", function menuBurger(){
    if (burger.getAttribute("aria-expanded") === "true" ){
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Ouvrir le menu");
    }else {
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Fermer le menu");
    }
});


