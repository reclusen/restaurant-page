import { h as htmlTree } from "hastscript";

import { specifyDOMTree } from "./tree.js";
import fonts from "./fonts.js";

const displayMenuPage = () => {
    const header = document.querySelector("#content .header");

    const pizzaGrid = generateMenuGrid("Pizzas", "pizza", 6);
    const appetizerGrid = generateMenuGrid("Appetizers", "appetizer", 3);
    const beverageGrid = generateMenuGrid("Beverages", "beverage", 4);
    const dessertGrid = generateMenuGrid("Desserts", "dessert", 3);
    
    const pizzas = [
        "BBQ Chicken",
        "Pepperoni",
        "Four-Cheese",
        "Meat Lovers",
        "Mushroom",
        "Spinach"
    ];

    const appetizers = [
        "Hot Artichoke Spinach Dip",
        "Fried Prosciutto Toretllini",
        "French Onion Dip Cups"
    ];

    const beverages = [
        "Iced Tea",
        "Mango Shake",
        "Strawberry Shake",
        "Pepsi"
    ];

    const desserts = [
        "Coffee Jelly",
        "Mango Pudding",
        "Sundae"
    ];

    const menuGrid = 
        htmlTree("#menu", {class: "page hidden"}, [
            htmlTree("section.hero-section", {class: "landing-page"}, [
                htmlTree(".hero-inner", [
                    htmlTree("button.arrow-left", {class: "hidden"}, [
                        htmlTree("i.fa-solid", {class: "fa-arrow-left"})
                    ]),
                    htmlTree(".menu", [
                        pizzaGrid,
                        appetizerGrid,
                        beverageGrid,
                        dessertGrid
                    ]),
                    htmlTree("button.arrow-right", [
                        htmlTree("i.fa-solid", {class: "fa-arrow-right"})
                    ])
                ])
            ])
        ]);


    const menu = specifyDOMTree(menuGrid);
    
    header.insertAdjacentElement("afterend", menu);


    const menus = [ pizzas, appetizers, beverages, desserts ];
    const menuGrids = document.querySelectorAll(`[class$="grid"]`);

    menuGrids.forEach((menuGrid, menuGridIndex) => {
        for (const [gridItemIndex, gridItem] of menuGrid.childNodes.entries()) {
            const item = gridItem.firstChild;
            item.dataset[item.className] = menus[menuGridIndex][gridItemIndex];
        }
    });

    menuItemHover(menus, menuGrids);
};

function menuItemHover(menus, menuGrids) {
    menuGrids.forEach((menuGrid, menuGridIndex) => {
       for (const [gridItemIndex, gridItem] of menuGrid.childNodes.entries()) {
        const name = document.createElement("p");

        name.classList.add("name");
        name.classList.add(fonts.podkova);
        name.textContent = menus[menuGridIndex][gridItemIndex];

        gridItem.append(name);

        gridItem.addEventListener("mouseover", gridItemHandler);
        gridItem.addEventListener("mouseout", gridItemHandler);

       }
    });

    function gridItemHandler(e) {
        if (e.type == "mouseover") {
            e.currentTarget.firstElementChild.style.opacity = 0.5;
            e.currentTarget.firstElementChild.style.scale = 1.05;

            e.currentTarget.lastElementChild.style.opacity = 1;
        }

        if (e.type == "mouseout") {
            e.currentTarget.firstElementChild.style.opacity = 1;
            e.currentTarget.firstElementChild.style.scale = 1;

            e.currentTarget.lastElementChild.style.opacity = 0;
        }
    }
}

function generateMenuGrid(headerText, gridClassName, gridItemCount) {
    const items = [];

    while (items.length < gridItemCount) {
        const item = htmlTree(".item", [
            htmlTree(`figure.${gridClassName}`)
        ]);
        
        items.push(item);
    }

    return htmlTree(".label", [
        htmlTree("h2.header", {class: fonts.abrilFatfaceRegular}, headerText),
        htmlTree(`.${gridClassName}-grid`, items)
    ]);
}

function scrollMenu() {
    const arrows = document.querySelectorAll(`[class^="arrow"]`);
    const menu = document.querySelector(".menu");
    const menuLength = menu.offsetWidth;
    
    let initialWidth = 0;
    const maxPossibleLength = menuLength * 3;

    window.addEventListener("load", e => {
        menu.scrollTo({ left: 0, behavior: "instant" });
    });

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

export default displayMenuPage;
export { scrollMenu };