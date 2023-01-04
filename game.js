const pacman = document.getElementById("pacman")
const ghost = document.getElementById("ghost")
const canvas = document.getElementById("canvas")

const canvasContext = canvas.getContext("2d")

let fps = 30
let oneBlockSize = 30
let colorWall = "blue"

let createRect = (x, y, width , height, color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect (x, y, width, height)
}

let map = [
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
    [1,0,0,0,0, 0,0,0,0,0, 1,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0, 1],
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,1,1,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,1,1,0, 1],
    [1,0,0,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,0, 1],
    [1,1,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,1, 1],
    [0,0,0,0,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,0,0,0, 0],
    [1,1,1,1,1, 0,1,0,1,1, 0,1,1,0,1, 0,1,1,1,1, 1],
    [0,0,0,0,0, 0,0,0,1,0, 0,0,1,0,0, 0,0,0,0,0, 0],
    [1,1,1,1,1, 0,1,0,1,0, 0,0,1,0,1, 0,1,1,1,1, 1],
    [0,0,0,0,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,0,0,0, 0],
    [0,0,0,0,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,0,0,0, 0],
    [1,1,1,1,1, 0,0,0,1,1, 1,1,1,0,0, 0,1,1,1,1, 1],
    [1,0,0,0,0, 0,0,0,0,0, 1,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0, 1],
    [1,0,0,0,1, 0,0,0,0,0, 0,0,0,0,0, 0,1,0,0,0, 1],
    [1,1,0,0,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,0,0,1, 1],
    [1,0,0,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,0, 1],
    [1,0,1,1,1, 1,1,1,1,0, 1,0,1,1,1, 1,1,1,1,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1]
]

let gameLoop = () => {
    update()
    draw()
}

let update = () => {
    //todo
}

let draw = () => {
    //todo
    drawWalls()
}

let gameInterval =  setInterval(gameLoop, 1000/fps)

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