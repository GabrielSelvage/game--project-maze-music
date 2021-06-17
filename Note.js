class Note{
    constructor(x, y, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.imageSrc = imageSrc;
    }
    draw(){
        const noteImage = new Image();
        noteImage.src = this.imageSrc;
        this.image = noteImage;
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}