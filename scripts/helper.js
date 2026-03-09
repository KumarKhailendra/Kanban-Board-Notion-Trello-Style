const el = (tag, attrs = {}, children = []) => {
    const element = tag !== '' ? document.createElement(tag) : document.createDocumentFragment();

    Object.entries(attrs).forEach(([k, v]) => {
        if (k === "class" || k === "className") element.className = v;
        else if (k === "text") element.textContent = v;
        else element.setAttribute(k, v);
    });

    children.forEach(child => {
        if (child == null || child === false) return;
        if (typeof child === "string") element.appendChild(document.createTextNode(child));
        else element.appendChild(child);
    });

    return element;
};

export { el };
