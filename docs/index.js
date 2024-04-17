const _unicodeCharactersListSection = document.getElementById("unicode-characters-list");

fetch("./src/data.json").then(response => response.json()).then(data => {
    console.log(data);
    for (let k = 0; 100*k < data.length; k++) {

        const _header = document.createElement("h3");
        _header.innerText = `${100*k} - ${100*k+99}`;
        _unicodeCharactersListSection.appendChild(_header);

        const _table = document.createElement("table");
        _table.style.width = "100%";
        _table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Char</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Code Point</th>
                    <th>Width</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const _tbody = _table.querySelector("tbody");
        for (let i = 0; i < 100; i++) {
            const item = data[100*k + i];
            let _tr = document.createElement("tr");
            _tr.onmouseover = () => {
                _tr.style.backgroundColor = "#f0f0f0";
            }
            _tr.onmouseout = () => {
                _tr.style.backgroundColor = "transparent";
            }
            _tr.className = `char-${100*k + i} char-\\u${(100*k + i).toString(16)}`;
            _tr.innerHTML = `
                <td style="text-align: center;">${item.id}</td>
                <td style="text-align: center;"><code>${item.char}</code></td>
                <td>${item.name}</td>
                <td style="text-align: center;">${item.type}</td>
                <td style="text-align: center;">${item["code point"]}</td>
                <td style="text-align: center;">${item.width}</td>
            `;
            _tbody.appendChild(_tr);
        }

        _unicodeCharactersListSection.appendChild(_table);
    }
}).catch(error => {
    console.error(error);
});
