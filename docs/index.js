const _unicodeCharactersListSection = document.getElementById("unicode-characters-list");

async function fetchDataAndRender(startIndex) {
    await fetch("./src/data.json")
        .then(response => response.json())
        .then(data => {
            const endIndex = Math.min(startIndex + 100, data.length);

            const _header = document.createElement("h3");
            _header.innerText = `${startIndex} - ${endIndex - 1}`;
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

            for (let k = startIndex; k < endIndex; k++) {
                const _tbody = _table.querySelector("tbody");
                const item = data[k];
                let _tr = document.createElement("tr");
                _tr.onmouseover = () => {
                    _tr.style.backgroundColor = "#f0f0f0";
                }
                _tr.onmouseout = () => {
                    _tr.style.backgroundColor = "transparent";
                }
                _tr.className = `char-${k} char-\\u${k.toString(16)}`;
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
        })
        .catch(error => {
            console.error(error);
        });
}

function lazyLoadData() {
    let startIndex = 0;
    fetchDataAndRender(startIndex);

    let flag = true

    document.addEventListener("scroll", async function () {
        const lastRow = document.querySelector("footer")
        const lastRowOffset = lastRow.offsetTop + lastRow.clientHeight;
        const pageOffset = window.scrollY + window.innerHeight;

        if (pageOffset > lastRowOffset + 10 && flag) {
            startIndex += 100;
            flag = false;
            await fetchDataAndRender(startIndex);
            flag = true;
        }
    });
}

lazyLoadData();
