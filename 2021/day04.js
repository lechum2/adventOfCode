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
        for (const row in this.board) {
            for (const cell in row) {
                cell.mark(number);
            }
        }
    }
    isWinning() {
        return this.isWinning;
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

function draw(bingoNumbers) {
    for (const drawnNumber in bingoNumbers) {
        for (const board in boards) {
            board.drawNumber(drawnNumber);
            if (board.isWinning()) {
                return board;
            }
        }
    }
}

let data = getInput("day04.txt");
const bingoNumbers = data.shift().split(",").map(Number);
data.shift();
const boards = buildBoards(data);
const winningBoard = draw(bingoNumbers);
console.log(winningBoard);
