"use strict";
// לוגויים קבועים
var MINE = "💣";
var FLAG = "🚩";
var NORMAL = '😐'
var HAPPY = "🙂";
var SAD = "🙁";
var EMPTY = "";

// גלובלים
var gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gBoard;
var gSize = 4;
var gNumMine = 4;
var gFlagCount = 0;
var gNextNum;
var gIntervalID;
var gStartTime;
var gClickCount;


var gGame = {
  isOn: false, //Boolean, when true we let the user play
  shownCount: 0, // How many cells are shown
  markedCount: 0, // How many cells are marked (with a flag)
  secsPassed: 0, // How many seconds passed
};


function initGame() {
  // This is called when page loads
  gClickCount = 0;
  if (gIntervalID) clearInterval(gIntervalID);
  gGame.isOn = true;

  gBoard = buildBoard();
  console.table(gBoard);

  renderBoard(gBoard);

  createMat(gBoard, ".board-cell");
}


function boardSize() {
    if (gSize === 4) gNumMine = 4;
    if (gSize === 6) gNumMine = 8;
    if (gSize === 8) gNumMine = 12;

    initGame();
}


function buildBoard() { // Builds the board , Set mines at random locations, Call setMinesNegsCount(), Return the created board
  var board = createMat(gSize);
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = {
        minesAroundCount: 1,
        isShown: false,
        isMine: false,
        isMarked: true,
        type: EMPTY,
      };
      board[i][j] = cell;
    }
  }
  console.log(board);
  return board;
}



function SetMines() {
  var numOfMine = 0;
  while (numOfMine < gNumMine) {
    var randomI = getRandomInt(0, gBoard.length);
    var randomJ = getRandomInt(0, gBoard[0].length);
    if (!gBoard[randomI][randomJ].isMine && !gBoard[randomI][randomJ].isShown) {
      gBoard[randomI][randomJ].isMine = true;
      numOfMine++;
    }
  }
}




function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            var className = 'cells cell-' + i + '-' + j;
            strHTML += '<td class="' + className + '" onclick="cellClicked(this)" oncontextmenu="setFlag(this)"> </td>';
        }

        strHTML += '</tr>';
        // console.log(strHTML)
    }
    var elTable = document.querySelector('tbody');
    elTable.innerHTML = strHTML;
}



function setMinesNegsCount(cellI, cellJ, mat) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i > mat.length - 1) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j > mat[i].length - 1) continue;
      if (i === cellI && j === cellJ) continue;
      var cell = mat[i][j];
      // console.log('cell', cell)
      if (cell === MINE) {
        // console.log('i', i);
        // console.log('j', j);
        // Update the Model:
        mat[i][j] = "";
        // console.table(gBoard)
        // Update the Dom:
        var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
        console.log("elCell", elCell);
        elCell.innerText = "";
        // elCell.classList.remove('.board');
      }
    }
  }
}



function runGeneration(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var numOfNegs = countNegs(i, j, board);
      if (numOfNegs > 2 && numOfNegs < 6) {
        if (board[i][j] === "") newBoard[i][j] = MINE;
      } else if (board[i][j] === MINE) newBoard[i][j] = "";
    }
  }
  return newBoard;
}



function countNegs(cellI, cellJ) {
  var count = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (gBoard[i][j].isMine) count++;
    }
  }
  return count;
}





function getClassCell(location) {
  var cellClass = "cell-" + location.i + "-" + location.j;
  return cellClass;
}



function expandShown(board, elCell, i, j) {}



function cellMarked(elCell) {}



function cellClicked(elCell) {
  var currCell = elCell.className;
  var pos = currCell.split('-');
  var i = +pos[1];
  var j = +pos[2];
  gBoard[i][j].isShown = true;
  if (gClickCount === 0) startGame();
  gClickCount++;
  elCell.innerText = countNegs(i, j);
  if (gBoard[i][j].isMine) {
    elCell.innerText = MINE;
    elCell.style.backgroundColor = 'red';
    // GameOver()
  }
}


function setFlag(cell) {
    var currCell = cell.className;
    var pos = currCell.split('-');
    var i = +pos[1];
    var j = +pos[2];
    if (!gBoard[i][j].isMarked) {
        cell.innerText = FLAG;
        gBoard[i][j].isMarked = true;
        gFlagCount++;;
    } else if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false;
        cell.innerText = '';
        gFlagCount--;
    }
}



function startTimeInterval() {
  gStartTime = Date.now(); 
  console.log("gStartTime", gStartTime);
  // console.log(gStartTime);

  gIntervalID = setInterval(function () {
    var elTimer = document.querySelector(".timer");
    var miliSecs = Date.now() - gStartTime; 


    elTimer.innerText = (miliSecs / 1000).toFixed(3);
  }, 10);
}



function startGame() {
  SetMines();
  // timer()
}



function GameOver() {
    gGame.isOn = false;

    var elSmiley = document.querySelector(".smiley");
    elSmiley.innerText = SAD;

}