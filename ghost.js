class Ghost {
    constructor (
        x, 
        y, 
        width, 
        height, 
        speed,
        locationX,
        locationY
        ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height 
        this.speed = speed
        this.direction = DIRECTION_RIGHT
        this.nextDirection = DIRECTION_UP
        this.currentFrame = 0
        this.frameCount = 8

        setInterval(() => {
            this.changeAnimation()
        }, 300)
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
    let i = 1
        while (i < map.length){
            let j = 0
            while (j < map[0].length) {
                if((i == 31) && (j==26) )
                    j++
                else if (!((map[i][j] == 0) || (map[i][j] == 4)))  {
                        j++
                    } 
                    else if((map[i][j] == 4 ) && (map[i][j+1] == 4) && (map[i+1][j] == 4) && (map[i+1][j+1] == 4)
                        && ((i == this.getMapY()) && (j == this.getMapX()))
                    ){
                        score += 300
                        map[i][j] = 3
                        map[i+1][j] = 3
                        map[i][j+1] = 3
                        map[i+1][j+1] = 3  
                        j+=2
                    } else if ((map[i][j] == 0 ) && (map[i][j+1] == 0) && (map[i+1][j] == 0) && (map[i+1][j+1] ==0)
                        && ((i == this.getMapY()) && (j == this.getMapX()))
                    ){
                        score += 100
                        map[i][j] = 3
                        map[i+1][j] = 3
                        map[i][j+1] = 3
                        map[i+1][j+1] = 3
                        j += 2
                    } else{
                        j+=2
                    }
                
                }
                i += 2
            }
    }
    

    checkCollision() {
        if(  map[this.getMapY()][this.getMapX()] == 1
            ||map[this.getMapY()][this.getMapRightSizeX()] == 1
            ||map[this.getMapRightSizeY()][this.getMapX()] == 1 
            ||map[this.getMapRightSizeY()][this.getMapRightSizeX()] == 1
            ||map[this.getMapY() + 1][this.getMapX()] == 1
            ||map[this.getMapY()][this.getMapX() + 1]  == 1
            ||map[this.getMapY() + 1][this.getMapRightSizeX()] == 1
            ||map[this.getMapRightSizeY()][this.getMapX() + 1] == 1
            ||map[this.getMapY()][this.getMapX()] == 6
            ||map[this.getMapY()][this.getMapRightSizeX()] == 6
            ||map[this.getMapRightSizeY()][this.getMapX()] == 6 
            ||map[this.getMapRightSizeY()][this.getMapRightSizeX()] == 6
            ||map[this.getMapY() + 1][this.getMapX()] == 6
            ||map[this.getMapY()][this.getMapX() + 1]  == 6
            ||map[this.getMapY() + 1][this.getMapRightSizeX()] == 6
            ||map[this.getMapRightSizeY()][this.getMapX() + 1] == 6
        )
            {
                return true 
            }
        return false
    }

    checkGhostCollision() {

    }

    changeDirectionIfPossible() {
        if (this.nextDirection == this.direction) return
        
        let tempDirection = this.direction
        this.direction = this.nextDirection
        this.moveForwards()
        if(this.checkCollision()){
            this.moveBackwards()
            this.direction = tempDirection
        } else {
            this.moveBackwards()
        }
    }

    checkChangeDirection() { 
        switch (this.nextDirection) {
            case DIRECTION_UP:
                if((map[this.getMapY() - 1][this.getMapX() + 1] == 0)
                    && ((map[this.getMapY() - 1][this.getMapRightSizeX()] == 0)
                        ||(map[this.getMapY() - 1][this.getMapX()] == 0)))
                return true
                break
            case DIRECTION_DOWN: 
                if((map[this.getMapY() + 2][this.getMapX() + 1] == 0)
                    && ((map[this.getMapY() + 2][this.getMapX()] == 0)
                        ||(map[this.getMapY() + 2][this.getMapRightSizeX()] == 0)))
                return true
                break
            case DIRECTION_RIGHT:
                if((map[this.getMapY() + 1][this.getMapX() + 2] == 0)
                    && ((map[this.getMapY()][this.getMapX() + 2] == 0)
                        || (map[this.getMapRightSizeY()][this.getMapX() + 2] == 0)))
                return true 
                break
            case DIRECTION_LEFT:
                if((map[this.getMapY() + 1][this.getMapX() - 1] == 0)
                    && ((map[this.getMapRightSizeY()][this.getMapX() - 1] == 0)
                        || (map[this.getMapY()][this.getMapX() - 1] == 0)))
                return true
                break
        }
        return false
    }

    changeAnimation() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                if(this.currentFrame != 0)
                    this.currentFrame = 0
                else this.currentFrame++ 
                break
            case DIRECTION_LEFT:
                if(this.currentFrame != 2)
                    this.currentFrame = 2
                else this.currentFrame++
                break
            case DIRECTION_UP:
                if(this.currentFrame != 4)
                    this.currentFrame = 4
                else this.currentFrame++
                break
            case DIRECTION_DOWN:
                if(this.currentFrame != 6)
                    this.currentFrame = 6
                else this.currentFrame++
                break    
        }
    }

    draw() {
        canvasContext.save()

        canvasContext.translate(this.x, this.y)
        canvasContext.translate(oneBlockSize , oneBlockSize )
        //canvasContext.rotate((90 * this.direction * Math.PI) / 180)
        canvasContext.drawImage(
            img,
            this.currentFrame * 17,
            120,
            18,
            18,
            -oneBlockSize + 5,
            -oneBlockSize + 5,
            this.width - 10,
            this.height - 10
        )
        canvasContext.restore()
    }

    getMapX() {
        return parseInt( this.x / oneBlockSize)
    }

    getMapY() {
        return parseInt( this.y / oneBlockSize)
    }

    getMapRightSizeX() {
        return parseInt( (this.x + 1.999999999999 * oneBlockSize) / oneBlockSize)
    }

    getMapRightSizeY() {
        return parseInt( (this.y + 1.9999999999999 * oneBlockSize) / oneBlockSize)
    }
}