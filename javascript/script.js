const burger = document.querySelector(".burger");
const theme = document.querySelector("#theme");
const html = document.documentElement;

function fermerMenu(){
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
};

html.classList.add("js");

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

theme.addEventListener("click", function themeChange(){
    if (html.classList.contains("sombre")){
        html.classList.remove("sombre");
        theme.setAttribute("aria-pressed", "false");
        console.log("mode sombre stop");
    }else {
        html.classList.add("sombre");
        theme.setAttribute("aria-pressed", "true");
        console.log("mode sombre on");
    }
});


