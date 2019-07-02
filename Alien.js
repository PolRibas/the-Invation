function Alien(canvas, sendY, sendDX, sendDY) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width + 10;
    this.y = sendY;
    this.dx = sendDX;
    this.dy = sendDY;
    this.alive = true;
}

Alien.prototype.draw = function() {
    if (this.alive) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
    }
}

Alien.prototype.move = function(velocidad) {
    this.x = this.x - (velocidad * 2);
}

Alien.prototype.checkColicion = function(bullet) {
    var colicionX = Math.abs(bullet.x - this.x);
    var colicionY = Math.abs(bullet.y - this.y);
    var totalColicion = colicionX + colicionY;
    if (totalColicion < 30) {
        this.alive = false;
    }
}