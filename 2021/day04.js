import { getInput } from "../2019/common/inputReader.js";

class Cell {
    constructor(value) {
        this.value = Number(value);
        this.marked = false;
    }
    mark(number) {
        if (this.value === number) {
            this.marked = true;
        }
    }
}
class BingoBoard {
    constructor() {
        this.board = [];
        this.isWinning = false;
    }
    addRow(row) {
        this.board.push(
            row
                .split(" ")
                .filter((s) => s)
                .map((value) => new Cell(value))
        );
    }
    drawNumber(number) {
        this.lastDrawnNumber = number;
        for (const row of this.board) {
            for (const cell of row) {
                cell.mark(number);
            }
        }
        this.isWinning = this.checkWinning();
    }
    checkWinning() {
        for (const row of this.board) {
            if (row.reduce((previous, current) => previous && current.marked, true)) {
                return true;
            }
        }
        for (let i = 0; i < 5; i++) {
            let accumulator = true;
            for (const row of this.board) {
                accumulator = accumulator && row[i].marked;
            }
            if (accumulator) {
                return true;
            }
        }
        return false;
    }
    get score() {
        let score = 0;
        for (const row of this.board) {
            score += row.reduce((previous, current) => previous + (current.marked ? 0 : current.value), 0);
        }
        return score * this.lastDrawnNumber;
    }
}

function buildBoards(data) {
    let index = 0;
    const boards = [];
    while (index < data.length - 1) {
        const newBoard = new BingoBoard();
        for (let i = 0; i < 5; i++) {
            newBoard.addRow(data[index + i]);
        }
        boards.push(newBoard);
        index += 6;
    }
    return boards;
}

function draw(bingoNumbers, boards) {
    for (const drawnNumber of bingoNumbers) {
        for (let board of boards) {
            board.drawNumber(drawnNumber);
            if (board.isWinning) {
                return board;
            }
        }
    }
}

let data = getInput("day04.txt");
const bingoNumbers = data.shift().split(",").map(Number);
data.shift();
const boards = buildBoards(data);
const winningBoard = draw(bingoNumbers, boards);
console.log(winningBoard.score);
