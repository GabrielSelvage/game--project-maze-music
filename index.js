const mazeCanvas = document.getElementById("mazeCanvas");
const context = mazeCanvas.getContext("2d");

document.getElementById("game-final").style.display = "none";
document.getElementById("game-board").style.display = "none";
document.getElementById("game-level1").style.display = "none";
document.getElementById("start-button").onclick = () => {
    document.getElementById("game-board").style.display = "block";
    audio.play();
    document.getElementById("game-intro").style.display = "none";
    startGame();
};

const squareSize = 24;
let currentGame;
let currentLevel = 1;
let caughtNotes = 0;
let walls = [];
let hit = false;
let animationId;
let reDesignCanvas = false;
let interval;
const screenInitial = new Image();
const buttonPlay = new Image();
let score2 = 0;
document.querySelector("#score").innerHTML = score2;
let timer2 = 0;
document.querySelector("#timer").innerHTML = timer2;
let pagInit = document.getElementById("game-intro").style.display = "block";

const audio = document.querySelector('audio');
const audio1 = new Audio("./audio/audio-nota-1.mp3");
const audio2 = new Audio("./audio/audio-nota-2.mp3");
const audio3 = new Audio("./audio/3notas_final.mp3");
const audio4 = new Audio("./audio/4notas_final.mp3");
const audio5 = new Audio("./audio/5notas_final.mp3");
const audio6 = new Audio("./audio/6notas_final.mp3");
const audio7 = new Audio("./audio/7notas_final.mp3");
const audio8 = new Audio("./audio/08escala.mp3");
const audioinit = new Audio("./audio/audio-nota-1.mp3");
const fail = new Audio("./audio/audio-nota-1.mp3");
const final = new Audio(".audio/musica_final.mp3");

//const thisNote = new Note();
const thisNote2 = new Note("./img/note2.png");
const thisNote3 = new Note("./img/note3.png");
const thisNote5 = new Note("./img/note5.png");
const thisNote6 = new Note("./img/note6.png");
const thisNote4 = new Note("./img/note4.png");
const thisNote7 = new Note("./img/note7.png");
const thisNote8 = new Note("./img/note8.png");

let threeList = [];
let availableNotes = [];
let currentNote;

function startGame() {
    initTimer();
    screenInitial.src = "./img/30105.jpg";
    buttonPlay.src = "./img/button.png"
    currentGame = new Game();
    let currentPlayer = new Player(30, 30);
    currentGame.player = currentPlayer;
    currentGame.player.draw();
    initMaze(1);
    updateCanvas();
}


function initMaze(level) {
    context.clearRect(0, 0, mazeCanvas.clientWidth, mazeCanvas.clientHeight);
    debugger;
    const thisMaze = new Maze();
    let maze;
    if (level === 1) {
        maze = thisMaze.grid;
    }

    if (level === 2) {
        maze = thisMaze.grid2;
    }
    if (level === 3) {
        maze = thisMaze.grid3;
    }
    if (level === 4) {
        maze = thisMaze.grid4;
    }
    if (level === 5) {
        maze = thisMaze.grid5;
    }
    if (level === 6) {
        maze = thisMaze.grid6;
    }
    if (level === 7) {
        maze = thisMaze.grid7;
    }

    let notesPossiblePositions = [];

    for (let row = 0; row < maze.length; row++) {
        for (let column = 0; column < maze[row].length; column++) {
            let square = maze[row][column];
            if (square === 1) {
                let x = column * squareSize; //column é horizontal
                let y = row * squareSize; //row é vertical
                let wall = new Wall(x, y, squareSize, squareSize);
                walls.push(wall);
            } else if (square === 3) {
                let x = column * squareSize + 12; //column é horizontal
                let y = row * squareSize + 12; //row é vertical
                //  notesPossiblePositions.push({ x, y })
                //  const randomNotePositionIndex = Math.floor(Math.random() * notesPossiblePositions.length);
                // const randomNotePosition = notesPossiblePositions[randomNotePositionIndex];
                // console.log(randomNotePosition);
                availableNotes.push(new Note(x, y, "./img/note1.png"));
            }
        }
    };




    drawWalls();
}


//DETECT COLLISION
function detectCollision(wall) {
    return !(currentGame.player.x > wall.x + wall.width ||
        currentGame.player.x + currentGame.player.width < wall.x ||
        currentGame.player.y > wall.y + wall.height ||
        currentGame.player.y + currentGame.player.height < wall.y)
}

//DETECT NOTE
function detectCollisionNote(currentNote) {
    if (!availableNotes.length) {
        return false;
    }

    return !(currentGame.player.x > currentNote.x + currentNote.width ||
        currentGame.player.x + currentGame.player.width < currentNote.x ||
        currentGame.player.y > currentNote.y + currentNote.height ||
        currentGame.player.y + currentGame.player.height < currentNote.y)

}

// function level2() {
//         document.getElementById("start-button").onclick = () => {
//         document.getElementById("game-board").style.display = "block";
//         audio.play();
//         document.getElementById("game-intro").style.display = "none";
//         startGame();
//     };  
// }



function updateCanvas() {
    context.clearRect(0, 0, context.clientWidth, context.clientHeight);
    currentGame.player.draw();
    if (availableNotes.length > 0) {
        availableNotes.forEach((note, index) => {
            note.draw();

            if (detectCollisionNote(note)) {
                caughtNotes++;
                currentNote = null;
                availableNotes.splice(index, 1);

                if (currentLevel === 1 && caughtNotes === 1) {
                    // document.getElementById("game-board").style.display = "none";
                    // document.getElementById("game-level1").style.display = "block";
                    initTimer();
                    audio.pause();
                    audio1.play();
                    reDesignCanvas = true;
                    currentLevel++;
                    caughtNotes = 0;
                    walls = [];
                    cancelAnimationFrame(animationId);
                    availableNotes = [];
                    initMaze(2);
                    animationId = requestAnimationFrame(updateCanvas);
                    document.querySelector(".level1").innerText = "Level 2";
                    document.querySelector("#nextNote").src = "./img/noteReds.png";
                    score2 += 10;
                    document.querySelector("#score").innerHTML = score2;
                    reDesignCanvas = false;
                    currentGame.player.x = 30;
                    currentGame.player.y = 30;
                }
                if (currentLevel === 2 && caughtNotes === 2) {
                    initTimer();
                    audio2.play();
                    reDesignCanvas = true;
                    currentLevel++;
                    caughtNotes = 0;
                    walls = [];
                    cancelAnimationFrame(animationId);
                    availableNotes = [];
                    initMaze(3);
                    animationId = requestAnimationFrame(updateCanvas);
                    document.querySelector(".level1").innerText = "Level 3";
                    document.querySelector("#nextNote2").src = "./img/noteYellowS.png";
                    score2 += 10;
                    document.querySelector("#score").innerHTML = score2;
                    reDesignCanvas = false;
                    currentGame.player.x = 30;
                    currentGame.player.y = 30;
                }
                if (currentLevel === 3 && caughtNotes === 3) {
                    initTimer();
                    audio3.play();
                    reDesignCanvas = true;
                    currentLevel++;
                    caughtNotes = 0;
                    walls = [];
                    cancelAnimationFrame(animationId);
                    initMaze(4);
                    animationId = requestAnimationFrame(updateCanvas);
                    document.querySelector(".level1").innerText = "Level 4";
                    document.querySelector("#nextNote3").src = "./img/noteOrangeS.png";
                    score2 += 10;
                    document.querySelector("#score").innerHTML = score2;
                    reDesignCanvas = false;
                    currentGame.player.x = 30;
                    currentGame.player.y = 30;
                }
                if (currentLevel === 4 && caughtNotes === 4) {
                    initTimer();
                    audio4.play();
                    reDesignCanvas = true;
                    currentLevel++;
                    caughtNotes = 0;
                    walls = [];
                    cancelAnimationFrame(animationId);
                    initMaze(5);
                    animationId = requestAnimationFrame(updateCanvas);
                    document.querySelector(".level1").innerText = "Level 5";
                    document.querySelector("#nextNote4").src = "./img/noteGreenS.png";
                    score2 += 10;
                    document.querySelector("#score").innerHTML = score2;
                    reDesignCanvas = false;
                    currentGame.player.x = 30;
                    currentGame.player.y = 30;
                }
                if (currentLevel === 5 && caughtNotes === 5) {
                    initTimer();
                    audio5.play();
                    reDesignCanvas = true;
                    currentLevel++;
                    caughtNotes = 0;
                    walls = [];
                    cancelAnimationFrame(animationId);
                    initMaze(6);
                    animationId = requestAnimationFrame(updateCanvas);
                    document.querySelector(".level1").innerText = "Level 6";
                    document.querySelector("#nextNote5").src = "./img/noteBlueSS.png";
                    score2 += 10;
                    document.querySelector("#score").innerHTML = score2;
                    reDesignCanvas = false;
                    currentGame.player.x = 30;
                    currentGame.player.y = 30;
                }
                if (currentLevel === 6 && caughtNotes === 6) {
                    initTimer();
                    audio6.play();
                    reDesignCanvas = true;
                    currentLevel++;
                    caughtNotes = 0;
                    walls = [];
                    cancelAnimationFrame(animationId);
                    initMaze(7);
                    animationId = requestAnimationFrame(updateCanvas);
                    document.querySelector(".level1").innerText = "Level 7";
                    document.querySelector("#nextNote6").src = "./img/notePurpleS.png";
                    score2 += 10;
                    document.querySelector("#score").innerHTML = score2;
                    reDesignCanvas = false;
                    currentGame.player.x = 30;
                    currentGame.player.y = 30;
                }
                if (currentLevel === 7 && caughtNotes === 7) {
                    audio.pause();
                    audio8.play();
                    document.getElementById("game-board").style.display = "none";
                    document.getElementById("game-final").style.display = "block";

                }
            };
        })
    }

    drawWalls();


    if (!reDesignCanvas) {
        animationId = requestAnimationFrame(updateCanvas);
    }

}

function drawWalls() {
    walls.forEach((wall) => {
        wall.draw();
    });
}


//TIMER

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    clearInterval(interval);
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function initTimer() {
    var minutes = 60;
    display = document.querySelector('#timer');
    startTimer(minutes, display);
}




//GAMEOVER

function gameOver() {
    let time = startTimer(miniutes, display);
    if (time <= 0) {
        alert("gameOver!");
    }
}

//HIT WALL
function hitWall() {
    let hitObstacle = false;
    hitObstacle = walls.some((wall) => {
        return detectCollision(wall);
    });
    if (hitObstacle) {
        console.log("hitobstacle", hitObstacle);
    }
    return hitObstacle;
}
document.addEventListener('keydown', (e) => {
    context.clearRect(currentGame.player.x, currentGame.player.y, currentGame.player.width, currentGame.player.height);
    switch (e.key) {
        case 'ArrowUp': //Up cursor key
            console.log("up");
            currentGame.player.y -= 24;
            if (hitWall("up")) {
                currentGame.player.y += 24;
            }

            break;
        case 'ArrowDown': //Down cursor key
            console.log("down");
            currentGame.player.y += 24;
            if (hitWall("down")) {
                currentGame.player.y -= 24;
            }
            break;
        case 'ArrowLeft': //Left cursor key
            console.log("left");
            currentGame.player.x -= 24;
            if (hitWall("left")) {
                currentGame.player.x += 24;
            }
            break;
        case 'ArrowRight': //Right cursor key
            console.log("right");
            currentGame.player.x += 24;
            if (hitWall("right")) {
                currentGame.player.x -= 24;
            }
            break;
    }
})