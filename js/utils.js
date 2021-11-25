'use strict'
// יצירת מתריצה
function createMat(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = ''
        }
    }
    return board
}


// מספר רנדומלי
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


// יצירת מוקשים רנדומלים על הלוח
function setRandomMinesOnBoard(posI, posJ, gLevel) {
    var currPos = []
    for (var i = 0; i < posI.length; i++) {
        for (var j = 0; j < posJ[0].length; j++) {
            if (i !== gFirstPos.i && j !== gFirstPos.j) currPos.push({ i: i, j: j })
        }
    }
    for (var i = 0; i < gLevel.mines; i++) {
        var pos = drawNum(currPos)
        gBoard[pos.i][pos.j].isMine = true
    }
}



function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}


//////////////////////////////////////////////////timer/////////////////////////////////////////

function updateTimer() {
    // setInterval(, 10);
}
