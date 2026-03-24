const list = document.getElementById("scoreList");

let users = JSON.parse(localStorage.getItem("users")) || {};

// maak array en sorteer
let scores = [];

for (let name in users) {
    let best = users[name].scores[0] || 0;
    scores.push({ name, score: best });
}

scores.sort((a, b) => b.score - a.score);

// render
scores.forEach(s => {
    let li = document.createElement("li");
    li.textContent = s.name + " - " + s.score;
    list.appendChild(li);
});

// menu toggle
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.onclick = () => {
    menu.style.left = menu.style.left === "0px" ? "-220px" : "0px";
};
