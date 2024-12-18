'use strict'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
function onInit() {
    gGame.isOn = true
    renderBoard(gBoard, '.tab-place')
   

}


function onCellClicked(cell, cellI, cellJ) {

    cell.classList.add('shown')

    if (gBoard[cellI][cellJ].isMine === true) {
        gGame.isOn = false
        return
    }
    if (gBoard[cellI][cellJ].minesAroundCount === 0) {

        for (var i = cellI - 1; i <= cellI + 1; i++) {

            if (i < 0 || i >= gBoard.length) continue


            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gBoard[0].length) continue
                if (i === cellI && j === cellJ) continue

                if (gBoard[i][j].isMine === false) {
                    
                    const currCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                    currCell.classList.add('shown')


                }

            }
        }

    }

}

