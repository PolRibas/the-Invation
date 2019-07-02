'use strict';

function main() {
    var mainElement = document.querySelector('#site-main');
    var score = 0;

    function buildDom(html) {
        mainElement.innerHTML = html;
        return mainElement;
    }

    function crateSplashScreen() {
        var splashScreen = buildDom(`
        <section>
        <h1>THE INVATION</h1>
        <button>Start</button>
        </section>
        `);
        var startButton = splashScreen.querySelector('button');
        startButton.addEventListener('click', createGameScreen);
    }

    function createGameScreen() {
        var gameScreen = buildDom(`
        <section>
        <canvas width="400" height=400></canvas>
        </section>
        `);
        var canvas = document.querySelector('canvas');
        var game = new Game(canvas);
        game.gameOverCallback(createGameOverScreen);
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 38) {
                game.player.inTheJump = true;
                setTimeout(function() {
                    game.player.inTheJump = true;
                }, 17)
            } else if (event.keyCode === 39) {
                game.player.createBullet(game.velocidad / 10);
            } else if (event.keyCode === 27) {
                game.isGameOver = true;
                createGameOverScreen(game.score);
            }
        })
        game.startGame();
    }

    function createGameOverScreen(score) {
        var gameOverScreen = buildDom(`
        <section>
        <h1>GAME OVER</h1>
        <p>OMG!!! you make ${score} points that time</p>
        <button>Back menu</button>
        </section>
        `);
        console.log(score);
        var restartButton = gameOverScreen.querySelector('button');
        restartButton.addEventListener('click', crateSplashScreen);
    }

    crateSplashScreen();

}
window.addEventListener('load', main);