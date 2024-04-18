import { convertRGBtoHex } from "./rgbToHex.js";

const runAPI = (whip, vetClue, pop, loadData, theColor, resetCPPrefab, colorUpdate) => {

    let apiData;

    if (document.querySelector("#loading-gif")) document.querySelector("#loading-gif").style.display = "block";
    whip.play();
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let hex = convertRGBtoHex(r, g, b);
    let arr;
    // console.log(hex);

    $.getJSON('https://api.color.pizza/v1/' + hex.substr(1), (data) => {
        // console.log(data);
        apiData = data;
        let test = vetClue(apiData);
        //console.log(test);
        if (test == -1) {
            console.log("looking for another color...");
            startGame();
            return;
        }
        else {
            pop.play();
            document.querySelector("#loading-gif").style.display = "none";
            loadData(apiData, theColor);
            //console.log(apiData);
        }
    });
}

// Runs when the START button is pressed on the main page; gets data from the API, and switches to Game screen
const startGame = (theColor, resetCPPrefab, apiData) => {

    document.querySelector("#abt").style.display = "none";

    document.querySelector("#main-menu").style.display = "none";
    document.querySelector("#past-games").style.display = "none";
    document.querySelector("#main-footer").style.display = "none";

    //document.querySelector("#game").style.position = "absolute";
    // document.querySelector("#game").style.top = (window.innerHeight / 2) - (document.querySelector("#game").clientHeight / 2) + "px";
    document.querySelector("#test-patch").style.backgroundColor = "rgb(" + theColor[0] + ", " + theColor[1] + ", " + theColor[2] + ")";
    document.querySelector("#test-patch").innerHTML = "#FFFFFF";

    resetCPPrefab();

    document.querySelector(".IroWheel").click();

    return apiData;
}

// Run when the user pressed the Guess button; Increments the round, triggers input analysis and prints color-closeness results to the screen
const incrementRound = (apiData, pop, answerColor, highOrLow, theColor, colorGuesses, round, historyRound, viewRound, updateHighOrLow, resetCPPrefab, setGuess, gameIsLooping, colorPicker, colorUpdate, reloadHistory, reloadHistoryColors) => {

    pop.play();
    answerColor = new Color("rgb(" + apiData.colors[0].rgb['r'] + "," + apiData.colors[0].rgb['g'] + "," + apiData.colors[0].rgb['b'] + ")");
    // answerColor = [document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf("(") + 1, document.querySelector("#color-values").innerHTML.indexOf(",")) / 255, document.querySelector("#color-values").innerHTML.substring(document.querySelector("#color-values").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 2)) / 255, document.querySelector("#color-values").innerHTML.substring(findNth(document.querySelector("#color-values").innerHTML, ",", 2) + 1, findNth(document.querySelector("#color-values").innerHTML, ",", 3)) / 255];

    let outArray = highOrLow(answerColor, theColor);

    let c = [theColor[0], theColor[1], theColor[2], theColor[3], theColor[4], theColor[5], document.querySelector("#test-patch").innerHTML.substring(1), outArray[0], outArray[1], outArray[2], outArray[3], outArray[4], outArray[5]];

    //console.log(c);
    colorGuesses[round - 1] = c;

    if (round == 1) firstGuessTransition(updateHighOrLow, resetCPPrefab, colorGuesses);

    document.querySelector("#history-patch p").innerHTML = round + "/10";

    round++;
    historyRound = round;
    viewRound = round;

    setGuess(viewRound - 1, round, viewRound, colorGuesses, updateHighOrLow, resetCPPrefab);

    viewRound--;

    document.querySelector("#guess-number").innerHTML = "<u>" + round + " / 10" + "</u>";

    //console.log(document.querySelector("#color-values").innerHTML.substring(0, document.querySelector("#color-values").innerHTML.indexOf(")") + 1));

    document.querySelector("#distance").innerHTML = "You're " + (new Color("rgb(" + theColor[0] + "," + theColor[1] + "," + theColor[2] + ")").distance(new Color(answerColor), "srgb") * 100 / 1.7320508075688772).toFixed(2) + "% away from the color!";
    updateHighOrLow(round - 1, colorGuesses, resetCPPrefab);

    if (round > 10 || new Color("rgb(" + theColor[0] + "," + theColor[1] + "," + theColor[2] + ")").distance(answerColor, "srgb") * 100 == 0) {
        endGame(apiData, colorPicker, colorUpdate, answerColor, theColor, reloadHistory, reloadHistoryColors, round, resetCPPrefab);
        theColor = [255, 255, 255, 0, 100, 100];
        round = 1;
        historyRound = 1;
        colorGuesses = [];
        viewRound = 1;
        gameIsLooping = false;
    }

    return [theColor, round, historyRound, viewRound, colorGuesses, gameIsLooping, answerColor];
}

//Rearranges game layout to fit appearing elements
const firstGuessTransition = (updateHighOrLow, resetCPPrefab, colorGuesses) => {

    document.querySelector("#history-patch").style.display = "block";
    document.querySelector("#back-guess").style.display = "block";
    document.querySelector("#forward-guess").style.display = "block";

    updateHighOrLow(1, colorGuesses, resetCPPrefab);

    resetCPPrefab();

    return;
}

// Analyzes the current color, deciphers whether the player won, and shows appropriate message on gameEnd screen, which this also transitions the page to.
const endGame = (apiData, colorPicker, colorUpdate, answerColor, theColor, reloadHistory, reloadHistoryColors, round, resetCPPrefab) => {
    
    colorPicker.on(['color:init'], colorUpdate);

    document.querySelector("#test-patch").style.backgroundColor = "rgb(255,255,255)";

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
    //document.querySelector("#game").style.position = "absolute";
    // document.querySelector("#game").style.top = "-9999px";
    document.querySelector("#distance").innerHTML = "";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#end-game-section").style.display = "block";
    document.querySelector("#end-game").style.display = "flex";
    document.querySelector("#back-guess").style.display = "none";
    document.querySelector("#forward-guess").style.display = "none";
    document.querySelector("#history-patch").style.display = "none";
    if (round > 10) {
        document.querySelector("#end-game p").innerHTML = "Ran out of guesses!"
    }
    else {
        document.querySelector("#end-game p").innerHTML = "You guessed the color!!"
    }

    //for (let a of document.querySelectorAll(".down")) a.style.marginBottom = "0";

    resetCPPrefab();

    
}

// Launched when the button on the gameEnd screen is pressed; transitions back to the Main Menu
const backToMenu = (whip, round) => {
    document.querySelector("#abt").style.display = "block";
    whip.play();
    document.querySelector("#end-game-section").style.display = "none";
    document.querySelector("#end-game").style.display = "none";
    //document.querySelector("#main-menu").style.display = "flex";
    document.querySelector("#past-games").style.display = "block";
    document.querySelector("#main-footer").style.display = "block";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#guess-number").innerHTML = round + " / 10";
    document.querySelector("#hol").innerHTML = "";
    document.querySelector("#the-word").innerHTML = "<img id=\"loading-gif\" src=\"media/Loading.gif\" alt=\"rainbow loading graphic\"> <p id=\"the-clue\" class=\"is-size-2\">Your clue is...<br>\"_______\"</p>";
    document.querySelector("#main-menu").style.display = "block";
}

export {runAPI, startGame, incrementRound, endGame, backToMenu};