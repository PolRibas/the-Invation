'use strict';

function main() {
    var mainElement = document.querySelector('#site-main');

    function buildDom(html) {
        mainElement.innerHTML = html;
        return mainElement;
    }

    function crateSplashScreen() {

        var ranking = JSON.parse(localStorage.getItem('bestScore'));
        if (ranking === undefined) {
            var score = 0;
        } else {
            var score = ranking.best;
        }

        var splashScreen = buildDom(`
        <section class="flex-section">
        <h1>THE INVASION</h1>
        <p>Best score is: ${score}</p>
        <button class="myButton">Start</button>
        </section>
        `);
        var startButton = splashScreen.querySelector('button');
        startButton.addEventListener('click', createGameScreen);
    }

    function createGameScreen() {
        var gameScreen = buildDom(`
        <section class="flex-section">
        <h1>THE INVASION</h1>
        <canvas width="400" height=400></canvas>
        </section>
        `);
        var canvas = document.querySelector('canvas');
        var game = new Game(canvas);
        game.gameOverCallback(createGameOverScreen);
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 38 || event.keyCode === 87 || event.keyCode === 72) {
                game.player.inTheJump = true;
                setTimeout(function() {
                    game.player.inTheJump = true;
                }, 17)
                setTimeout(function() {
                    game.player.inTheJump = true;
                }, 34)
            } else if (event.keyCode === 39 || event.keyCode === 32 || event.keyCode === 68) {
                game.player.createBullet(game.velocidad / 10);
            } else if (event.keyCode === 27) {
                game.isGameOver = true;
                createGameOverScreen(game.score, game.level);
            }
        })
        game.startGame();
    }

    function createGameOverScreen(score, level) {
        var ranking = JSON.parse(localStorage.getItem('bestScore'));
        if (ranking.best < score) {
            localStorage.setItem('bestScore', JSON.stringify({ best: score }));
        }
        var gameOverScreen = buildDom(`
        <section class="flex-section">
        <h1>GAME OVER</h1>
        <p>Level ${level}!!! you make ${score} points that time</p>
        <button class="myButton">Back menu</button>
        </section>
        `);
        var restartButton = gameOverScreen.querySelector('button');
        restartButton.addEventListener('click', crateSplashScreen);
    }

    crateSplashScreen();

}
window.addEventListener('load', main);