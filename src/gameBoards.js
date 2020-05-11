const uuid = require("uuid").v4;
const randomSudoku = require("./randomSudoku");

const boards = {};
const playerBoardMap = {};

function createBoard() {
    const boardName = uuid();

    const solution2D = randomSudoku.makePuzzle();
    const puzzle2D = randomSudoku.pluck(solution2D, 25).puzzle;
    const solution = [].concat(...solution2D);
    const puzzle = [].concat(...puzzle2D);
    let uneditable = [];
    puzzle.forEach((val, index) => {
        if (val === 0) {
            uneditable.push(index);
        }
    });

    const board = { puzzle, solution, uneditable };
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

function getUneditableCells(boardName) {
    console.log(boards);
    if (boardExists(boardName)) {
        console.log("Dhukse");
        return boards[boardName].board.uneditable;
    } else {
        throw "Can't get uneditable cells of non existent board.";
    }
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
    getUneditableCells,
};
