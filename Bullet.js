function Bullet(canvas, playerY) {
    this.x = 30;
    this.y = playerY + 12;
    this.dx = 10;
    this.dy = 2;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
}

Bullet.prototype.draw = function() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}

Bullet.prototype.move = function(velocidad) {
    this.x = this.x + (velocidad * 2);

}