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
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 0;
    this.ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
}

Backgraund.prototype.move = function(velocidad) {
    this.x = this.x - (velocidad * 2);
    if (this.x === -this.dx) {
        this.x === this.dx;
    }
}