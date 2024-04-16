import Color from "https://colorjs.io/dist/color.js";
import { changeSVG } from "../libs/svgColor.js";

const resetCPPrefab = (hsl = false) => {

    let color;
    if (hsl) color = "hsl(" + theColor[3] + "," + theColor[4] + "," + theColor[5] + ")";
    else color = "rgb(" + theColor[0] + "," + theColor[1] + "," + theColor[2] + ")";

    colorPicker = null;
    document.querySelector("#color-picker").innerHTML = "<div id=\"picker\"></div>";

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

const colorUpdate = (color) => {
    theColor = [colorPicker.color.rgb['r'], colorPicker.color.rgb['g'], colorPicker.color.rgb['b'], colorPicker.color.hsl['h'], colorPicker.color.hsl['s'], colorPicker.color.hsl['l']];
    document.querySelector("#testPatch").style.backgroundColor = colorPicker.color.rgbString;
    document.querySelector("#testPatch").innerHTML = colorPicker.color.hexString.toUpperCase();
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
    };
}

// Runs when the START button is pressed on the main page; gets data from the API, and switches to Game screen
const startGame = () => {

    document.querySelector("#back-guess").addEventListener("click", () => setGuess(viewRound - 1));
    document.querySelector("#forward-guess").addEventListener("click", () => setGuess(viewRound + 1));

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
            console.log(colorPicker.color.hsl['s']);
            console.log(colorPicker.color.rgb);
            console.log(colorPicker.color.hsl);
            console.log(theColor);
            colorUpdate();
        }
        else {
            theColor[4] = 1;
            resetCPPrefab(true);
            console.log(colorPicker.color.hsl['s']);
            console.log(colorPicker.color.rgb);
            console.log(colorPicker.color.hsl);
            console.log(theColor);
            colorUpdate();
        }
    }

    document.querySelector("#sdown").onclick = function () {

        if (theColor[4] > 0) {
            theColor[4]--;
            resetCPPrefab(true);

            console.log(colorPicker.color.hsl['s']);
            console.log(colorPicker.color.rgb);
            console.log(colorPicker.color.hsl);
            console.log(theColor);
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

    document.querySelector("#loading").style.display = "block";
    whip.play();
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let hex = convertRGBtoHex(r, g, b);
    // console.log(hex);

    $.getJSON('https://api.color.pizza/v1/' + hex.substr(1), (data) => {
        // console.log(data);
        apiData = data;
        let test = vetClue(apiData)
        console.log(test);
        if (test == -1) {
            console.log("looking for another color...");
            startGame();
            return;
        }
        else {
            pop.play();
            document.querySelector("#loading").style.display = "none";
            loadData();
        }
    });

    document.querySelector("#main-menu").style.display = "none";
    document.querySelector("#past-games").style.display = "none";
    document.querySelector("#main-footer").style.display = "none";
    document.querySelector("#game").style.display = "flex";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#game").style.top = (window.innerHeight / 2) - (document.querySelector("#game").clientHeight / 2) + "px";
    document.querySelector("#hsv-map .hsv-cursor").style.top = "50%";
    document.querySelector("#hsv-map .hsv-cursor").style.left = "50%";
    document.querySelector("#testPatch").style.backgroundColor = "rgb(" + theColor[0] + ", " + theColor[1] + ", " + theColor[2] + ")";
    document.querySelector("#testPatch").innerHTML = "#FFFFFF";

    loop = setInterval(() => gameLoop(), 1);
}

//Checks if clue used before, if so skips it
const vetClue = (apiData) => {
    let good = 1;

    if (localStorage.getItem('k1') != null) {
        let i = 1;
        while (localStorage.getItem("k" + i.toString()) != null) {
            if (apiData.colors[0].name == localStorage.getItem("k" + i.toString())) good = -1;
            i++;
        }
    }

    return good;
}

//Walkthrough of the game's functions in slideshow form
const tutorialStart = () => {
    pop.play();
    document.querySelector("#main-menu").style.display = "none";
    document.querySelector("#past-games").style.display = "none";
    document.querySelector("#main-footer").style.display = "none";
    document.querySelector("#game").style.display = "flex";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#testPatch").style.backgroundColor = "rgb(" + color.rgb['r'] + ", " + color.rgb['g'] + ", " + color.rgb['b'] + ")";
    document.querySelector("#testPatch").innerHTML = "#FFFFFF";
    document.querySelector("#the-word").innerHTML = "Your clue is...<br>" + "\"_______\"";
    document.querySelector("#tut-button-1").innerHTML = "Let's do it!";
    loop = setInterval(() => gameLoop(), 1);
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut1.png)";
    document.querySelector("#tutorial-screen").style.display = "block";
    document.querySelector("#tut-button-1").style.display = "block";

    document.querySelector("#tut-button-1").onclick = tutorialPage2;
}

//Actions required to progress through tutorial slideshow
const tutorialPage2 = () => {
    pop.play();
    document.querySelector("#tut-button-2").innerHTML = "Show me the ropes!";
    document.querySelector("#tut-button-1").style.display = "none";
    document.querySelector("#tut-button-2").style.display = "block";
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut2.png)";
    document.querySelector("#tut-button-2").onclick = tutorialPage3;
}

const tutorialPage3 = () => {
    pop.play();
    document.querySelector("#tut-button-2").innerHTML = "Ok, so how do I play?";
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut3.png)";
    document.querySelector("#tut-button-2").onclick = tutorialPage4;
}
const tutorialPage4 = () => {
    pop.play();
    document.querySelector("#tut-button-1").innerHTML = "Next --->";
    document.querySelector("#hsv-map .cover").style.zIndex = "101";
    document.querySelector("#hsv-map .hsv-cursor").style.zIndex = "102";
    document.querySelector("#tut-button-1").style.display = "block";
    document.querySelector("#tut-button-2").style.display = "none";
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut4.png)";
    document.querySelector("#tut-button-1").onclick = tutorialPage5;
}

const tutorialPage5 = () => {
    pop.play();
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut5.png)";
    document.querySelector("#tut-button-1").onclick = tutorialPage6;
}

const tutorialPage6 = () => {
    pop.play();
    document.querySelector("#tut-button-1").style.fontStyle = "italic";
    document.querySelector("#tut-button-1").innerHTML = "Take A Guess";
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut6.png)";
    document.querySelector("#tut-button-1").onclick = tutorialPage7;
}

const tutorialPage7 = () => {
    pop.play();
    document.querySelector("#history-patch").style.display = "block";
    answerColor = new Color("a98rgb-linear", [document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf("(") + 1, document.querySelector("#color-values").innerHTML.indexOf(",")) / 255, document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 2)) / 255, document.querySelector("#color-values").innerHTML.substring(findNth(document.querySelector("#color-values").innerHTML, ",", 2) + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 3)) / 255]);
    theColor = [color.rgb['r'], color.rgb['g'], color.rgb['b'], color.hsl['h'], color.hsl['s'], color.hsl['l']];
    let outArray = highOrLow(answerColor);
    let c = new ColorGuess(parseInt(document.querySelector("#tR").innerHTML), parseInt(document.querySelector("#tG").innerHTML), parseInt(document.querySelector("#tB").innerHTML), parseInt(document.querySelector("#tH").innerHTML), parseInt(document.querySelector("#tS").innerHTML), parseInt(document.querySelector("#tL").innerHTML), document.querySelector("#testPatch").innerHTML.substring(1), outArray[0], outArray[1], outArray[2], outArray[3], outArray[4], outArray[5]);
    console.log(c);
    colorGuesses[round - 1] = c;
    if (round == 1) firstGuessTransition();
    document.querySelector("#history-patch").innerHTML = round + "/10";
    round++;
    viewRound = round;
    setGuess(viewRound - 1);
    document.querySelector("#guess-number").innerHTML = "<u>" + round + " / 10" + "</u>";
    document.querySelector("#distance").innerHTML = "You're " + Color.deltaE(answerColor, theColor, "2000").toFixed(2) + "% away from the color!";
    document.querySelector("#distance").style.display = "block";
    document.querySelector("#high-or-low").style.display = "block";
    document.querySelector("#tut-button-1").style.display = "none";
    document.querySelector("#tut-button-3").innerHTML = "Next --->";
    document.querySelector("#tut-button-3").style.display = "block";
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut7.png)";
    document.querySelector("#tut-button-3").onclick = tutorialPage8;
}

const tutorialPage8 = () => {
    pop.play();
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut8.png)";
    document.querySelector("#tut-button-3").onclick = tutorialPage9;
}

const tutorialPage9 = () => {
    pop.play();
    document.querySelector("#tutorial-screen").style.backgroundImage = "url(media/tut9.png)";
    document.querySelector("#tut-button-3").style.display = "none";
    document.querySelector("#tut-button-4").innerHTML = "Let's go!";
    document.querySelector("#tut-button-5").innerHTML = "Nope, back to menu";
    document.querySelector("#tut-button-4").style.display = "block";
    document.querySelector("#tut-button-5").style.display = "block";
    document.querySelector("#tut-button-4").onclick = function () {
        whip.play();
        round = 1;
        clearInterval(loop);
        colorGuesses = [];
        document.querySelector("#distance").style.display = "none";
        document.querySelector("#history-patch").style.display = "none";
        document.querySelector("#back-guess").style.display = "none";
        document.querySelector("#forward-guess").style.display = "none";
        document.querySelector("#distance").innerHTML = "";
        document.querySelector("#the-word").innerHTML = "Your clue is...<br><br>"
        document.querySelector("#hol").innerHTML = "";
        document.querySelector("#tut-button-4").style.display = "none";
        document.querySelector("#tut-button-5").style.display = "none";
        document.querySelector("#tutorial-screen").style.display = "none";
        startGame();
    };
    document.querySelector("#tut-button-5").onclick = function () {
        whip.play();
        clearInterval(loop);
        round = 1;
        colorGuesses = [];
        document.querySelector("#distance").style.display = "none";
        document.querySelector("#history-patch").style.display = "none";
        document.querySelector("#back-guess").style.display = "none";
        document.querySelector("#forward-guess").style.display = "none";
        document.querySelector("#distance").innerHTML = "";
        document.querySelector("#the-word").innerHTML = "Your clue is...<br><br>"
        document.querySelector("#hol").innerHTML = "";
        document.querySelector("#tut-button-4").style.display = "none";
        document.querySelector("#tut-button-5").style.display = "none";
        document.querySelector("#tutorial-screen").style.display = "none";
        document.querySelector("#game").style.display = "none";
        backToMenu();
    }
}

// Runs after API data is fetched; Loads information from API into game system and screen
const loadData = () => {
    let title = apiData.colors[0].name;
    console.log(apiData.colors[0].rgb['r'], apiData.colors[0].rgb['g'], apiData.colors[0].rgb['b']);
    document.querySelector("#the-word").innerHTML = "Your clue is...<br>\"" + title + "\"";
    theColor = [255, 255, 255, 0, 100, 100];
    setBoxes();
}

//Loop that checks anything that needs to change on a dime
const foreverLoop = () => {

    //console.log(colorPicker.color.hsl['l']);

    const x = window.matchMedia("(min-aspect-ratio: 1000/721)");
    const y = window.matchMedia("(max-height: 490px)");

    //Forgive me... you can't do multiple layouts in a transition like this thru raw css afaik
    if (round > 1) {
        // Set all css positioning for layout unique to certain rounds (round 1 vs not round 1)
        if (!x.matches) {
            document.querySelector("#testPatch").style.top = "19vw";
            document.querySelector("#testPatch").style.left = "52vw";
            document.querySelector("#history-patch").style.top = "37vw";
            document.querySelector("#history-patch").style.left = "76vw";
            //document.querySelector("#sliders").style.top = "48vw";
            //document.querySelector("#sliders").style.left = "-2.5vw";
            document.querySelector("#hsv-map").style.top = "0vw";
            document.querySelector("#hsv-map").style.left = "0vw";
            document.querySelector("#the-word").style.top = "12.4vw";
            document.querySelector("#the-word").style.left = "59vw";
            document.querySelector("#guess-button").style.top = "3.75vw";
            document.querySelector("#guess-button").style.left = "14vw";
            document.querySelector("#tut-button-3").style.top = "5vw";
            document.querySelector("#tut-button-3").style.left = "14vw";
            document.querySelector("#tut-button-1").style.top = "5vw";
            document.querySelector("#tut-button-1").style.left = "14vw";
            document.querySelector("#tut-button-4").style.top = "55vw";
            document.querySelector("#tut-button-4").style.left = "14vw";
            document.querySelector("#tut-button-5").style.top = "52vw";
            document.querySelector("#tut-button-5").style.left = "50vw";
            document.querySelector("#guess-number").style.top = "4vw";
            document.querySelector("#guess-number").style.left = "66.1vw";
            //document.querySelector("#inputs").style.top = "31.45vw";
            //document.querySelector("#inputs").style.left = ".3vw";
            document.querySelector("#sliders-back").style.top = "47.1vw";
            document.querySelector("#sliders-back").style.left = "42vw";
            document.querySelector("#sliders-back").style.width = "13.75vw";
            document.querySelector("#num-back").style.top = "3.5vw";
            document.querySelector("#num-back").style.left = "66vw";
            //document.querySelector("#hideCursorGlitchDiv").style.top = "15vw";
            //document.querySelector("#hideCursorGlitchDiv").style.left = "4.5vw";
            document.querySelector("#arrows").style.top = "25.25vw";
            document.querySelector("#arrows").style.left = "42vw";
            for (let a of document.querySelectorAll(".up")) {
                a.style.marginLeft = ".9vw"
            }
            for (let a of document.querySelectorAll(".down")) {
                a.style.marginLeft = ".9vw"
            }
            for (let a of document.querySelectorAll(".arr-label")) {
                if (matchEndOrientation == 0) {
                    a.style.left = "-6vw";
                    a.style.top = "-0.45vw";
                    a.style.marginTop = "-0.1vw";
                    a.style.bottom = "-1.9vw";
                    a.style.marginBottom = "-3.75vw";
                    a.style.marginRight = "-10vw";
                }
                else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                    if (matchEndOrientation == 4) {
                        a.style.margin = "0";
                        a.style.marginRight = "-20vw";
                        a.style.top = "0.75vw";
                        a.style.left = "-6vw";
                        a.style.marginBottom = "-5.633vw";
                    }
                }
            }
            for (let a of document.querySelectorAll(".arr-text")) {
                if (matchEndOrientation == 0) {
                    a.style.left = "-4.5vw";
                    a.style.top = "-0.1vw";
                    a.style.marginBottom = "-3vw";
                    a.style.marginLeft = "0";
                }
                else if (matchEndOrientation == 2 || matchEndOrientation == 3) {
                    a.style.marginBottom = "-1vw";
                    a.style.left = "1vw";
                }
                else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                    fixOtherRatio = true;
                    if (matchEndOrientation == 4) {
                        a.style.margin = "0";
                        a.style.top = "2.85vw";
                        a.style.left = "-3.625vw";
                        a.style.marginBottom = "0.075vw";
                    }
                }
            }
            if (matchEndOrientation == 0) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "5.1vw";
                document.querySelector("#color-picker").style.marginTop = "-3vw";
            }
            else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "5.33vw";
                if(matchEndOrientation == 4) {
                    document.querySelectorAll(".arr-label")[0].style.marginTop = "4vw";
                }
            }
        }
        else if (x.matches) {
            // if (y.matches) {
            //     document.querySelector("#sliders-back").style.width = (document.body.clientHeight * 1.387 * .1375) + (document.body.clientHeight * 1.387 * .0275) * (.01 * -(document.body.clientHeight - 500)) + "px";
            //     //document.querySelector("#inputs").style.left = (document.body.clientHeight * 1.387 * .015) + (document.body.clientHeight * 1.387 * .01) * (.01 * -(document.body.clientHeight - 500)) + "px";
            //     //document.querySelector("#sliders").style.left = "calc(138.7vh * -.02)";
            //     document.querySelector("#sliders-back").style.left = "calc(138.7vh * .396)";
            //     document.querySelector("#arrows").style.left = (document.body.clientHeight * 1.387 * .43) + (document.body.clientHeight * 1.387 * .02) * (.01 * -(document.body.clientHeight - 500)) + "px";
            //     document.querySelector("#arrows").style.top = "calc(138.7vh * .34)";
            // }

            document.querySelector("#sliders-back").style.width = "calc(138.7vh * .1375)";
            //document.querySelector("#inputs").style.left = "calc(138.7vh * .0275)";
            //document.querySelector("#sliders").style.left = "calc(138.7vh * -.003)";
            document.querySelector("#sliders-back").style.left = "calc(138.7vh * .42)";
            document.querySelector("#arrows").style.left = "calc(138.7vh * .44)";
            document.querySelector("#arrows").style.top = "calc(138.7vh * .338)";

            document.querySelector("#testPatch").style.top = "calc(138.7vh * .19)";
            document.querySelector("#testPatch").style.left = "calc(138.7vh * .54)";
            document.querySelector("#history-patch").style.top = "calc(138.7vh * .37)";
            document.querySelector("#history-patch").style.left = "calc(138.7vh * .76)";
            //document.querySelector("#sliders").style.top = "calc(138.7vh * .48)";
            document.querySelector("#hsv-map").style.top = "0";
            document.querySelector("#hsv-map").style.left = "calc(138.7vh * .019)";
            document.querySelector("#the-word").style.top = "calc(138.7vh * .124)";
            document.querySelector("#the-word").style.left = "calc(138.7vh * .59)";
            document.querySelector("#guess-button").style.top = "calc(138.7vh * .0375)";
            document.querySelector("#guess-button").style.left = "calc(138.7vh * .14)";
            document.querySelector("#tut-button-3").style.top = "calc(138.7vh * .05)";
            document.querySelector("#tut-button-3").style.left = "calc(138.7vh * .14)";
            document.querySelector("#tut-button-4").style.top = "calc(138.7vh * .55)";
            document.querySelector("#tut-button-4").style.left = "calc(138.7vh * .14)";
            document.querySelector("#tut-button-5").style.top = "calc(138.7vh * .52)";
            document.querySelector("#tut-button-5").style.left = "calc(138.7vh * .5)";
            document.querySelector("#guess-number").style.top = "calc(138.7vh * .04)";
            document.querySelector("#guess-number").style.left = "calc(138.7vh * .661)";
            //document.querySelector("#inputs").style.top = "calc(138.7vh * .313)";
            document.querySelector("#sliders-back").style.top = "calc(138.7vh * .471)";
            document.querySelector("#num-back").style.top = "calc(138.7vh * .035)";
            document.querySelector("#num-back").style.left = "calc(138.7vh * .66)";
            //document.querySelector("#hideCursorGlitchDiv").style.top = "calc(138.7vh * .15)";
            //document.querySelector("#hideCursorGlitchDiv").style.left = "calc(138.7vh * .045)";
            for (let a of document.querySelectorAll(".arr-label")) {
                if (matchEndOrientation == 0) {
                    a.style.left = "calc(138.7vh * -.06)";
                    a.style.top = "calc(138.7vh * -0.006)";
                    a.style.marginTop = "calc(138.7vh * .0)";
                    a.style.bottom = "calc(138.7vh * -.019)";
                    a.style.marginBottom = "calc(138.7vh * -.036)";
                    a.style.marginRight = "calc(138.7vh * -.1)";
                }
                if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                    if (matchEndOrientation == 4) {
                        a.style.left = "calc(138.7vh * -.06)";
                        a.style.top = "calc(138.7vh * 0.01675)";
                        a.style.marginBottom = "calc(138.7vh * -0.045625)";
                    }
                }
            }
            for (let a of document.querySelectorAll(".arr-text")) {
                if (matchEndOrientation == 0) {
                    a.style.left = "calc(138.7vh * -.0375)";
                    a.style.top = "calc(138.7vh * -.005)";
                    a.style.marginBottom = "calc(138.7vh * -.0315)";
                    a.style.marginLeft = "calc(138.7vh * -.01)";
                }
                else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                    if (matchEndOrientation == 4) {
                        a.style.left = "calc(138.7vh * -.0375)";
                        a.style.top = "calc(138.7vh * .02833)";
                        a.style.marginBottom = "calc(138.7vh * -0.000533)";
                        if(fixOtherRatio) {
                            a.style.marginBottom = "calc(138.7vh * -0.01)";
                        }
                    }
                }
            }
            if (matchEndOrientation == 0) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "calc(138.7vh * -.035)";
                for (let a of document.querySelectorAll(".up")) {
                    a.style.marginLeft = "calc(138.7vh * .009)"
                }
                for (let a of document.querySelectorAll(".down")) {
                    a.style.marginLeft = "calc(138.7vh * .009)"
                }
                document.querySelector("#color-picker").style.marginTop = "calc(138.7vh * -.03)";
            }
            else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                if (matchEndOrientation == 4) {
                    document.querySelectorAll(".arr-label")[0].style.marginTop = "calc(138.7vh * -.0565)";
                    for (let a of document.querySelectorAll(".up")) {
                        a.style.marginLeft = "calc(138.7vh * .01)"
                    }
                    for (let a of document.querySelectorAll(".down")) {
                        a.style.marginLeft = "calc(138.7vh * .01)"
                    }
                }
            }
        }
    }
    else {
        if (!x.matches) {
            document.querySelector("#testPatch").style.top = "21vw";
            document.querySelector("#testPatch").style.left = "60.5vw";
            //document.querySelector("#sliders").style.top = "41vw";
            //document.querySelector("#sliders").style.left = "-1.5vw";
            document.querySelector("#hsv-map").style.top = "-8vw";
            document.querySelector("#hsv-map").style.left = "0vw";
            document.querySelector("#the-word").style.top = "21vw";
            document.querySelector("#the-word").style.left = "59vw";
            document.querySelector("#guess-button").style.top = "47.5vw";
            document.querySelector("#guess-button").style.left = "59.5vw";
            document.querySelector("#tut-button-1").style.top = "47.5vw";
            document.querySelector("#tut-button-1").style.left = "59.5vw";
            document.querySelector("#tut-button-2").style.top = "47.5vw";
            document.querySelector("#tut-button-2").style.left = "59.5vw";
            document.querySelector("#guess-number").style.top = "13vw";
            document.querySelector("#guess-number").style.left = "66.1vw";
            //document.querySelector("#inputs").style.top = "24.5vw";
            //document.querySelector("#inputs").style.left = "1.5vw";
            document.querySelector("#sliders-back").style.top = "42vw";
            document.querySelector("#sliders-back").style.left = "42vw";
            document.querySelector("#num-back").style.top = "12.75vw";
            document.querySelector("#num-back").style.left = "66vw";
            //document.querySelector("#hideCursorGlitchDiv").style.top = "7.5vw";
            //document.querySelector("#hideCursorGlitchDiv").style.left = "4.5vw";
            document.querySelector("#arrows").style.top = "25.25vw";
            document.querySelector("#arrows").style.left = "43vw";
            document.querySelector("#sliders-back").style.width = "13.75vw";
            for (let a of document.querySelectorAll(".arr-label")) {
                if (matchEndOrientation == 0) {
                    a.style.left = "-7vw";
                    a.style.top = "0";
                    a.style.marginBottom = "-3.25vw";
                }
                else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                    a.style.top = ".85vw";
                    a.style.marginBottom = "-5.45vw";
                    matchEndOrientation = 4;

                    if (matchEndOrientation == 4) {
                        a.style.left = "-6.975vw";
                    }
                }
                else if (matchEndOrientation == 2 || matchEndOrientation == 3) {
                    a.style.margin = "0";
                    a.style.marginRight = "-10vw"
                    a.style.left = "-8vw";
                    a.style.marginLeft = "1vw"
                    a.style.marginBottom = "-5.55vw";
                    a.style.top = ".85vw";
                }
            }
            for (let a of document.querySelectorAll(".arr-text")) {
                if (matchEndOrientation == 0) {
                    a.style.left = "-5vw";
                    a.style.top = "-0.15vw";
                    a.style.marginRight = "-2.75vw";
                }
                else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                    a.style.marginBottom = "0";
                    a.style.top = "2.85vw";
                    if (matchEndOrientation == 4) {
                        a.style.margin = "0";
                        a.style.left = "-4.6vw";
                        a.style.top = "2.9vw";
                    }
                }
                else if (matchEndOrientation == 2 || matchEndOrientation == 3) {
                    a.style.margin = "0";
                    a.style.marginRight = "-1vw";
                    a.style.left = "-5vw";
                    a.style.marginLeft = "0.4vw";
                    a.style.top = "3vw"
                    matchEndOrientation = 3;
                }
            }

            if (matchEndOrientation == 0) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "-0.5vw";
                document.querySelector("#color-picker").style.marginTop = "-8.125vw";
            }
            if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "-1.35vw"
            }
            else if (matchEndOrientation == 2 || matchEndOrientation == 3) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "-1.34vw";
            }

            for (let a of document.querySelectorAll(".up")) {
                a.style.marginLeft = "0";
            }
            for (let a of document.querySelectorAll(".down")) {
                a.style.marginLeft = "0";
            }
        }
        else if (x.matches) {
            if (y.matches) {
                document.querySelector("#sliders-back").style.width = (document.body.clientHeight * 1.387 * .1375) + (document.body.clientHeight * 1.387 * .0275) * (.01 * -(document.body.clientHeight - 490)) + "px";
                //document.querySelector("#inputs").style.left = (document.body.clientHeight * 1.387 * .025) + (document.body.clientHeight * 1.387 * .01)*(.01 * -(document.body.clientHeight - 500)) + "px";
                //document.querySelector("#sliders").style.left = "calc(138.7vh * -.01)";
                document.querySelector("#sliders-back").style.left = "calc(138.7vh * .406)";
                document.querySelector("#arrows").style.left = (document.body.clientHeight * 1.387 * .44) + (document.body.clientHeight * 1.387 * .02) * (.01 * -(document.body.clientHeight - 490)) + "px";
                document.querySelector("#arrows").style.top = "calc(138.7vh * .2525)";
            }
            else {
                document.querySelector("#sliders-back").style.left = "calc(138.7vh * .42)";
                document.querySelector("#sliders-back").style.width = "calc(138.7vh * .1375)";
                document.querySelector("#arrows").style.top = "calc(138.7vh * .2525)";
                document.querySelector("#arrows").style.left = "calc(138.7vh * .45)";
                //document.querySelector("#sliders").style.left = "calc(138.7vh * .004)";
                //document.querySelector("#inputs").style.left = "calc(138.7vh * .037)";
            }

            document.querySelector("#testPatch").style.top = "calc(138.7vh * .21)";
            document.querySelector("#testPatch").style.left = "calc(138.7vh * .624)";
            //document.querySelector("#sliders").style.top = "calc(138.7vh * .41)";
            document.querySelector("#hsv-map").style.top = "calc(138.7vh * -.08)";
            document.querySelector("#hsv-map").style.left = "calc(138.7vh * .019)";
            document.querySelector("#the-word").style.top = "calc(138.7vh * .21)";
            document.querySelector("#the-word").style.left = "calc(138.7vh * .59)";
            document.querySelector("#guess-button").style.top = "calc(138.7vh * .475)";
            document.querySelector("#guess-button").style.left = "calc(138.7vh * .595)";
            document.querySelector("#tut-button-1").style.top = "calc(138.7vh * .475)";
            document.querySelector("#tut-button-1").style.left = "calc(138.7vh * .595)";
            document.querySelector("#tut-button-2").style.top = "calc(138.7vh * .475)";
            document.querySelector("#tut-button-2").style.left = "calc(138.7vh * .595)";
            document.querySelector("#guess-number").style.top = "calc(138.7vh * .13)";
            document.querySelector("#guess-number").style.left = "calc(138.7vh * .661)";
            //document.querySelector("#inputs").style.top = "calc(138.7vh * .245)";
            document.querySelector("#sliders-back").style.top = "calc(138.7vh * .42)";
            document.querySelector("#num-back").style.top = "calc(138.7vh * .1275)";
            document.querySelector("#num-back").style.left = "calc(138.7vh * .66)";
            //document.querySelector("#hideCursorGlitchDiv").style.top = "calc(138.7vh * .075)";
            //document.querySelector("#hideCursorGlitchDiv").style.left = "calc(138.7vh * .045)";
            for (let a of document.querySelectorAll(".arr-label")) {
                if (matchEndOrientation == 0) {
                    a.style.left = "calc(138.7vh * -.07)";
                    a.style.top = "calc(138.7vh * 0)";
                    a.style.marginBottom = "calc(138.7vh * -.0325)";
                }
                else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                    a.style.marginBottom = "calc(138.7vh * -.024)";
                    a.style.top = "calc(138.7vh * 0.0075)";
                    if (matchEndOrientation == 4) {
                        a.style.margin = "0";
                        a.style.left = "calc(138.7vh * -0.07)";
                        a.style.top = "calc(138.7vh * 0.0175)";
                        a.style.marginRight = "calc(138.7vh * -0.2)";
                        a.style.marginTop = "calc(138.7vh * -0.01)";
                        a.style.marginBottom = "calc(138.7vh * -.0445)";
                    }
                }
                else if (matchEndOrientation == 2 || matchEndOrientation == 3) {
                    a.style.margin = "0";
                    a.style.marginLeft = "calc(138.7vh * -.01)"
                    a.style.marginRight = "calc(138.7vh * -.1)";
                    a.style.marginBottom = "calc(138.7vh * -.02385)";
                    a.style.top = "calc(138.7vh * 0.0075)";
                    if (matchEndOrientation == 3) {
                        a.style.left = "calc(138.7vh * -0.05975)";
                        a.style.marginBottom = "calc(138.7vh * -.05533)";
                        a.style.top = "calc(138.7vh * 0.0085)";
                    }
                }
            }
            for (let a of document.querySelectorAll(".arr-text")) {
                if (matchEndOrientation == 0) {
                    a.style.left = "calc(138.7vh * -.0475)";
                    a.style.top = "calc(138.7vh * -.0015)";
                    a.style.marginRight = "calc(138.7vh * -.02)";
                }
                else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                    a.style.top = "calc(138.7vh * -.002)";
                    a.style.left = "calc(138.7vh * -.0425)";
                    if (matchEndOrientation == 4) {
                        a.style.top = "calc(138.7vh * .0275)";
                        a.style.left = "calc(138.7vh * -.0485)";
                    }
                }
                else if (matchEndOrientation == 2 || matchEndOrientation == 3) {
                    a.style.top = "calc(138.7vh * -.002)";
                    a.style.left = "calc(138.7vh * -.0425)";
                    if (matchEndOrientation == 3) {
                        a.style.top = "calc(138.7vh * .03)";
                        a.style.left = "calc(138.7vh * -.05125)";
                    }
                }
            }

            if (matchEndOrientation == 0) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "calc(138.7vh * -.005)";
                document.querySelector("#color-picker").style.marginTop = "calc(138.7vh * -.08)";
            }
            else if (matchEndOrientation == 1 || matchEndOrientation == 4) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "calc(138.7vh * -.024)";
                for (let a of document.querySelectorAll(".down")) {
                    a.style.marginLeft = "0";
                }
                for (let a of document.querySelectorAll(".up")) {
                    a.style.marginLeft = "0";
                }
            }
            else if (matchEndOrientation == 2 || matchEndOrientation == 3) {
                document.querySelectorAll(".arr-label")[0].style.marginTop = "calc(138.7vh * -.013)";
                for (let a of document.querySelectorAll(".down")) {
                    a.style.marginLeft = "0";
                }
                for (let a of document.querySelectorAll(".up")) {
                    a.style.marginLeft = "0";
                }
                if (matchEndOrientation == 3) {
                    document.querySelectorAll(".arr-label")[0].style.marginTop = "calc(138.7vh * -.014)";
                }
            }
        }
    }

    document.querySelector("#tut-button-1").style.lineHeight = document.querySelector("#tut-button-1").clientHeight + "px";
    document.querySelector("#tut-button-3").style.lineHeight = document.querySelector("#tut-button-3").clientHeight + "px";
    document.querySelector("#tut-button-4").style.lineHeight = document.querySelector("#tut-button-4").clientHeight + "px";

    //document.querySelector("#testPatch").style.backgroundColor = "rgb(" + document.querySelector("#tR").innerHTML + "," + document.querySelector("#tG").innerHTML + "," + document.querySelector("#tB").innerHTML + ")";;
    document.querySelector("#guess-button").style.lineHeight = document.querySelector("#guess-button").clientHeight + "px";

    if (window.matchMedia("(min-aspect-ratio: 946/540)").matches && round > 1) {
        document.querySelector("#tut-button-3").style.top = (window.innerHeight * 0.2 / 1.9) - (document.querySelector("#tut-button-3").clientHeight / 2) + "px";
        document.querySelector("#guess-button").style.top = (window.innerHeight * 0.2 / 1.9) - (document.querySelector("#guess-button").clientHeight / 2) + "px";
    }
}

// Runs frequently; checks several things regarding screen layout that can't be updated through css
const gameLoop = () => {

    let x = window.matchMedia("(min-aspect-ratio: 1000/721)");
    // document.querySelector(".IroColorPicker:nth-child(2):after").style.content = "Test";

    if (l <= 50) {
        for (let a of document.querySelectorAll(".up")) a.style.backgroundImage = "url(media/upArrow1.png)";
        for (let a of document.querySelectorAll(".up:hover")) a.style.backgroundImage = "url(media/upArrow2.png)";
        for (let a of document.querySelectorAll(".down")) a.style.backgroundImage = "url(media/downArrow1.png)";
        for (let a of document.querySelectorAll(".down:hover")) a.style.backgroundImage = "url(media/downArrow2.png)";
        for (let a of document.querySelectorAll(".arr-text")) a.style.color = "white";
    }
    else {
        for (let a of document.querySelectorAll(".up")) a.style.backgroundImage = "url(media/upArrow2.png)";
        for (let a of document.querySelectorAll(".up:hover")) a.style.backgroundImage = "url(media/upArrow1.png)";
        for (let a of document.querySelectorAll(".down")) a.style.backgroundImage = "url(media/downArrow2.png)";
        for (let a of document.querySelectorAll(".down:hover")) a.style.backgroundImage = "url(media/downArrow1.png)";
        for (let a of document.querySelectorAll(".arr-text")) a.style.color = "black";
    }

    document.querySelector("#game").style.top = ((window.innerHeight - document.querySelector("#game").clientHeight) / 2) + "px";
    document.querySelector("#tutorial-screen").style.top = ((window.innerHeight - document.querySelector("#game").clientHeight) / 2) + "px";

    if (parseFloat(document.querySelector("#hsv-map .hsv-cursor").style.top.substr(0, document.querySelector("#hsv-map .hsv-cursor").style.top.length - 2)) < document.querySelectorAll("#hsv-map .cover")[0].clientWidth * 0.16 && parseFloat(document.querySelector("#hsv-map .hsv-cursor").style.left.substr(0, document.querySelector("#hsv-map .hsv-cursor").style.left.length - 2)) < document.querySelectorAll("#hsv-map .cover")[0].clientWidth * 0.16) {
        document.querySelector("#hsv-map .hsv-cursor").style.top = document.querySelectorAll("#hsv-map .cover")[0].clientWidth / 2 + "px";
        document.querySelector("#hsv-map .hsv-cursor").style.left = document.querySelectorAll("#hsv-map .cover")[0].clientWidth / 2 + "px";
    }

    if (baseWidth != window.innerWidth || baseHeight != window.innerHeight) {

        if (x.matches) {
            cpRadius = (window.innerHeight * 1.387) * .316;
            sldHeight = (window.innerHeight * 1.387) * .035;
            sldMargin = (window.innerHeight * 1.387) * .01;
            cpBorder = (window.innerHeight * 1.387) * .003;
            sldHandle = (window.innerHeight * 1.387) * .008;
        }
        else {
            cpRadius = window.innerWidth * .316;
            sldHeight = window.innerWidth * .035;
            sldMargin = window.innerWidth * .01;
            cpBorder = window.innerWidth * .003;
            sldHandle = window.innerWidth * .008;
        }

        resetCPPrefab();

        if (round == 1 && document.querySelector("#testPatch").innerHTML == "#FFFFFF") {
            document.querySelector("#hsv-map .hsv-cursor").style.top = document.querySelectorAll("#hsv-map .cover")[0].clientWidth / 2 + "px";
            document.querySelector("#hsv-map .hsv-cursor").style.left = document.querySelectorAll("#hsv-map .cover")[0].clientWidth / 2 + "px";
            document.querySelector(".hsv-barcursor-l").style.top = "0";
            document.querySelector(".hsv-barcursor-r").style.top = "0";
        }

        if (!x.matches) {
            colorDiscRadius = document.querySelector("#hsv-map .cover").clientHeight / 2;
            document.querySelector("#hsv-map .hsv-cursor").style.top = parseFloat(document.querySelector("#hsv-map .hsv-cursor").style.top.substr(0, document.querySelector("#hsv-map .hsv-cursor").style.top.length - 2)) * (window.innerWidth / baseWidth) + "px";
            document.querySelector("#hsv-map .hsv-cursor").style.left = parseFloat(document.querySelector("#hsv-map .hsv-cursor").style.left.substr(0, document.querySelector("#hsv-map .hsv-cursor").style.left.length - 2)) * (window.innerWidth / baseWidth) + "px";
            document.querySelector(".hsv-barcursor-l").style.top = parseFloat(document.querySelector(".hsv-barcursor-l").style.top.substr(0, document.querySelector(".hsv-barcursor-l").style.top.length - 2)) * (window.innerWidth / baseWidth) + "px";
            document.querySelector(".hsv-barcursor-r").style.top = parseFloat(document.querySelector(".hsv-barcursor-r").style.top.substr(0, document.querySelector(".hsv-barcursor-r").style.top.length - 2)) * (window.innerWidth / baseWidth) + "px";
        }
        else if (x.matches) {
            colorDiscRadius = document.querySelector("#hsv-map .cover").clientHeight / 2;
            document.querySelector("#hsv-map .hsv-cursor").style.top = parseFloat(document.querySelector("#hsv-map .hsv-cursor").style.top.substr(0, document.querySelector("#hsv-map .hsv-cursor").style.top.length - 2)) * (window.innerHeight / baseHeight) + "px";
            document.querySelector("#hsv-map .hsv-cursor").style.left = parseFloat(document.querySelector("#hsv-map .hsv-cursor").style.left.substr(0, document.querySelector("#hsv-map .hsv-cursor").style.left.length - 2)) * (window.innerHeight / baseHeight) + "px";
            document.querySelector(".hsv-barcursor-l").style.top = parseFloat(document.querySelector(".hsv-barcursor-l").style.top.substr(0, document.querySelector(".hsv-barcursor-l").style.top.length - 2)) * (window.innerHeight / baseHeight) + "px";
            document.querySelector(".hsv-barcursor-r").style.top = parseFloat(document.querySelector(".hsv-barcursor-r").style.top.substr(0, document.querySelector(".hsv-barcursor-r").style.top.length - 2)) * (window.innerHeight / baseHeight) + "px";

        }

        // console.log("ar change!");
        baseWidth = window.innerWidth;
        baseHeight = window.innerHeight;
    }

    if (document.querySelector("#hol").innerHTML == "") {
        document.querySelector("#high-or-low").style.display = "none";
    }
    else document.querySelector("#high-or-low").style.display = "flex";

    if (document.querySelector("#distance").innerHTML == "") {
        document.querySelector("#distance").style.display = "none";
    }
    else document.querySelector("#distance").style.display = "block";

    if (theColor[5] > 49) {
        document.querySelector("#testPatch").style.color = "rgb(34, 34, 34)";
        document.querySelector("#testPatch").style.borderColor = "rgb(100, 100, 100)";
    }
    else {
        document.querySelector("#testPatch").style.color = "rgb(221, 221, 221)";
        document.querySelector("#testPatch").style.borderColor = "rgb(155, 155, 155)";
    }
}

//Sets historyPatch to the color from the numbered guess provided
const setGuess = (historyRound) => {
    if (historyRound > round - 1 || historyRound < 1) return;
    else viewRound = historyRound;

    updateButtons(historyRound);

    updateHighOrLow(historyRound);

    document.querySelector("#history-patch").style.backgroundColor = "rgb(" + colorGuesses[historyRound - 1][0] + "," + colorGuesses[historyRound - 1][1] + "," + colorGuesses[historyRound - 1][2] + ")";
    document.querySelector("#history-patch").innerHTML = historyRound + "/10";

    if (colorGuesses[historyRound - 1][5] <= 50) {
        document.querySelector("#history-patch").style.color = "rgb(221, 221, 221)";
        document.querySelector("#history-patch").style.borderColor = "rgb(155, 155, 155)";
    }
    else {
        document.querySelector("#history-patch").style.color = "rgb(34, 34, 34)";
        document.querySelector("#history-patch").style.borderColor = "rgb(100, 100, 100)";
    }
}

// Run when the user pressed the Guess button; Increments the round, triggers input analysis and prints color-closeness results to the screen
const incrementRound = () => {

    pop.play();

    answerColor = new Color("rgb(" + apiData.colors[0].rgb['r'] + "," + apiData.colors[0].rgb['g'] + "," + apiData.colors[0].rgb['b'] + ")");
    // answerColor = [document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf("(") + 1, document.querySelector("#color-values").innerHTML.indexOf(",")) / 255, document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 2)) / 255, document.querySelector("#color-values").innerHTML.substring(findNth(document.querySelector("#color-values").innerHTML, ",", 2) + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 3)) / 255];

    console.log

    let outArray = highOrLow(answerColor);

    let c = [theColor[0], theColor[1], theColor[2], theColor[3], theColor[4], theColor[5], document.querySelector("#testPatch").innerHTML.substring(1), outArray[0], outArray[1], outArray[2], outArray[3], outArray[4], outArray[5]];

    //console.log(c);
    colorGuesses[round - 1] = c;

    if (round == 1) firstGuessTransition();

    document.querySelector("#history-patch").innerHTML = round + "/10";

    round++;

    viewRound = round;
    setGuess(viewRound - 1);

    document.querySelector("#guess-number").innerHTML = "<u>" + round + " / 10" + "</u>";

    //console.log(document.querySelector("#color-values").innerHTML.substring(0, document.querySelector("#color-values").innerHTML.indexOf(")") + 1));

    document.querySelector("#distance").innerHTML = "You're " + (new Color("rgb(" + theColor[0] + "," + theColor[1] + "," + theColor[2] + ")").distance(new Color(answerColor), "srgb") * 100 / 1.7320508075688772).toFixed(2) + "% away from the color!";
    updateHighOrLow(round - 1);

    if (round > 10 || new Color("rgb(" + theColor[0] + "," + theColor[1] + "," + theColor[2] + ")").distance(answerColor, "srgb") * 100 == 0) {
        endGame();
        return;
    }
}

//Rearranges game layout to fit appearing elements
const firstGuessTransition = () => {
    clearInterval(loop);

    document.querySelector("#history-patch").style.display = "block";
    document.querySelector("#back-guess").style.display = "block";
    document.querySelector("#forward-guess").style.display = "block";

    if (window.matchMedia("(min-aspect-ratio: 1000/721)").matches) firstRoundOrientation = 2;
    else firstRoundOrientation = 1;  

    updateHighOrLow(1);

    loop = setInterval(() => gameLoop(), 1);
    return;
}

//Changes the text in highOrLow panel to that sharing information of a previous guess
//Interprets information from highOrLow's output array thrown into the ES6 ColorGuess class of objects contained by the colorGuesses array
const updateHighOrLow = (historyRound) => {
    //console.log(colorGuesses);
    let string = "";
    //console.log(colorGuesses[historyRound - 1][7], colorGuesses[historyRound - 1][8], colorGuesses[historyRound - 1][9], colorGuesses[historyRound - 1][10], colorGuesses[historyRound - 1][11], colorGuesses[historyRound - 1][12]);

    string += "<b>Red (" + colorGuesses[historyRound - 1][0] + ")</b>: "
    if (colorGuesses[historyRound - 1][7] == 2) {
        string += "PERFECT!";
    }
    else if (colorGuesses[historyRound - 1][7] == 3) {
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1][7] == 1) {
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Green (" + colorGuesses[historyRound - 1][1] + ")</b>: "
    if (colorGuesses[historyRound - 1][8] == 2) {
        string += "PERFECT!";
    }
    else if (colorGuesses[historyRound - 1][8] == 3) {
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1][8] == 1) {
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Blue (" + colorGuesses[historyRound - 1][2] + ")</b>: "
    if (colorGuesses[historyRound - 1][9] == 2) {
        string += "PERFECT!";
    }
    else if (colorGuesses[historyRound - 1][9] == 3) {
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1][9] == 1) {
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Hue (" + colorGuesses[historyRound - 1][3] + ")</b>: "
    if (colorGuesses[historyRound - 1][10] == 2) {
        string += "PERFECT!";
    }
    else if (colorGuesses[historyRound - 1][10] == 3) {
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1][10] == 1) {
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Saturation (" + colorGuesses[historyRound - 1][4] + ")</b>: "
    if (colorGuesses[historyRound - 1][11] == 2) {
        string += "PERFECT!";
    }
    else if (colorGuesses[historyRound - 1][11] == 3) {
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1][11] == 1) {
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Luminance (" + colorGuesses[historyRound - 1][5] + ")</b>: "
    if (colorGuesses[historyRound - 1][12] == 2) {
        string += "PERFECT!";
    }
    else if (colorGuesses[historyRound - 1][12] == 3) {
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1][12] == 1) {
        string += "High 📈";
    }
    string += "<br>"

    document.querySelector("#hol").innerHTML = string;
}

// Returns an array of values indicating the highOrLow values for RGB/HSL
const highOrLow = (answerObj) => {

    let answer = {
        r: answerObj.r * 255,
        g: answerObj.g * 255,
        b: answerObj.b * 255,
        h: parseInt(answerObj.hsl[0]),
        s: parseInt(answerObj.hsl[1]),
        l: parseInt(answerObj.hsl[2])
    };

    let guess = {
        r: theColor[0],
        g: theColor[1],
        b: theColor[2],
        h: theColor[3],
        s: theColor[4],
        l: theColor[5]
    };

    //console.log(guess, answer);

    let outArray = Array(6);

    if (guess.r == answer.r) {
        outArray[0] = 2;
    }
    else if (guess.r < answer.r) {
        outArray[0] = 3;
    }
    else if (guess.r > answer.r) {
        outArray[0] = 1;
    }
    if (guess.g == answer.g) {
        outArray[1] = 2;
    }
    else if (guess.g < answer.g) {
        outArray[1] = 3;
    }
    else if (guess.g > answer.g) {
        outArray[1] = 1;
    }
    if (guess.b == answer.b) {
        outArray[2] = 2;
    }
    else if (guess.b < answer.b) {
        outArray[2] = 3;
    }
    else if (guess.b > answer.b) {
        outArray[2] = 1;
    }
    if (guess.h == answer.h) {
        outArray[3] = 2;
    }
    else if (guess.h < answer.h) {
        outArray[3] = 3;
    }
    else if (guess.h > answer.h) {
        outArray[3] = 1;
    }
    if (guess.s == answer.s) {
        outArray[4] = 2;
    }
    else if (guess.s < answer.s) {
        outArray[4] = 3;
    }
    else if (guess.s > answer.s) {
        outArray[4] = 1;
    }
    if (guess.l == answer.l) {
        outArray[5] = 2;
    }
    else if (guess.l < answer.l) {
        outArray[5] = 3;
    }
    else if (guess.l > answer.l) {
        outArray[5] = 1;
    }

    return outArray;
}

// Finds the Nth occurrence of a given character in a string; returns index
const findNth = (string, char, num) => {
    let arr = [];
    let occurrence = 0

    for (let i = 0; i < string.length; i++) {
        if (string[i] == char) {
            occurrence++;
            if (occurrence == num) return i;
        }
    }

    return -1;
}

// Analyzes the current color, deciphers whether the player won, and shows appropriate message on gameEnd screen, which this also transitions the page to.
const endGame = () => {
    clearInterval(loop);

    fixOtherRatio = false;

    colorPicker.on(['color:init'], colorUpdate);

    document.querySelector("#testPatch").style.backgroundColor = "rgb(255,255,255)";

    answerColor = new Color("rgb(" + apiData.colors[0].rgb['r'] + "," + apiData.colors[0].rgb['g'] + "," + apiData.colors[0].rgb['b'] + ")");


    answerColor = [answerColor.r * 255, answerColor.g * 255, answerColor.b * 255];

    if (localStorage.getItem('1') == null) {
        let i = 1;
        // console.log(i);

        localStorage.setItem(i.toString(), document.querySelector("#distance").innerHTML.substring(document.querySelector("#distance").innerHTML.indexOf("e") + 2, document.querySelector("#distance").innerHTML.indexOf("%")));
        localStorage.setItem(i.toString() + "g", theColor[0] + "," + theColor[1] + "," + theColor[2]);
        localStorage.setItem(i.toString() + "r", answerColor[0] + "," + answerColor[1] + "," + answerColor[2]);
        localStorage.setItem(i.toString() + "k", apiData.colors[0].name);
        // console.log(localStorage.getItem(i.toString()));
        // console.log(localStorage.getItem(i.toString() + "g"));
        // console.log(localStorage.getItem(i.toString() + "r"));
    }
    else {
        let i = 1;
        while (localStorage.getItem(i.toString()) != null) {
            i++;
        }

        // console.log(i);
        localStorage.setItem(i.toString(), document.querySelector("#distance").innerHTML.substring(document.querySelector("#distance").innerHTML.indexOf("e") + 2, document.querySelector("#distance").innerHTML.indexOf("%")));
        localStorage.setItem(i.toString() + "g", theColor[0] + "," + theColor[1] + "," + theColor[2]);
        localStorage.setItem(i.toString() + "r", answerColor[0] + "," + answerColor[1] + "," + answerColor[2]);
        localStorage.setItem(i.toString() + "k", apiData.colors[0].name);
        // console.log(localStorage.getItem(i.toString()));
        // console.log(localStorage.getItem(i.toString() + "g"));
        // console.log(localStorage.getItem(i.toString() + "r"));
    }

    reloadHistory();
    reloadHistoryColors();

    document.querySelector("#guess-color").style.backgroundColor = "rgb(" + theColor[0] + ", " + theColor[1] + ", " + theColor[2] + ")";
    document.querySelector("#answer-color").style.backgroundColor = "rgb(" + answerColor[0] + ", " + answerColor[1] + ", " + answerColor[2] + ")";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#game").style.top = "-9999px";
    document.querySelector("#distance").innerHTML = "";
    document.querySelector("#end-game").style.display = "flex";
    document.querySelector("#back-guess").style.display = "none";
    document.querySelector("#forward-guess").style.display = "none";
    document.querySelector("#history-patch").style.display = "none";
    if (round > 8) {
        document.querySelector("#end-game p").innerHTML = "Ran out of guesses!"
    }
    else {
        document.querySelector("#end-game p").innerHTML = "You guessed the color!!"
    }

    for (let a of document.querySelectorAll(".down")) a.style.marginBottom = "0";

    theColor = [255, 255, 255, 0, 100, 100];
    resetCPPrefab();

    if (window.matchMedia("(min-aspect-ratio: 1000/721)").matches) {

        matchEndOrientation = 2;
    }
    else {
        matchEndOrientation = 1;
    }
}

//Prints the correct buttons on historyDiv
const updateButtons = (num) => {
    if (num == 1 && round == 2) {
        document.querySelector("#back-guess").style.cursor = "default";
        document.querySelector("#forward-guess").style.cursor = "default";
        if (colorGuesses[num - 1].l <= 50) {
            document.querySelector("#back-guess").style.backgroundImage = "url(media/backEmptyWhite.png)";
            document.querySelector("#forward-guess").style.backgroundImage = "url(media/frwdEmptyWhite.png)";
        }
        else {
            document.querySelector("#back-guess").style.backgroundImage = "url(media/backEmptyBlack.png)";
            document.querySelector("#forward-guess").style.backgroundImage = "url(media/frwdEmptyBlack.png)";
        }
    }
    else if (num == 1 && round != 1) {
        document.querySelector("#back-guess").style.cursor = "default";
        document.querySelector("#forward-guess").style.cursor = "pointer";
        if (colorGuesses[num - 1].l <= 50) {
            document.querySelector("#back-guess").style.backgroundImage = "url(media/backEmptyWhite.png)";
            document.querySelector("#forward-guess").style.backgroundImage = "url(media/frwdClickableWhite.png)";
        }
        else {
            document.querySelector("#back-guess").style.backgroundImage = "url(media/backEmptyBlack.png)";
            document.querySelector("#forward-guess").style.backgroundImage = "url(media/frwdClickableBlack.png)";
        }
    }
    else if (round - 1 == num) {
        document.querySelector("#back-guess").style.cursor = "pointer";
        document.querySelector("#forward-guess").style.cursor = "default";
        if (colorGuesses[num - 1].l <= 50) {
            document.querySelector("#back-guess").style.backgroundImage = "url(media/backClickableWhite.png)";
            document.querySelector("#forward-guess").style.backgroundImage = "url(media/frwdEmptyWhite.png)";
        }
        else {
            document.querySelector("#back-guess").style.backgroundImage = "url(media/backClickableBlack.png)";
            document.querySelector("#forward-guess").style.backgroundImage = "url(media/frwdEmptyBlack.png)";
        }
    }
    else {
        document.querySelector("#back-guess").style.cursor = "pointer";
        document.querySelector("#forward-guess").style.cursor = "pointer";
        if (colorGuesses[num - 1].l <= 50) {
            document.querySelector("#back-guess").style.backgroundImage = "url(media/backClickableWhite.png)";
            document.querySelector("#forward-guess").style.backgroundImage = "url(media/frwdClickableWhite.png)";
        }
        else {
            document.querySelector("#back-guess").style.backgroundImage = "url(media/backClickableBlack.png)";
            document.querySelector("#forward-guess").style.backgroundImage = "url(media/frwdClickableBlack.png)";
        }
    }
}

// Reloads divs at the bottom of the main page to add the newest game results
const reloadHistory = () => {
    document.querySelector("#history").innerHTML = "";

    let i = 1;

    while (localStorage.getItem(i.toString()) != null) {
        i++;
    }

    i--;

    // console.log(i);

    if (i == 0) document.querySelector("#past-games h1").innerHTML = "<i>Check back here for your game history!</i>"
    else {
        document.querySelector("#past-games h1").innerHTML = "↓ <i>Past Games</i> ↓";
        for (let j = i; j > 0; j--) {
            let mainDiv = document.createElement("div");
            let color1 = document.createElement("div");
            let color2 = document.createElement("div");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let distance = localStorage.getItem(j.toString());
            p1.innerHTML = "<u>Game " + j.toString() + "</u>";
            p2.innerHTML = "\"" + localStorage.getItem(j.toString() + "k") + "\"<br><i>" + distance + "% Away</i>";
            color1.style.backgroundColor = "rgb(" + localStorage.getItem(j.toString() + "g").substring(0, localStorage.getItem(j.toString() + "g").indexOf(",")) + ", " + localStorage.getItem(j.toString() + "g").substring(findNth(localStorage.getItem(j.toString() + "g"), ",", 1) + 1, findNth(localStorage.getItem(j.toString() + "g"), ",", 2)) + ", " + localStorage.getItem(j.toString() + "g").substring(findNth(localStorage.getItem(j.toString() + "g"), ",", 2) + 1) + ")";
            color2.style.backgroundColor = "rgb(" + localStorage.getItem(j.toString() + "r").substring(0, localStorage.getItem(j.toString() + "r").indexOf(",")) + ", " + localStorage.getItem(j.toString() + "r").substring(findNth(localStorage.getItem(j.toString() + "r"), ",", 1) + 1, findNth(localStorage.getItem(j.toString() + "r"), ",", 2)) + ", " + localStorage.getItem(j.toString() + "r").substring(findNth(localStorage.getItem(j.toString() + "r"), ",", 2) + 1) + ")";
            mainDiv.appendChild(p1);
            mainDiv.appendChild(color1);
            mainDiv.appendChild(color2);
            mainDiv.appendChild(p2);
            document.querySelector("#history").appendChild(mainDiv);
            // console.log("added to history");
        }
    }
}

// Launched when the button on the gameEnd screen is pressed; transitions back to the Main Menu
const backToMenu = () => {
    whip.play();
    document.querySelector("#end-game").style.display = "none";
    document.querySelector("#main-menu").style.display = "flex";
    document.querySelector("#past-games").style.display = "block";
    document.querySelector("#main-footer").style.display = "block";
    document.querySelector("#game").style.display = "none";
    round = 1;
    historyRound = 1;
    colorGuesses = [];
    document.querySelector("#guess-number").innerHTML = round + " / 10";
    document.querySelector("#hol").innerHTML = "";
    document.querySelector("#the-word").innerHTML = "Your clue is...<br>\"\"";

}

// Updates the number boxes next to the color sliders on the game screen
const setBoxes = () => {
    // document.querySelector("#tR").innerHTML = document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf("(") + 1, document.querySelector("#color-values").innerHTML.indexOf(","));
    // document.querySelector("#tG").innerHTML = document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 2));
    // document.querySelector("#tB").innerHTML = document.querySelector("#color-values").innerHTML.substring(findNth(document.querySelector("#color-values").innerHTML, ",", 2) + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 3));
    // guessColor = new Color("a98rgb-linear", [document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf("(") + 1, document.querySelector("#color-values").innerHTML.indexOf(",")) / 255, document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 2)) / 255, document.querySelector("#color-values").innerHTML.substring(findNth(document.querySelector("#color-values").innerHTML, ",", 2) + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 3)) / 255]);
    // document.querySelector("#tH").innerHTML = document.querySelector("#color-values").innerHTML.substring(findNth(document.querySelector("#color-values").innerHTML, "(", 3) + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 7));
    // document.querySelector("#tS").innerHTML = document.querySelector("#color-values").innerHTML.substring(findNth(document.querySelector("#color-values").innerHTML, ",", 7) + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 8) - 1);
    // document.querySelector("#tL").innerHTML = document.querySelector("#color-values").innerHTML.substring(findNth(document.querySelector("#color-values").innerHTML, ",", 8) + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 9) - 1);
}

// Adds the appropriate border to each game result div's inner color divs
const reloadHistoryColors = () => {
    for (let d of document.querySelectorAll("#history div div")) {
        if (i == 1) {
            d.style.borderTop = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderLeft = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderRight = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderBottom = "none";
            i = 2;
        }
        else {
            d.style.borderBottom = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderLeft = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderRight = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderTop = "none";
            i = 1;
        }
    }
}

// Sets most of the site to a random color's monochrome pallette
const setSiteColor = () => {

    if (h != 0 || l != 0 || s != 0) pop.play();

    // Get random color
    h = Math.random() * 360 - 5;
    s = Math.random() * 35 + 15;
    l = Math.random() * 15 + 45;

    let color = new Color("hsl", [h, s, l]);
    let r = color.srgb[0] * 255;
    let g = color.srgb[1] * 255;
    let b = color.srgb[2] * 255;
    let hex = convertRGBtoHex(r, g, b);

    if (l - 10 <= 50) {
        document.querySelector("#past-games").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    }
    else {
        document.querySelector("#past-games").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 40) + "%)";
    }

    if (l - 15 <= 50) {
        document.querySelector("#main-footer").style.color = "white";
    }
    else {
        document.querySelector("#main-footer").style.color = "black";
    }

    //Unless there's a better way to set CSS through javascript that I'm not aware of, this is necessary unfortunately

    document.querySelector("#main-menu").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#main-footer").style.backgroundColor = "hsl(" + (h + 12.5) + "," + s + "%," + (l - 15) + "%)";
    document.querySelector("#past-games").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
    document.querySelector("#main-menu").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#start").style.backgroundColor = "hsl(" + (h + 7.5) + "," + s + "%," + (l - 20) + "%)";
    document.querySelector("#change-color").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
    document.querySelector("#help").style.backgroundColor = "hsl(" + (h + 12.5) + "," + s + "%," + (l - 10) + "%)";
    document.body.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    //document.querySelector("#hideCursorGlitchDiv").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
    document.querySelector("#sliders-back").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#num-back").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guess-button").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guess-button").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tut-button-1").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tut-button-1").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tut-button-2").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tut-button-2").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tut-button-3").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tut-button-3").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tut-button-4").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tut-button-4").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tut-button-5").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tut-button-5").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#the-word").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#the-word").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#the-word").style.border = "solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#high-or-low").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#distance").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#distance").style.backgroundColor = "white";
    document.querySelector("#guess-color").style.borderLeft = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guess-color").style.borderTop = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guess-color").style.borderBottom = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guess-color").style.borderRight = "none";
    document.querySelector("#answer-color").style.borderRight = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#answer-color").style.borderTop = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#answer-color").style.borderBottom = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#answer-color").style.borderLeft = "none";
    document.querySelector("#game").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
    document.querySelector("#end-game").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
    document.querySelector("#end-game").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 15) + "%)";
    document.querySelector("#end-game button").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#end-game button").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
    document.querySelector("#color-title-1").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#color-title-2").style.color = "hsl(" + h + "," + s + "%," + l + "%)";

    changeSVG();
}

//Define variables
let apiData;
let colorDiscRadius;
let theColor = [255, 255, 255, 0, 100, 100];
let answerColor;
let colorDistance;
let round = 1;
let matchEndOrientation = 0;
let firstRoundOrientation = 0;
let fixOtherRatio = false;
document.querySelector("#start").onclick = startGame;
document.querySelector("#help").onclick = tutorialStart;
document.querySelector("#guess-button").onclick = incrementRound;
let black = new Color("rgb(0,0,0)");
let white = new Color("rgb(128,128,128)");
document.querySelector("#back-to-menu").onclick = backToMenu;
document.querySelector("body").onmousemove = setBoxes;
document.querySelector("body").onmousedown = setBoxes;
document.querySelector("body").onclick = setBoxes;
document.querySelector("#change-color").onclick = setSiteColor;
let mainLoop = setInterval(() => foreverLoop(), 1);
let loop;
let baseWidth = document.innerWidth;
let baseHeight = document.innerHeight;
let colorGuesses = new Array(10);
let viewRound = 1;
let pop = new Audio("media/Pop.mp3");
let whip = new Audio("media/Whip.mp3");
let h = 0;
let s = 0;
let l = 0;
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

reloadHistory();

setSiteColor();

let i = 1;

reloadHistoryColors();

gameLoop();