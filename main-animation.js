function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
}

function animation() {
    var canvas = document.querySelector('canvas');
    var astronautLeft = new Image();
    var astronautRight = new Image();
    astronautLeft.src = 'spritAstronaut.png';
    astronautRight.src = 'spritAstronaut.png';
    var time = 0;
    var loop = () => {
        clear(canvas);
        drawAstronautLeft(time, astronautLeft, canvas);
        drawAstronautRight(time, astronautRight, canvas);
        if (time < 5000) {
            requestAnimationFrame(loop);
            time++;
        }
    }
    loop();
}


function clear(canvasClear) {
    var ctx = canvasClear.getContext('2d');
    ctx.clearRect(0, 0, canvasClear.width, canvasClear.height);
}

function drawAstronautLeft(time, astronautLeft, canvas) {
    var ctx = canvas.getContext('2d');
    var myTime = time;
    while (myTime > 61) {
        myTime -= 60;
    }
    if (canvas.width / 2 - time + 25 < 0) {
        ctx.drawImage(astronautLeft, 50, 0, 50, 50, canvas.width / 2 - 25, 0, canvas.height, canvas.height)
    } else {
        if (myTime >= 0 && myTime < 15) {
            ctx.drawImage(astronautLeft, 0, 48, 50, 50, canvas.width - time, 0, canvas.height, canvas.height)
        } else if (myTime >= 15 && myTime < 30 || myTime >= 45 && myTime < 70) {
            ctx.drawImage(astronautLeft, 50, 48, 50, 50, canvas.width - time, 0, canvas.height, canvas.height)
        } else if (myTime >= 30 && myTime < 45) {
            ctx.drawImage(astronautLeft, 100, 48, 50, 50, canvas.width - time, 0, canvas.height, canvas.height)
        }
    }
}

function drawAstronautRight(time, astronautRight, canvas) {

}

animation();