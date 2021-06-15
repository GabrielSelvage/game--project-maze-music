class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 84;

        
    }
    draw(){
        const image = new Image();
        image.src = "./img/cao_posicao.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }
}