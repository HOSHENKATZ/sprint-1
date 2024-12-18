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
    var elNewGameBtn = document.querySelector('.smiley-button')
    elNewGameBtn.innerHTML = '😃'

}


function onCellClicked(cell, cellI, cellJ) {
    console.log(gGame.isOn)
    if (gGame.isOn === false) {
        return
    }
    cell.classList.add('shown')

    if (gBoard[cellI][cellJ].isMine === true) {
        gGame.isOn = false
        var elNewGameBtn = document.querySelector('.smiley-button')
        elNewGameBtn.innerHTML = '💀'
        var modal = document.querySelector('.modal')
        modal.style.display = "block"
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

function onCellMarked(cellI, cellJ) {
    gBoard[cellI][cellJ].isMarked = true
    const currCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    currCell.classList.toggle('marked')
    renderCell({ i: cellI, j: cellJ }, '🚩')

}

function checkGameOver(){
    var markedCount = 0
    for(var i= 0; i< gBoard.length;i++){
        for (var j=0; j<gBoard[0].length; j++){
            if (gBoard[i][j].isMine === true && gBoard[i][j].isMarked === true){
                markedCount++
            }
        }

    }
    if(markedCount === gLevel.mines) return true
}