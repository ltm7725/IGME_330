//Sets historyPatch to the color from the numbered guess provided
const setGuess = (historyRound, round, viewRound, colorGuesses, updateHighOrLow, resetCPPrefab) => {
    if (historyRound > round - 1 || historyRound < 1) {
        return viewRound;
    }
    else viewRound = historyRound;

    updateButtons(historyRound, round, colorGuesses);

    updateHighOrLow(historyRound, colorGuesses, resetCPPrefab);

    document.querySelector("#history-patch").style.backgroundColor = "rgb(" + colorGuesses[historyRound - 1][0] + "," + colorGuesses[historyRound - 1][1] + "," + colorGuesses[historyRound - 1][2] + ")";
    document.querySelector("#history-patch p").innerHTML = historyRound + "/10";

    if (colorGuesses[historyRound - 1][5] < 50) {
        document.querySelector("#history-patch").style.color = "rgb(221, 221, 221)";
        document.querySelector("#history-patch").style.borderColor = "rgb(155, 155, 155)";
    }
    else {
        document.querySelector("#history-patch").style.color = "rgb(34, 34, 34)";
        document.querySelector("#history-patch").style.borderColor = "rgb(100, 100, 100)";
    }

    return viewRound;
}

//Prints the correct buttons on historyDiv
const updateButtons = (num, round, colorGuesses) => {
    console.log(colorGuesses[0][5]);
    if (num == 1 && round == 2) {
        document.querySelector("#back-guess").style.cursor = "default";
        document.querySelector("#forward-guess").style.cursor = "default";
        if (colorGuesses[num - 1][5] < 50) {
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
        if (colorGuesses[num - 1][5] < 50) {
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
        if (colorGuesses[num - 1][5] < 50) {
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
        if (colorGuesses[num - 1][5] < 50) {
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
        let radius = 10;
        for (let j = i; j > 0; j--) {
            let mainDiv = document.createElement("div");
            let color1 = document.createElement("div");
            color1.style.borderTopLeftRadius = radius + "rem";
            color1.style.borderTopRightRadius = radius + "rem";
            let color2 = document.createElement("div");
            color2.style.borderBottomLeftRadius = radius + "rem";
            color2.style.borderBottomRightRadius = radius + "rem";
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let distance = localStorage.getItem(j.toString());
            p1.innerHTML = "<u>Game " + j.toString() + "</u>";
            p1.classList.add("is-size-2");
            p1.classList.add("mt-2");
            p2.innerHTML = "\"" + localStorage.getItem(j.toString() + "k") + "\"<br><i>" + distance + "% Away</i>";
            p2.classList.add("is-size-4");
            p2.classList.add("history-text");
            let g = new String(localStorage.getItem(j.toString() + "g"));
            let r = new String(localStorage.getItem(j.toString() + "r"));
            color1.style.backgroundColor = "rgb(" + g.substring(0, g.indexOf(",")) + ", " + g.substring(findNth(g, ",", 1) + 1, findNth(g, ",", 2)) + ", " + g.substring(findNth(g, ",", 2) + 1) + ")";
            color2.style.backgroundColor = "rgb(" + r.substring(0, r.indexOf(",")) + ", " + r.substring(findNth(r, ",", 1) + 1, findNth(r, ",", 2)) + ", " + r.substring(findNth(r, ",", 2) + 1) + ")";
            mainDiv.appendChild(p1);
            mainDiv.appendChild(color1);
            mainDiv.appendChild(color2);
            mainDiv.appendChild(p2);
            if (j < 3) mainDiv.style.marginBottom = "2rem";
            document.querySelector("#history").appendChild(mainDiv);
            // console.log("added to history");
        }
    }
}

// Adds the appropriate border to each game result div's inner color divs
const reloadHistoryColors = (i, h, s, l) => {
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

// Finds the Nth occurrence of a given character in a string; returns index
const findNth = (string, char, num) => {
    //let arr = [];
    let occurrence = 0

    for (let i = 0; i < string.length; i++) {
        if (string[i] == char) {
            occurrence++;
            if (occurrence == num) return i;
        }
    }

    return -1;
}


export {setGuess, updateButtons, reloadHistory, reloadHistoryColors, findNth};