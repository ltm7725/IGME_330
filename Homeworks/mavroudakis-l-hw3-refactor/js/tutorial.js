
// Obsolete as of now, but could revamp

//Walkthrough of the game's functions in slideshow form
const tutorialStart = () => {
    pop.play();
    //document.querySelector("#main-menu").style.display = "none";
    document.querySelector("#past-games").style.display = "none";
    document.querySelector("#main-footer").style.display = "none";
    document.querySelector("#game").style.display = "block";
    //document.querySelector("#game").style.position = "absolute";
    document.querySelector("#test-patch").style.backgroundColor = "rgb(" + color.rgb['r'] + ", " + color.rgb['g'] + ", " + color.rgb['b'] + ")";
    document.querySelector("#test-patch").innerHTML = "#FFFFFF";
    document.querySelector("#the-word").innerHTML = "<img id=\"loading-gif\" src=\"media/Loading.gif\" alt=\"rainbow loading graphic\"> <p id=\"the-clue\" class=\"is-size-2\">Your clue is...<br>\"_______\"</p>";
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
    let c = new ColorGuess(parseInt(document.querySelector("#tR").innerHTML), parseInt(document.querySelector("#tG").innerHTML), parseInt(document.querySelector("#tB").innerHTML), parseInt(document.querySelector("#tH").innerHTML), parseInt(document.querySelector("#tS").innerHTML), parseInt(document.querySelector("#tL").innerHTML), document.querySelector("#test-patch").innerHTML.substring(1), outArray[0], outArray[1], outArray[2], outArray[3], outArray[4], outArray[5]);
    //console.log(c);
    colorGuesses[round - 1] = c;
    if (round == 1) firstGuessTransition();
    document.querySelector("#history-patch p").innerHTML = round + "/10";
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
        document.querySelector("#the-word").innerHTML = "<img id=\"loading-gif\" src=\"media/Loading.gif\" alt=\"rainbow loading graphic\"> <p id=\"the-clue\" class=\"is-size-2\">Your clue is...<br>\"_______\"</p>";
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
        document.querySelector("#the-word").innerHTML = "<img id=\"loading-gif\" src=\"media/Loading.gif\" alt=\"rainbow loading graphic\"> <p id=\"the-clue\" class=\"is-size-2\">Your clue is...<br>\"_______\"</p>";

        document.querySelector("#hol").innerHTML = "";
        document.querySelector("#tut-button-4").style.display = "none";
        document.querySelector("#tut-button-5").style.display = "none";
        document.querySelector("#tutorial-screen").style.display = "none";
        document.querySelector("#game").style.display = "none";
        backToMenu();
    }
}

export {tutorialStart, tutorialPage2, tutorialPage3, tutorialPage4, tutorialPage5, tutorialPage6, tutorialPage7, tutorialPage8, tutorialPage9};