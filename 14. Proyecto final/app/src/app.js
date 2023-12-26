import Board from "./board.js";
import Card from "./card.js";
import Kanban from "./kanban.js";

const kanban = new Kanban();

const card01 = new Card('Tarea 01');
const card02 = new Card('Tarea 02');
const card03 = new Card('Tarea 03');
const card04 = new Card('Tarea 04');
const card05 = new Card('Tarea 05');
const card06 = new Card('Tarea 06');

const board01 = new Board('TODO', [card01, card02]);
const board02 = new Board('TODO', [card03, card04]);
const board03 = new Board('TODO', [card05, card06]);

kanban.add(board01);
kanban.add(board02);
kanban.add(board03);

console.log(kanban);
const container = document.querySelector('#container');

renderUI();

function renderUI(){
    const boardsHTML = kanban.boards.map((board, boardIndex) => {
        const cardsHTML = board.items.map((card, index) => {
            return card.getHTML(board, boardIndex, index);
        });
        return board.getHTML(boardIndex, cardsHTML);
    });

    container.innerHTML = boardsHTML.join('');
}