// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**
let audioCtx;

// **These are "private" properties - these will NOT be visible outside of this module (i.e. file)**
// 2 - WebAudio nodes that are part of our WebAudio audio routing graph
let element, sourceNode, analyserNode, gainNode, trebleNode, bassNode, distortionNode;

let volumeSave, swapped;

// 3 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  gain: .5,
  numSamples: 256
});

// 4 - create a new array of 8-bit integers (0-255)
// this is a typed array to hold the audio frequency data
let audioData = new Uint8Array(DEFAULTS.numSamples / 2);

// **Next are "public" methods - we are going to export all of these at the bottom of this file**
let setupWebaudio = (filePath) => {
  // 1 - The || is because WebAudio has not been standardized across browsers yet
  const audioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  // 2 - this creates an <audio> element
  element = new Audio();

  // 3 - have it point at a sound file
  loadSoundFile(filePath);

  // 4 - create an a source node that points at the <audio> element
  sourceNode = audioCtx.createMediaElementSource(element);

  // 5 - create an analyser node
  // note the UK spelling of "Analyser"
  analyserNode = audioCtx.createAnalyser();

  /*
  // 6
  We will request DEFAULTS.numSamples number of samples or "bins" spaced equally 
  across the sound spectrum.
  
  If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
  the third is 344Hz, and so on. Each bin contains a number between 0-255 representing 
  the amplitude of that frequency.
  */

  // fft stands for Fast Fourier Transform
  analyserNode.fftSize = DEFAULTS.numSamples;

  // 7 - create a gain (volume) nodes
  gainNode = audioCtx.createGain();
  gainNode.gain.value = DEFAULTS.gain;

  // 7.25 - create a treble (a highshelf BiquadFilter) node
  trebleNode = audioCtx.createBiquadFilter();
  trebleNode.type = "highshelf";

  // 7.5 - create a bass (a lowshelf BiquadFilter) node
  bassNode = audioCtx.createBiquadFilter();
  bassNode.type = "lowshelf";

  // 7.75 - create a distortion (waveshaper filter) node
  distortionNode = audioCtx.createWaveShaper();

  // 8 - connect the nodes - we now have an audio graph
  sourceNode.connect(distortionNode);
  distortionNode.connect(trebleNode);
  trebleNode.connect(bassNode);
  bassNode.connect(analyserNode);
  analyserNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // sourceNode.connect(analyserNode);
  // analyserNode.connect(gainNode);
  // gainNode.connect(audioCtx.destination);
}

let loadSoundFile = (filePath) => {
  element.src = filePath;
}

let playCurrentSound = () => {
  element.play();
}

let pauseCurrentSound = () => {
  element.pause();
}

let setVolume = (value) => {
  swapped = false;
  value = Number(value); // make sure that it's a Number rather than a String
  gainNode.gain.value = value;
  
  // update value of label to match value of slider
  document.querySelector("#volume-label").innerHTML = Math.round(value * 50) + "%";
  document.querySelector("#volume-slider").value = value;

  // If volume goes over 100%
  if(value > 2) document.querySelector("#volume-label").style.color = "orange";
  else document.querySelector("#volume-label").style.color = "rgb(202, 225, 230)";
}

let toggleHighshelf = (value) => {
  trebleNode.frequency.setValueAtTime(1000, audioCtx.currentTime);
  trebleNode.gain.setValueAtTime(25 * (value / 100), audioCtx.currentTime);
  //console.log((trebleNode.gain.value / 25) * 100);

  // To set slider value without input lag
  //console.log((trebleNode.gain.value / 25) * 100);
  if(Math.round((trebleNode.gain.value / 25) * 100) != value && document.querySelector("#play-button").dataset.playing == "yes") return Math.round((trebleNode.gain.value / 25) * 100);
  else return value;
};

let toggleLowshelf = (value) => {
  bassNode.frequency.setValueAtTime(1000, audioCtx.currentTime);
  bassNode.gain.setValueAtTime(20 * (value / 100), audioCtx.currentTime);

  // To set slider value without input lag
  //console.log((bassNode.gain.value / 20) * 100);
  if(Math.round((bassNode.gain.value / 20) * 100) != value && document.querySelector("#play-button").dataset.playing == "yes") return Math.round((bassNode.gain.value / 20) * 100);
  else return value;
};

let toggleDistortion = (value) => {
  if(distortion){
    distortionNode.curve = null; // being paranoid and trying to trigger garbage collection
    distortionNode.curve = makeDistortionCurve(value);
    if(!swapped) {
      volumeSave = gainNode.gain.value;
      swapped = true;
    }
    setVolume(value / 12);
    //console.log(gainNode.gain.value);
  }
  else{
    distortionNode.curve = null;
    gainNode.gain.value = Number(volumeSave);
    swapped = false;
  }
}

// from: https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
let makeDistortionCurve = (amount=20) => {
  let n_samples = 256, curve = new Float32Array(n_samples);
  for (let i =0 ; i < n_samples; ++i ) {
    let x = i * 2 / n_samples - 1;
    curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

export { audioCtx, setupWebaudio, playCurrentSound, pauseCurrentSound, loadSoundFile, setVolume, toggleHighshelf, toggleLowshelf, toggleDistortion, analyserNode, trebleNode, bassNode, element };
