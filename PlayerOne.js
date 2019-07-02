function Player(canvas) {
    //imagen
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 30;
    this.y = 164;
    this.dx = 19;
    this.dy = 36;
    this.tempoSalto = 0;
    this.inTheJump = false;
    this.startLoop = false;
}

Player.prototype.draw = function() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}

Player.prototype.jump = function() {
    if (this.inTheJump === true) {
        if (this.tempoSalto < 750) {
            this.y = this.y - 1.6 + (this.tempoSalto / 80);
        } else {
            this.y = this.y + 1.2 + (this.tempoSalto / 400);
        }
    }
}

Player.prototype.checkcolition = function(plataform) {
    if (plataform.y <= this.y + this.dy) {
        this.inTheJump = false;
        this.tempoSalto = 0;
    }
    this.startLoop = false
}

//disparar