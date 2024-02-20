import { getRandomColor, getRandomInt } from "./utils.js";
import { drawRectangle, drawArc, drawLine } from "./canvas-utils.js";

let ctx;
let paused;
let createRectangles;
let createArcs;
let createLines;

// Defines base variables and launches other program startup functions
let init = (play = true) => {
    console.log("page loaded!");

    paused = false;
    createRectangles = true;
    createArcs = true;
    createLines = true;

    let canvas = document.querySelector("canvas");

    ctx = canvas.getContext("2d");

    displayMosaic(ctx);

    setupUI();
    canvas.addEventListener("click", canvasClicked);

    update();
}

// Displays (clears canvas with) design from beginning of Canvas exercise
// (Originally within init; moved so that it can be displayed on screen-clear)
let displayMosaic = (ctx) => {

    ctx.save();

    ctx.lineWidth = 1;

    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, 640, 480);
    drawRectangle(ctx, 0, 0, 640, 480, "white");

    // ctx.fillStyle = "red";
    drawRectangle(ctx, 20, 20, 600, 440, "red");

    // Multiple ways to define color
    // ctx.fillStyle = "#ffff00";
    // ctx.fillStyle = "#ff0";
    // ctx.fillStyle = "rgb(255,255,0,1)";
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(120, 120, 400, 300);

    drawRectangle(ctx, 120, 120, 400, 300, "yellow");

    // Orange; ***Black would be default***
    // ctx.strokeStyle = "rgb(255,128,0,1)";
    // ctx.lineWidth = 20;
    // ctx.strokeRect(120, 120, 400, 300);
    drawRectangle(ctx, 120, 120, 400, 300, "rgb(0,0,0,0)", 20, "rgb(255,128,0,1)");

    // ctx.fillStyle = "orange";
    // ctx.fillRect(80, 80, 200, 150);
    drawRectangle(ctx, 80, 80, 200, 150, "orange", 20);

    // ctx.fillStyle = "rgb(255,192,0,1)";
    // ctx.fillRect(360, 80, 200, 150);
    drawRectangle(ctx, 360, 80, 200, 150, "rgb(255,192,0,1)", 20);

    // ctx.strokeStyle = "rgb(255,192,0,1)";
    // ctx.strokeRect(80, 80, 200, 150);
    drawRectangle(ctx, 80, 80, 200, 150, "rgb(0,0,0,0)", 20, "rgb(255,192,0,1)");

    // ctx.strokeStyle = "orange";
    // ctx.strokeRect(360, 80, 200, 150);
    drawRectangle(ctx, 360, 80, 200, 150, "rgb(0,0,0,0)", 20, "orange");


    // ctx.strokeStyle = "blue";
    // ctx.lineWidth = 3;
    // ctx.beginPath();
    // ctx.rect(120, 120, 400, 300);
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();
    drawRectangle(ctx, 120, 120, 400, 300, "rgb(255,192,0,1)", 3, "blue");

    //lines

    // top-left to bottom-right
    // ctx.strokeStyle = "green";
    // ctx.lineWidth = 20;
    // ctx.beginPath();
    // ctx.moveTo(20, 20); //pen down; background rect start
    // ctx.lineTo(620, 460); //pen over to bottom-right on background rect
    // ctx.closePath();
    // ctx.stroke();
    drawLine(ctx, 20, 20, 620, 460, 20, "green");

    // bottom-left to top-right
    // ctx.beginPath();
    // ctx.moveTo(20, 460);
    // ctx.lineTo(620, 20);
    // ctx.closePath();
    // ctx.stroke();
    drawLine(ctx, 20, 460, 620, 20, 20, "green");

    // Do-it-yourself line
    // ctx.strokeStyle = "blue";
    // ctx.lineWidth = 20; //redundant w/ previous code
    // ctx.beginPath();
    // ctx.moveTo(20, 240);
    // ctx.lineTo(620, 240);
    // ctx.closePath();
    // ctx.stroke();
    drawLine(ctx, 20, 240, 620, 240, 20, "blue");

    // Circle
    // ctx.strokeStyle = "magenta";
    // ctx.lineWidth = 5;
    // ctx.fillStyle = "yellow";
    // ctx.beginPath();
    // ctx.arc(320, 240, 50, 0, Math.PI * 2)
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();
    drawArc(false, ctx, 320, 240, 50, "yellow", 5, "magenta");

    // Semi-circle
    // ctx.strokeStyle = "red";
    // ctx.lineWidth = 3;
    // ctx.fillStyle = "pink";
    // ctx.beginPath();
    // ctx.arc(320, 245, 30, 0, Math.PI)
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();
    drawArc(false, ctx, 320, 245, 30, "pink", 3, "red", 0, Math.PI);

    // Left eye
    // ctx.beginPath();
    // ctx.arc(300, 225, 10, 0, Math.PI * 2)
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();
    drawArc(false, ctx, 300, 225, 10, "pink", 3, "red");

    // Right eye
    // ctx.beginPath();
    // ctx.arc(340, 225, 10, 0, Math.PI * 2)
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();
    drawArc(false, ctx, 340, 225, 10, "pink", 3, "red");

    ctx.restore();
}

// Runs drawRectangle() with random properties (location, width, height, fill/line color, line width)
let drawRandomRect = (ctx) => {
    if (!paused) {
        // Making sure boxes don't clip outside of canvas
        let width = getRandomInt(10, 190);
        let height = getRandomInt(10, 190);
        drawRectangle(ctx, getRandomInt(0, 640 - width), getRandomInt(0, 480 - height), width, height, getRandomColor(), getRandomInt(2, 12), getRandomColor());
    }
}

// Runs drawArc() with random properties (location, radius, fill color, border width, border color)
let drawRandomArc = (ctx) => {
    if (!paused) {
        let radius = getRandomInt(5, 95);
        drawArc(true, ctx, getRandomInt(radius, 640 - radius), getRandomInt(radius, 480 - radius), radius, getRandomColor(), getRandomInt(2, 12), getRandomColor());
    }
}

// Runs drawLine() with random properties (start/end location, length, line width/color)
let drawRandomLine = (ctx) => {
    if (!paused) {
        drawLine(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(2, 12), getRandomColor());
    }
}

// Each frame, runs the respective program to draw a random shape if the respective checkbox is enabled
let update = () => {
    requestAnimationFrame(update);
    if (createRectangles) drawRandomRect(ctx);
    if (createArcs) drawRandomArc(ctx);
    if (createLines) drawRandomLine(ctx);
}

// Connects variables to their html objects, and gives html objects their function triggers
let setupUI = () => {
    let btnPause = document.querySelector("#btn-pause");
    let btnPlay = document.querySelector("#btn-play");
    let btnClear = document.querySelector("#btn-clear");
    let check1 = document.querySelector("#cb-rectangles");
    let check2 = document.querySelector("#cb-arcs");
    let check3 = document.querySelector("#cb-lines");
    btnPause.addEventListener("click", () => { paused = true; });
    btnPlay.addEventListener("click", () => { paused = false; });
    btnClear.addEventListener("click", () => { displayMosaic(ctx); });

    // Added createRectangles/Arcs/Lines booleans' change a bit differently but works the same
    check1.addEventListener("click", () => { createRectangles = check1.checked; });
    check2.addEventListener("click", () => { createArcs = check2.checked; });
    check3.addEventListener("click", () => { createLines = check3.checked; });
}

// When the mouse clicks in canvas, prints mouse location to console
// and if the circle-drawing checkbox is enabled, draws 10 random circles
// near the mouse-click location in a spraypaint effect
let canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX, mouseY);

    let integral = 100;

    // Spraypaint
    if (createArcs) for (let i = 0; i < 10; i++) {

        let radius = getRandomInt(5, 45);
        let lineWidth = getRandomInt(2, 12);

        let minX = mouseX - integral + radius + (lineWidth / 2);
        if (minX - radius - (lineWidth / 2) < 0) minX = radius + (lineWidth / 2);
        let minY = mouseY - integral + radius + (lineWidth / 2);
        if (minY - radius - (lineWidth / 2) < 0) minY = radius + (lineWidth / 2);
        let maxX = mouseX + integral - radius - (lineWidth / 2);
        if (maxX + radius + (lineWidth / 2) > 640) maxX = 640 - radius - (lineWidth / 2);
        let maxY = mouseY + integral - radius - (lineWidth / 2);
        if (maxY + radius + (lineWidth / 2) > 480) maxY = 480 - radius - (lineWidth / 2);

        drawArc(true, ctx, getRandomInt(minX, maxX), getRandomInt(minY, maxY), radius, getRandomColor(), lineWidth, getRandomColor());
    }
}

init();