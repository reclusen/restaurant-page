import "../css/styles.css";
import "../css/homeStyles.css";
import "../css/aboutStyles.css";
import "../css/menuStyles.css";

import displayHomepage from "./home.js";
import displayAboutPage from "./about.js";
import displayMenuPage, { scrollMenu } from "./menu.js";

displayPages();

function displayPages() {
    displayAboutPage();
    displayHomepage();
    displayMenuPage();
    
    loadNavBtns();
}


function loadNavBtns() {
    const navBtns = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");

    navBtns.forEach((btn, index) => {
        btn.addEventListener("click", e => {
            hidePreviousPage(pages);

            pages[index].classList.remove("hidden");

            if (pages[index].id == "menu" && !pages[index].classList.contains("hidden")) {
                scrollMenu();
            }
        });
    });
}

function hidePreviousPage(pages) {
    pages.forEach(page => {
        if (!page.classList.contains("hidden")) {
            page.classList.add("hidden");
        }
    });
}

// console.log("setup working");