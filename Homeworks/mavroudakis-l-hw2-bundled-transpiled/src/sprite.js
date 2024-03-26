import { getRadialGradient } from "./utils.js";
import { element } from './audio.js';

export class Sprite {
    constructor(x, y, colors, maxScale, type = "squares", tiltAngle = 0, totalRotation = 0, devSprite = false) {
        this.x = x;
        this.y = y;
        this.colors = colors;
        this.maxScale = maxScale;
        this.type = type;
        this.tiltAngle = tiltAngle;
        this.totalRotation = totalRotation;
        this.devSprite = devSprite;
        
        this.minScale = 0.0001;
        this.done = [];
        for(let i = 0; i < this.colors.length; i++) this.done[i] = false;
        this.swapAngle = tiltAngle;
    }

    update(updatePackage) {
        let [rotation, audioData, i, params] = updatePackage;
        let origWidth = this.minScale * (0.1 + (0.9 - ((i-1) / this.colors.length * 0.9)));
        let origHeight = this.minScale * (0.1 + (0.9 - ((i-1) / this.colors.length * 0.9)));
        let width = origWidth;
        let height = origHeight;

        rotation += this.tiltAngle;

        if(params.invInterp) {
            if (document.querySelector("#switch").choice == "wav") {
                width = origWidth + ((audioData[Math.round(i / this.colors.length * 127)] % 127 / 255) * ((origWidth / this.minScale)*(this.maxScale - this.minScale)));
                height = origHeight + ((audioData[Math.round(i / this.colors.length * 127)] % 127 / 255) * ((origHeight / this.minScale)*(this.maxScale - this.minScale)));

                if(this.devSprite) {
                    width *= 2;
                    height *= 2;
                }

                // Prevents visualizer from appearing when audio is off in Waveform Data mode
                if(audioData[Math.round(i / this.colors.length * 127)] == 127 || audioData[Math.round(i / this.colors.length * 127)] == 128) {
                    width = 0;
                    height = 0;
                }
            }
            else {
                width = origWidth + ((1 - (audioData[Math.round(i / this.colors.length * 127)] / 255)) * ((origWidth / this.minScale)*(this.maxScale - this.minScale)));
                height = origHeight + ((1 - (audioData[Math.round(i / this.colors.length * 127)] / 255)) * ((origHeight / this.minScale)*(this.maxScale - this.minScale)));
                
                if(this.devSprite){
                    if(this.type == "squares") {
                        width *= 3;
                        height *= 3;
                    }
                    else {
                        width *= 2.25;
                        height *= 2.25;
                    }
                }
            }    
        }
        else {
            if (document.querySelector("#switch").choice == "wav") {
                width = origWidth + ((audioData[Math.round(i / this.colors.length * 127)] / 255) * ((origWidth / this.minScale)*(this.maxScale - this.minScale)));
                height = origHeight + ((audioData[Math.round(i / this.colors.length * 127)] / 255) * ((origHeight / this.minScale)*(this.maxScale - this.minScale)));

                if(this.devSprite) {
                    width *= 1.5;
                    height *= 1.5;
                }

                // Prevents visualizer from appearing when audio is off in Waveform Data mode
                if(audioData[Math.round(i / this.colors.length * 127)] == 127 || audioData[Math.round(i / this.colors.length * 127)] == 128) {
                    width = 0;
                    height = 0;
                }
            }
            else {
                width = origWidth + (((audioData[Math.round(i / this.colors.length * 127)] / 255)) * ((origWidth / this.minScale)*(this.maxScale - this.minScale)));
                height = origHeight + (((audioData[Math.round(i / this.colors.length * 127)] / 255)) * ((origHeight / this.minScale)*(this.maxScale - this.minScale)));

                if(audioData[6] == 0) {
                    width = 0;
                    height = 0;
                }
            }    
        }

        if(params.drawVortex) {
            width *= 1.5;
            height *= 1.5;
        }

        return [origWidth, origHeight, width, height, rotation];
    }

    draw(ctx, audioData, params) {

        if(this.swapAngle != this.tiltAngle) this.tiltAngle = Math.round(this.swapAngle);

        let rotation = -this.tiltAngle;

        for(let i = 1; i < this.colors.length + 1; i++) {

            let origWidth, origHeight, width, height;

            // Debug that runs only on first display cycle
            // if(!this.done[i - 1]) {
            //     console.log(this.tiltAngle);
            //     this.done[i - 1] = true;
            // }

            // Function call STRAIGHT to array destructuring... it's satisfying to me
            [origWidth, origHeight, width, height, rotation] = this.update([rotation, audioData, i, params]);

            ctx.save();

            ctx.translate(this.x, this.y);
            // Total sprite rotation
            ctx.rotate(this.totalRotation / 360 * (Math.PI * 2));
            // Sprite rotation varying between shapes
            ctx.rotate(rotation / 360 * (Math.PI * 2));
            ctx.translate((this.minScale / 2) - (width / 2), (this.minScale / 2) - (height / 2));

            // Blocking draw based on user checkbox value
            if((this.type == "circles" && params.showCircles) || (this.type == "squares" && params.showSquares)) {
                if (this.type == "circles") ctx.fillStyle = getRadialGradient(ctx, width / 2, height / 2, width / 4, width / 2, height / 2, width / 2, [{ percent: 0.25, color: this.colors[i - 1] }, { percent: 1, color: "transparent" }]);
                else {
                    if(params.drawVortex) ctx.fillStyle = getRadialGradient(ctx, width / 2, height / 2, 10, width / 2, height / 2, width * 1.6, [{ percent: 0.25, color: this.colors[i - 1] }, { percent: 0.325, color: "transparent" }]);    
                    else ctx.fillStyle = getRadialGradient(ctx, width / 2, height / 2, 10, width / 2, height / 2, width * 1.6, [{ percent: 0, color: this.colors[i - 1] }, { percent: 0.9, color: "transparent" }]);    
                }
                ctx.beginPath();
                ctx.fillRect(0, 0, width, height);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        }
    }
}