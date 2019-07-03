function Plataform(canvas, sendY) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width + 3;
    this.y = sendY;
    this.dx = Math.floor(Math.random() * 140) + 70;
    this.dy = 6;
}

Plataform.prototype.draw = function() {
    this.ctx.fillStyle = 'grey';
    this.ctx.shadowOffsetX = 5;
    this.ctx.shadowOffsetY = 5;
    this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 5;
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}

Plataform.prototype.move = function(velocidad) {
    this.x = this.x - (velocidad * 2);
}