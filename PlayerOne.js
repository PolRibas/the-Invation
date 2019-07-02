function Player(canvas, yInicial) {
    //imagen
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 30;
    this.y = yInicial;
    this.dx = 19;
    this.dy = 36;
    this.tempoSalto = 0;
    this.inTheJump = false;
    this.inPlatform = 1;
    this.bullet = [];
}

Player.prototype.draw = function() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}

Player.prototype.jump = function() {
    if (this.inTheJump === true) {
        if (this.tempoSalto < 750) {
            this.y = this.y - 1.8 + (this.tempoSalto / 60);
        } else {
            this.y = this.y + 1 + (this.tempoSalto / 400);
        }
    }
}

Player.prototype.checkcolition = function(plataform) {
    var yPlat = Math.floor(plataform.y);
    var xPlatStart = Math.floor(plataform.x);
    var xPlatFinish = Math.floor(plataform.x + plataform.dx);
    var yAst = Math.floor(this.y + this.dy)
    var xAstFinish = Math.floor(this.x + this.dx);
    var onTopOfPlatform = yPlat === yAst && xAstFinish > xPlatStart && xAstFinish < xPlatFinish;
    var onTopOfPlatformErrorMarginTop = yPlat + 1 === yAst && xAstFinish > xPlatStart && xAstFinish < xPlatFinish;
    var onTopOfPlatformErrorMarginDown = yPlat - 1 === yAst && xAstFinish > xPlatStart && xAstFinish < xPlatFinish;

    if (this.inTheJump) {
        if (onTopOfPlatform) {
            this.inTheJump = false;
            this.tempoSalto = 0;
        }
    }
    if (this.inTheJump && onTopOfPlatformErrorMarginTop) {
        this.inTheJump = true;
        this.tempoSalto = 0;
    }
    if (this.inTheJump && onTopOfPlatformErrorMarginDown) {

        this.inTheJump = false;
        this.tempoSalto = 0;
    }
}

Player.prototype.checkcolitionAlien = function(alien) {
    var yAlien = Math.floor(alien.y);
    var yAlienFinish = Math.floor(alien.y + alien.dy);
    var xAlienStart = Math.floor(alien.x);
    var xAlienFinish = Math.floor(alien.x + alien.dx);
    var yAst = Math.floor(this.y)
    var yAstFinish = Math.floor(this.y + this.dy)
    var xAstFinish = Math.floor(this.x + this.dx);
    var answer = (yAlien > yAst && yAlienFinish > yAst && xAstFinish > xAlienStart && xAstFinish < xAlienFinish);

    return answer;
}

Player.prototype.gravity = function(platform) {
    if (!this.inTheJump) {
        this.tempoSalto = 750;
        this.inTheJump = true;
    }
}

Player.prototype.createBullet = function(velocity) {
    var bullet = new Bullet(this.canvas, this.y);
    this.bullet.push(bullet);
    (this.bullet);
}

//disparar