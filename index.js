const mazeCanvas = document.getElementById("mazeCanvas");
const context = mazeCanvas.getContext("2d");

//Maze

function startGame(){
    
    const maze = [
         [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,1,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,1,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
         [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         ];

    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++){
            let square = maze[i] [j];
            if(square === 1) {
                let x = j*32; //j é horizontal
                let y = i*32; //i é vertical
                context.fillRect(x,y,32,32);
            }
        }
    };
    updateCanvas();
}

//Player

class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;

        const image = new Image();
        image.src = "./img/playerDog.png";
        image.onload = () => {
            this.image = image;
            this.draw();
        }
    }
    draw(){
        context.drawImage(this.image, this.x, this.y, 50, 50);
    }

    moveUp() {
        this.y -= 25;
    }

    moveDown(){
        this.y += 25;
    }
    moveLeft(){
        this.x -= 25;
    }
    moveRight(){
        this.x +=25;
    }

}

const dog = new Player(32, 32);

document.addEventListener('keydown', (e) => {
    context.clearRect(dog.x,dog.y,50,50);
    console.log(e);
    switch(e.key) {
        case 'ArrowUp': //Up cursor key
            dog.moveUp();
            break;
        case 'ArrowDown': //Down cursor key
            dog.moveDown();
            break;
        case 'ArrowLeft': //Left cursor key
            dog.moveLeft();
            break;
        case 'ArrowRight': //Right cursor key
            dog.moveRight();
            break;
        }       
        dog.draw();  
})

function updateCanvas() {

    
}

function loop() {
    startGame();
    requestAnimationFrame(loop, mazeCanvas); 
} 

startGame();

// for (let i= 0; i< maze.length; i++){
//     for (let j = 0; j< maze[i].length; j++){
//         let square = maze[i] [j];
//         if(square === 1) {
//             let x = j*32; //j é horizontal
//             let y = i*32; //i é vertical
//             context.fillRect(x,y,32,32);
//         }
//     }