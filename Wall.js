class Wall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        context.fillStyle = "#ffb628";
        context.fillRect(this.x,this.y,squareSize,squareSize);
    }
}