document.documentElement.classList.add("js");

if (localStorage.getItem("theme") === "sombre") {
    document.documentElement.classList.add("sombre");
} else if (localStorage.getItem("theme") === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("sombre");
}

