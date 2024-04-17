fetch("./src/data.json").then(response => response.json()).then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        console.log(item);
        let _item = document.createElement("div");
        _item.className = `char-${i} char-\\u${i.toString(16)}`;
        _item.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.type}</p>
        `;
        document.body.appendChild(_item);
    }
}).catch(error => {
    console.error(error);
});
