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


//Changes the text in highOrLow panel to that sharing information of a previous guess
//Interprets information from highOrLow's output array thrown into the ES6 ColorGuess class of objects contained by the colorGuesses array
const updateHighOrLow = (historyRound, colorGuesses, resetCPPrefab) => {
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

    resetCPPrefab();
}

// Returns an array of values indicating the highOrLow values for RGB/HSL
const highOrLow = (answerObj, theColor) => {

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

export {vetClue, updateHighOrLow ,highOrLow};