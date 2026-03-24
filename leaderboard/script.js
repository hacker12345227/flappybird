const list = document.getElementById("scoreList");

let users = JSON.parse(localStorage.getItem("users")) || {};

for (let name in users) {
    let best = users[name].scores[0] || 0;

    let li = document.createElement("li");
    li.textContent = name + " - " + best;

    list.appendChild(li);
}
