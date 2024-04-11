// Get random color
let h = Math.random() * 360 - 5;
let s = 50;
let l = Math.random() * 25 + 50;

document.body.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.body.style.color = "hsl(" + h + "," + s + "%," + (l - 30) + "%)";