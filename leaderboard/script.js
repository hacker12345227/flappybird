const scoreList = document.getElementById("scoreList");

let scores = JSON.parse(localStorage.getItem("flappyScores")) || [];

scores.forEach(score => {
    let li = document.createElement("li");
    li.textContent = score;
    scoreList.appendChild(li);
});

// menu
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", () => {
    menu.style.left = (menu.style.left === "0px") ? "-200px" : "0px";
});
