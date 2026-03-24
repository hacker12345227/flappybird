const list = document.getElementById("scoreList");

// Haal alle gebruikers en scores
let users = JSON.parse(localStorage.getItem("users")) || {};
let scores = [];

// Maak array met best score van elke gebruiker
for (let name in users) {
    let best = users[name].scores ? users[name].scores[0] : 0;
    scores.push({name, score: best});
}

// Sorteer aflopend
scores.sort((a, b) => b.score - a.score);

// Render scores
scores.forEach(s => {
    let li = document.createElement("li");
    li.textContent = `${s.name} - ${s.score}`;
    list.appendChild(li);
});

// Menu toggle
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.onclick = () => {
    menu.style.left = menu.style.left === "0px" ? "-220px" : "0px";
};
