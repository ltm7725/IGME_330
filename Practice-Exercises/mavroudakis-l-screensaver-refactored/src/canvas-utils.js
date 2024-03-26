// Draws a rectangle in the canvas with given parameters
export let drawRectangle = (ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {

    ctx.save();

    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();

    if (x + width > 640) x = 640 - width;
    if (y + height > 480) x = 480 - height;
    ctx.rect(x, y, width, height);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

// Draws a circle (or partial arc) in the canvas with given parameters
export let drawArc = (clear, ctx, x, y, radius, fillStyle = "black", lineWidth = 0, strokeStyle = "rgb(0,0,0,0)", startAngle = 0, endAngle = Math.PI * 2) => {

    ctx.save();

    if (clear) ctx.globalAlpha = 0.5;
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.restore;
}

// Draws a line in the canvas with given parameters
export let drawLine = (ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle = "black") => {

    ctx.save();

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(x1, y1); //pen down; background rect start
    ctx.lineTo(x2, y2); //pen over to bottom-right on background rect
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
}