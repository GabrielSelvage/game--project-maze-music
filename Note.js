class Note{
    constructor(x, y, width, height, note) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.note1 = image.src = "./note1";
        this.note2 = image.src = "./note2";
        this.note3 = image.src = "./note3";
        this.note4 = image.src = "./note4";
        this.note5 = image.src = "./note5";
        this.note6 = image.src = "./note6";
        this.note7 = image.src = "./note7";
        this.note8 = image.src = "./note8";
    }
    draw(){
        const image = new Image();
        image = this.note1;
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }
}