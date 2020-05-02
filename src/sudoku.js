const dummy = JSON.parse(
    require("fs").readFileSync(__dirname + "/dummyPuzzle.json")
);

function getNewPuzzleAndSolution() {
    return dummy;
}

module.exports = { getNewPuzzleAndSolution };
