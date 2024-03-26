/*
  The purpose of this file is to take in the analyser node and a <canvas> element: 
    - the module will create a drawing context that points at the <canvas> 
    - it will store the reference to the analyser node
    - in draw(), it will loop through the data in the analyser node
    - and then draw something representative on the canvas
    - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
import { Sprite } from './sprite.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;
let sprite1, sprite2, choice, angle, x;

let updateDivs = (x) => {
  
  // Set display values for control divs hidden in landscape mode
  let switchDiv = document.querySelector("#switch-div");
  let bottomControls = document.querySelector("#bottom-controls");
  let checkboxes = document.querySelector("#checkboxes");
  let controlsButton = document.querySelector("#controls-button");
  let controlsCover = document.querySelector("#pop-controls");
  
  if(x.matches) {
    switchDiv.style.display = "none";
    bottomControls.style.display = "none";
    checkboxes.style.display = "none";
  }
  else {
    if(controlsButton.open == "yes") {
      controlsButton.open = "no";
      controlsButton.innerHTML = "Open<br>Controls";
      controlsCover.style.display = "none";

      document.querySelector("#controls").prepend(document.querySelector("#switch-div"));
      document.querySelector("#main-controls").appendChild(document.querySelector("#bottom-controls"));
      document.querySelector("#controls").appendChild(document.querySelector("#checkboxes"));
    }

    switchDiv.style.display = "flex";
    bottomControls.style.display = "block";
    checkboxes.style.display = "flex";
  }
}

let setupCanvas = (canvasElement, analyserNodeRef) => {
  // create drawing context
  ctx = canvasElement.getContext("2d");
  canvasWidth = canvasElement.width;
  canvasHeight = canvasElement.height;

  // Forgive me for these... I made the sprites so I could just add however many colors and it turned out SO MUCH better than even I expected
  sprite1 = new Sprite(canvasWidth / 2, canvasHeight / 2, ["magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "rgb(0,128,255)", "magenta", "cyan", "purple", "black"], 200, "squares", 46, 0, true);
  sprite2 = new Sprite(canvasWidth / 2, canvasHeight / 2, ["cyan", "magenta", "yellow", "purple", "cyan", "magenta", "yellow", "purple", "cyan", "magenta", "yellow", "purple"], 700, "circles", 0, 0, true);

  let squareAngleSlider = document.querySelector("#square-angle-slider");
  let squareAngleLabel = document.querySelector("#square-angle-label");

  squareAngleSlider.oninput = (e) => {
    // set the angle
    sprite1.swapAngle = squareAngleSlider.value;
    // update value of label to match value of slider
    squareAngleLabel.innerHTML = squareAngleSlider.value + "°";
  }

  x = window.matchMedia("(max-height: 94.55vw)");
  x.addEventListener("change", () => { updateDivs(x) });

  // create a gradient that runs top to bottom
  //   gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:0,color:"blue"},{percent:.25,color:"green"},{percent:.5,color:"yellow"},{percent:.75,color:"red"},{percent:1,color:"magenta"}]);
  gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 0, color: "cyan" }, { percent: .3125, color: "rgb(0,128,255)" }, { percent: .6875, color: "rgb(128,0,255)" }, { percent: 1, color: "magenta" }]);
  // keep a reference to the analyser node
  analyserNode = analyserNodeRef;
  // this is the array where the analyser data will be stored
  audioData = new Uint8Array(analyserNode.fftSize / 2);
}

let draw = (params = {}) => {
  // 1 - populate the audioData array with the frequency data from the analyserNode
  // notice these arrays are passed "by reference" 
  if(document.querySelector("#switch").choice == "wav") analyserNode.getByteTimeDomainData(audioData);
  else analyserNode.getByteFrequencyData(audioData);

  //console.log(audioData);

  // OR
  //analyserNode.getByteTimeDomainData(audioData); // waveform data

  // 2 - draw background
  ctx.save();
  ctx.fillStyle = "black";
  ctx.globalAlpha = .1;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.restore();

  // 3 - draw gradient
  if (params.showGradient) {
    ctx.save();
    ctx.fillStyle = gradient;
    // ctx.globalAlpha = .3;
    ctx.globalAlpha = .2;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
  }

  sprite2.draw(ctx, audioData, params);

  // 6 - bitmap manipulation
  // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
  // regardless of whether or not we are applying a pixel effect
  // At some point, refactor this code so that we are looping though the image data only if
  // it is necessary

  // A) grab all of the pixels on the canvas and put them in the `data` array
  // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
  // the variable `data` below is a reference to that array 
  let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  let data = imageData.data;
  let length = data.length;
  let width = imageData.width; // not using here
  // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
  for (let i = 0; i < length; i += 4) {
    // C) randomly change every 20th pixel to red
    // if(params.showNoise && Math.random() < 0.5){
    if (params.showNoise && Math.random() < 0.05) {
      // data[i] is the red channel
      // data[i+1] is the green channel
      // data[i+2] is the blue channel
      // data[i+3] is the alpha channel
      // data[i] = data[i+1] = data[i+2] = 255; // zero out the red and green and blue channels
      data[i] = 255 - data[i]; // make static invert pixel color; "realistic" static
      data[i + 1] = 255 - data[i + 1];
      // data[i+2] = 255; // make the red channel 100% red
      data[i + 2] = 255 - data[i + 2];
    } // end if
  } // end for

  // D) copy image data back to canvas
  ctx.putImageData(imageData, 0, 0);

  // 4 - draw bars
  if (params.showBars) {
    let barSpacing = 4;
    let margin = 5;
    let screenWidthForBars = canvasWidth - (audioData.length * barSpacing);
    let barWidth = screenWidthForBars / audioData.length;
    let barHeight = 200;
    let topSpacing = 100;

    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.50)';
    ctx.strokeStyle = 'rgba(0,0,0,0.50)';
    // loop through the data and draw!
    // L. Mavroudakis - Changed bars to print to far ends of canvas
    for (let i = 0; i < audioData.length; i++) {
      if(params.invInterp) {
        ctx.fillRect(-3 + margin + i * (barWidth + barSpacing), topSpacing + audioData[i] - 120, barWidth, barHeight);
        ctx.strokeRect(-3 + margin + i * (barWidth + barSpacing), topSpacing + audioData[i] - 100, barWidth, barHeight);
      }
      else {
        ctx.fillRect(-3 + margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i] - 120, barWidth, barHeight);
        ctx.strokeRect(-3 + margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i] - 100, barWidth, barHeight);
      }
    }
    ctx.restore();
  }

  // 5 - draw circles
  // L Mavroudakis - Removed your circle... sorry!!

  // if (params.showCircles) {
  //   let maxRadius = canvasHeight / 4;
  //   ctx.save();
  //   ctx.globalAlpha = 0.5;
  //   for (let i = 0; i < audioData.length; i++) {
  //     // red-ish circles
  //     let percent;
  //     if(document.querySelector("#switch").choice == "wav") percent = (audioData[i] % 128) * 2 / 255;
  //     else percent = audioData[i] / 255;

  //     let circleRadius = percent * maxRadius;
  //     ctx.beginPath();
  //     ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent / 3.0);
  //     ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius, 0, 2 * Math.PI, false);
  //     ctx.fill()
  //     ctx.closePath();

  //     // blue-ish circles, bigger, more transparent
  //     ctx.beginPath();
  //     ctx.fillStyle = utils.makeColor(0, 0, 255, .10 - percent / 10.0);
  //     ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI, false);
  //     ctx.fill();
  //     ctx.closePath();

  //     // yellow-ish circles, smaller
  //     ctx.save();
  //     ctx.beginPath()
  //     ctx.fillStyle = utils.makeColor(200, 200, 0, .5 - percent / 5.0);
  //     ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * .50, 0, 2 * Math.PI, false);
  //     ctx.fill();
  //     ctx.closePath();
  //     ctx.restore();
  //   }
  //   ctx.restore();
  // }

  sprite1.draw(ctx, audioData, params);

  imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  data = imageData.data;
  length = data.length;
  width = imageData.width;

  // Moved invert and emboss alone after Circles and Boxes so that static can only cover background
  // invert entire canvas?
  if (params.showInvert) for (let i = 0; i < length; i += 4) {
    let red = data[i], green = data[i + 1], blue = data[i + 2];
    data[i] = 255 - red;      // set red
    data[i + 1] = 255 - green;  // set green
    data[i + 2] = 255 - blue;   // set blue
    //data[i+3] is the alpha, but we're leaving that alone
  }

  // emboss entire canvas?
  // note we are stepping through *each* sub-pixel
  if (params.showEmboss) for (let i = 0; i < length; i++) {
    if (i % 4 == 3) continue; // skip alpha channel
    data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
  }

  ctx.putImageData(imageData, 0, 0);
}

export { setupCanvas, draw };