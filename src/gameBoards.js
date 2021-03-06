const uuid = require("uuid").v4;
const randomSudoku = require("./randomSudoku");

// number of cells that are pre filled in the board
// update variable to change difficulty
// good for testing purposes
const N_PLUCK = 37;

const boards = {};
const playerBoardMap = {};

function createBoard() {
    const boardName = uuid();

    const solution2D = randomSudoku.makePuzzle();
    const puzzle2D = randomSudoku.pluck(solution2D, N_PLUCK).puzzle;
    const solution = [].concat(...solution2D);
    const puzzle = [].concat(...puzzle2D);
    let uneditable = [];
    puzzle.forEach((val, index) => {
        if (val !== 0) {
            uneditable.push(index);
        }
    });

    const board = { puzzle, solution, uneditable };
    const startTime = new Date().getTime() / 1000;
    boards[boardName] = {
        board,
        startTime,
        finishTime: null,
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
        const { board } = boards[boardName];
        const verdict = board.puzzle.every(
            (val, i) => val === board.solution[i]
        );
        if (verdict === false) {
            boards[boardName].penalty += 1;
        } else {
            boards[boardName].finishTime = new Date().getTime() / 1000;
        }
        const time = getElapsedTime(boardName);
        const finishTime = getFinishTime(boardName);
        return {
            verdict,
            time,
            finishTime,
            penalty: boards[boardName].penalty,
        };
    } else {
        throw "Can't make submission of non-existent board.";
    }
}

function getUneditableCells(boardName) {
    if (boardExists(boardName)) {
        return boards[boardName].board.uneditable;
    } else {
        throw "Can't get uneditable cells of non existent board.";
    }
}

function getElapsedTime(boardName) {
    if (boardExists(boardName)) {
        const { startTime } = boards[boardName];
        return Math.round(new Date().getTime() / 1000 - startTime);
    } else {
        throw "Can't get elapsed time of non existent board.";
    }
}

function getPenalty(boardName) {
    if (boardExists(boardName)) {
        return boards[boardName].penalty;
    } else {
        throw "Can't get elapsed time of non existent board.";
    }
}

function getFinishTime(boardName) {
    if (boardExists(boardName)) {
        const { startTime, finishTime } = boards[boardName];
        if (finishTime === null) {
            return -1;
        } else {
            return Math.round(finishTime - startTime);
        }
    } else {
        throw "Can't get elapsed time of non existent board.";
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
    getElapsedTime,
    getPenalty,
    getFinishTime,
};
