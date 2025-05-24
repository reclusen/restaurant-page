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
        htmlTree("#menu", {class: "page"}, [
            htmlTree("section.hero-section", {class: "landing-page"}, [
                htmlTree(".hero-inner", [
                    htmlTree(".menu", [
                        pizzaGrid,
                        appetizerGrid,
                        beverageGrid,
                        dessertGrid
                    ]),
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
        const figureImage = e.currentTarget.firstElementChild;
        const textContent = e.currentTarget.lastElementChild;

        if (e.type == "mouseover") {
            figureImage.style.opacity = 0.5;
            figureImage.style.scale = 1.05;

            textContent.style.opacity = 1;
        }

        if (e.type == "mouseout") {
            figureImage.style.opacity = 1;
            figureImage.style.scale = 1;

            textContent.style.opacity = 0;
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

export default displayMenuPage;