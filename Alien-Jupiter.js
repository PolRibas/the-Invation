function AlienJupiter(canvas, sendY, sendDX, sendDY) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width + 10;
    this.y = sendY;
    this.dx = sendDX;
    this.dy = sendDY;
    this.alive = true;
    this.img = new Image();
    this.img.src = 'alien-pink.png';
}

Alien.prototype.draw = function() {
    if (this.alive) {
        var ctx = this.ctx;
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 15;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 1;
        ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
    }
}

Alien.prototype.move = function(velocidad) {
    this.x = this.x - (velocidad * 2);
}

Alien.prototype.checkColicion = function(bullet) {
    var colicionX = Math.abs(bullet.x - this.x);
    var colicionY = Math.abs(bullet.y - this.y);
    var totalColicion = colicionX + colicionY;
    if (totalColicion < 20) {
        this.alive = false;
    }
}