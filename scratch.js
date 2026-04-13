const fs = require('fs');
const en = JSON.parse(fs.readFileSync('ENlocations.json')).data;

const targets = ["North Gaza", "Gaza City", "Deir al-Balah", "Khan Yunis", "Rafah"];
const map = {};

function search(nodes) {
  for (const node of nodes) {
    for (const t of targets) {
      if (node.name.toLowerCase().replace(/[^a-z]/g, '') === t.toLowerCase().replace(/[^a-z]/g, '') ||
          node.name.toLowerCase().includes(t.split(' ')[0].toLowerCase())) {
        if (!map[t]) map[t] = node.id;
      }
    }
    if (node.children) {
      search(node.children);
    }
  }
}
search(en);
console.log(map);
