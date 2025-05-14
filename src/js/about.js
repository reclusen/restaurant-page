import { h as htmlTree } from "hastscript";

import fonts from "./fonts";
import { specifyDOMTree } from "./tree.js";

const displayAboutPage = () => {
    const header = document.querySelector("#content .header");

    const p1 = `More than just a pizza place, The Pizza Place is a labor of love, a culinary dream baked to perfection. 
                Our journey began with a simple yet profound belief: that pizza can be so much more than just a
                quick meal. It can be an experience - a symphony of fresh flavors, a comforting embrace, 
                and a reason to gather around the table with loved ones.`;
    const p2 = `Our commitment goes beyond just crafting delicious pizzas. We believe in the power of community and the importance of using fresh, high-quality ingredients. That's why we partner with local farmers
                and producers whenever possible, ensuring that every bite you take is bursting with natural goodness. From the sun-ripened tomatoes in our marinara to slow-roasted pulled pork, we are dedicated to
                bringing you the freshest flavors that can be offered.`;
    const p3 = "At The Pizza Place, we pour our heart and soul into every pizza we make.";
    const p4 = "Our dough is slow-fermented for exceptional flavor. This meticulous process results in a crust that is perfectly crisp on the outside and delightfully chewy on the inside.";
    const p5 = `Our sauces are made in-house from scratch, using time-honored recipes and the finest ingredients from our hometown. Whether you crave the classic tang of our marinara, the creamy richness of
                our Alfredo, or the zesty kick of our pesto, our sauces are designed to complement and elevate our toppings.`;
    const p6 = `We're incredibly excited to share our passion for pizza with you. Come visit us at our main branches and taste the difference that dedication and quality ingredients make. Follow us on social media to
                stay updated on our latest creations and special offers.`;

    const aboutPageTree = 
        htmlTree("#about", {class: "page hidden"}, [
            htmlTree("section.hero-section", {class: "landing-page"}, [
                htmlTree(".hero-inner", [
                    htmlTree("h1.hero-text", {class: fonts.poiretOneRegular}, "The Pizza Place"),
                    htmlTree(".about-text", [
                        htmlTree(".first", [
                            htmlTree("h3.section-title", {class: fonts.libreFranklin}, "Our Story: Slicing Through the Ordinary"),
                            htmlTree(".description", [
                                htmlTree("p", p1),
                                htmlTree("p", p2)
                            ])
                        ]),
                        htmlTree(".second", [
                            htmlTree("h3.section-title", {class: fonts.libreFranklin}, "What Makes Our Pizza Special?"),
                            htmlTree(".description", [
                                htmlTree("p", p3),
                                htmlTree("ul", [
                                    htmlTree("li", [
                                        htmlTree("h4", {class: fonts.libreFranklin}, "The Perfect Crust"),
                                        htmlTree("p", p4)
                                    ]),
                                    htmlTree("li", [
                                        htmlTree("h4", {class: fonts.libreFranklin}, "Bold and Flavorful Sauces"),
                                        htmlTree("p", p5)
                                    ])
                                ])
                            ])
                        ]),
                        htmlTree(".third", [
                            htmlTree("h3.section-title", {class: fonts.libreFranklin}, "Join our Pizza journey!"),
                            htmlTree(".description", [
                                htmlTree("p", p6)
                            ])
                        ]),
                        htmlTree(".fourth", [
                            htmlTree("h3.section-title", {class: fonts.freeman}, "From our oven to your table, we can't wait to serve you a slice of happiness!"),
                            htmlTree("span", {class: fonts.freeman}, "The Pizza Place Team")
                        ])
                    ]),
                    htmlTree("figure.hero-img")
                ])
            ])
        ]);

    const aboutPageHTML = specifyDOMTree(aboutPageTree);
    header.insertAdjacentElement("afterend", aboutPageHTML);
};

export default displayAboutPage;