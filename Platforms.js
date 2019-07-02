function Plataform(canvas, yDePlayer) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width + 3;
    this.y = yDePlayer + 16 + (Math.floor(Math.random() * 120) - 55);
    this.dx = Math.floor(Math.random() * 70) + 70;
    this.dy = 6;
    //got alien??
}

Plataform.prototype.draw = function() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}

Plataform.prototype.move = function(velocidad) {
    this.x = this.x - (velocidad * 2);
}

Plataform.prototype.position = function(yConflict) {
    if (this.y < 50) {
        if (Math.abs(yConflict - this.y) < 50) {
            this.y = this.y + 340;
        } else {
            this.y = this.y + 200;
        }
    } else if (this.y > 380) {
        if (Math.abs(yConflict - this.y) < 50) {
            this.y = this.y - 250;
        } else {
            this.y = this.y - 100;
        }
    }
    if (Math.abs(yConflict - this.y) < 50) {
        this.y + 120;
    }
}