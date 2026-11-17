const burger = document.querySelector(".burger");
function fermerMenu(){
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
};

document.documentElement.classList.add("js");

burger.addEventListener("click", function menuBurger(){
    if (burger.getAttribute("aria-expanded") === "true" ){
       fermerMenu();
        burger.focus();
    }else {
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Fermer le menu");
    }
});

document.addEventListener("keydown", function keyboard(event){
    if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true" ){
        fermerMenu();
        burger.focus();
    }
});
