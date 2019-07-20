

let grid = [
        
]
let destroyer = [
    0, //x
    0, //y
    2  //length,

]
let battleship = [
    0,
    0,
    4
]
let carrier = [
    0,
    0,
    5
]
let cruiser = [
    0,
    0,
    3
]
let sumbarine = [
    0,
    0,
    3
]

let occupied = [

]
//25
//525
// var destroyerImg, battleshipImg, carrierImg, cruiserImg

function preload() {
    // destroyerImg = document.getElementById("destroyerPicture")
    // battleshipImg = document.getElementById("battleshipPicture")
    // carrierImg = document.getElementById("carrierPicture")
    // cruiserImg = document.getElementById("cruiserPicture")
}

function setup() {
    createCanvas(700, 700)
    rectMode(CENTER);
    for (let j = 0; j < 24; j++) {
        for (let i = 0; i < 28; i++) {
            let temp = [
                i * 25,
                j * 25
            ]
            grid.push(temp)
        }
    }
    randomPlacement();
}

function draw() {
    background("#bdd6ff")
    noStroke()
    fill(190)
    rectMode(CENTER)
    rect(width/2, height, width, 200)
    initGrid()
    hoverCell()
    showShips();
}

function initGrid() {
    stroke(1)
    strokeWeight(0.2)
    for (let i = 0; i < grid.length; i++) {
        rectMode(CORNER)
        fill(0, 0, 0, 0)
        rect(grid[i][0], grid[i][1], 25, 25)
    }
}

function hoverCell() {
    let mouseCell = [
        Math.floor(mouseX / 25),
        Math.floor(mouseY / 25)
    ]
    strokeWeight(1)
    rectMode(CORNER)
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 600) {
        rect(grid[mouseCell[0]][0], grid[mouseCell[1]][0], 25, 25)
    }
}

function randomPlacement() {
    // let tempArray = [

    // ]
    // tempArray.push(
    //     [
    //         Math.random() * 28,
    //         Math.random() * 24
    //     ]
    // )
    // battleship[0] = tempArray[0][0]
    // battleship[1] = tempArray[0][1]
    // let tempX = Math.random() * 28
    // let tempY = Math.random() * 24
    // for (let i = 0; i < tempArray.length; i++) {
    //     while(tempX == tempArray[i][0]) {
    //         if (tempArray[i][0] == tempX) {
    //             tempX = Math.random() * 28
    //         }
    //         else {
    //             tempArray.push([tempX])
    //             carrier[0] = tempX
    //         }
    //     }
    // console.log(tempArray)
    // }
    // battleship.style = "left: " + tempArray[0][0]
    let tempArray = [
        [
            0,
            0
        ]
    ]
    let temp = pickRandom(tempArray, destroyer[2]) 
    for (let i = 0; i < temp.length; i++) {
        tempArray.push(temp[i])
        occupied.push(temp[i])
    }
    destroyer[0] = grid[temp[0][0]][0]
    destroyer[1] = grid[temp[0][1]][0]
    temp = pickRandom(tempArray, battleship[2])
    for (let i = 0; i < temp.length; i++) {
        tempArray.push(temp[i])
        occupied.push(temp[i])
    }
    battleship[0] = grid[temp[0][0]][0]
    battleship[1] = grid[temp[0][1]][0]
    temp = pickRandom(tempArray, carrier[2])
    for (let i = 0; i < temp.length; i++) {
        tempArray.push(temp[i])
        occupied.push(temp[i])
    }
    carrier[0] = grid[temp[0][0]][0]
    carrier[1] = grid[temp[0][1]][0]

    if (chkDuplicates(tempArray, true) == true || chkDuplicates(occupied, true) == true) {
        document.location.reload()
        console.log(1)
    }
}

function pickRandom(tempArray, length) {
    let temp = [
        [
            Math.round(Math.random() * 28),
            Math.round(Math.random() * (23 - length))
        ]
    ]
    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i][0] == temp[0][0] && tempArray[i][1] == temp[0][1]) {
            pickRandom(tempArray)
        }
        else if (i == tempArray.length - 1) {
            for (let j = 0; j < length - 1; j++) {
                temp.push(
                    [
                        temp[0][0],
                        temp[0][1] + j + 1
                    ]
                )
            }
            return temp
        }
    }
}

function showShips() {
    // destroyerImg.style = "" 
    // battleshipImg.style = ""
    // carrierImg.style = ""
    // cruiserImg.style = ""
    fill(0)
    rect(destroyer[0], destroyer[1], 25, 25 * destroyer[2])
    rect(battleship[0], battleship[1], 25, 25 * battleship[2])
    rect(carrier[0], carrier[1], 25, 25 * carrier[2])
}

function chkDuplicates(arr,justCheck){
    var len = arr.length, tmp = {}, arrtmp = arr.slice(), dupes = [];
    arrtmp.sort();
    while(len--){
     var val = arrtmp[len];
     if (/nul|nan|infini/i.test(String(val))){
       val = String(val);
      }
      if (tmp[JSON.stringify(val)]){
         if (justCheck) {return true;}
         dupes.push(val);
      }
      tmp[JSON.stringify(val)] = true;
    }
    return justCheck ? false : dupes.length ? dupes : null;
  }