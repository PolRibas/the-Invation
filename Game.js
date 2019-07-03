'use strict';

function Game(canvas) {
    this.player = null;
    this.plataforms = [];
    this.aliens = [];
    this.marthAlien = [];
    this.jupiterAlien = [];
    this.backgraund = [];
    this.isGameOver = false;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')
    this.onGameOver = null;
    this.velocidad = 3.3;
    this.i = 0;
    this.score = 0;
    this.level = 1;
}

Game.prototype.startGame = function() {
    this.initializeObjects();
    var loop = () => {
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
    this.velocidad += 0.0005;
    this.i += 0.25;
    this.setScore();

    if (this.player.inTheJump) {
        this.player.tempoSalto++;
        this.player.jump();
    }

    if (this.i % 37 === 0 || this.i % 103 === 0) {
        var newPlatform = new Plataform(this.canvas, this.platformCheck());
        this.plataforms.push(newPlatform);
        if (Math.random() > 0.75) {
            var newAlien = new Alien(this.canvas, newPlatform.y - 26, 26, 26);
            this.aliens.push(newAlien);
        }
    }

    this.player.gravity();
    this.plataforms.forEach((plataform) => {
        plataform.move(this.velocidad / 10);
        this.player.checkcolition(plataform);
    });

    this.backgraund.forEach((back) => {
        back.move(this.velocidad / 10);
    });

    this.aliens.forEach((alien) => {
        if (alien.alive) {
            alien.move(this.velocidad / 10);
            var checkColicion = this.player.checkcolitionAlien(alien);
            if (checkColicion) {
                this.isGameOver = true;
                this.onGameOver(this.score, this.level);
            }
        }
    });

    if (this.player.y <= 0) {

        this.player.tempoSalto = 750;
        this.player.inTheJump = true;
    }
    if (this.player.y > this.canvas.height) {
        this.isGameOver = true;
        this.onGameOver(this.score, this.level);
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
    this.drawScore();
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

Game.prototype.initializeObjects = function() {
    this.player = new Player(this.canvas, this.canvas.height / 6);
    this.plataforms[0] = new Plataform(this.canvas, this.i);
    this.plataforms[0].y = 200;
    this.plataforms[0].x = 0;
    this.plataforms[0].dx = 600;
    this.plataforms[0].dy = 6;
    this.aliens[0] = new Alien(this.canvas, this.plataforms[0].y - 26, 26, 26);
    for (var j = 0; j < 10; j++) {
        this.backgraund[j] = new Backgraund(this.canvas, (this.canvas.height + 20) * j * 1427 / 495);
    }
}


Game.prototype.gameOverCallback = function(callback) {
    this.onGameOver = callback;
}

Game.prototype.setScore = function() {
    this.score = 0;
    this.aliens.forEach((alien) => {
        if (!alien.alive) {
            this.score += 13 + (this.level * 3);
        }
    })
    this.plataforms.forEach((platform) => {
        this.score += 2 + (this.level * 3);
    })
    this.levelUp();
}

Game.prototype.levelUp = function() {
    if (this.score > 100 && this.level === 1) {
        this.velocidad += 0.13;
        this.level++;
    } else if (this.score > 400 && this.level === 2) {
        this.velocidad += 0.24;
        this.level++;
    } else if (this.score > 1000 && this.level === 3) {
        this.velocidad += 0.35;
        this.level++;
    } else if (this.score > 2200 && this.level === 4) {
        this.velocidad += 0.46;
        this.level++;
    } else if (this.score > 3400 && this.level === 5) {
        this.velocidad += 0.57;
        this.level++;
    }
}

Game.prototype.platformCheck = function() {
    do {
        var check = this.plataforms[this.plataforms.length - 1].y;
        var newOne = check + (Math.random() * 140) - 70;
    } while (Math.abs(check - newOne) < 30 || newOne > this.canvas.height - 30 || newOne < 30);
    return newOne;
}

Game.prototype.drawScore = function() {
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 10, 28);
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Level: ${this.level}`, this.canvas.width - 80, 28);
}