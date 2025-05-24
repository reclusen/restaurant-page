import "../css/styles.css";
import "../css/homeStyles.css";
import "../css/aboutStyles.css";
import "../css/menuStyles.css";

import displayHomepage from "./home.js";
import displayAboutPage from "./about.js";
import displayMenuPage from "./menu.js";


loadNavBtns();

function loadNavBtns() {
    displayHomepage();

    const navBtns = document.querySelectorAll(".nav-btn");

    navBtns.forEach(btn => {
        btn.addEventListener("click", displayPage);
    });
}

function displayPage(e) {
    const page = document.querySelector(".page");

    if (e.target.id == "about") {
        page.remove();
        displayAboutPage();
    }
    
    if (e.target.id == "home") {
        page.remove();

        displayHomepage();
    }

    if (e.target.id == "menu") {
        page.remove();

        displayMenuPage();
    }
}

// console.log("setup working");