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


//DETECT COLLISION
function detectCollision(wall) {
    return !(currentGame.player.x > wall.x + wall.width ||
        currentGame.player.x + currentGame.player.width < wall.x ||
        currentGame.player.y > wall.y + wall.height ||
        currentGame.player.y + currentGame.player.height < wall.y)
}

//DETECT NOTE
function detectCollisionNote(){
    
          /*   if(currentGame.player.x > currentNote.x + currentNote.width ||
            currentGame.player.x + currentGame.player.width < currentNote.x ||
            currentGame.player.y > currentNote.y + currentNote.height ||
            currentGame.player.y + currentGame.player.height < currentNote.y){
                continue;
            }else{
                alert("note");
            } */
}

//HIT NOTE
// function detectNote(){
//         const fintNote = threeList.some((note) => {
//         return player.detectCollisionNote(note) === true;
//     });
//         if(fintNote) {
//         console.log('findNote');
//     }
// }

function updateCanvas() {
    currentGame.player.draw();
    currentNote.draw();
    drawWalls();
    if(detectCollisionNote){
        console.log("true")
    };
    requestAnimationFrame(updateCanvas);
}

// function newPosition() {
//     let position = notes[Math.floor(Math.random() * notes.length)];
//     console.log("position");
//     while (notes.position === position) {
//         position = notes[Math.floor(Math.random() * notes.length)];
//     }
//     return position;
// }


function drawWalls() {
    walls.forEach((wall) => {
        wall.draw();
    });
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