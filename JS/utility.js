'use strict'
var gBoard
var gLevel = {
    size: 4,
    mines: 2,
}
var gIs1STClick = false
var gStartTime
var gTimerInterval

function buildBoard() {

    const board = createMat(gLevel.size, gLevel.size)


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {

            board[i][j] = {
                isShown: false,
                isMine: false,
                isMarked: false,
                minesAroundCount: 0

            }
            var currell = board[i][j]


        }

    }

    // board[1][1] = {
    //     isShown: false,
    //     isMine: true,
    //     isMarked: true,
    //     minesAroundCount: 0
    // }
    // board[0][3] = {
    //     isShown: false,
    //     isMine: true,
    //     isMarked: true,
    //     minesAroundCount: 0
    // }
    return board
}

function createMat(rows, cols) {
    const mat = []
    for (var i = 0; i < rows; i++) {
        const row = []
        for (var j = 0; j < cols; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function renderBoard(mat, selector) {
    if (gIs1STClick === true) {
        for (var i = 0; i < gLevel.mines; i++) {
            renderMines()

        }
        console.log(gBoard)
        gIs1STClick = false
    }
    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            if (gBoard[i][j].isMine === false) {
                checknegs(i, j)
                const cell = mat[i][j].minesAroundCount
                console.log(cell)
                const className = `cell cell-${i}-${j} hidden`

                strHTML += `<td class="${className}" data-i="${i}" data-j="${j}" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(${i},${j})">${cell}</td>`

            } else {

                const className = `cell cell-${i}-${j} hidden`

                strHTML += `<td class="${className}" data-i="${i}" data-j="${j}" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(${i},${j})">💣</td>`

            }



        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML

}

function renderMines() {
    var location = findEmptyPos()
    console.log(location)
    gBoard[location.i][location.j].isMine = true


}

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    console.log(cellSelector)
    var elCell = document.querySelector(cellSelector)
    console.log(elCell)
    console.log(value)

    elCell.innerHTML = value

}

function getClassName(position) {
    const cellClass = `cell-${position.i}-${position.j}`
    return cellClass
}

function findEmptyPos() {
    var emptyPoss = [] // [{i:0,j:0} , {i:0,j:1}]

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {

            if (gBoard[i][j].isMine === false && gBoard[i][j].isShown === false) {
                var pos = { i: i, j: j }

                emptyPoss.push(pos)
            }


        }
    }
    var randIdx = getRandomInt(0, emptyPoss.length)
    var emptyPos = emptyPoss[randIdx]

    return emptyPos
}

function checknegs(cellI, cellJ) {

    var NegsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= gBoard.length) continue


        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === cellI && j === cellJ) continue

            var currCell = gBoard[i][j]


            if (currCell.isMine === true) {

                NegsCount++

                gBoard[cellI][cellJ].minesAroundCount = NegsCount

            }

        }
    }

}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function startTimer() {
    gStartTime = Date.now()
    clearInterval(gTimerInterval)
    gTimerInterval = setInterval(timerTick, 67)
}

function stopTimer() {
    gStartTime = 0
    clearInterval(gTimerInterval)
    document.querySelector('.timer').innerHTML = '00 : 00'
}

function timerTick() {
    var timePassed = Date.now() - gStartTime
    var millisecs = String(timePassed % 1000).padStart(3, '0')
    var secs = parseInt(timePassed / 1000)
    gGame.secsPassed = timePassed
    var strToDisplay = `${secs} : ${millisecs}`
    document.querySelector('.timer').innerHTML = '' + strToDisplay
}

function playAudio(src) {
    var audio = new Audio(src);
    audio.play();
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    // TODO: figure out nextLocation
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;

        default:
            return null;
    }
    return nextLocation
}