'use strict';

function main() {
    var mainElement = document.querySelector('#site-main')

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
                createGameOverScreen()
            }
        })
        game.startGame();
    }

    function createGameOverScreen() {
        var gameOverScreen = buildDom(`
        <section>
        <h1>GAME OVER</h1>
        <button>Back menu</button>
        </section>
        `);
        var restartButton = gameOverScreen.querySelector('button');
        restartButton.addEventListener('click', crateSplashScreen);
    }

    crateSplashScreen();

}
window.addEventListener('load', main);