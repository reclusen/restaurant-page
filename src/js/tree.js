function bfs(root) {
    const result = [];

    const queue = [root];

    while (queue.length > 0) {
        const curr = queue.shift();

        if (!curr) continue;

        result.push(curr.value);

        for (const child of curr.children) {
            queue.push(child);
        }
    }

    return result;
}

//after aggregation, add the necessary attributes for their corresponding element
//and respective text contents, if any
function specifyDOMTree(elementTree) {
    const element = document.createElement(elementTree.tagName);

    if (elementTree.type == "element") {
        const properties = Object.keys(elementTree.properties);
        if (properties.length > 0) {
            properties.forEach(property => {
                if (property == "className") {
                    elementTree.properties["className"].forEach(value => {
                        element.classList.add(value);
                    });
                }
                console.log(elementTree);

                if (property == "id") element.setAttribute("id", elementTree.properties["id"]);
            });
        }


        if (elementTree.children.length > 0) {
            elementTree.children.forEach(child => {
                const node = specifyDOMTree(child);

                if (typeof node == "string") {
                    element.textContent = node;
                }

                if (node instanceof Element) {
                    element.append(node);
                }
            });
        }

    }

    if (elementTree.type == "text") {
        return elementTree.value;
    }

    return element;
}

function specifySVGTree(svgTree) {
    const element = svgTree.tagName == "textPath" ? 
        document.createElementNS("http://www.w3.org/2000/svg", "textPath") : 
        document.createElementNS("http://www.w3.org/2000/svg", svgTree.tagName);

    if (svgTree.properties) {
        const properties = Object.keys(svgTree.properties);
        
        properties.forEach(property => {
            if (property == "className") { 
                svgTree.properties["className"].forEach(value => {
                    element.classList.add(value);
                });
            } else {
                console.log("property", property, svgTree.properties[property]);
                element.setAttribute(property, svgTree.properties[property]);
            }
        });
        
    }

    if (svgTree.children) {
        if (svgTree.children.length > 0) {
            svgTree.children.forEach(child => {
                const node = specifySVGTree(child);

                console.log("node", node);

                if (typeof node == "string") {
                    element.textContent = node;
                }
                
                if (node instanceof Element) {
                    element.append(node);
                }
            });
        };
    }

    if (svgTree.type == "text") {
        return svgTree.value;
    }

    console.log("element", element);

    return element;
}

export { specifyDOMTree, specifySVGTree };