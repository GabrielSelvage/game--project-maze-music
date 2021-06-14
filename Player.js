class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        
    }
    draw(){
        const image = new Image();
        image.src = "./img/playerDog.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }
}