import {convertRGBtoHex} from "./rgbToHex.js";

// THIS IS NOT MY CODE! Adapted from Barrett Sonntag's "CSS filter generator to convert from black to target hex color" at the link below:
//  https://codepen.io/sosuke/pen/Pjoqqp

let ix;

class Clr {
  constructor(r, g, b) {
    this.set(r, g, b);
  }
  
  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = angle / 180 * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.140,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
    const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
    const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

class Solver {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Clr(0, 0, 0);
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.css(result.values),
    };
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = lossDiff / (2 * ck) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + value % max;
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%);`;
  }
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : null;
}

let changeSVG = () => {

  //L. Mavroudakis code start

  // Get random color
  let h = Math.random() * 360 - 5;
  let s = Math.random() * 35 + 15;
  let l = Math.random() * 15 + 45;

  let color1 = new Color("hsl", [h, s, l]);
  let r = color1.a98rgb[0];
  let g = color1.a98rgb[1];
  let b = color1.a98rgb[2];
  let hex = convertRGBtoHex(r, g, b);

  if (l - 10 < 50) {
    document.querySelector("#past-games").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
    document.querySelector("#change-color").style.color = "white"
  }
  else {
    document.querySelector("#past-games").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 40) + "%)";
    document.querySelector("#change-color").style.color = "black"
  }

  if (l - 15 < 50) {
  }
  else {
    document.querySelector("#main-footer").style.color = "black";
  }

  if (l - 20 < 50) {
    document.querySelector("#start").style.color = "white"
  }
  else document.querySelector("#start").style.color = "black"

  //Unless there's a better way to set CSS through javascript that I'm not aware of, this is necessary unfortunately

  
  document.querySelector("#start").style.backgroundColor = "hsl(" + (h + 7.5) + "," + s + "%," + (l - 20) + "%)";
  document.querySelector("#change-color").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
  //document.querySelector("#main-menu").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  //uncomment later document.querySelector("#main-footer").style.backgroundColor = "hsl(" + (h + 12.5) + "," + s + "%," + (l - 15) + "%)";
  document.querySelector("#past-games").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
  //document.querySelector("#main-menu").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
  // document.querySelector("#help").style.backgroundColor = "hsl(" + (h + 12.5) + "," + s + "%," + (l - 10) + "%)";
  document.querySelector("#main-footer").style.backgroundColor = "hsl(" + (h - 5) + "," + s + "%," + (l + 10) + "%)";
  for(let a of document.querySelectorAll("#main-footer a")) a.style.color = "hsl(" + (h + 7.5) + "," + (s + 20) + "%," + (l - 20) + "%)";
  document.body.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  //document.querySelector("#hideCursorGlitchDiv").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
  document.querySelector("#values-box").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#num-back").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#guess-number").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#guess-button").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#guess-button").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
  // document.querySelector("#tut-button-1").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  // document.querySelector("#tut-button-1").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
  // document.querySelector("#tut-button-2").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  // document.querySelector("#tut-button-2").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
  // document.querySelector("#tut-button-3").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  // document.querySelector("#tut-button-3").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
  // document.querySelector("#tut-button-4").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  // document.querySelector("#tut-button-4").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
  // document.querySelector("#tut-button-5").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  // document.querySelector("#tut-button-5").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
  document.querySelector("#the-word").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#the-word").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
  document.querySelector("#the-word").style.border = "solid hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#high-or-low").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#distance").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#distance").style.backgroundColor = "white";
  document.querySelector("#guess-color").style.borderLeft = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#guess-color").style.borderTop = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#guess-color").style.borderBottom = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#guess-color").style.borderRight = "none";
  document.querySelector("#answer-color").style.borderRight = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#answer-color").style.borderTop = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#answer-color").style.borderBottom = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#answer-color").style.borderLeft = "none";
  document.querySelector("#game-div").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
  document.querySelector("#end-game").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
  document.querySelector("#end-game").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 15) + "%)";
  document.querySelector("#end-game button").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#end-game button").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
  document.querySelector("#color-title-1").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
  document.querySelector("#color-title-2").style.color = "hsl(" + h + "," + s + "%," + l + "%)";

  // L. Mavroudakis code end

  if(!ix) ix = Math.ceil(Math.random() * 2);
  else if(ix == 1) ix = 2;
  else ix = 1;
  
  // This block - L. Mavroudakis
  var c;
  if (l - 10 <= 50) {
    c = "rgb(" + new Color("hsl", [h + 5, s - 5, l + 15]).a98rgb[0] * 255 + "," + new Color("hsl", [h + 5, s - 5, l + 15]).a98rgb[1] * 255 + "," + new Color("hsl", [h + 5, s - 5, l + 15]).a98rgb[2] * 255 + ")"
  }
  else {
      c = "rgb(" + new Color("hsl", [h + 5, s - 25, l - 40]).a98rgb[0] * 255 + "," + new Color("hsl", [h + 5, s - 25, l - 40]).a98rgb[1] * 255 + "," + new Color("hsl", [h + 5, s - 25, l - 40]).a98rgb[2] * 255 + ")"
  }
  
  var rgb = c.replace(/^rgba?\(|\s+|\)$/g,'').split(',');

  if (rgb.length !== 3) {
    alert('Invalid format!');
    return;
  }

  let color = new Clr(rgb[0], rgb[1], rgb[2]);
  let solver = new Solver(color);
  let result = solver.solve();

  if(ix == 1) c = $('#cmby').attr('style', result.filter);
  else{
    c = $('#s').attr('style', result.filter);
  }
  
  c = "rgb(" + new Color("hsl", [h + 7.5, s, l - 20]).a98rgb[0] * 255 + "," + new Color("hsl", [h + 7.5, s, l - 20]).a98rgb[1] * 255 + "," + new Color("hsl", [h + 7.5, s, l - 20]).a98rgb[2] * 255 + ")"
  rgb = c.replace(/^rgba?\(|\s+|\)$/g,'').split(',');

  if (rgb.length !== 3) {
    alert('Invalid format!');
    return;
  }

  color = new Clr(rgb[0], rgb[1], rgb[2]);
  solver = new Solver(color);
  result = solver.solve();

  if(ix == 1){
    c = $('#s').attr('style', result.filter);
  }
  else c = $('#cmby').attr('style', result.filter);
};

let changeDocSVG = () => {

  let ix = Math.ceil(Math.random() * 2);

  let i = Math.random() * 2;
  
  var c = $('body').css('backgroundColor');
  var rgb = c.replace(/^rgba?\(|\s+|\)$/g,'').split(',');

  if(i > 1){
    rgb[0] = parseInt(rgb[0]) + 30;
    rgb[1] = parseInt(rgb[1]) + 50;
    rgb[2] = parseInt(rgb[2]) + 70;
  }
  else{
    rgb[0] = parseInt(rgb[0]) - 30;
    rgb[1] = parseInt(rgb[1]) - 50;
    rgb[2] = parseInt(rgb[2]) - 70;
  }

  if (rgb.length !== 3) {
    alert('Invalid format!');
    return;
  }

  let color = new Clr(rgb[0], rgb[1], rgb[2]);
  let solver = new Solver(color);
  let result = solver.solve();

  if(ix == 1) c = $('#logo-1').attr('style', result.filter);
  else c = $('#logo-2').attr('style', result.filter);

  c = $('body').css('backgroundColor');
  rgb = c.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
  if(i > 1){
    rgb[0] = parseInt(rgb[0]) - 30;
    rgb[1] = parseInt(rgb[1]) - 50;
    rgb[2] = parseInt(rgb[2]) - 70;
  }
  else{
    rgb[0] = parseInt(rgb[0]) + 30;
    rgb[1] = parseInt(rgb[1]) + 50;
    rgb[2] = parseInt(rgb[2]) + 70;
  }


  if (rgb.length !== 3) {
    alert('Invalid format!');
    return;
  }

  color = new Clr(rgb[0], rgb[1], rgb[2]);
  solver = new Solver(color);
  result = solver.solve();

  if(ix == 1) $('#logo-2').attr('style', result.filter);
  else $('#logo-1').attr('style', result.filter);
};

export {changeSVG, changeDocSVG};