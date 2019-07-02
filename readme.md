#THE INVATION

#MVP
A small platform game where your character is an astronaut.
With this astronaut you will have to go through platforms without the vacuum trap killing you.
There are many influential factors in the game, such as that the gravity of space is a much smaller than the gravity of the earth and this makes the jump slower.

#Backlog
On the platforms you will find aliens that you have to shoot to get points.
If you collide with an alien, your character will lose a life.

#Data structure
in main.js we will have the struct. 
it will be 3 simple pages: (StartGame, Game, GameOverPage)

in Game.js we will have the game loop that we will see in the game page in main.js
    Game consturctor will have {
        player
        plataforms
        isGameOver
        canvas
        ctx
        onGameOver
        velocidad
    }
    & the metoth() it will use:
    Game.prototype.functions(){
        startGame();
        updated();
        clear();
        draw();
        gameOverCallback();
    }
in CrearPlayer.js we will be able to construct the player that we will use in the Game.js
    Player constructor will have {
        canvas
        ctx
        x
        y
        dx 
        dy
        tempoSalto
        inTheJump
        onPlatform
    }
     & the metoth() it will use:
     Player.prototype.function(){
         draw();
         jump();
         checkColitionWithPlatform();
         fireBullet();
     }
in CrearPlatforms.js we will be able to construct the platforms that we will use in the Game.js
    Platforms constructor will have {
        canvas
        ctx
        x
        y
        dx
        dy
    }
     & the metoth() it will use:
     Platforms.prototype.function(){
         draw();
         move();
         checkPosition();
     }
in CrearAliens we will be able to construct the Aliens that we will use in the Game.js
     Platforms constructor will have {
        canvas
        ctx
        x
        y
        dx
        dy
    }
     & the metoth() it will use:
     Platforms.prototype.function(){
         draw();
         checkPositionInPlatform();
         die();
         checkColitionWithPlayer();
     }

#States y States Transitions
in main.js we will have the page-transitions.
    we will pas from the SplashScreen to the gameScreen
    when we deth we will go to the gameoverScreen and we will have the option for return to the start
All the other transitions will be in a game loop that will be in Game.js

#Git
https://github.com/PolRibas/the-Invation

#Slides
URls for the project presentation (slides) Link Slides.com