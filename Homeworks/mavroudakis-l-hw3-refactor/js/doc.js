import { changeDocSVG } from "./svgColor.js";

const initLoop = () => {
    document.querySelector("body").style.width = "100vw";
    if(document.querySelector("#arbitrary-placeholder") == null) document.querySelector("body").style.height = document.querySelector("#root").clientHeight + "px";
    if (count == 0 && document.querySelector("#logo-1") && document.querySelector("#logo-1").style.marginBottom > (document.querySelector("#logo-1").clientHeight * -1)) {
        init();
        run = true;
        count++;
        changeDocSVG();
    }
    else if (!document.querySelector("#logo-1")) {
        run = false;
        count = 0;
    }

    if(run) {
        document.querySelector(".hero-head").style.backgroundColor = "transparent";
        document.querySelector("#logo-1").style.marginBottom = (document.querySelector("#logo-1").clientHeight * -1) + "px";
    }
    //console.log(run)
}

let burgerIcon;
let navbarMenu;
let loop;
let loop2;
let baseState;
let isFixingNav = false;
let run;
let initInterval = setInterval(initLoop, 1);
let count = 0;
let setActiveCount = 0

const init = () => {

    const burgerIcon1 = document.querySelector('.doc-burger');
    const navbarMenu1 = document.querySelector('.navbar-end')

    burgerIcon1.addEventListener('click', () => {
        navbarMenu1.classList.toggle('is-active');
    });

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
    document.querySelector("#doc-logos").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#doc-logos").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    for (let a of document.querySelectorAll("li a")) a.style.color = "hsl(" + (h + 7.5) + "," + (s + 60) + "%," + (l - 40) + "%)";
    for (let a of document.querySelectorAll("h2 a")) a.style.color = "hsl(" + (h + 7.5) + "," + (s + 70) + "%," + (l - 40) + "%)";
}