import { randomElement } from "./utils.js";

const loadBabble = () => {
    const url = "../data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const text = e.target.responseText;
        const json = JSON.parse(text);

        words1 = json["words1"];
        words2 = json["words2"];
        words3 = json["words3"];

        generateTechno(false);
    }
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

const generateTechno = (multiple) => {

    document.querySelector("#output").innerHTML = "";
    document.querySelector("#output2").innerHTML = "";

    if (multiple == false) {

        document.querySelector("#output2").style.display = "none";
        document.querySelector("#output").style.display = "block";

        // Assigning same calculated index to all 3 of these would work to avoid repetitive code, but we want variation
        let word1 = randomElement(words1);
        let word2 = randomElement(words2);
        let word3 = randomElement(words3);

        document.querySelector("#output").innerHTML = `${word1} ${word2} ${word3}`;
    }
    else {

        document.querySelector("#output2").style.display = "block";
        document.querySelector("#output").style.display = "none";

        let phrases = [];

        for (let i = 0; i < 5; i++) {
            // Assigning same calculated index to all 3 of these would work to avoid repetitive code, but we want variation
            let word1 = randomElement(words1);
            let word2 = randomElement(words2);
            let word3 = randomElement(words3);

            phrases[i] = `${word1} ${word2} ${word3} <br>`;
        }

        document.querySelector("#output2").innerHTML = `${phrases[0]}${phrases[1]}${phrases[2]}${phrases[3]}${phrases[4]}`;

    }
}

const button = document.querySelector("#my-button");
const button2 = document.querySelector("#other-button");

// Handler
//button.onclick = generateTechno;
button.addEventListener("click", () => { generateTechno(false) });
button2.addEventListener("click", () => { generateTechno(true) });

let words1 = [];
let words2 = [];
let words3 = [];

loadBabble();