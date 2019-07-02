'use strict';

function Game(canvas) {
    this.player = null;
    this.plataforms = [];
    this.aliens = [];
    this.backgraund = [];
    this.isGameOver = false;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')
    this.onGameOver = null;
    this.velocidad = 3;
    this.i = 0;
    this.score = 0;
}

Game.prototype.startGame = function() {
    // inicializar player y enemies
    if (this.i === 0) {
        this.plataforms[0] = new Plataform(this.canvas, this.i);
        this.plataforms[0].y = 300;
        this.plataforms[0].x = 0;
        this.plataforms[0].dx = 500;
        this.plataforms[0].dy = 6;
        this.aliens[0] = new Alien(this.canvas, this.plataforms[0].y - 26, 26, 26);
        this.backgraund[0] = new Backgraund(this.canvas, (this.canvas.height + 20) * 1427 / 495);
        this.backgraund[1] = new Backgraund(this.canvas, 0);
        this.backgraund[2] = new Backgraund(this.canvas, (this.canvas.height + 20) * 2 * 1427 / 495);
        this.backgraund[3] = new Backgraund(this.canvas, (this.canvas.height + 20) * 3 * 1427 / 495);
    }
    this.player = new Player(this.canvas, this.canvas.height / 6);

    var loop = () => {
        this.velocidad += 0.0005;
        this.i += 0.25;
        this.updated();
        this.clear();
        this.draw();
        if (!this.isGameOver) {
            requestAnimationFrame(loop);
        }
    }
    loop();
}

Game.prototype.updated = function() {
    this.setScore();
    if (this.player.inTheJump) {
        this.player.tempoSalto++;
        this.player.jump();
    }
    if (this.i % 37 === 0) {
        var newPlatform = new Plataform(this.canvas, this.player.y);
        this.plataforms.push(newPlatform);
        if (Math.random() > 0.53) {
            var newAlien = new Alien(this.canvas, newPlatform.y - 26, 26, 26);
            this.aliens.push(newAlien);
        }
    }
    if (this.i % 103 === 0) {
        var newPlatform = new Plataform(this.canvas, this.player.y);
        newPlatform.y = 140;
        newPlatform.dx = 80;
        this.plataforms.push(newPlatform);
    }
    this.player.gravity();
    this.player.checkcolition(this.plataforms[0]);
    this.plataforms.forEach((plataform, index) => {
        plataform.move(this.velocidad / 10);
        this.player.checkcolition(plataform);
        if (index > 0) {
            var yConflict = this.plataforms[index - 1].y;
            plataform.position(yConflict);
        }
    });
    this.backgraund.forEach((back) => {
        back.move(this.velocidad / 10);
    });
    this.aliens.forEach((alien, index) => {
        alien.move(this.velocidad / 10);
        if (alien.alive) {
            var checkColicion = this.player.checkcolitionAlien(alien);
            if (checkColicion) {
                this.isGameOver = true;
                this.onGameOver(this.score);
            }
        }
    });
    if (this.player.y <= 0) {

        this.player.tempoSalto = 750;
        this.player.inTheJump = true;
    }
    if (this.player.y > this.canvas.height) {
        console.log('GAME OVER');
        this.isGameOver = true;
        this.onGameOver(this.score);
    }
    if (this.player.bullet.length >= 1) {
        this.player.bullet.forEach(bull => {
            bull.move(this.velocidad);
            this.aliens.forEach(alien => {
                alien.checkColicion(bull);
            })
        });
    }
}



Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
    this.backgraund.forEach(function(back) {
        back.draw();
    });
    this.plataforms.forEach(function(platform) {
        platform.draw();
    })

    this.aliens.forEach((alien) => {
        alien.draw();
    })

    this.player.bullet.forEach(function(bull) {
        bull.draw();
    });
    this.player.draw();
}


Game.prototype.gameOverCallback = function(callback) {
    this.onGameOver = callback;
}

Game.prototype.setScore = function() {
    this.score = 0;
    this.aliens.forEach((alien) => {
        if (!alien.alive) {
            this.score += 131;
        }
    })
    this.plataforms.forEach((platform) => {
        this.score += 16;
    })
}