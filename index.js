const mazeCanvas = document.getElementById("mazeCanvas");
const context = mazeCanvas.getContext("2d");

document.getElementById("game-board").style.display = "none";
document.getElementById("start-button").onclick = () => {
    document.getElementById("game-board").style.display = "block";
    document.getElementById("game-intro").style.display = "none";
    startGame();
};

const squareSize = 24;
let currentGame;
let walls = [];
let hit = false;
const screenInitial = new Image();
const buttonPlay = new Image();


//const thisNote = new Note();
const thisNote2 = new Note("./img/note2.png");
const thisNote3 = new Note("./img/note3.png");
const thisNote5 = new Note("./img/note5.png");
const thisNote6 = new Note("./img/note6.png");
const thisNote4 = new Note("./img/note4.png");
const thisNote7 = new Note("./img/note7.png");
const thisNote8 = new Note("./img/note8.png");

let threeList = [];
let currentNote;

function startGame() {
    screenInitial.src = "./img/30105.jpg";
    buttonPlay.src = "./img/button.png"
    currentGame = new Game();
    let currentPlayer = new Player(30, 30);
    currentGame.player = currentPlayer;
    currentGame.player.draw();
    const thisMaze = new Maze();
    const maze = thisMaze.grid;
    const thisNote = new Note();
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
                let x = column * squareSize; //column é horizontal
                let y = row * squareSize; //row é vertical
                notesPossiblePositions.push({ x, y })
            }
        }
    };

    
    const randomNotePositionIndex = Math.floor(Math.random() * notesPossiblePositions.length);
    const randomNotePosition = notesPossiblePositions[randomNotePositionIndex];
    console.log(randomNotePosition);
    currentNote = new Note(randomNotePosition.x, randomNotePosition.y, "./img/note1.png"); 

    drawWalls();
    updateCanvas();
}

function detectCollision(wall) {
    return !(currentGame.player.x > wall.x + wall.width ||
        currentGame.player.x + currentGame.player.width < wall.x ||
        currentGame.player.y > wall.y + wall.height ||
        currentGame.player.y + currentGame.player.height < wall.y)
}

function updateCanvas() {
    // thisNote.draw();
    currentGame.player.draw();
    currentNote.draw();
    drawWalls();

    //hitWall();
    requestAnimationFrame(updateCanvas);
}

function newPosition() {
    let position = notes[Math.floor(Math.random() * notes.length)];
    console.log("position");
    while (notes.position === position) {
        position = notes[Math.floor(Math.random() * notes.length)];
    }
    return position;
}

function drawNotes() {
    console.log("draw");
    while (notes === 3) {
        let newNote = Math.floor(Math.random() * notes.length);

        if (notes.indexOf(newNote) == -1)
            notes.push(newNote);
    }
    console.log("work");
}

function numero_aleatorio() {
    while (numeros.length < 16) {
        var aleatorio = Math.floor(Math.random() * 100);

        if (numeros.indexOf(aleatorio) == -1)
            numeros.push(aleatorio);
    }
}


function drawWalls() {
    walls.forEach((wall) => {
        wall.draw();
    });
}
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