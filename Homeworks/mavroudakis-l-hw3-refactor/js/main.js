import Color from "https://colorjs.io/dist/color.js";
import { changeSVG } from "./svgColor.js";
import { tutorialStart, tutorialPage2, tutorialPage3, tutorialPage4, tutorialPage5, tutorialPage6, tutorialPage7, tutorialPage8, tutorialPage9 } from "./tutorial.js";
import { runAPI, startGame, incrementRound, endGame, backToMenu } from "./transitions.js";
import { setGuess, updateButtons, reloadHistory, reloadHistoryColors, findNth } from "./history.js";
import { vetClue, updateHighOrLow, highOrLow } from "./analysis.js";
import { foreverLoop, gameLoop, setSiteColor } from "./backend.js";

//Define variables
let theAPIData;
let colorDiscRadius;
let theColor;
let answerColor;
let colorDistance;
let round;
let matchEndOrientation;
let firstRoundOrientation;
let fixOtherRatio;
let black;
let white;
let mainLoop;
let loop;
let baseWidth;
let baseHeight;
let colorGuesses;
let viewRound;
let pop;
let whip;
let h;
let s;
let l;
let search;
let colorPicker;
let cpDiv;
let cpRadius;
let cpBorder;
let sldHeight;
let sldMargin;
let sPlaceholder;
let sldHandle;
let historyRound;
let baseColHeight;
let gap;
let gameIsLooping;
let i;
let matches;
let initInterval;
let switchPage;
let degrees;

const initLoop = () => {
    if(document.querySelector("#arbitrary-placeholder") && document.querySelector("#arbitrary-placeholder").clientWidth != 0) {
        init();
    }
    else if (document.querySelector("#arbitrary-placeholder")) {
        document.querySelector("#logos").style.backgroundColor = document.querySelector("body").style.backgroundColor;
        document.querySelectorAll(".is-full")[0].style.backgroundColor = document.querySelector("body").style.backgroundColor;
        document.querySelector("#logos").style.borderColor = document.querySelector("body").style.backgroundColor;
        document.querySelector("#logos").style.color = document.querySelector("body").style.backgroundColor;
        document.querySelector("#tagline").style.color = "#212529";
        document.querySelector("#main-footer").style.color = "#212529";
        document.querySelector("#high-or-low").style.color = "#212529";
        document.querySelector("#values-box").style.color = "#212529";
    }
}

// Runs after API data is fetched; Loads information from API into game system and screen
const loadData = (apiData, theColor) => {
    let title = apiData.colors[0].name;
    //console.log(apiData.colors[0].rgb['r'], apiData.colors[0].rgb['g'], apiData.colors[0].rgb['b']);
    document.querySelector("#the-word").innerHTML = "<img id=\"loading-gif\" src=\"media/Loading.gif\" alt=\"rainbow loading graphic\"> <p id=\"the-clue\" class=\"is-size-2\">Your clue is...<br>\"" + title + "\"</p>";
    //console.log(document.querySelector("#the-word").innerHTML);
    theColor = [255, 255, 255, 0, 100, 100];
    theAPIData = apiData;
}

const resetCPPrefab = (hsl = false) => {

    let color;
    if (hsl) color = "hsl(" + theColor[3] + "," + theColor[4] + "," + theColor[5] + ")";
    else color = "rgb(" + theColor[0] + "," + theColor[1] + "," + theColor[2] + ")";

    //console.log(theColor);

    document.querySelector("#picker").innerHTML = "";
    colorPicker = null;
    cpRadius = document.querySelector("#cp").clientWidth / 2;
    //document.querySelector("#color-picker").innerHTML = "<div id=\"picker\"></div>";

    colorPicker = new window.iro.ColorPicker("#picker", {
        handleRadius: 8,
        width: cpRadius,
        height: cpRadius,
        activeHandleRadius: 10,
        handleUrl: null,
        // handleUrl: "#test",
        display: "block",
        color: color,
        borderWidth: 2,
        borderColor: 'black',
        padding: 8,
        wheelLightness: true,
        layoutDirection: 'vertical',
        // transparency: true,
        layout: [
            {
                id: "wheel",
                component: window.iro.ui.Wheel,
                options: {
                    wheelDirection: 'clockwise',
                    wheelAngle: 0,
                    borderWidth: cpBorder
                }
            },
            {
                id: "1r",
                component: window.iro.ui.Slider,
                options: {
                    sliderType: 'red',
                    layoutDirection: 'vertical',
                    sliderSize: sldHeight,
                    margin: sldMargin,
                    handleRadius: sldHandle
                }
            },
            {
                id: "1g",
                component: window.iro.ui.Slider,
                options: {
                    sliderType: 'green',
                    layoutDirection: 'vertical',
                    sliderSize: sldHeight,
                    margin: 0,
                    handleRadius: sldHandle
                }
            },
            {
                id: "1b",
                component: window.iro.ui.Slider,
                options: {
                    sliderType: 'blue',
                    layoutDirection: 'vertical',
                    sliderSize: sldHeight,
                    margin: 0,
                    handleRadius: sldHandle
                }
            },
            {
                id: "1h",
                component: window.iro.ui.Slider,
                options: {
                    sliderType: 'hue',
                    layoutDirection: 'vertical',
                    sliderSize: sldHeight,
                    margin: 0,
                    handleRadius: sldHandle
                }
            },
            {
                id: "1s",
                component: window.iro.ui.Slider,
                options: {
                    sliderType: 'saturation',
                    layoutDirection: 'vertical',
                    sliderSize: sldHeight,
                    margin: 0,
                    handleRadius: sldHandle
                }
            },
            {
                id: "1l",
                component: window.iro.ui.Slider,
                options: {
                    sliderType: 'value',
                    layoutDirection: 'vertical',
                    sliderSize: sldHeight,
                    margin: 0,
                    handleRadius: sldHandle
                }
            }
        ]
    });
    colorPicker.on(['color:change'], colorUpdate);
    colorUpdate();
}

const colorUpdate = () => {
    theColor = [colorPicker.color.rgb['r'], colorPicker.color.rgb['g'], colorPicker.color.rgb['b'], colorPicker.color.hsl['h'], colorPicker.color.hsl['s'], colorPicker.color.hsl['l']];
    document.querySelector("#test-patch").innerHTML = colorPicker.color.hexString.toUpperCase();
    document.querySelector("#test-patch").style.backgroundColor = colorPicker.color.rgbString;
    let text;
    let label = ["r", "g", "b", "h", "s", "l"];
    for (let i = 0; i < 6; i++) {
        switch (i) {
            case 0:
                text = theColor[0];
                break;
            case 1:
                text = theColor[1];
                break;
            case 2:
                text = theColor[2];
                break;
            case 3:
                text = theColor[3];
                break;
            case 4:
                text = theColor[4];
                break;
            case 5:
                text = theColor[5];
                break;
            default:
                break;
        }
        document.querySelector("#" + label[i].toLowerCase() + "-text").innerHTML = text;
    }
    document.querySelector(".IroColorPicker").style.width = (document.querySelector("#left-col").clientWidth / 3) * 2;
    document.querySelector("#picker").style.width = (document.querySelector("#cp").clientWidth / 3) * 2;
    document.querySelector("#color-picker").style.width = (document.querySelector("#cp").clientWidth / 3) * 2;
}

const init = () => {

    document.querySelector("#arbitrary-placeholder").style.width = 0;

    let start = document.querySelector("#start");

    theColor = [255, 255, 255, 0, 100, 100];
    round = 1;
    start.addEventListener("click", () => {

        gameIsLooping = true;
        sldHeight = 45;
        sldMargin = 5;
        cpBorder = 3;
        sldHandle = 11;
        historyRound = 1;

        document.querySelector("#game").style.display = "block";

        if (!document.querySelector("#back-guess").onclick) {
            document.querySelector("#back-guess").onclick = () => {
                viewRound--;
                //console.log(viewRound);
                viewRound = setGuess(viewRound, round, viewRound + 1, colorGuesses, updateHighOrLow, resetCPPrefab);
            };
        }

        if (!document.querySelector("#forward-guess").onclick) {
            document.querySelector("#forward-guess").onclick = () => {
                viewRound++;
                //console.log(viewRound);
                viewRound = setGuess(viewRound, round, viewRound - 1, colorGuesses, updateHighOrLow, resetCPPrefab);
            };
        }

        runAPI(whip, vetClue, pop, loadData, theColor, resetCPPrefab, colorUpdate);
        //console.log(theAPIData);
        startGame(theColor, resetCPPrefab, theAPIData);
        matches++;

        document.querySelector("#rup").onclick = function () {
            if (theColor[0] < 255) {
                theColor[0]++;
                resetCPPrefab();
            }
        }
        document.querySelector("#rdown").onclick = function () {
            if (theColor[0] > 0) {
                theColor[0]--;
                resetCPPrefab();
            }
        }
        document.querySelector("#gup").onclick = function () {
            if (theColor[1] < 255) {
                theColor[1]++;
                resetCPPrefab();
            }
        }
        document.querySelector("#gdown").onclick = function () {
            if (theColor[1] > 0) {
                theColor[1]--;
                resetCPPrefab();
            }
        }
        document.querySelector("#bup").onclick = function () {
            if (theColor[2] < 255) {
                theColor[2]++;
                resetCPPrefab();
            }
        }
        document.querySelector("#bdown").onclick = function () {
            if (theColor[2] > 0) {
                theColor[2]--;
                resetCPPrefab();
            }
        }
        document.querySelector("#hup").onclick = function () {
            if (theColor[3] < 360) {
                theColor[3]++;
                resetCPPrefab(true);
            }
            else {
                theColor[3] = 1;
                resetCPPrefab(true);
            }
        }
        document.querySelector("#hdown").onclick = function () {
            if (theColor[3] > 0) {
                theColor[3]--;
                resetCPPrefab(true);
            }
            else {
                theColor[3] = 359;
                resetCPPrefab(true);
            }
        }
        document.querySelector("#sup").onclick = function () {
            if (theColor[4] < 100) {
                // Consider making saturation function
                theColor[4]++;
                resetCPPrefab(true);
                // console.log(colorPicker.color.hsl['s']);
                // console.log(colorPicker.color.rgb);
                // console.log(colorPicker.color.hsl);
                // console.log(theColor);
                colorUpdate();
            }
        }

        document.querySelector("#sdown").onclick = function () {

            if (theColor[4] > 0) {
                theColor[4]--;
                resetCPPrefab(true);

                // console.log(colorPicker.color.hsl['s']);
                // console.log(colorPicker.color.rgb);
                // console.log(colorPicker.color.hsl);
                // console.log(theColor);
                colorUpdate();
            }
        }
        document.querySelector("#lup").onclick = function () {
            if (theColor[5] < 100) {
                theColor[5]++;
                resetCPPrefab(true);
                colorUpdate();
            }
        }
        document.querySelector("#ldown").onclick = function () {
            if (theColor[5] > 0) {
                theColor[5]--;
                resetCPPrefab(true);
                colorUpdate();
            }
        }
    });

    pop = new Audio("media/Pop.mp3");
    whip = new Audio("media/Whip.mp3");

    matches = 0;

    loop = setInterval(() => { [gameIsLooping, baseColHeight, baseWidth, baseHeight] = gameLoop(gameIsLooping, resetCPPrefab, gap, round, l, baseColHeight, baseWidth, baseHeight, theColor) }, 1);

    document.querySelector("#guess-button").onclick = () => {
        [theColor, round, historyRound, viewRound, colorGuesses, gameIsLooping, answerColor] = incrementRound(theAPIData, pop, answerColor, highOrLow, theColor, colorGuesses, round, historyRound, viewRound, updateHighOrLow, resetCPPrefab, setGuess, gameIsLooping, colorPicker, colorUpdate, reloadHistory, reloadHistoryColors)
    };

    // document.querySelector("#here,pvlp").onclick = tutorialStart;
    black = new Color("rgb(0,0,0)");
    white = new Color("rgb(128,128,128)");
    document.querySelector("#back-to-menu").onclick = () => { backToMenu(whip, round) };
    document.querySelector("#change-color").onclick = () => {
        document.querySelector("#s").style.display = "none";
        setSiteColor(h, s, l, changeSVG);
    };
    mainLoop = setInterval(() => { foreverLoop(gameIsLooping) }, 1);
    baseWidth = document.innerWidth;
    baseHeight = document.innerHeight;
    colorGuesses = new Array(10);
    viewRound = 1;
    h = 0;
    s = 0;
    l = 0;
    gap = -4;
    gameIsLooping = false;
    i = 1;

    const burgerIcon = document.querySelector('#burger');
    const navbarMenu = document.querySelector('#nav-links')

    burgerIcon.addEventListener('click', () => {
        navbarMenu.classList.toggle('is-active');
    });

    setSiteColor(h, s, l, changeSVG);

    reloadHistory();

    reloadHistoryColors(i, h, s, l);
}

initInterval = setInterval(initLoop, 1);