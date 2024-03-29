var canv;
var ctx;
var setSpeed;
var px = 50;
var py = 50;
var turn = 0;
var dropRow;
var board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
var isWin = 0;

let winningLines = [ 
    [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 1], [0, 2], [0, 3], [0, 4]],
    [[0, 2], [0, 3], [0, 4], [0, 5]], [[0, 3], [0, 4], [0, 5], [0, 6]],
    [[1, 0], [1, 1], [1, 2], [1, 3]], [[1, 1], [1, 2], [1, 3], [1, 4]],
    [[1, 2], [1, 3], [1, 4], [1, 5]], [[1, 3], [1, 4], [1, 5], [1, 6]],
    [[2, 0], [2, 1], [2, 2], [2, 3]], [[2, 1], [2, 2], [2, 3], [2, 4]],
    [[2, 2], [2, 3], [2, 4], [2, 5]], [[2, 3], [2, 4], [2, 5], [2, 6]],
    [[3, 0], [3, 1], [3, 2], [3, 3]], [[3, 1], [3, 2], [3, 3], [3, 4]],
    [[3, 2], [3, 3], [3, 4], [3, 5]], [[3, 3], [3, 4], [3, 5], [3, 6]],
    [[4, 0], [4, 1], [4, 2], [4, 3]], [[4, 1], [4, 2], [4, 3], [4, 4]],
    [[4, 2], [4, 3], [4, 4], [4, 5]], [[4, 3], [4, 4], [4, 5], [4, 6]],
    [[5, 0], [5, 1], [5, 2], [5, 3]], [[5, 1], [5, 2], [5, 3], [5, 4]],
    [[5, 2], [5, 3], [5, 4], [5, 5]], [[5, 3], [5, 4], [5, 5], [5, 6]],
    [[0, 0], [1, 0], [2, 0], [3, 0]], [[1, 0], [2, 0], [3, 0], [4, 0]],
    [[2, 0], [3, 0], [4, 0], [5, 0]], [[0, 1], [1, 1], [2, 1], [3, 1]], 
    [[1, 1], [2, 1], [3, 1], [4, 1]], [[2, 1], [3, 1], [4, 1], [5, 1]],
    [[0, 2], [1, 2], [2, 2], [3, 2]], [[1, 2], [2, 2], [3, 2], [4, 2]],
    [[2, 2], [3, 2], [4, 2], [5, 2]], [[0, 3], [1, 3], [2, 3], [3, 3]], 
    [[1, 3], [2, 3], [3, 3], [4, 3]], [[2, 3], [3, 3], [4, 3], [5, 3]],
    [[0, 4], [1, 4], [2, 4], [3, 4]], [[1, 4], [2, 4], [3, 4], [4, 4]],
    [[2, 4], [3, 4], [4, 4], [5, 4]], [[0, 5], [1, 5], [2, 5], [3, 5]], 
    [[1, 5], [2, 5], [3, 5], [4, 5]], [[2, 5], [3, 5], [4, 5], [5, 5]],
    [[0, 6], [1, 6], [2, 6], [3, 6]], [[1, 6], [2, 6], [3, 6], [4, 6]],
    [[2, 6], [3, 6], [4, 6], [5, 6]], [[2, 0], [3, 1], [4, 2], [5, 3]],
    [[1, 0], [2, 1], [3, 2], [4, 3]], [[2, 1], [3, 2], [4, 3], [5, 4]],
    [[0, 0], [1, 1], [2, 2], [3, 3]], [[1, 1], [2, 2], [3, 3], [4, 4]],
    [[2, 2], [3, 3], [4, 4], [5, 5]], [[0, 1], [1, 2], [2, 3], [3, 4]],
    [[1, 2], [2, 3], [3, 4], [4, 5]], [[2, 3], [3, 4], [4, 5], [5, 6]],
    [[0, 2], [1, 3], [2, 4], [3, 5]], [[1, 3], [2, 4], [3, 5], [4, 6]],
    [[0, 3], [1, 4], [2, 5], [3, 6]], [[3, 0], [2, 1], [1, 2], [0, 3]],
    [[4, 0], [3, 1], [2, 2], [1, 3]], [[3, 1], [2, 2], [1, 3], [0, 4]],
    [[5, 0], [4, 1], [3, 2], [2, 3]], [[4, 1], [3, 2], [2, 3], [1, 4]],
    [[3, 2], [2, 3], [1, 4], [0, 5]], [[5, 1], [4, 2], [3, 3], [2, 4]],
    [[4, 2], [3, 3], [2, 4], [1, 5]], [[3, 3], [2, 4], [1, 5], [0, 6]],
    [[5, 2], [4, 3], [3, 4], [2, 5]], [[4, 3], [3, 4], [2, 5], [1, 6]],
    [[5, 3], [4, 4], [3, 5], [2, 6]]
];

window.onload=function() {
    canv=document.getElementById("canvas");
    ctx=canv.getContext("2d");
    game();
    setSpeed = setInterval(checkWin,1000/30);
}

function game() {
    ctx.fillStyle = "#00008B";
    ctx.fillRect(0,0,canv.width, canv.height);
    drawCircles();
}

function drawCircles() {
    for (var j = px; j<=575; j+=75) {
        for (var i = py; i<=425; i+=75) {
            py = i;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(px, py, 25, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        
        px = j;
        py = 50;
    }
}

function dropDisc(column) {
    if (isWin) {
        return;
    }

    dropRow = 5;

    if (turn == 0) {
        ctx.fillStyle = "#990000";
    } else {
        ctx.fillStyle = "#F4C430";
    }

    while (board[dropRow][column]) {
        if (!dropRow) {
            alert("Invalid move!");
            return;
        }
        
        dropRow -= 1;
    }

    ctx.beginPath();
    ctx.arc(50+75*column, dropRow * 75 + 50, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    board[dropRow][column] = turn+1;
    turn^=1;
}

function checkWin() {
    if (isWin) {
        return;
    }

    exit:
        for (var j = 0; j<winningLines.length; j++) {
            for (var i = 0; i<=3; i++) {
                let currentColor;

                if (board[winningLines[j][i][0]][winningLines[j][i][1]] == 1 || board[winningLines[j][i][0]][winningLines[j][i][1]] == 2) {
                    currentColor = board[winningLines[j][0][0]][winningLines[j][0][1]];
                }

                if (board[winningLines[j][i][0]][winningLines[j][i][1]] !== currentColor) {
                    continue exit;
                } else if (i==3) {
                    if (turn) {
                        alert("Red won!");
                    } else {
                        alert("Yellow won!");
                    }

                    isWin = 1;
                    return;
                }
            }
        }
}