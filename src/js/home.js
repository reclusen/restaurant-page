import { h as htmlTree, s as svgTree } from "hastscript";

import { specifyDOMTree, specifySVGTree } from "./tree.js";
import fonts from "./fonts.js";



const displayHomepage = () => {
    const header = document.querySelector("#content .header");
    const home = document.createElement("div");

    home.classList.add("page");
    home.setAttribute("id", "home");

    const sections = generateSections(7, [
            "landing-page", "description", "description", "popular-choices",
            "social", "newsletter", "branches"
        ]
    )

    //first three sections
    const heroImageContent = [
        { text: "The Pizza Place", font: fonts.poiretOneRegular },
        { text: "The best of its kind, yet.", font: fonts.abrilFatfaceRegular },
        { 
            text: "Here at The Pizza Place, pizza is served hot and fresh, made from natural ingredients.",
            font: fonts.podkova 
        }
    ];

    home.append(...sections);
    header.insertAdjacentElement("afterend", home);

    for (let i = 0; i < 3; i++) {
        const heroInner = document.querySelectorAll(".hero-inner");

        const figure = document.createElement("figure");
        const h2 = document.createElement("h2");

        figure.classList.add("hero-img");
        h2.classList.add("hero-text", heroImageContent[i].font);

        h2.textContent = heroImageContent[i].text;

        heroInner[i].append(figure, h2);
    }


    // console.log("#home", home.children);

    addPopularChoicesSection();
    addSocialSection();
    addNewsletterSelection();
    addBranchesSelection();
};

export default displayHomepage;

function addPopularChoicesSection() {
    const heroInner = document.querySelector(".popular-choices .hero-inner");
    const pizzas = document.createElement("div");

    pizzas.classList.add("pizzas");

    for (let i = 0; i < 4; i++) {
        const pizza = document.createElement("div");
        const figure = document.createElement("figure");

        pizza.classList.add("pizza");
        figure.classList.add("img");
        
        pizza.append(figure);
        pizzas.append(pizza);
    }

    const h2 = document.createElement("h2");
    
    h2.classList.add("hero-text", fonts.abrilFatfaceRegular);
    h2.textContent = "Popular Choices";

    heroInner.append(pizzas, h2);
}

function addSocialSection() {
    const heroInner = document.querySelector(".social .hero-inner");

    // .left
    const leftTree = htmlTree(
        ".left", [
            htmlTree("figure.hero-img"),
            htmlTree("h2.hero-text", {class: fonts.abrilFatfaceRegular}, "What other people say")
        ]
    );

    // .twitter-card
    const twitterCardTree = htmlTree(
        "article.twitter-card", [
            htmlTree(".name-container", [
                htmlTree("div", [
                    htmlTree("h4.name", "John Appleseed"),
                    htmlTree("h6", "@appleseeder")
                ])
            ]),
            htmlTree("p.tweet", "The pizza here is unlike any other I've tasted. It's real amazing stuff."),
            htmlTree("p.metadata", [
                "8:00PM Jan 5, 2025 ",
                htmlTree("span.views", "50.3K views"),
            ])
        ]
    );

    const left = specifyDOMTree(leftTree);
    const twitterCard = specifyDOMTree(twitterCardTree);

    heroInner.append(left, twitterCard);
}

function addNewsletterSelection() {
    const heroInner = document.querySelector(".newsletter .hero-inner");
    const heroImg = document.createElement("figure");
    
    heroImg.classList.add("hero-img");
    
    //.newsletter-box
    const newsletterBoxTree = htmlTree(
        "aside.newsletter-box", [
            htmlTree("h2.hero-title", {class: fonts.abrilFatfaceRegular}, "Subscribe to our newsletter"),
            htmlTree(".input", [
                htmlTree("input", {type: "text", placeholder: "Enter your email"}),
                htmlTree("button", {class: fonts.mochiyPopOneRegular}, "Sign up")
            ]),
            htmlTree(".newsletter-text", {class: fonts.actorRegular}, "Sign up for updates on our latest creations and best offers!")
        ]
    )

    const newsletterBox = specifyDOMTree(newsletterBoxTree);
    
    heroInner.append(heroImg, newsletterBox);
}

function addBranchesSelection() {
    const heroInner = document.querySelector(".branches .hero-inner");

    const branches = [
        {name: "Canada", address: "380 Ezra Greens, Torpport, Nunavut E6I 3N4, Canada"},
        {name: "Norway", address: "511 Linnea vika, Lake Sofie, 7141, Norway"},
        {name: "France", address: "789 Petit du Bac, Clarenceview, Franche-Comté 69982, France"},
    ];
    
    const svgDOMTree = svgTree(
        "svg.hero-title", {viewBox: "0 0 500 500", xlmns: "http://www.w3.org/2000/svg", class: fonts.permanentMarkerRegular}, [
            svgTree("path", {id: "curve", d: "M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"}),
            svgTree("text", {width: "500"}, [
                svgTree("textPath", {href: "#curve"}, "Branches")
            ])
        ]
    );

    const branchAddresses = document.createElement("div");
    
    branchAddresses.classList.add("branch-addresses");

    branches.map(branch => {
        return htmlTree(".branch-address", [
            htmlTree(".address-info", [
                htmlTree("h3.name", branch.name),
                htmlTree("p.address", branch.address)
            ]),
            htmlTree("figure.hero-img")
        ]);
    }).forEach(address => {
        branchAddresses.append( specifyDOMTree(address) );
    });
    
    const svg = specifySVGTree(svgDOMTree);

    console.log(svg);
    
    heroInner.append(svg, branchAddresses);
}

// -------------------------------
// extra stuff

// classNames is an array of any given className
// and assumes to have the exact same length as num (sections)
function generateSections(num, classNames) {
    const sectionArr = [];
    
    for (let i = 0; i < num; i++) {
        const section = document.createElement("section");
        const heroInner = document.createElement("div");

        section.classList.add("hero-section");
        heroInner.classList.add("hero-inner");

        section.append(heroInner);

        sectionArr.push(section);
    }

    sectionArr.forEach((section, i) => {
        section.classList.add(classNames[i]);
    })

    return sectionArr;
}
