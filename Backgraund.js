function Backgraund(canvas, sendX) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.y = -20;
    this.x = sendX;
    this.dy = this.canvas.height + 20;
    this.dx = (this.canvas.height + 20) * 1427 / 495;
    this.img = new Image();
    this.img.src = 'fondoCanvas.png';
}

Backgraund.prototype.draw = function() {
    var ctx = this.ctx;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 0;
    ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
}

Backgraund.prototype.move = function(velocidad) {
    this.x = this.x - (velocidad * 2);
    if (this.x === -this.dx) {
        this.x === this.dx;
    }
}