function scrollMenu() {
    const arrows = document.querySelectorAll(`[class^="arrow"]`);
    const menu = document.querySelector(".menu");
    const menuLength = menu.offsetWidth;
    
    let initialWidth = 0;
    const maxPossibleLength = menuLength * 3;

    window.addEventListener("load", e => {
        menu.scrollTo({ left: 0, behavior: "instant" });
    });

    console.log(arrows, menuLength, maxPossibleLength);

    arrows.forEach(arrow => {
        arrow.addEventListener("click", e => {
            console.log("clicked", e.currentTarget.className);

            if (e.currentTarget.className == "arrow-left") {
                initialWidth -= menuLength;

                if (initialWidth > 0) {
                    e.currentTarget.classList.remove("hidden");
                    arrows[1].classList.remove("hidden");
                }

                menu.scrollBy({ left: -menuLength, behavior: "smooth" });

                if (initialWidth == 0) {
                    e.currentTarget.classList.add("hidden");                    
                }
            }

            if (e.currentTarget.className == "arrow-right") {                
                console.log("initialWidth", initialWidth);
                
                initialWidth += menuLength;

                if (initialWidth < maxPossibleLength) {
                    e.currentTarget.classList.remove("hidden");
                    arrows[0].classList.remove("hidden");
                }

                menu.scrollBy({ left: menuLength, behavior: "smooth" });

                if (initialWidth == maxPossibleLength) {
                    e.currentTarget.classList.add("hidden");
                }
            }
        });
    });
}

export { scrollMenu };