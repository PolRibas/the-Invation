'use strict';

function main() {
    var mainElement = document.querySelector('#site-main');
    var bestScore = 0;

    function buildDom(html) {
        mainElement.innerHTML = html;
        return mainElement;
    }

    function crateSplashScreen() {
        var splashScreen = buildDom(`
        <section class="flex-section">
        <h1>THE INVASION</h1>
        <p>Play with arrows</p>
        <button class="myButton">Start</button>
        <canvas width="700" height=80></canvas>
        </section>
        `);
        animation();
        var startButton = splashScreen.querySelector('button');
        startButton.addEventListener('click', selectPlayer);
    }

    function selectPlayer() {
        var gameScreen = buildDom(`
        <section class="flex-section">
        <h1>THE INVASION</h1>
        <p>Select your player</p>
        <section class="select-player">
            <img class="player two" src="banna-mike.png" alt="Banana Mike">
            <img class="player one" src="astronauta.png" alt="classic Mike">
            <img class="player three" src="toy-mike.png" alt="Toy Mike">
            <p class="player">Bannana Mike</p>
            <p class="player">Classic Mike</p>
            <p class="player">Toy Mike</p>
        </section>
        </section>
        `);
        var regularPlayer = gameScreen.querySelectorAll('.player');
        regularPlayer[1].addEventListener('click', selectPlayerOne);
        regularPlayer[0].addEventListener('click', selectPlayerTwo);
        regularPlayer[2].addEventListener('click', selectPlayerThree);
    }

    function createGameScreen(img) {
        var gameScreen = buildDom(`
        <section class="flex-section">
        <h1>THE INVASION</h1>
        <canvas class="juego" width="500" height=400></canvas>
        </section>
        `);
        var canvas = document.querySelector('canvas');
        var game = new Game(canvas, img);
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
                game.player.createBullet();
                game.player.bullet[0].screem();
            } else if (event.keyCode === 27) {
                game.isGameOver = true;
                createGameOverScreen(game.score, game.level);
            }
        })
        game.startGame();
    }

    function createGameOverScreen(score, level) {
        if (score > bestScore) {
            var text = `OMG ${score} points, NEW RECORD!!`;
            bestScore = score;
        } else if (score < 150) {
            var text = `you just make ${score} points`;
        } else {
            var text = `not bad, you make ${score} points`;
        }
        var gameOverScreen = buildDom(`
        <section class="flex-section">
        <h1>GAME OVER</h1>
        <p>Level ${level}!!! ${text}</p>
        <button class="myButton">Restart</button>
        <canvas width="700" height=80></canvas>
        </section>
        `);
        animation();
        var restartButton = gameOverScreen.querySelector('button');
        restartButton.addEventListener('click', selectPlayer);
    }

    function selectPlayerOne() {
        createGameScreen('astronauta.png')
    }

    function selectPlayerTwo() {
        createGameScreen('banna-mike.png')
    }

    function selectPlayerThree() {
        createGameScreen('toy-mike.png')
    }

    crateSplashScreen();

}
window.addEventListener('load', main);