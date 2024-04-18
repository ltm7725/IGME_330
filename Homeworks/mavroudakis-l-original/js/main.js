
//My ES6 Class; used in order to log guessed colors to be viewed on the historyPatch throughout the game
class ColorGuess{
    constructor(r, g, b, h, s, l, hex, cr, cg, cb, ch, cs, cl){
        this.r = r;
        this.g = g;
        this.b = b;
        this.h = h;
        this.s = s;
        this.l = l;
        this.hex = hex;
        this.cr = cr;
        this.cg = cg;
        this.cb = cb;
        this.ch = ch;
        this.cs = cs;
        this.cl = cl;
    }
}

//Define variables
let apiData;
let theColor;
let guessColor;
let colorDistance;
let round = 1;
document.querySelector("#start").onclick = startGame;
document.querySelector("#help").onclick = tutorialStart;
document.querySelector("#guessButton").onclick = incrementRound;
Color.defaults.deltaE = "2000";
let black = new Color("rgb(0,0,0)");
let white = new Color ("rgb(128,128,128)");
document.querySelector("#backToMenu").onclick = backToMenu;
document.querySelector("body").onmousemove = setBoxes;
document.querySelector("body").onmousedown = setBoxes;
document.querySelector("body").onclick = setBoxes;
document.querySelector("#changeColor").onclick = setSiteColor;
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

reloadHistory();

setSiteColor();

let i = 1;

reloadHistoryColors();

gameLoop();

// Runs when the START button is pressed on the main page; gets data from the API, and switches to Game screen
function startGame(){
    document.querySelector("#loading").style.display = "block";
    whip.play();
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let hex = convertRGBtoHex(r,g,b);
    // console.log(hex);

    $.getJSON('https://api.color.pizza/v1/' + hex.substr(1), (data) => {
        // console.log(data);
        apiData = data;
        let test = vetClue(apiData)
        console.log(test);
        if(test == -1){
            console.log("looking for another color...");
            startGame();
            return;
        }
        else{
            pop.play();
            document.querySelector("#loading").style.display = "none";
            loadData();
        }
    });
    
    document.querySelector("#mainMenu").style.display = "none";
    document.querySelector("#pastGames").style.display = "none";
    document.querySelector("#mainFooter").style.display = "none";
    document.querySelector("#game").style.display = "flex";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#game").style.top = (window.innerHeight / 2) - (document.querySelector("#game").clientHeight / 2) + "px";
    document.querySelector("#hsv_map .hsv-cursor").style.top = "50%";
    document.querySelector("#hsv_map .hsv-cursor").style.left = "50%";
    document.querySelector("#testPatch").style.backgroundColor = "rgb(255,255,255)";
    document.querySelector("#testPatch").innerHTML = "#FFFFFF";
    
    loop = setInterval(() => gameLoop(), 1);
}

//Checks if clue used before, if so skips it
function vetClue(apiData){
    let good = 1;

    if(localStorage.getItem('k1') != null){
        let i = 1;
        while(localStorage.getItem("k" + i.toString()) != null){
            if(apiData.colors[0].name == localStorage.getItem("k" + i.toString())) good = -1;
            i++;
        }
    }

    return good;
}

//Walkthrough of the game's functions in slideshow form
function tutorialStart(){
    pop.play();
    document.querySelector("#mainMenu").style.display = "none";
    document.querySelector("#pastGames").style.display = "none";
    document.querySelector("#mainFooter").style.display = "none";
    document.querySelector("#game").style.display = "flex";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#testPatch").style.backgroundColor = "rgb(255,255,255)";
    document.querySelector("#testPatch").innerHTML = "#FFFFFF";
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>" + "\"_______\"";
    document.querySelector("#tutButton1").innerHTML = "Let's do it!";
    loop = setInterval(() => gameLoop(), 1);
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut1.png)";
    document.querySelector("#tutorialScreen").style.display = "block";
    document.querySelector("#tutButton1").style.display = "block";

    document.querySelector("#tutButton1").onclick = tutorialPage2;
}

//Actions required to progress through tutorial slideshow
function tutorialPage2(){
    pop.play();
    document.querySelector("#tutButton2").innerHTML = "Show me the ropes!";
    document.querySelector("#tutButton1").style.display = "none";
    document.querySelector("#tutButton2").style.display = "block";
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut2.png)";
    document.querySelector("#tutButton2").onclick = tutorialPage3;
}

function tutorialPage3(){
    pop.play();
    document.querySelector("#tutButton2").innerHTML = "Ok, so how do I play?";
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut3.png)";
    document.querySelector("#tutButton2").onclick = tutorialPage4;
}
function tutorialPage4(){
    pop.play();
    document.querySelector("#tutButton1").innerHTML = "Next --->";
    document.querySelector("#hsv_map .cover").style.zIndex = "101";
    document.querySelector("#hsv_map .hsv-cursor").style.zIndex = "102";
    document.querySelector("#tutButton1").style.display = "block";
    document.querySelector("#tutButton2").style.display = "none";
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut4.png)";
    document.querySelector("#tutButton1").onclick = tutorialPage5;
}

function tutorialPage5(){
    pop.play();
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut5.png)";
    document.querySelector("#tutButton1").onclick = tutorialPage6;
}

function tutorialPage6(){
    pop.play();
    document.querySelector("#tutButton1").style.fontStyle = "italic";
    document.querySelector("#tutButton1").innerHTML = "Take A Guess";
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut6.png)";
    document.querySelector("#tutButton1").onclick = tutorialPage7;
}

function tutorialPage7(){
    pop.play();
    document.querySelector("#historyPatch").style.display = "block";
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);
    theColor = new Color("a98rgb-linear", [100, 100, 100]);
    let outArray = highOrLow(guessColor, theColor);
    let c = new ColorGuess(parseInt(document.querySelector("#tR").innerHTML), parseInt(document.querySelector("#tG").innerHTML), parseInt(document.querySelector("#tB").innerHTML), parseInt(document.querySelector("#tH").innerHTML), parseInt(document.querySelector("#tS").innerHTML), parseInt(document.querySelector("#tL").innerHTML), document.querySelector("#testPatch").innerHTML.substring(1), outArray[0], outArray[1], outArray[2], outArray[3], outArray[4], outArray[5]);
    colorGuesses[round - 1] = c;
    if(round == 1) firstGuessTransition();
    document.querySelector("#historyPatch").innerHTML = round + "/10";
    round++;
    viewRound = round;
    setGuess(viewRound - 1);
    document.querySelector("#guessNumber").innerHTML = "<u>" + round + " / 10" + "</u>";
    document.querySelector("#distance").innerHTML = "You're " + Color.deltaE(guessColor, theColor, "2000").toFixed(2) + "% away from the color!";
    document.querySelector("#distance").style.display = "block";
    document.querySelector("#highOrLow").style.display = "block";
    document.querySelector("#tutButton1").style.display = "none";
    document.querySelector("#tutButton3").innerHTML = "Next --->";
    document.querySelector("#tutButton3").style.display = "block";
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut7.png)";
    document.querySelector("#tutButton3").onclick = tutorialPage8;
}

function tutorialPage8(){
    pop.play();
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut8.png)";
    document.querySelector("#tutButton3").onclick = tutorialPage9;
}

function tutorialPage9(){
    pop.play();
    document.querySelector("#tutorialScreen").style.backgroundImage = "url(media/tut9.png)";
    document.querySelector("#tutButton3").style.display = "none";
    document.querySelector("#tutButton4").innerHTML = "Let's go!";
    document.querySelector("#tutButton5").innerHTML = "Nope, back to menu";
    document.querySelector("#tutButton4").style.display = "block";
    document.querySelector("#tutButton5").style.display = "block";
    document.querySelector("#tutButton4").onclick = function() {
        whip.play();
        round = 1;
        clearInterval(loop);
        colorGuesses = [];
        document.querySelector("#distance").style.display = "none";
        document.querySelector("#historyPatch").style.display = "none";
        document.querySelector("#backGuess").style.display = "none";
        document.querySelector("#forwardGuess").style.display = "none";
        document.querySelector("#distance").innerHTML = "";
        document.querySelector("#theWord").innerHTML = "Your clue is...<br><br>"
        document.querySelector("#hol").innerHTML = "";
        document.querySelector("#tutButton4").style.display = "none";
        document.querySelector("#tutButton5").style.display = "none";
        document.querySelector("#tutorialScreen").style.display = "none";
        startGame();
    };
    document.querySelector("#tutButton5").onclick = function() {
        whip.play();
        clearInterval(loop);
        round = 1;
        colorGuesses = [];
        document.querySelector("#distance").style.display = "none";
        document.querySelector("#historyPatch").style.display = "none";
        document.querySelector("#backGuess").style.display = "none";
        document.querySelector("#forwardGuess").style.display = "none";
        document.querySelector("#distance").innerHTML = "";
        document.querySelector("#theWord").innerHTML = "Your clue is...<br><br>"
        document.querySelector("#hol").innerHTML = "";
        document.querySelector("#tutButton4").style.display = "none";
        document.querySelector("#tutButton5").style.display = "none";
        document.querySelector("#tutorialScreen").style.display = "none";
        document.querySelector("#game").style.display = "none";
        backToMenu();
    }
}

// Runs after API data is fetched; Loads information from API into game system and screen
function loadData(){
    let title = apiData.colors[0].name;
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>\"" + title + "\"";
    theColor = new Color("a98rgb-linear", [apiData.colors[0].rgb.r / 255, apiData.colors[0].rgb.g / 255, apiData.colors[0].rgb.b / 255]);
    setBoxes();
}

//Loop that checks anything that needs to change on a dime
function foreverLoop(){

    const x = window.matchMedia("(min-aspect-ratio: 1000/721)");
    const y = window.matchMedia("(max-height: 500px)");

    //Forgive me... you can't do multiple layouts in a transition like this thru raw css afaik
    if(round > 1){
        // Set all css positioning for layout unique to certain rounds (round 1 vs not round 1)
        if(!x.matches){
            document.querySelector("#testPatch").style.top = "19vw";
            document.querySelector("#testPatch").style.left = "52vw";
            document.querySelector("#historyPatch").style.top = "37vw";
            document.querySelector("#historyPatch").style.left = "76vw";
            document.querySelector("#sliders").style.top = "48vw";
            document.querySelector("#sliders").style.left = "-2.5vw";
            document.querySelector("#hsv_map").style.top = "0vw";
            document.querySelector("#hsv_map").style.left = "0vw";
            document.querySelector("#theWord").style.top = "12.4vw";
            document.querySelector("#theWord").style.left = "59vw";
            document.querySelector("#guessButton").style.top = "5vw";
            document.querySelector("#guessButton").style.left = "14vw";
            document.querySelector("#tutButton3").style.top = "5vw";
            document.querySelector("#tutButton3").style.left = "14vw";
            document.querySelector("#tutButton1").style.top = "5vw";
            document.querySelector("#tutButton1").style.left = "14vw";
            document.querySelector("#tutButton4").style.top = "55vw";
            document.querySelector("#tutButton4").style.left = "14vw";
            document.querySelector("#tutButton5").style.top = "52vw";
            document.querySelector("#tutButton5").style.left = "50vw";
            document.querySelector("#guessNumber").style.top = "4vw";
            document.querySelector("#guessNumber").style.left = "66.1vw";
            document.querySelector("#inputs").style.top = "31.45vw";
            document.querySelector("#inputs").style.left = ".3vw";
            document.querySelector("#slidersBack").style.top = "50.75vw";
            document.querySelector("#slidersBack").style.left = "41vw";
            document.querySelector("#slidersBack").style.width = "13.75vw";
            document.querySelector("#numBack").style.top = "3.5vw";
            document.querySelector("#numBack").style.left = "66vw";
            document.querySelector("#hideCursorGlitchDiv").style.top = "15vw";
            document.querySelector("#hideCursorGlitchDiv").style.left = "4.5vw";
            document.querySelector("#arrows").style.top = "34vw";
            document.querySelector("#arrows").style.left = "42vw";
        }
        else if(x.matches){
            if(y.matches){
                document.querySelector("#slidersBack").style.width = (document.body.clientHeight * 1.387 * .1375) + (document.body.clientHeight * 1.387 * .0275)*(.01 * -(document.body.clientHeight - 500)) + "px";
                document.querySelector("#inputs").style.left = (document.body.clientHeight * 1.387 * .015) + (document.body.clientHeight * 1.387 * .01)*(.01 * -(document.body.clientHeight - 500)) + "px";
                document.querySelector("#sliders").style.left = "calc(138.7vh * -.02)";
                document.querySelector("#slidersBack").style.left = "calc(138.7vh * .396)";
                document.querySelector("#arrows").style.left = (document.body.clientHeight * 1.387 * .43) + (document.body.clientHeight * 1.387 * .02)*(.01 * -(document.body.clientHeight - 500)) + "px";
                document.querySelector("#arrows").style.top = "calc(138.7vh * .34)";
            }
            else{
                document.querySelector("#slidersBack").style.width = "calc(138.7vh * .1375)";
                document.querySelector("#inputs").style.left = "calc(138.7vh * .0275)";
                document.querySelector("#sliders").style.left = "calc(138.7vh * -.003)";
                document.querySelector("#slidersBack").style.left = "calc(138.7vh * .412)";
                document.querySelector("#arrows").style.left = "calc(138.7vh * .44)";
                document.querySelector("#arrows").style.top = "calc(138.7vh * .338)";
            }
            
            document.querySelector("#testPatch").style.top = "calc(138.7vh * .19)";
            document.querySelector("#testPatch").style.left = "calc(138.7vh * .54)";
            document.querySelector("#historyPatch").style.top = "calc(138.7vh * .37)";
            document.querySelector("#historyPatch").style.left = "calc(138.7vh * .76)";
            document.querySelector("#sliders").style.top = "calc(138.7vh * .48)";
            document.querySelector("#hsv_map").style.top = "0";
            document.querySelector("#hsv_map").style.left = "calc(138.7vh * .019)";
            document.querySelector("#theWord").style.top = "calc(138.7vh * .124)";
            document.querySelector("#theWord").style.left = "calc(138.7vh * .59)";
            document.querySelector("#guessButton").style.top = "calc(138.7vh * .05)";
            document.querySelector("#guessButton").style.left = "calc(138.7vh * .14)";
            document.querySelector("#tutButton3").style.top = "calc(138.7vh * .05)";
            document.querySelector("#tutButton3").style.left = "calc(138.7vh * .14)";
            document.querySelector("#tutButton4").style.top = "calc(138.7vh * .55)";
            document.querySelector("#tutButton4").style.left = "calc(138.7vh * .14)";
            document.querySelector("#tutButton5").style.top = "calc(138.7vh * .52)";
            document.querySelector("#tutButton5").style.left = "calc(138.7vh * .5)";
            document.querySelector("#guessNumber").style.top = "calc(138.7vh * .04)";
            document.querySelector("#guessNumber").style.left = "calc(138.7vh * .661)";
            document.querySelector("#inputs").style.top = "calc(138.7vh * .313)";
            document.querySelector("#slidersBack").style.top = "calc(138.7vh * .5075)";
            document.querySelector("#numBack").style.top = "calc(138.7vh * .035)";
            document.querySelector("#numBack").style.left = "calc(138.7vh * .66)";
            document.querySelector("#hideCursorGlitchDiv").style.top = "calc(138.7vh * .15)";
            document.querySelector("#hideCursorGlitchDiv").style.left = "calc(138.7vh * .045)";
        }
    }
    else
    {
        if(!x.matches){
            document.querySelector("#testPatch").style.top = "21vw";
            document.querySelector("#testPatch").style.left = "60.5vw";
            document.querySelector("#sliders").style.top = "41vw";
            document.querySelector("#sliders").style.left = "-1.5vw";
            document.querySelector("#hsv_map").style.top = "-8vw";
            document.querySelector("#hsv_map").style.left = "0vw";
            document.querySelector("#theWord").style.top = "21vw";
            document.querySelector("#theWord").style.left = "59vw";
            document.querySelector("#guessButton").style.top = "47.5vw";
            document.querySelector("#guessButton").style.left = "59.5vw";
            document.querySelector("#tutButton1").style.top = "47.5vw";
            document.querySelector("#tutButton1").style.left = "59.5vw";
            document.querySelector("#tutButton2").style.top = "47.5vw";
            document.querySelector("#tutButton2").style.left = "59.5vw";
            document.querySelector("#guessNumber").style.top = "13vw";
            document.querySelector("#guessNumber").style.left = "66.1vw";
            document.querySelector("#inputs").style.top = "24.5vw";
            document.querySelector("#inputs").style.left = "1.5vw";
            document.querySelector("#slidersBack").style.top = "43.85vw";
            document.querySelector("#slidersBack").style.left = "42vw";
            document.querySelector("#numBack").style.top = "12.75vw";
            document.querySelector("#numBack").style.left = "66vw";
            document.querySelector("#hideCursorGlitchDiv").style.top = "7.5vw";
            document.querySelector("#hideCursorGlitchDiv").style.left = "4.5vw";
            document.querySelector("#arrows").style.top = "27vw";
            document.querySelector("#arrows").style.left = "43vw";
            document.querySelector("#slidersBack").style.width = "13.75vw";
        }
        else if(x.matches){
            if(y.matches){
                document.querySelector("#slidersBack").style.width = (document.body.clientHeight * 1.387 * .1375) + (document.body.clientHeight * 1.387 * .0275)*(.01 * -(document.body.clientHeight - 500)) + "px";
                document.querySelector("#inputs").style.left = (document.body.clientHeight * 1.387 * .025) + (document.body.clientHeight * 1.387 * .01)*(.01 * -(document.body.clientHeight - 500)) + "px";
                document.querySelector("#sliders").style.left = "calc(138.7vh * -.01)";
                document.querySelector("#slidersBack").style.left = "calc(138.7vh * .406)";
                document.querySelector("#arrows").style.left = (document.body.clientHeight * 1.387 * .44) + (document.body.clientHeight * 1.387 * .02)*(.01 * -(document.body.clientHeight - 500)) + "px";
                document.querySelector("#arrows").style.top = "calc(138.7vh * .273)";
            }
            else{
                document.querySelector("#slidersBack").style.left = "calc(138.7vh * .42)";
                document.querySelector("#slidersBack").style.width = "calc(138.7vh * .1375)";
                document.querySelector("#arrows").style.top = "calc(138.7vh * .27)";
                document.querySelector("#arrows").style.left = "calc(138.7vh * .45)";
                document.querySelector("#sliders").style.left = "calc(138.7vh * .004)";
                document.querySelector("#inputs").style.left = "calc(138.7vh * .037)";
            }

            document.querySelector("#testPatch").style.top = "calc(138.7vh * .21)";
            document.querySelector("#testPatch").style.left = "calc(138.7vh * .624)";
            document.querySelector("#sliders").style.top = "calc(138.7vh * .41)";
            document.querySelector("#hsv_map").style.top = "calc(138.7vh * -.08)";
            document.querySelector("#hsv_map").style.left = "calc(138.7vh * .019)";
            document.querySelector("#theWord").style.top = "calc(138.7vh * .21)";
            document.querySelector("#theWord").style.left = "calc(138.7vh * .59)";
            document.querySelector("#guessButton").style.top = "calc(138.7vh * .475)";
            document.querySelector("#guessButton").style.left = "calc(138.7vh * .595)";
            document.querySelector("#tutButton1").style.top = "calc(138.7vh * .475)";
            document.querySelector("#tutButton1").style.left = "calc(138.7vh * .595)";
            document.querySelector("#tutButton2").style.top = "calc(138.7vh * .475)";
            document.querySelector("#tutButton2").style.left = "calc(138.7vh * .595)";
            document.querySelector("#guessNumber").style.top = "calc(138.7vh * .13)";
            document.querySelector("#guessNumber").style.left = "calc(138.7vh * .661)";
            document.querySelector("#inputs").style.top = "calc(138.7vh * .245)";
            document.querySelector("#slidersBack").style.top = "calc(138.7vh * .4385)";
            document.querySelector("#numBack").style.top = "calc(138.7vh * .1275)";
            document.querySelector("#numBack").style.left = "calc(138.7vh * .66)";
            document.querySelector("#hideCursorGlitchDiv").style.top = "calc(138.7vh * .075)";
            document.querySelector("#hideCursorGlitchDiv").style.left = "calc(138.7vh * .045)";
        }
    }
                
    document.querySelector("#tutButton1").style.lineHeight = document.querySelector("#tutButton1").clientHeight + "px";
    document.querySelector("#tutButton3").style.lineHeight = document.querySelector("#tutButton3").clientHeight + "px";
    document.querySelector("#tutButton4").style.lineHeight = document.querySelector("#tutButton4").clientHeight + "px";

    document.querySelector("#testPatch").style.backgroundColor = "rgb(" + document.querySelector("#tR").innerHTML + "," + document.querySelector("#tG").innerHTML + "," + document.querySelector("#tB").innerHTML + ")";;
    document.querySelector("#guessButton").style.lineHeight = document.querySelector("#guessButton").clientHeight + "px";

    if(x.matches && round > 1){
        if(window.innerHeight <= 520){
            document.querySelector("#tutButton3").style.top = (window.innerHeight * 0.2527 / 2) - (document.querySelector("#tutButton3").clientHeight / 2) + "px";
            document.querySelector("#guessButton").style.top = (window.innerHeight * 0.2527 / 2) - (document.querySelector("#guessButton").clientHeight / 2) + "px";
        }
    }
}

// Runs frequently; checks several things regarding screen layout that can't be updated through css
function gameLoop(){

    if(l <= 50){
        for(let a of document.querySelectorAll(".up")) a.style.backgroundImage = "url(media/upArrow1.png)";
        for(let a of document.querySelectorAll(".up:hover")) a.style.backgroundImage = "url(media/upArrow2.png)";
        for(let a of document.querySelectorAll(".down")) a.style.backgroundImage = "url(media/downArrow1.png)";
        for(let a of document.querySelectorAll(".down:hover")) a.style.backgroundImage = "url(media/downArrow2.png)";
    }
    else{
        for(let a of document.querySelectorAll(".up")) a.style.backgroundImage = "url(media/upArrow2.png)";
        for(let a of document.querySelectorAll(".up:hover")) a.style.backgroundImage = "url(media/upArrow1.png)";
        for(let a of document.querySelectorAll(".down")) a.style.backgroundImage = "url(media/downArrow2.png)";
        for(let a of document.querySelectorAll(".down:hover")) a.style.backgroundImage = "url(media/downArrow1.png)";
    }
    
    document.querySelector("#game").style.top = ((window.innerHeight - document.querySelector("#game").clientHeight) / 2) + "px";
    document.querySelector("#tutorialScreen").style.top = ((window.innerHeight - document.querySelector("#game").clientHeight) / 2) + "px";

    if(parseFloat(document.querySelector("#hsv_map .hsv-cursor").style.top.substr(0, document.querySelector("#hsv_map .hsv-cursor").style.top.length - 2)) < document.querySelectorAll("#hsv_map .cover")[0].clientWidth * 0.16 && parseFloat(document.querySelector("#hsv_map .hsv-cursor").style.left.substr(0, document.querySelector("#hsv_map .hsv-cursor").style.left.length - 2)) < document.querySelectorAll("#hsv_map .cover")[0].clientWidth * 0.16){
        document.querySelector("#hsv_map .hsv-cursor").style.top = document.querySelectorAll("#hsv_map .cover")[0].clientWidth / 2 + "px";
        document.querySelector("#hsv_map .hsv-cursor").style.left = document.querySelectorAll("#hsv_map .cover")[0].clientWidth / 2 + "px";
    }

    if(parseFloat(document.querySelector("#tL").innerHTML) > 50){
        document.querySelector("#testPatch").style.color = "rgb(34, 34, 34)";
        document.querySelector("#testPatch").style.borderColor = "rgb(100, 100, 100)";
    }
    else{
         document.querySelector("#testPatch").style.color = "rgb(221, 221, 221)";
         document.querySelector("#testPatch").style.borderColor = "rgb(155, 155, 155)";
    }
    
    if(baseWidth != window.innerWidth || baseHeight != window.innerHeight){

        let x = window.matchMedia("(min-aspect-ratio: 1000/721)")

        if(round == 1 && document.querySelector("#testPatch").innerHTML == "#FFFFFF"){
            document.querySelector("#hsv_map .hsv-cursor").style.top = document.querySelectorAll("#hsv_map .cover")[0].clientWidth / 2 + "px";
            document.querySelector("#hsv_map .hsv-cursor").style.left = document.querySelectorAll("#hsv_map .cover")[0].clientWidth / 2 + "px";
            document.querySelector(".hsv-barcursor-l").style.top = "0";
            document.querySelector(".hsv-barcursor-r").style.top = "0";
        }

        if(!x.matches){
            colorDiscRadius = document.querySelector("#hsv_map .cover").clientHeight / 2;
            document.querySelector("#hsv_map .hsv-cursor").style.top = parseFloat(document.querySelector("#hsv_map .hsv-cursor").style.top.substr(0, document.querySelector("#hsv_map .hsv-cursor").style.top.length - 2)) * (window.innerWidth / baseWidth) + "px";
            document.querySelector("#hsv_map .hsv-cursor").style.left = parseFloat(document.querySelector("#hsv_map .hsv-cursor").style.left.substr(0, document.querySelector("#hsv_map .hsv-cursor").style.left.length - 2)) * (window.innerWidth / baseWidth) + "px";
            document.querySelector(".hsv-barcursor-l").style.top = parseFloat(document.querySelector(".hsv-barcursor-l").style.top.substr(0, document.querySelector(".hsv-barcursor-l").style.top.length - 2)) * (window.innerWidth / baseWidth) + "px";
            document.querySelector(".hsv-barcursor-r").style.top = parseFloat(document.querySelector(".hsv-barcursor-r").style.top.substr(0, document.querySelector(".hsv-barcursor-r").style.top.length - 2)) * (window.innerWidth / baseWidth) + "px";
        }
        else if(x.matches){
            colorDiscRadius = document.querySelector("#hsv_map .cover").clientHeight / 2;
            document.querySelector("#hsv_map .hsv-cursor").style.top = parseFloat(document.querySelector("#hsv_map .hsv-cursor").style.top.substr(0, document.querySelector("#hsv_map .hsv-cursor").style.top.length - 2)) * (window.innerHeight / baseHeight) + "px";
            document.querySelector("#hsv_map .hsv-cursor").style.left = parseFloat(document.querySelector("#hsv_map .hsv-cursor").style.left.substr(0, document.querySelector("#hsv_map .hsv-cursor").style.left.length - 2)) * (window.innerHeight / baseHeight) + "px";
            document.querySelector(".hsv-barcursor-l").style.top = parseFloat(document.querySelector(".hsv-barcursor-l").style.top.substr(0, document.querySelector(".hsv-barcursor-l").style.top.length - 2)) * (window.innerHeight / baseHeight) + "px";
            document.querySelector(".hsv-barcursor-r").style.top = parseFloat(document.querySelector(".hsv-barcursor-r").style.top.substr(0, document.querySelector(".hsv-barcursor-r").style.top.length - 2)) * (window.innerHeight / baseHeight) + "px";
        }

        // console.log("ar change!");
        baseWidth = window.innerWidth;
        baseHeight = window.innerHeight;  
    }

    if(document.querySelector("#hol").innerHTML == ""){
        document.querySelector("#highOrLow").style.display = "none";
    }
    else document.querySelector("#highOrLow").style.display = "flex";

    if(document.querySelector("#distance").innerHTML == ""){
        document.querySelector("#distance").style.display = "none";
    }
    else document.querySelector("#distance").style.display = "block";
}

//Sets historyPatch to the color from the numbered guess provided
function setGuess(historyRound){
    if(historyRound > round - 1 || historyRound < 1) return;
    else viewRound = historyRound;

    updateButtons(historyRound);

    updateHighOrLow(historyRound);

    document.querySelector("#historyPatch").style.backgroundColor = "rgb(" + colorGuesses[historyRound - 1].r + "," + colorGuesses[historyRound - 1].g + "," + colorGuesses[historyRound - 1].b + ")";
    document.querySelector("#historyPatch").innerHTML = historyRound + "/10";

    if(colorGuesses[historyRound - 1].l <= 50){
        document.querySelector("#historyPatch").style.color = "rgb(221, 221, 221)";
        document.querySelector("#historyPatch").style.borderColor = "rgb(155, 155, 155)";
    }
    else{
        document.querySelector("#historyPatch").style.color = "rgb(34, 34, 34)";
        document.querySelector("#historyPatch").style.borderColor = "rgb(100, 100, 100)";
    }
}

// Run when the user pressed the Guess button; Increments the round, triggers input analysis and prints color-closeness results to the screen
function incrementRound(){

    pop.play();
    
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);

    let outArray = highOrLow(guessColor, theColor);

    let c = new ColorGuess(parseInt(document.querySelector("#tR").innerHTML), parseInt(document.querySelector("#tG").innerHTML), parseInt(document.querySelector("#tB").innerHTML), parseInt(document.querySelector("#tH").innerHTML), parseInt(document.querySelector("#tS").innerHTML), parseInt(document.querySelector("#tL").innerHTML), document.querySelector("#testPatch").innerHTML.substring(1), outArray[0], outArray[1], outArray[2], outArray[3], outArray[4], outArray[5]);
    colorGuesses[round - 1] = c;

    if(round == 1) firstGuessTransition();

    document.querySelector("#historyPatch").innerHTML = round + "/10";

    round++;

    viewRound = round;
    setGuess(viewRound - 1);

    document.querySelector("#guessNumber").innerHTML = "<u>" + round + " / 10" + "</u>";

    document.querySelector("#distance").innerHTML = "You're " + Color.deltaE(guessColor, theColor, "2000").toFixed(2) + "% away from the color!";
    updateHighOrLow(round - 1);
    
    if(round > 10 || Color.deltaE(guessColor, theColor, "2000") == 0){
        endGame();
        return;
    }
}

//Rearranges game layout to fit appearing elements
function firstGuessTransition(){
    clearInterval(loop);
    
    document.querySelector("#historyPatch").style.display = "block";
    document.querySelector("#backGuess").style.display = "block";
    document.querySelector("#forwardGuess").style.display = "block";

    updateHighOrLow(1);

    loop = setInterval(() => gameLoop(), 1);
    return;
}

//Changes the text in highOrLow panel to that sharing information of a previous guess
//Interprets information from highOrLow's output array thrown into the ES6 ColorGuess class of objects contained by the colorGuesses array
function updateHighOrLow(historyRound){
    let string = "";

    string += "<b>Red (" + colorGuesses[historyRound - 1].r + ")</b>: "
    if(colorGuesses[historyRound - 1].cr == 2){
        string += "PERFECT!";
    }
    else if(colorGuesses[historyRound - 1].cr == 3){
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1].cr == 1){
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Green (" + colorGuesses[historyRound - 1].g + ")</b>: "
    if(colorGuesses[historyRound - 1].cg == 2){
        string += "PERFECT!";
    }
    else if(colorGuesses[historyRound - 1].cg == 3){
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1].cg == 1){
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Blue (" + colorGuesses[historyRound - 1].b + ")</b>: "
    if(colorGuesses[historyRound - 1].cb == 2){
        string += "PERFECT!";
    }
    else if(colorGuesses[historyRound - 1].cb == 3){
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1].cb == 1){
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Hue (" + colorGuesses[historyRound - 1].h + ")</b>: "
    if(colorGuesses[historyRound - 1].ch == 2){
        string += "PERFECT!";
    }
    else if(colorGuesses[historyRound - 1].ch == 3){
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1].ch == 1){
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Saturation (" + colorGuesses[historyRound - 1].s + ")</b>: "
    if(colorGuesses[historyRound - 1].cs == 2){
        string += "PERFECT!";
    }
    else if(colorGuesses[historyRound - 1].cs == 3){
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1].cs == 1){
        string += "High 📈";
    }
    string += "<br>"
    string += "<b>Luminance (" + colorGuesses[historyRound - 1].l + ")</b>: "
    if(colorGuesses[historyRound - 1].cl == 2){
        string += "PERFECT!";
    }
    else if(colorGuesses[historyRound - 1].cl == 3){
        string += "Low 📉";
    }
    else if (colorGuesses[historyRound - 1].cl == 1){
        string += "High 📈";
    }
    string += "<br>"

    document.querySelector("#hol").innerHTML = string;
}

// Returns an array of values indicating the highOrLow values for RGB/HSL
function highOrLow(guess, answer){

    let outArray = Array(6);

    if(guess.r * 255 == answer.r * 255){
        outArray[0] = 2;
    }
    else if(guess.r < answer.r){
        outArray[0] = 3;
    }
    else if (guess.r > answer.r){
        outArray[0] = 1;
    }
    if(guess.g * 255 == answer.g * 255){
        outArray[1] = 2;
    }
    else if(guess.g < answer.g){
        outArray[1] = 3;
    }
    else if (guess.g > answer.g){
        outArray[1] = 1;
    }
    if(guess.b * 255 == answer.b * 255){
        outArray[2] = 2;
    }
    else if(guess.b < answer.b){
        outArray[2] = 3;
    }
    else if (guess.b > answer.b){
        outArray[2] = 1;
    }
    if(guess.hsl[0] == answer.hsl[0]){
        outArray[3] = 2;
    }
    else if(guess.hsl[0] < answer.hsl[0]){
        outArray[3] = 3;
    }
    else if (guess.hsl[0] > answer.hsl[0]){
        outArray[3] = 1;
    }
    if(guess.hsl[1] == answer.hsl[1]){
        outArray[4] = 2;
    }
    else if(guess.hsl[1] < answer.hsl[1]){
        outArray[4] = 3;
    }
    else if (guess.hsl[1] > answer.hsl[1]){
        outArray[4] = 1;
    }
    if(guess.hsl[2] == answer.hsl[2]){
        outArray[5] = 2;
    }
    else if(guess.hsl[2] < answer.hsl[2]){
        outArray[5] = 3;
    }
    else if (guess.hsl[2] > answer.hsl[2]){
        outArray[5] = 1;
    }

    return outArray;
}

// Finds the Nth occurrence of a given character in a string; returns index
function findNth(string, char, num){
    let arr = [];
    let occurrence = 0

    for(let i = 0; i < string.length; i++){
        if(string[i] == char){
            occurrence++;
            if(occurrence == num) return i;
        }
    }

    return -1;
}

// Analyzes the current color, deciphers whether the player won, and shows appropriate message on gameEnd screen, which this also transitions the page to.
function endGame(){
    clearInterval(loop);
    

    document.querySelector("#testPatch").style.backgroundColor = "rgb(255,255,255)";

    if(localStorage.getItem('1') == null){
        let i = 1;
        // console.log(i);
        localStorage.setItem(i.toString(), document.querySelector("#distance").innerHTML.substring(document.querySelector("#distance").innerHTML.indexOf("e") + 2, document.querySelector("#distance").innerHTML.indexOf("%")));
        localStorage.setItem(i.toString() + "g", guessColor.r * 255 + "," + guessColor.g * 255 + "," + guessColor.b * 255);
        localStorage.setItem(i.toString() + "r", theColor.r * 255 + "," + theColor.g * 255 + "," + theColor.b * 255);
        localStorage.setItem(i.toString() + "k", apiData.colors[0].name);
        // console.log(localStorage.getItem(i.toString()));
        // console.log(localStorage.getItem(i.toString() + "g"));
        // console.log(localStorage.getItem(i.toString() + "r"));
    }
    else{
        let i = 1;
        while(localStorage.getItem(i.toString()) != null){
            i++;
        }
        // console.log(i);
        localStorage.setItem(i.toString(), document.querySelector("#distance").innerHTML.substring(document.querySelector("#distance").innerHTML.indexOf("e") + 2, document.querySelector("#distance").innerHTML.indexOf("%")));
        localStorage.setItem(i.toString() + "g", guessColor.r * 255 + "," + guessColor.g * 255 + "," + guessColor.b * 255);
        localStorage.setItem(i.toString() + "r", theColor.r * 255 + "," + theColor.g * 255 + "," + theColor.b * 255);
        localStorage.setItem(i.toString() + "k", apiData.colors[0].name);
        // console.log(localStorage.getItem(i.toString()));
        // console.log(localStorage.getItem(i.toString() + "g"));
        // console.log(localStorage.getItem(i.toString() + "r"));
    }

    reloadHistory();
    reloadHistoryColors();

    document.querySelector("#guessColor").style.backgroundColor = "rgb(" + guessColor.r * 255 + ", " + guessColor.g * 255 + ", " + guessColor.b * 255 + ")";
    document.querySelector("#answerColor").style.backgroundColor = "rgb(" + theColor.r * 255 + ", " + theColor.g * 255 + ", " + theColor.b * 255 + ")";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#game").style.top = "-9999px";
    document.querySelector("#distance").innerHTML = "";
    document.querySelector("#endGame").style.display = "flex";
    document.querySelector("#backGuess").style.display = "none";
    document.querySelector("#forwardGuess").style.display = "none";
    document.querySelector("#historyPatch").style.display = "none";
    if(round > 8){
        document.querySelector("#endGame p").innerHTML = "Ran out of guesses!"
    }
    else{
        document.querySelector("#endGame p").innerHTML = "You guessed the color!!"
    }
}

//Prints the correct buttons on historyDiv
function updateButtons(num){
    if(num == 1 && round == 2){
        document.querySelector("#backGuess").style.cursor = "default";
        document.querySelector("#forwardGuess").style.cursor = "default";
        if(colorGuesses[num - 1].l <= 50){
            document.querySelector("#backGuess").style.backgroundImage = "url(media/backEmptyWhite.png)";
            document.querySelector("#forwardGuess").style.backgroundImage = "url(media/frwdEmptyWhite.png)";
        }
        else{
            document.querySelector("#backGuess").style.backgroundImage = "url(media/backEmptyBlack.png)";
            document.querySelector("#forwardGuess").style.backgroundImage = "url(media/frwdEmptyBlack.png)";
        }
    }
    else if(num == 1 && round != 1){
        document.querySelector("#backGuess").style.cursor = "default";
        document.querySelector("#forwardGuess").style.cursor = "pointer";
        if(colorGuesses[num - 1].l <= 50){
            document.querySelector("#backGuess").style.backgroundImage = "url(media/backEmptyWhite.png)";
            document.querySelector("#forwardGuess").style.backgroundImage = "url(media/frwdClickableWhite.png)";
        }
        else{
            document.querySelector("#backGuess").style.backgroundImage = "url(media/backEmptyBlack.png)";
            document.querySelector("#forwardGuess").style.backgroundImage = "url(media/frwdClickableBlack.png)";
        }
    }
    else if(round - 1 == num){
        document.querySelector("#backGuess").style.cursor = "pointer";
        document.querySelector("#forwardGuess").style.cursor = "default";
        if(colorGuesses[num - 1].l <= 50){
            document.querySelector("#backGuess").style.backgroundImage = "url(media/backClickableWhite.png)";
            document.querySelector("#forwardGuess").style.backgroundImage = "url(media/frwdEmptyWhite.png)";
        }
        else{
            document.querySelector("#backGuess").style.backgroundImage = "url(media/backClickableBlack.png)";
            document.querySelector("#forwardGuess").style.backgroundImage = "url(media/frwdEmptyBlack.png)";
        }
    }
    else{
        document.querySelector("#backGuess").style.cursor = "pointer";
        document.querySelector("#forwardGuess").style.cursor = "pointer";
        if(colorGuesses[num - 1].l <= 50){
            document.querySelector("#backGuess").style.backgroundImage = "url(media/backClickableWhite.png)";
            document.querySelector("#forwardGuess").style.backgroundImage = "url(media/frwdClickableWhite.png)";
        }
        else{
            document.querySelector("#backGuess").style.backgroundImage = "url(media/backClickableBlack.png)";
            document.querySelector("#forwardGuess").style.backgroundImage = "url(media/frwdClickableBlack.png)";
        }
    }
}

// Reloads divs at the bottom of the main page to add the newest game results
function reloadHistory(){
    document.querySelector("#history").innerHTML = "";

    let i = 1;

    while(localStorage.getItem(i.toString()) != null){
        i++;
    }

    i--;

    // console.log(i);

    if(i == 0) document.querySelector("#pastGames h1").innerHTML = "<i>Check back here for your game history!</i>"
    else {
        document.querySelector("#pastGames h1").innerHTML = "↓ <i>Past Games</i> ↓";
        for(let j = i; j > 0; j--){
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
function backToMenu(){
    whip.play();
    document.querySelector("#endGame").style.display = "none";
    document.querySelector("#mainMenu").style.display = "flex";
    document.querySelector("#pastGames").style.display = "block";
    document.querySelector("#mainFooter").style.display = "block";
    document.querySelector("#game").style.display = "none";
    round = 1;
    historyRound = 1;
    colorGuesses = [];
    document.querySelector("#guessNumber").innerHTML = round + " / 10";
    document.querySelector("#hol").innerHTML = "";
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>\"\"";

}

// Updates the number boxes next to the color sliders on the game screen
function setBoxes(){
    document.querySelector("#tR").innerHTML = document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(","));
    document.querySelector("#tG").innerHTML = document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2));
    document.querySelector("#tB").innerHTML = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3));
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);
    document.querySelector("#tH").innerHTML = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, "(", 3) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 7));
    document.querySelector("#tS").innerHTML = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 7) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 8) - 1);
    document.querySelector("#tL").innerHTML = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 8) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 9) - 1);
}

// Adds the appropriate border to each game result div's inner color divs
function reloadHistoryColors(){
    for(let d of document.querySelectorAll("#history div div")){
        if(i==1){
            d.style.borderTop = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderLeft = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderRight = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderBottom = "none";
            i = 2;
        }
        else{
            d.style.borderBottom = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderLeft = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderRight = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderTop = "none";
            i = 1;
        }
    }
}

// Sets most of the site to a random color's monochrome pallette
function setSiteColor(){

    if(h != 0 || l != 0 || s != 0) pop.play();

    // Get random color
    h = Math.random() * 360 - 5;
    s = Math.random() * 35 + 15;
    l = Math.random() * 15 + 45;

    let color = new Color("hsl", [h,s,l]);
    let r =color.srgb[0] * 255;
    let g = color.srgb[1] * 255; 
    let b = color.srgb[2] * 255;
    let hex = convertRGBtoHex(r,g,b);

    if(l - 10 <= 50){
        document.querySelector("#pastGames").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    }
    else{
        document.querySelector("#pastGames").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 40) + "%)";
    }

    if(l - 15 <= 50){
        document.querySelector("#mainFooter").style.color = "white";
    }
    else{
        document.querySelector("#mainFooter").style.color = "black";
    }

    //Unless there's a better way to set CSS through javascript that I'm not aware of, this is necessary unfortunately

    document.querySelector("#mainMenu").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#mainFooter").style.backgroundColor = "hsl(" + (h + 12.5) + "," + s + "%," + (l - 15) + "%)";
    document.querySelector("#pastGames").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
    document.querySelector("#mainMenu").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#start").style.backgroundColor = "hsl(" + (h + 7.5) + "," + s + "%," + (l - 20) + "%)";
    document.querySelector("#changeColor").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
    document.querySelector("#help").style.backgroundColor = "hsl(" + (h + 12.5) + "," + s + "%," + (l - 10) + "%)";
    document.body.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#hideCursorGlitchDiv").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
    document.querySelector("#slidersBack").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#numBack").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guessButton").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guessButton").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tutButton1").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tutButton1").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tutButton2").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tutButton2").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tutButton3").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tutButton3").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tutButton4").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tutButton4").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#tutButton5").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#tutButton5").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#theWord").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#theWord").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#theWord").style.border = "solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#highOrLow").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#distance").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#distance").style.backgroundColor = "white";
    document.querySelector("#guessColor").style.borderLeft = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guessColor").style.borderTop = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guessColor").style.borderBottom = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#guessColor").style.borderRight = "none";
    document.querySelector("#answerColor").style.borderRight = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#answerColor").style.borderTop = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#answerColor").style.borderBottom = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#answerColor").style.borderLeft = "none";
    document.querySelector("#game").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
    document.querySelector("#endGame").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
    document.querySelector("#endGame").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 15) + "%)";
    document.querySelector("#endGame button").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#endGame button").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
    document.querySelector("#colorTitle1").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
    document.querySelector("#colorTitle2").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
}
