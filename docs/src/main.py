# -*- coding: utf-8 -*-

import os
import json
import unicodedata

data = []

for i in range(15000):
    data.append({
        "id": i,
        "char": chr(i),
        "name": unicodedata.name(chr(i), ""),
        "type": unicodedata.category(chr(i)),
        "code point": f"U+{i:04X}",
        "width": 1
    })

with open(os.path.join(os.path.dirname(__file__), "data.json"), "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
    f.close()
