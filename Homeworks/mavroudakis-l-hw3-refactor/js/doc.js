// Get random color
let h = Math.random() * 360 - 5;
let s = 50;
let l = Math.random() * 25 + 50;

document.body.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.body.style.color = "hsl(" + h + "," + s + "%," + (l - 30) + "%)";
document.querySelector(".hero").style.backgroundColor = "hsl(" + h + "," + (s + 5) + "%," + (l - 15) + "%)";
document.querySelector(".hero-head p").style.color = "hsl(" + h + "," + s + "%," + (l - 40) + "%)";
document.querySelector(".hero-head p").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector(".hero-footer").style.color = "hsl(" + h + "," + s + "%," + (l - 40) + "%)";
document.querySelector(".hero-footer").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#logos").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";


// mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links')

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

setInterval(() => {
    document.querySelector("#logo-1").style.marginBottom = (document.querySelector("#logo-1").clientHeight * -1) + "px";
}, 100);