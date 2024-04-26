let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;

function startGame() {
    player1Name = document.getElementById('player1Name').value || 'Jogador 1';
    player2Name = document.getElementById('player2Name').value || 'Jogador 2';
    currentPlayer = 'X';
    gameOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
    render();
    document.getElementById('status').innerText = `Vez de ${player1Name}`;
}

function handleClick(index) {
    if (!gameOver && !board[index]) {
        board[index] = currentPlayer;
        render();
        const winner = checkWinner();
        if (winner) {
            document.getElementById('status').innerText = `Parabéns, ${winner} venceu!`;
            updateScore(winner);
            gameOver = true;
        } else if (!board.includes('')) {
            document.getElementById('status').innerText = "Empate!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').innerText = `Vez de ${currentPlayer === 'X' ? player1Name : player2Name}`;
        }
    }
}

function checkWinner() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function render() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = board[index];
        if (board[index] === 'X') {
            cell.style.color = 'red';
            cell.style.fontWeight = 'bold';
        } else if (board[index] === 'O') {
            cell.style.color = 'blue';
            cell.style.fontWeight = 'bold';
        } else {
            cell.style.color = 'black';
            cell.style.fontWeight = 'normal';
        }
    });
    document.getElementById('player1NameSpan').innerText = player1Name;
    document.getElementById('player2NameSpan').innerText = player2Name;
    document.getElementById('player1Score').innerText = player1Score;
    document.getElementById('player2Score').innerText = player2Score;
}

function updateScore(winner) {
    if (winner === 'X') {
        player1Score++;
    } else if (winner === 'O') {
        player2Score++;
    }
}
