class Pacman {
    constructor (x, y, width, height, speed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height 
        this.speed = speed
        this.direction = DIRECTION_RIGHT
        this.currentFrame = 0
        this.frameCount = 5

        setInterval(() => {
            this.changeAnimation()
        }, 100)
    }

    moveProcess() {
        this.changeDirectionIfPossible()
        this.moveForwards()
        if(this.checkCollision()){
            this.moveBackwards()
        }
    }

    moveForwards() {
        switch(this.direction){
            case DIRECTION_UP:
                this.y -= this.speed
                break
            case DIRECTION_DOWN:
                this.y += this.speed
                break
            case DIRECTION_LEFT:
                this.x -= this.speed
                break
            case DIRECTION_RIGHT:
                this.x += this.speed
                break
        }
    }

    moveBackwards() {
        switch(this.direction){
            case DIRECTION_UP:
                this.y += this.speed
                break
            case DIRECTION_DOWN:
                this.y -= this.speed
                break
            case DIRECTION_LEFT:
                this.x += this.speed
                break
            case DIRECTION_RIGHT:
                this.x -= this.speed
                break
        }
    }

    eat() {

    }

    checkCollision() {
        if( map[this.getMapY()][this.getMapX()] == 1
            ||map[this.getMapY()][this.getMapRightSizeX()] == 1
            ||map[this.getMapRightSizeY()][this.getMapX()] == 1 
            ||map[this.getMapRightSizeY()][this.getMapRightSizeX()] == 1)
            {
                return true
            }
        return false
    }

    checkGhostCollision() {

    }

    changeDirectionIfPossible() {

    }

    changeAnimation() {
        if(this.currentFrame == this.frameCount){
            this.currentFrame = 0
        }
        else this.currentFrame++
    }

    draw() {
        canvasContext.save()

        canvasContext.translate(this.x, this.y)
        canvasContext.translate(oneBlockSize , oneBlockSize )
        canvasContext.rotate((180 * Math.PI) / 180)
        if(this.currentFrame < 3) {
            canvasContext.drawImage(
                img,
                1 + this.currentFrame * 32,
                215,
                33,
                33,
                -oneBlockSize ,
                -oneBlockSize ,
                this.width,
                this.height
            )
        }
        else {
            canvasContext.drawImage(
                img,
                1 + (this.frameCount - this.currentFrame) * 32,
                215,
                33,
                33,
                -oneBlockSize ,
                -oneBlockSize ,
                this.width,
                this.height
            )
        }
        canvasContext.restore()
    }

    getMapX() {
        return parseInt( this.x / oneBlockSize)
    }

    getMapY() {
        return parseInt( this.y / oneBlockSize)
    }

    getMapRightSizeX() {
        return parseInt( (this.x + 1.99999 * oneBlockSize) / oneBlockSize)
    }

    getMapRightSizeY() {
        return parseInt( (this.y + 1.99999 * oneBlockSize) / oneBlockSize)
    }
}