'use strict'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInit() {
    gBoard = null
    var modal = document.querySelector('.modal')
    modal.style.display = "none"
    gIs1STClick = false
    gGame.isOn = true
    gBoard = buildBoard()
    renderBoard(gBoard, '.tab-place')
    gIs1STClick = true
    var elNewGameBtn = document.querySelector('.smiley-button')
    elNewGameBtn.innerHTML = '😃'

}


function onCellClicked(cell, cellI, cellJ) {

    if (gGame.isOn === false || gBoard[cellI][cellJ].isMarked === true) {
        return
    }
    cell.classList.add('shown')

    if (gBoard[cellI][cellJ].isMine === true) {
        gGame.isOn = false
        var elNewGameBtn = document.querySelector('.smiley-button')
        elNewGameBtn.innerHTML = '💀'
        var modal = document.querySelector('.modal')
        modal.innerHTML = 'You lose!'
        modal.style.display = "block"
        return
    }
    if (gBoard[cellI][cellJ].minesAroundCount === 0) {

        for (var i = cellI - 1; i <= cellI + 1; i++) {

            if (i < 0 || i >= gBoard.length) continue


            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gBoard[0].length) continue
                if (i === cellI && j === cellJ) continue

                if (gBoard[i][j].isMine === false && gBoard[cellI][cellJ].isMarked === false) {

                    const currCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                    currCell.classList.add('shown')
                    gBoard[i][j].isShown = true
                    
                    console.log(gIs1STClick)
                    if (gIs1STClick === true) {
                        renderBoard(gBoard, '.tab-place')
                        gIs1STClick = false
                    }
                }

            }
        }

    }
    gBoard[cellI][cellJ].isShown = true
    checkGameOver()

}

function onCellMarked(cellI, cellJ) {

    if (gBoard[cellI][cellJ].isMarked === false) {

        gBoard[cellI][cellJ].isMarked = true
        const currCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
        currCell.classList.add('marked')
        renderCell({ i: cellI, j: cellJ }, '🚩')
        console.log('marked:', gBoard[cellI][cellJ])
        return
    }
    if (gBoard[cellI][cellJ].isMine === false && gBoard[cellI][cellJ].isMarked === true) {
        gBoard[cellI][cellJ].isMarked = false
        const currCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
        currCell.classList.remove('marked')
        var num = gBoard[cellI][cellJ].minesAroundCount
        renderCell({ i: cellI, j: cellJ }, num)
        return

    }
    if (gBoard[cellI][cellJ].isMine === true && gBoard[cellI][cellJ].isMarked === true) {
        gBoard[cellI][cellJ].isMarked = false
        const currCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
        currCell.classList.remove('marked')
        var num = gBoard[cellI][cellJ].minesAroundCount
        renderCell({ i: cellI, j: cellJ }, '💣')
        return
    }
}

function checkGameOver() {
    console.log(gBoard)
    var safeCount = 14

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {

            if (gBoard[i][j].isShown === true) {
                safeCount--
                console.log(safeCount, gBoard[i][j].isShown)

            }

        }

    }

    if (safeCount === 0) {
        gGame.isOn = false
        var modal = document.querySelector('.modal')
        modal.innerHTML = 'You win!!!!'
        modal.style.display = "block"
        var elNewGameBtn = document.querySelector('.smiley-button')
        elNewGameBtn.innerHTML = '😎'
    }


}
// (gLevel.size) * (gLevel.size) - gLevel.mines