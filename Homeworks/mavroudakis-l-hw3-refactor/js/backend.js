//Loop that checks anything that needs to change on a dime
const foreverLoop = (gameIsLooping) => {

    if(document.querySelector("#arbitrary-placeholder") != null && document.querySelector("#arbitrary-placeholder").clientWidth == 0) {
        if (!gameIsLooping) {
            if(document.querySelector("#arbitrary-placeholder") != null) document.querySelector("body").style.height = document.querySelector("#parent-div").clientHeight + "px";
            document.querySelector("#abt").style.display = "block";
        }
        else document.querySelector("#abt").style.display = "none";

        if (document.querySelector("#end-game").clientHeight < window.innerHeight - document.querySelector("nav").clientHeight) document.querySelector("#end-game").style.marginTop = "calc(" + ((window.innerHeight / 2 + (document.querySelector("nav").clientHeight / 2)) - (document.querySelector("#end-game").clientHeight / 2)) + "px - 7rem)";
        else if (document.querySelector("#end-game")) document.querySelector("#end-game").style.marginTop = "0px"

        //console.log(document.querySelector("#end-game").clientHeight < document.querySelector("body").clientHeight);

        if(document.querySelector("#cmby")) document.querySelector("#cmby").style.marginBottom = "-" + document.querySelector("#cmby").clientHeight + "px";
        document.querySelector("#s").style.display = "block";

        //console.log(colorPicker.color.hsl['l']);

        //const x = window.matchMedia("(min-aspect-ratio: 1000/721)");
        //const y = window.matchMedia("(max-height: 490px)");
    }
}

// Runs frequently; checks several things regarding screen layout that can't be updated through css
const gameLoop = (gameIsLooping, resetCPPrefab, gap, round, l, baseColHeight, baseWidth, baseHeight, theColor) => {
    
    if(document.querySelector("#arbitrary-placeholder") != null && document.querySelector("#arbitrary-placeholder").clientWidth == 0) {
        if(document.querySelector("#back-guess")) document.querySelector("#back-guess").style.marginBottom = (document.querySelector("#back-guess").clientHeight * -1) + "px)";
        if(document.querySelector("#history-patch p")) document.querySelector("#history-patch p").style.transform = "translateY(" + (document.querySelector("#back-guess").clientHeight * -1) + "px)";
        document.querySelector("#forward-guess").style.transform = "translateY(" + (document.querySelector("#back-guess").clientHeight * -1) + "px)";
        if (gameIsLooping) {
            if (document.querySelector("#game .columns").clientHeight < window.innerHeight - document.querySelector("nav").clientHeight) {
                document.querySelector("body").style.height = window.innerHeight + "px";
                document.querySelector("#game").style.height = (window.innerHeight - document.querySelector("nav").clientHeight) + "px";
                document.querySelector("#game-div").style.marginTop = "calc(" + (((window.innerHeight - document.querySelector("nav").clientHeight) / 2) - (document.querySelector("#game .columns").clientHeight / 2)) + "px + " + gap + "rem)";
                //console.log((window.innerHeight - document.querySelector("nav").clientHeight) + "px");
            }
            else {
                document.querySelector("#game-div").style.marginTop = 0;
                document.querySelector("#game").style.height = "auto";
                document.querySelector("body").style.height = (document.querySelector("#game").clientHeight + document.querySelector("nav").clientHeight) + "px";
                //console.log("3");
            }

            //console.log(document.querySelector("#game .columns").clientHeight < window.innerHeight - document.querySelector("nav").clientHeight);

            //let x = window.matchMedia("(min-aspect-ratio: 1000/721)");
            let iroHeight = document.querySelector("div .IroWheelBorder").clientHeight;
            for (let a of document.querySelectorAll(".IroSlider")) iroHeight += a.clientHeight;

            if ((round == 1 && document.querySelector("#game-div").clientHeight > 980 && document.querySelector("#game-div").clientWidth < 750) || (round > 1 && document.querySelector("#game-div").clientHeight > 1250 && document.querySelector("#game-div").clientWidth < 750)) {
                //document.querySelector("body").style.height = (document.querySelector("game").clientHeight + document.querySelector("nav").clientHeight) + "px";
                document.querySelector("#picker").style.top = "0px";
                document.querySelector("#values-box").style.right = ((document.querySelector("#game-div").clientWidth) / 4) - ((document.querySelector("#values-box").clientWidth) / 2) + "px";
                document.querySelector("#values-box").style.top = "calc(" + (document.querySelector("#left-col").clientHeight + ((iroHeight / 2) - (document.querySelector("#values-box").clientHeight / 2))) + "px + 3rem)";
                document.querySelector("#guess-number").style.marginTop = 0;
                //console.log("A");
            }
            else {
                document.querySelector("#guess-number").style.marginTop = "calc(" + ((document.querySelector("#game-div").clientHeight / 2) - (document.querySelector(".holder").clientHeight / 2)) + "px - 2rem)";
                document.querySelector("#picker").style.top = "calc(" + ((document.querySelector("#left-col").clientHeight / 2) - (iroHeight / 2)) + "px - 1rem)";
                document.querySelector("#values-box").style.right = (((document.querySelector("#game-div").clientWidth - document.querySelector("#left-col").clientWidth) / 3.75) - (document.querySelector("#values-box").clientWidth / 2)) + "px";
                document.querySelector("#values-box").style.top = ((document.querySelector("#game-div").clientHeight / 2) - (document.querySelector("#values-box").clientHeight / 2)) + "px";
                //console.log("B");
            }

            console.log(document.querySelector("#game-div").clientWidth,document.querySelector("#game-div").clientHeight);

            if (window.innerWidth > 2850) {
                document.querySelector("#guess-number").style.marginTop = "calc(" + ((document.querySelector("#game-div").clientHeight / 2) - (document.querySelector(".holder").clientHeight / 2)) + "px - 2rem)";
                document.querySelector("#picker").style.top = "calc(" + ((document.querySelector("#left-col").clientHeight / 2) - (iroHeight / 2)) + "px - 1rem)";
                document.querySelector("#values-box").style.right = (((document.querySelector("#game-div").clientWidth - document.querySelector("#left-col").clientWidth) / 3.75) - (document.querySelector("#values-box").clientWidth / 2)) + "px";
                document.querySelector("#values-box").style.top = ((document.querySelector("#game-div").clientHeight / 2) - (document.querySelector("#values-box").clientHeight / 2)) + "px";
                console.log("C");
            }

            document.querySelector("#values-box").style.bottom = (iroHeight / 2) - (document.querySelector("#values-box").clientHeight / 2);

            document.querySelector("#loading-gif").style.transform = "translate(" + ((document.querySelector("#the-clue").clientWidth / 2) - (document.querySelector("#loading-gif").clientWidth / 2)) + "px," + ((document.querySelector("#the-clue").clientHeight / 2) - (document.querySelector("#loading-gif").clientHeight / 2)) + "px)";

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

            // document.querySelector("#game").style.top = ((window.innerHeight - document.querySelector("#game").clientHeight) / 2) + "px";
            // document.querySelector("#tutorial-screen").style.top = ((window.innerHeight - document.querySelector("#game").clientHeight) / 2) + "px";

            // if (parseFloat(document.querySelector("#hsv-map .hsv-cursor").style.top.substr(0, document.querySelector("#hsv-map .hsv-cursor").style.top.length - 2)) < document.querySelectorAll("#hsv-map .cover")[0].clientWidth * 0.16 && parseFloat(document.querySelector("#hsv-map .hsv-cursor").style.left.substr(0, document.querySelector("#hsv-map .hsv-cursor").style.left.length - 2)) < document.querySelectorAll("#hsv-map .cover")[0].clientWidth * 0.16) {
            //     // document.querySelector("#hsv-map .hsv-cursor").style.top = document.querySelectorAll("#hsv-map .cover")[0].clientWidth / 2 + "px";
            //     // document.querySelector("#hsv-map .hsv-cursor").style.left = document.querySelectorAll("#hsv-map .cover")[0].clientWidth / 2 + "px";
            // }

            if (baseColHeight != document.querySelector("#left-col").clientHeight || baseWidth != window.innerWidth || baseHeight != window.innerHeight) {

                // if (x.matches) {
                //     cpRadius = (window.innerHeight * 1.387) * .316;
                //     sldHeight = (window.innerHeight * 1.387) * .035;
                //     sldMargin = (window.innerHeight * 1.387) * .01;
                //     cpBorder = (window.innerHeight * 1.387) * .003;
                //     sldHandle = (window.innerHeight * 1.387) * .008;
                // }
                // else {
                //     cpRadius = window.innerWidth * .316;
                //     sldHeight = window.innerWidth * .035;
                //     sldMargin = window.innerWidth * .01;
                //     cpBorder = window.innerWidth * .003;
                //     sldHandle = window.innerWidth * .008;
                // }

                resetCPPrefab();

                // console.log("ar change!");
                baseWidth = window.innerWidth;
                baseHeight = window.innerHeight;
                baseColHeight = document.querySelector("#left-col").clientHeight;
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
                document.querySelector("#test-patch").style.color = "rgb(34, 34, 34)";
                document.querySelector("#test-patch").style.borderColor = "rgb(100, 100, 100)";
            }
            else {
                document.querySelector("#test-patch").style.color = "rgb(221, 221, 221)";
                document.querySelector("#test-patch").style.borderColor = "rgb(155, 155, 155)";
            }
        }

    }

    return [gameIsLooping, baseColHeight, baseWidth, baseHeight];
}

// Sets most of the site to a random color's monochrome pallette
const setSiteColor = (h, s, l, changeSVG) => {

    document.querySelector("#s").style.display = "none";

    if (h != 0 || l != 0 || s != 0) pop.play();

    changeSVG();

    document.querySelector("#cmby").style.marginBottom = "-" + document.querySelector("#cmby").clientHeight + "px";
    document.querySelector("#s").style.display = "block";
}

export { foreverLoop, gameLoop, setSiteColor };