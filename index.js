const mazeCanvas = document.getElementById("mazeCanvas");
const context = mazeCanvas.getContext("2d");



function startGame(){
    const maze = [
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1]
    ];
    for (let i in maze) {
        for (let j in maze[i]){
            let square = maze[i] [j];
            if(square === 1) {
                let x = j*32; //j é horizontal
                let y = i*32; //i é vertical
                context.fillRect(x,y,32,32);
            }
        }
    };
}

function updateCanvas() {
    
}

function loop() {
    updateCanvas();
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