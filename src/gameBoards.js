const uuid = require("uuid").v4;
const randomSudoku = require("./randomSudoku");
const boards = {};
const playerBoardMap = {};

function createBoard() {
    const boardName = uuid();
    let solution = [];
    let puzzle = [];
    const potato = randomSudoku.makePuzzle();
    const tomato = randomSudoku.pluck(potato, 25).puzzle;
    potato.forEach(arr => { solution = [...solution, ...arr]; } );
    tomato.forEach(arr => { puzzle = [...puzzle, ...arr]; } );
    const board = { puzzle, solution };
    console.log(board);
    const startTime = new Date().getTime() / 1000;
    boards[boardName] = {
        board,
        startTime,
        penalty: 0,
    };
    return boardName;
}

function boardOfPlayer(player) {
    return playerBoardMap[player.id];
}

function boardExists(boardName) {
    return boardName in boards;
}

function addPlayerToBoard(player, boardName) {
    if (boardExists(boardName)) {
        playerBoardMap[player.id] = boardName;
    } else {
        throw "Can't add player to non existent board.";
    }
}

function removePlayerFromAnyBoard(player) {
    if (player.id in playerBoardMap) {
        delete playerBoardMap[player.id];
    }
}

function _validCellParams(row, col, val) {
    return row >= 0 && row < 9 && col >= 0 && col < 9 && val >= 0 && val <= 9;
}

function updateCellOfBoard(boardName, row, col, val) {
    if (boardExists(boardName)) {
        if (_validCellParams(row, col, val)) {
            const cell = row * 9 + col;
            boards[boardName].board.puzzle[cell] = val;
        } else {
            throw "Row, Col, or Val is invalid.";
        }
    } else {
        throw "Can't update cell of non-existent board.";
    }
}

function getCellOfBoard(boardName, row, col) {
    if (boardExists(boardName)) {
        if (_validCellParams(row, col, 0)) {
            const cell = row * 9 + col;
            return boards[boardName].board.puzzle[cell];
        } else {
            throw "Row, Col, or Val is invalid.";
        }
    } else {
        throw "Can't get cell  of non-existent board.";
    }
}

function makeSubmission(boardName) {
    if (boardExists(boardName)) {
        const { board, startTime } = boards[boardName];
        const verdict = board.puzzle.every(
            (val, i) => val === board.solution[i]
        );
        if (verdict === false) {
            boards[boardName].penalty += 1;
        }
        const time = new Date().getTime() / 1000 - startTime;
        return { verdict, time, penalty: boards[boardName].penalty };
    } else {
        throw "Can't make submission of non-existent board.";
    }
}

module.exports = {
    createBoard,
    boardExists,
    boardOfPlayer,
    addPlayerToBoard,
    removePlayerFromAnyBoard,
    updateCellOfBoard,
    getCellOfBoard,
    makeSubmission,
};
