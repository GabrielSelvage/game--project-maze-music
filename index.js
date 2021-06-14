const mazeCanvas = document.getElementById("mazeCanvas");
const context = mazeCanvas.getContext("2d");


const squareSize = 32;
let currentGame;
let walls = [];
let hit = false;

function startGame(){
    currentGame = new Game();

    let currentPlayer = new Player(36, 36);

    currentGame.player = currentPlayer;
    currentGame.player.draw();

    const thisMaze = new Maze();
    const maze = thisMaze.grid;
    for (let row = 0; row < maze.length; row++) {
        for (let column = 0; column < maze[row].length; column++){
            let square = maze[row] [column];
            if(square === 1) {
                let x = column*squareSize; //column é horizontal
                let y = row*squareSize; //row é vertical
                let wall = new Wall(x, y, squareSize, squareSize);
                walls.push(wall);
            }
        }
    };
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
    currentGame.player.draw();
    hitWall();
    requestAnimationFrame(updateCanvas); 
    
}

function drawWalls() {
    walls.forEach((wall) => {
        wall.draw();
        if (detectCollision(wall)) {
            
        }
    })
}

function hitWall() {
    let hitObstacle = false; 
    hitObstacle= walls.some((wall) => {
        return detectCollision(wall);
    });
    return hitObstacle;
}


document.addEventListener('keydown', (e) => {
    context.clearRect(currentGame.player.x, currentGame.player.y, currentGame.player.width, currentGame.player.height);

    switch(e.key) {
        case 'ArrowUp': //Up cursor key
        currentGame.player.y -= 25;
        if (hitWall()) {
            currentGame.player.y += 25;
        }
        break;
        case 'ArrowDown': //Down cursor key
        currentGame.player.y += 25;
        if (hitWall()) {
            currentGame.player.y -= 25;
        }
        break;
        case 'ArrowLeft': //Left cursor key
        currentGame.player.x -= 25;
        if (hitWall()) {
            currentGame.player.x += 25;
        }
        break;
        case 'ArrowRight': //Right cursor key
        currentGame.player.x += 25;
        if (hitWall()) {
            currentGame.player.x -= 25;
        }
        break;
    }   
})

startGame();
