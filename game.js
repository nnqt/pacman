//const pacman = document.getElementById("pacman")
//const ghost = document.getElementById("ghost")
const img = document.getElementById("pacman")
const canvas = document.getElementById("canvas")

const canvasContext = canvas.getContext("2d")

let fps = 30
let oneBlockSize = 21
let colorWall = "red"
var score = 0

const DIRECTION_UP = 3
const DIRECTION_DOWN = 1
const DIRECTION_LEFT = 2            
const DIRECTION_RIGHT = 4


let createRect = (x, y, width , height, color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect (x, y, width, height)
}

let map = [
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1,1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1,1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,4,4,1,1, 1,1,0,0,1, 1,1,1,0,0, 1,1,0,0,1,1, 1,1,0,0,1, 1,1,1,4,4, 1],
    [1,4,4,1,0, 0,1,0,0,1, 0,0,1,0,0, 1,1,0,0,1,0, 0,1,0,0,1, 0,0,1,4,4, 1],
    [1,0,0,1,0, 0,1,0,0,1, 0,0,1,0,0, 1,1,0,0,1,0, 0,1,0,0,1, 0,0,1,0,0, 1],
    [1,0,0,1,1, 1,1,0,0,1, 1,1,1,0,0, 1,1,0,0,1,1, 1,1,0,0,1, 1,1,1,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],

    [1,0,0,1,1, 1,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 1,1,1,0,0, 1],
    //[1,0,0,1,1, 1,1,0,0,1, 0,0,1,1,1, 1,1,1,1,0, 0,1,0,0,1, 1,1,1,0,0, 1],
    [1,0,0,1,1, 1,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 1,1,1,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 1,1,0,0,0,0, 0,1,0,0,0, 0,0,0,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 1,1,0,0,0,0, 0,1,0,0,0, 0,0,0,0,0, 1],
    [1,1,1,1,1, 1,1,0,0,1, 1,1,1,0,0, 1,1,0,0,1,1, 1,1,0,0,1, 1,1,1,1,1, 1],
    [0,0,0,0,0, 0,1,0,0,1, 0,0,0,0,0, 0,0,0,0,0,0, 0,1,0,0,1, 0,0,0,0,0, 0],
    [9,9,9,9,9, 9,1,0,0,1, 0,0,0,0,0, 0,0,0,0,0,0, 0,1,0,0,1, 9,9,9,9,9, 9],
    [0,0,0,0,0, 0,1,0,0,1, 0,0,1,1,6, 6,6,6,1,1,0, 0,1,0,0,1, 0,0,0,0,0, 0],
    
    [1,1,1,1,1, 1,1,0,0,1, 0,0,1,5,5, 5,5,5,5,1,0, 0,1,0,0,1, 1,1,1,1,1, 1],
    [0,0,0,0,0, 0,0,0,0,0, 0,0,1,5,5, 5,5,5,5,1,0, 0,0,0,0,0, 0,0,0,0,0, 0],
    [0,0,0,0,0, 0,0,0,0,0, 0,0,1,5,5, 5,5,5,5,1,0, 0,0,0,0,0, 0,0,0,0,0, 0],
    [1,1,1,1,1, 1,1,0,0,1, 0,0,1,5,5, 5,5,5,5,1,0, 0,1,0,0,1, 1,1,1,1,1, 1],

    [9,9,9,9,9, 9,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 9,9,9,9,9, 9],
    [0,0,0,0,0, 0,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 0,0,0,0,0, 0],    
    [9,9,9,9,9, 9,1,0,0,1, 0,0,0,0,0, 0,0,0,0,0,0, 0,1,0,0,1, 9,9,9,9,9, 9],
    [0,0,0,0,0, 0,1,0,0,1, 0,0,0,0,0, 0,0,0,0,0,0, 0,1,0,0,1, 0,0,0,0,0, 0],
    [0,0,0,0,0, 0,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 0,0,0,0,0, 0],

    [1,1,1,1,1, 1,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 1,1,1,1,1, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1,1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1,1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,0,1,1, 1,1,0,0,1, 1,1,1,0,0, 1,1,0,0,1,1, 1,1,0,0,1, 1,1,1,0,0, 1],
    [1,0,0,1,1, 1,1,0,0,1, 1,1,1,0,0, 1,1,0,0,1,1, 1,1,0,0,1, 1,1,1,0,0, 1],
    [1,4,4,0,0, 0,1,0,0,0, 0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,1, 0,0,0,4,4, 1],
    [1,4,4,0,0, 0,1,0,0,0, 0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,1, 0,0,0,4,4, 1],
    [1,1,1,1,0, 0,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 0,0,1,1,1, 1],
    [1,1,1,1,0, 0,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 0,0,1,1,1, 1],
    
    [1,1,1,1,0, 0,1,0,0,1, 0,0,1,1,1, 1,1,1,1,1,0, 0,1,0,0,1, 0,0,1,1,1, 1],

    [1,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 1,1,0,0,0,0, 0,1,0,0,0, 0,0,0,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 1,1,0,0,0,0, 0,1,0,0,0, 0,0,0,0,0, 1],
    [1,0,0,1,1, 1,1,1,1,1, 1,1,1,0,0, 1,1,0,0,1,1, 1,1,1,1,1, 1,1,1,0,0, 1],
    //[1,0,0,1,1, 1,1,1,1,1, 1,1,1,0,0, 1,1,0,0,1,1, 1,1,1,1,1, 1,1,1,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
]

let gameLoop = () => {
    update()
    draw()
}

let update = () => {
    //todo
    pacman.moveProcess()
    pacman.eat()
}

let draw = () => {
    //todo
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    canvasContext.save()
    canvasContext.translate(0,100)
    //drawWalls()
    drawMaze()
    drawFood()
    pacman.draw()
    ghost1.draw()
    canvasContext.restore()
    drawText()
}

let gameInterval =  setInterval(gameLoop, 
    1000/fps
    //1000
    )

let drawMaze = () => {
    canvasContext.drawImage(
        img,
        372,
        4,
        162.5,
        (215 + 2)/5,
        0,
        0,
        165 * 4 + 12,
        (215 * 4 + 30)/5,
    )
    canvasContext.drawImage(
        img,
        372,
        4 + (215 + 2)/5,
        162.5,
        (215 + 2) * 1 /5 ,
        0,
        (215 * 4 + 30)/5 - 7,
        165 * 4 + 12,
        (215 * 4 + 30) * 1/5 - 30,
    )
    canvasContext.drawImage(
        img,
        372,
        4 + (215 + 2) * 2/5 - 3,
        162.5,
        (215 + 2)/5 - 5 - 11,
        0,
        (215 * 4 + 30)*2/5 - 37,
        165 * 4 + 12,
        (215 * 4 + 30)/5 - 60,
    )
    canvasContext.drawImage(
        img,
        372,
        4 + (215 + 2)* 3/5 - 30,
        162.5,
        (215 + 2) * 1 /5 ,
        0,
        (215 * 4 + 30)* 2/5 + 100 - 25 ,
        165 * 4 + 12,
        (215 * 4 + 30) * 1/5 - 30,
    )
    canvasContext.drawImage(
        img,
        372,
        150,
        162.5,
        66,
        0,
        579,
        165 * 4 + 12,
        305,
    )
    canvasContext.drawImage(
        img,
        372,
        150 + 1,
        162.5,
        66,
        0,
        579 + 15,
        165 * 4 + 12,
        305 ,
    )
}

let drawWalls = () => {
    for (let i = 0 ; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
            if(map[i][j] == 1) {
                createRect(
                    oneBlockSize * j,
                    oneBlockSize * i,
                    oneBlockSize,
                    oneBlockSize,
                    colorWall
                )
            }
        }
    }
}

let drawFood = () => {
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
            ){
                canvasContext.drawImage(
                    img,
                    6,
                    79,
                    10,
                    10,
                    j * oneBlockSize +5,
                    i * oneBlockSize +5,
                    2 *oneBlockSize -10,
                    2 * oneBlockSize -10
                    )
                j+=2
            } else if ((map[i][j] == 0 ) && (map[i][j+1] == 0) && (map[i+1][j] == 0) && (map[i+1][j+1] ==0)){
                canvasContext.drawImage(
                        img,
                        0,
                        79,
                        5,
                        5,
                        j * oneBlockSize + 15,
                        i * oneBlockSize + 15,
                        2 *oneBlockSize - 30,
                        2 * oneBlockSize -30
                    )
                j += 2
            } else{
                j+=2
            }
            
        }
        i += 2
    }
}

let drawText = () => {
    canvasContext.font = "30px Comic Sans MS"
    canvasContext.fillStyle = "white"
    canvasContext.fillText(
        "1 LP ",
        100,
        40
    )
    canvasContext.fillText(
        "HIGH SCORE ",
        300,
        40
    )
    canvasContext.fillText(
        score,
        90,
        80
    )
    canvasContext.fillText(
        999999,
        300,
        80
    )
}

let createPacman = () => {
    pacman = new Pacman (
        15 * oneBlockSize,
        31 * oneBlockSize,
        2 * oneBlockSize,
        2 * oneBlockSize,
        oneBlockSize / 8
    )
}

let createGhosts = () => {
    ghost1 = new Ghost (
        15 * oneBlockSize,
        20 * oneBlockSize,
        2 * oneBlockSize,
        2 * oneBlockSize,
        oneBlockSize / 8,
        15 * oneBlockSize,
        20 * oneBlockSize
    ) 
}

createPacman()
createGhosts()

window.addEventListener("keydown" , (event) => {
    let keycode = event.keyCode
    let tempNext = pacman.nextDirection
    setTimeout(()=> {
    },1)
    if(keycode == 38 || keycode == 87) {
        pacman.nextDirection = DIRECTION_UP
    } else if (keycode == 40 || keycode == 83) {
        pacman.nextDirection = DIRECTION_DOWN
    } else if (keycode == 37 || keycode == 65) {
        pacman.nextDirection = DIRECTION_LEFT
    } else if (keycode == 39 || keycode == 68) {
        pacman.nextDirection = DIRECTION_RIGHT
    }
    // if(!pacman.checkChangeDirection())
    //     pacman.nextDirection =tempNext
})