'use strict';

function Game(canvas) {
    this.player = null;
    this.plataforms = [];
    this.isGameOver = false;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')
    this.onGameOver = null;
    this.velocidad = 3;
    this.i = 0;
}

Game.prototype.startGame = function() {
    // inicializar player y enemies
    if (this.i === 0) {
        this.plataforms[0] = new Plataform(this.canvas, this.i);
        this.plataforms[0].y = this.canvas.height / 2;
        this.plataforms[0].x = 0;
        this.plataforms[0].dx = 500;
        this.plataforms[0].dy = 6;
    }
    this.player = new Player(this.canvas, 164);
    console.log(this.player);
    console.log("Cargando Loop")
    var loop = () => {
        this.velocidad += 0.0005;
        this.i += 0.25;
        this.updated();
        this.clear();
        this.draw();
        requestAnimationFrame(loop);
    }
    loop();
}

Game.prototype.updated = function() {
    if (this.player.inTheJump) {
        this.player.tempoSalto++;
        this.player.jump();
    }
    if (this.i % 100 === 0) {
        console.log('in');
        var newPlatform = new Plataform(this.canvas, this.player.y);
        this.plataforms.push(newPlatform);
    }
    if (this.i % 53 === 0) {
        console.log('in');
        var newPlatform = new Plataform(this.canvas, this.player.y);
        this.plataforms.push(newPlatform);
    }
    this.plataforms.forEach((plataform, index) => {
        plataform.move(this.velocidad / 10);
        this.player.checkcolition(plataform);
        if (index > 0) {
            var yConflict = this.plataforms[index - 1].y;
            plataform.position(yConflict);
        }
    });
}


Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
    this.plataforms.forEach(function(platform) {
        platform.draw();
    })
    this.player.draw();
}

Game.prototype.checkCollition = function() {

}

Game.prototype.gameOberCallback = function(callback) {
    this.onGameOver = callback;
}