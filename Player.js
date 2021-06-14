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

const blinky = new Player(32, 32);

document.addEventListener('keydown', (e) => {
    console.log(e);
    switch(e.key) {
        case 'ArrowUp': //Up cursor key
            blinky.moveUp();
            break;
        case 'ArrowDown': //Down cursor key
            blinky.moveDown();
            break;
        case 'ArrowLeft': //Left cursor key
            blinky.moveLeft();
            break;
        case 'ArrowRight': //Right cursor key
            blinky.moveRight();
            break;
        }       
        context.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
        blinky.draw();  
})