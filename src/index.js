const express = require("express");
const cors = require("cors");
const path = require("path");
const store = require("./gameBoards");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
const server = require("http").createServer(app);
const io = require("socket.io")(server);

function leavePlayerFromAnyBoard(player, callback) {
    if (typeof callback !== "function") {
        callback = () => {};
    }
    const boardName = store.boardOfPlayer(player);
    if (boardName !== undefined) {
        player.leave(boardName, () => {
            store.removePlayerFromAnyBoard(player);
            callback();
        });
    } else {
        callback();
    }
}

function joinPlayerToBoard(player, boardName) {
    leavePlayerFromAnyBoard(player, () => {
        player.join(boardName, () => {
            store.addPlayerToBoard(player, boardName);
            player.emit("joinedBoard", boardName);
            const cells = [];
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    const val = store.getCellOfBoard(boardName, i, j);
                    cells.push({ row: i, col: j, val });
                }
            }
            player.emit("updatedCells", cells);
        });
    });
}

io.on("connection", function (player) {
    console.log("Player connected!\nID: " + player.id);

    player.on("createBoard", () => {
        const boardName = store.createBoard();
        joinPlayerToBoard(player, boardName);
    });

    player.on("joinBoard", (boardName) => {
        if (store.boardExists(boardName)) {
            joinPlayerToBoard(player, boardName);
        } else {
            player.emit("errorOccurred", `${boardName} doesn't exists!`);
        }
    });

    player.on("updateCell", ({ row, col, val }) => {
        row = parseInt(row);
        col = parseInt(col);
        val = parseInt(val);
        const boardName = store.boardOfPlayer(player);
        if (boardName !== undefined) {
            try {
                store.updateCellOfBoard(boardName, row, col, val);
                io.to(boardName).emit("updatedCells", [{ row, col, val }]);
            } catch (e) {
                player.emit("errorOccurred", e);
            }
        } else {
            player.emit(
                "errorOccurred",
                "Client is not connected to any channels."
            );
        }
    });

    player.on("submitBoard", () => {
        const boardName = store.boardOfPlayer(player);
        if (boardName !== undefined) {
            const res = store.makeSubmission(boardName);
            player.emit("submissionResult", res);
        } else {
            player.emit(
                "errorOccurred",
                "Player is not yet joined to a board. Cannot submit."
            );
        }
    });

    player.on("disconnect", () => {
        console.log("Player left lmao!");
        leavePlayerFromAnyBoard(player);
    });
});

app.get("/status/:boardName", (req, res) => {
    console.log(req.params);
    try {
        const uneditableCells = store.getUneditableCells(req.params.boardName);
        const uneditableRowCol = uneditableCells.map((idx) => ({
            row: Math.floor(idx / 9),
            col: idx % 9,
        }));
        res.json({ uneditableRowCol });
    } catch (err) {
        res.status(418).send(err);
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server started on port " + PORT));
