document.documentElement.classList.add("js");

if (localStorage.getItem("theme") === "sombre") {
    document.documentElement.classList.add("sombre");
} else if (localStorage.getItem("theme") === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("sombre");
}

if (localStorage.getItem("langue") === "en") {
    document.documentElement.classList.add("traduction-en-cours");
    setTimeout(function () {
        document.documentElement.classList.remove("traduction-en-cours");
    }, 1000);
}