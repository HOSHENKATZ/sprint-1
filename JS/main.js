'use strict'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLives
var isHint = false
function onInit() {

    gBoard = null
    gLives = 3
    var lives = document.querySelector('h2')
    lives.innerHTML = '3 ❤️'
    var modal = document.querySelector('.modal')
    modal.style.display = "none"
    gIs1STClick = false
    gGame.isOn = true
    gBoard = buildBoard()
    renderBoard(gBoard, '.tab-place')
    gIs1STClick = true
    var elNewGameBtn = document.querySelector('.smiley-button')
    elNewGameBtn.innerHTML = '😃'
    var test = gLevel.size * gLevel.size - gLevel.mines
    startTimer()

}



function onCellClicked(cell, cellI, cellJ) {

    if (gGame.isOn === false || gBoard[cellI][cellJ].isMarked === true) {

        return
    }
    if (isHint === true) {
        hint(cellI, cellJ)
        return
    }

    cell.classList.add('shown')

    if (gBoard[cellI][cellJ].isMine === true) {
        if (gLives > 0) {
            console.log('hey')
            gLives--
            var lives = document.querySelector('h2')
            lives.innerHTML = `${gLives} ❤️`
            var elNewGameBtn = document.querySelector('.smiley-button')
            elNewGameBtn.innerHTML = '😱'
            const currCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
            gBoard[cellI][cellJ].isShown = false
            setTimeout(() => {
                currCell.classList.remove('shown')

            }, 1000);

            return
        } else {

            gGame.isOn = false
            stopTimer()
            var elNewGameBtn = document.querySelector('.smiley-button')
            elNewGameBtn.innerHTML = '💀'
            var modal = document.querySelector('.modal')
            modal.innerHTML = 'You lose!'
            modal.style.display = "block"
            return
        }
    }


    gBoard[cellI][cellJ].isShown = true

    if (gBoard[cellI][cellJ].minesAroundCount === 0) {
        if (gIs1STClick === true) {
            renderBoard(gBoard, '.tab-place')
        }
        for (var i = cellI - 1; i <= cellI + 1; i++) {

            if (i < 0 || i >= gBoard.length) continue


            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gBoard[0].length) continue


                if (gBoard[i][j].isMine === false && gBoard[cellI][cellJ].isMarked === false) {

                    const currCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                    if (currCell.innerHTML === '0' && gBoard[i][j].isShown === false) {
                        gBoard[i][j].isShown === true
                        onCellClicked(currCell, i, j)
                    }
                    console.log('hey')
                    currCell.classList.add('shown')
                    gBoard[i][j].isShown = true





                }

            }
        }

    }


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

// function playHint() {
//     isHint = true
//     console.log(isHint)
// }
// function hint(cellI, cellJ) {
//     console.log(cellI, cellJ)
//     for (var i = cellI - 1; i <= cellI + 1; i++) {

//         if (i < 0 || i >= gBoard.length) continue


//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= gBoard[0].length) continue
//             if (i === cellI && j === cellJ) continue
//             const currCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)

//             currCell.classList.add('shown')
//             console.log(i,j)
//             setTimeout(() => {
//                 currCell.classList.remove ('shown')
//             }, 1000);
//         }
//     }
//     isHint = false
// }

function checkGameOver() {
    console.log(gBoard)
    var safeCount = gLevel.size * gLevel.size - gLevel.mines

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
        clearInterval(gTimerInterval)
        stopTimer()
        var modal = document.querySelector('.modal')
        modal.innerHTML = 'You win!!!!'
        modal.style.display = "block"
        var elNewGameBtn = document.querySelector('.smiley-button')
        elNewGameBtn.innerHTML = '😎'
    }


}

function onEasy() {
    gLevel.size = 4
    gLevel.mines = 2
    onInit()
}
function onMedium() {
    gLevel.size = 8
    gLevel.mines = 14
    onInit()
}
function onHard() {
    gLevel.size = 12
    gLevel.mines = 32
    onInit()
}