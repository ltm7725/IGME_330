
import * as utils from './utils.js';
import * as audio from './audio.js';
import * as visualizer from './visualizer.js';
import { Sprite } from './sprite.js';

/**
 * @overview Homework 02
 * @author L Mavroudakis <ltm7725@rit.edu>
 */

let highShelf, lowShelf;
let trebleSlider, bassSlider, distortionSlider;
let fps;
let sprite;
let ctx;
let squaresCB;

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  sound1: "media/New Adventure Theme.mp3"
});

/** User control parameters for visualizer */
const drawParams = {
  invInterp: false,
  showGradient: true,
  showBars: true,
  showCircles: true,
  showSquares: true,
  showNoise: true,
  showInvert: false,
  showEmboss: false,
  drawVortex: false
};

function loadJsonHR() {
  const url = "data/av-data.json";
  const xhr = new XMLHttpRequest();
  xhr.onload = (e) => {
    const text = e.target.responseText;
    const json = JSON.parse(text);

    document.querySelector("title").innerHTML = json["title"];
    document.querySelector("#warning").innerHTML = json["distortion-warning"];

    let tracksString;

    for(let i = 0; i < json["files"].length; i++) {
      if(i == 0) tracksString += `<option value="${json["files"][i]}" selected>${json["tracks"][i]}</option>`
      else tracksString += `<option value="${json["files"][i]}">${json["tracks"][i]}</option>`
    }

    document.querySelector("#track-select").innerHTML = tracksString;
  };
  xhr.open("GET", url);
  xhr.send();
}

let updateLayout = (x) => {
  if(x.matches) {
    if(drawParams.showSquares == false) {
      document.querySelector("#switch-div").style.transform = "translate(0, 5.5vw)";
    }
    document.querySelectorAll("#checkboxes span")[0].appendChild(document.querySelector("#gradient-cb"));
    document.querySelectorAll("#checkboxes span")[1].appendChild(document.querySelector("#bars-cb"));
    document.querySelectorAll("#checkboxes span")[2].appendChild(document.querySelector("#circles-cb"));
    document.querySelectorAll("#checkboxes span")[3].appendChild(document.querySelector("#squares-cb"));
    document.querySelectorAll("#checkboxes span")[4].appendChild(document.querySelector("#noise-cb"));
    document.querySelectorAll("#checkboxes span")[5].appendChild(document.querySelector("#invert-cb"));
    document.querySelectorAll("#checkboxes span")[6].appendChild(document.querySelector("#emboss-cb"));
  }
  else {
    if(drawParams.showSquares == false) {
      document.querySelector("#switch-div").style.transform = "translate(0,-1vw)";
    }
    document.querySelectorAll("#checkboxes span")[0].prepend(document.querySelector("#gradient-cb"));   
    document.querySelectorAll("#checkboxes span")[1].prepend(document.querySelector("#bars-cb"));
    document.querySelectorAll("#checkboxes span")[2].prepend(document.querySelector("#circles-cb"));
    document.querySelectorAll("#checkboxes span")[3].prepend(document.querySelector("#squares-cb"));
    document.querySelectorAll("#checkboxes span")[4].prepend(document.querySelector("#noise-cb"));
    document.querySelectorAll("#checkboxes span")[5].prepend(document.querySelector("#invert-cb"));
    document.querySelectorAll("#checkboxes span")[6].prepend(document.querySelector("#emboss-cb"));
  }
}

/** At page load, runs visualizer setup functions and starts main update loop */
let init = () => {
  loadJsonHR();
  audio.setupWebaudio(DEFAULTS.sound1);
  fps = 60;

  let x = window.matchMedia("(max-height: 94.55vw)");

  updateLayout(x);

  audio.element.addEventListener("ended", () => { document.querySelector("#play-button").setAttribute("data-playing", "no") });

  let squaresCB = document.querySelector("#squares-cb");
  squaresCB.addEventListener("change", (e) => {
    if(e.target.checked) {
      document.querySelector("#square-angle").style.display = "flex";
      document.querySelector("#vortex").style.display = "flex";
      // This is needed for the Visualization Type to move back to the right spot in Landscape mode for some reason??
      if(x.matches) document.querySelector("#switch-div").style.transform = "translate(0, 0vw)";
    }
    else {
      if(x.matches) document.querySelector("#switch-div").style.transform = "translate(0, 5.5vw)";
      document.querySelector("#vortex").style.display = "none";
      document.querySelector("#square-angle").style.display = "none";
    }
  });


  x.addEventListener("change", () => { updateLayout(x); });

  //console.log("init called");
  //console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  visualizer.setupCanvas(canvasElement, audio.analyserNode, drawParams);
  loop();
}

/** Hooks up variables to HTML elements and adds events for function/user interaction */
let setupUI = (canvasElement) => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fs-button");

  // add click event to button
  fsButton.addEventListener("click", (e) => {
    //console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  });

  // B - hookup play button
  const playButton = document.querySelector("#play-button");

  // add click event to button
  playButton.addEventListener("click", (e) => {
    //console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    // check if context is in suspended state (autoplay policy)
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    //(`audioCtx.state after = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
      // if track is currently paused, play it
      audio.playCurrentSound();
      e.target.dataset.playing = "yes"; // our CSS will set the text to "Pause"
      // if track IS playing, pause it
    } else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no"; // our CSS will set the text to "Play"
    }
  });

  // B.25 - hookup button to open controls in landscape mode
  const controlsButton = document.querySelector("#controls-button");
  const popControls = document.querySelector("#pop-controls");
  const controls = document.querySelector("#controls");
  const mainControls = document.querySelector("#main-controls");document.querySelector("#controls")
  
  // add click event to button
  controlsButton.addEventListener("click", (e) => {
    if (e.target.open == "yes") {
      e.target.open = "no";
      e.target.innerHTML = "Open<br>Controls";
      popControls.style.display = "none";
      controls.prepend(document.querySelector("#switch-div"));
      mainControls.appendChild(document.querySelector("#bottom-controls"));
      controls.appendChild(document.querySelector("#checkboxes"));
      document.querySelector("#switch-div").style.display = "none";
      document.querySelector("#bottom-controls").style.display = "none";
      document.querySelector("#checkboxes").style.display = "none";
    }
    else {
      e.target.open = "yes";
      e.target.innerHTML = "Close<br>Controls";
      popControls.appendChild(document.querySelector("#switch-div"));
      popControls.appendChild(document.querySelector("#bottom-controls"));
      popControls.appendChild(document.querySelector("#checkboxes"));
      document.querySelector("#switch-div").style.display = "flex";
      document.querySelector("#bottom-controls").style.display = "block";
      document.querySelector("#checkboxes").style.display = "flex";
      popControls.style.display = "flex";
    }
  });

  // B.75 - add visualization type click event to button
  const visTypeSwitch = document.querySelector("#switch");
  const visSwitchIcon = document.querySelector("#switch-img");
  visTypeSwitch.choice = "freq";
  visTypeSwitch.addEventListener("click", () => {
    if(visTypeSwitch.choice == "wav") {
      visTypeSwitch.choice = "freq";
      visSwitchIcon.src = "media/switch-up.png";
      //console.log(visTypeSwitch.choice);
    }
    else {
      visTypeSwitch.choice = "wav";
      visSwitchIcon.src = "media/switch-down.png";
      //console.log(visTypeSwitch.choice);
    }
  });

  // C - hookup sliders & labels
  let volumeSlider = document.querySelector("#volume-slider");
  let volumeLabel = document.querySelector("#volume-label");
  trebleSlider = document.querySelector("#treble-slider");
  let trebleLabel = document.querySelector("#treble-label");
  bassSlider = document.querySelector("#bass-slider");
  let bassLabel = document.querySelector("#bass-label");
  distortionSlider = document.querySelector("#distortion-slider");
  let distortionLabel = document.querySelector("#distortion-label");
  highShelf = 0;
  lowShelf = 0;

  // add .oninput events to sliders

  volumeSlider.oninput = (e) => {
    // set the gain
    audio.setVolume(e.target.value);
    // Setting text value moved to function
  };

  trebleSlider.oninput = (e) => {
    // set the treble
    highShelf = trebleSlider.value;
    // update value of label to match value of slider
    trebleSlider.value = audio.toggleHighshelf(highShelf);
    trebleLabel.innerHTML = trebleSlider.value + "%";
  }

  bassSlider.oninput = (e) => {
    // set the bass
    lowShelf = bassSlider.value;
    // update value of label to match value of slider
    bassSlider.value = audio.toggleLowshelf(lowShelf);
    bassLabel.innerHTML = bassSlider.value + "%";
  }

  distortionSlider.oninput = (e) => {
    // set the distortion
    audio.toggleDistortion(distortionSlider.value);
    // update value of label to match value of slider
    distortionLabel.innerHTML = distortionSlider.value + "%";
  }

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // D - hookup track <select>
  let trackSelect = document.querySelector("#track-select");
  // add .onchange event to <select>
  trackSelect.onchange = (e) => {
    audio.loadSoundFile(e.target.value);
    // pause the current track if it is playing
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  // E - hookup checkboxes
  let invInterpCB = document.querySelector("#inv-interp-switch");
  invInterpCB.onchange = (e) => { drawParams.invInterp = e.target.checked };
  let gradientCB = document.querySelector("#gradient-cb");
  gradientCB.onchange = (e) => { drawParams.showGradient = e.target.checked };
  let barsCB = document.querySelector("#bars-cb");
  barsCB.onchange = (e) => { drawParams.showBars = e.target.checked };
  let circlesCB = document.querySelector("#circles-cb");
  circlesCB.onchange = (e) => { drawParams.showCircles = e.target.checked };
  squaresCB = document.querySelector("#squares-cb");
  squaresCB.onchange = (e) => { drawParams.showSquares = e.target.checked };
  let noiseCB = document.querySelector("#noise-cb");
  noiseCB.onchange = (e) => { drawParams.showNoise = e.target.checked };
  let invertCB = document.querySelector("#invert-cb");
  invertCB.onchange = (e) => { drawParams.showInvert = e.target.checked };
  let embossCB = document.querySelector("#emboss-cb");
  embossCB.onchange = (e) => { drawParams.showEmboss = e.target.checked };
  let vortexCB = document.querySelector("#vortex");
  vortexCB.onchange = (e) => { drawParams.drawVortex = e.target.checked };
} // end setupUI

/** Update loop to trigger audio analysis and draw visualizer to canvas */
let loop = () => {
  /* NOTE: This is temporary testing code that we will delete in Part II */
  //requestAnimationFrame(loop);
  setTimeout(loop, 1000 / fps)
  visualizer.draw(drawParams);
  // 1) create a byte array (values of 0-255) to hold the audio data
  // normally, we do this once when the program starts up, NOT every frame
  let audioData = new Uint8Array(audio.analyserNode.fftSize / 2);

  // 2) populate the array of audio data *by reference* (i.e. by its address)
  audio.analyserNode.getByteFrequencyData(audioData);

  // 3) log out the array and the average loudness (amplitude) of all of the frequency bins
  //console.log(audioData);

  //console.log("-----Audio Stats-----");
  let totalLoudness = audioData.reduce((total, num) => total + num);
  let averageLoudness = totalLoudness / (audio.analyserNode.fftSize / 2);
  let minLoudness = Math.min(...audioData); // ooh - the ES6 spread operator is handy!
  let maxLoudness = Math.max(...audioData); // ditto!
  // Now look at loudness in a specific bin
  // 22050 kHz divided by 128 bins = 172.23 kHz per bin
  // the 12th element in array represents loudness at 2.067 kHz
  let loudnessAt2K = audioData[11];
  //console.log(`averageLoudness = ${averageLoudness}`);
  //console.log(`minLoudness = ${minLoudness}`);
  //console.log(`maxLoudness = ${maxLoudness}`);
  //console.log(`loudnessAt2K = ${loudnessAt2K}`);
  //console.log("---------------------");
}

export { init };