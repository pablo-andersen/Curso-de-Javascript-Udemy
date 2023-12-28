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
const board02 = new Board('IN PROGRESS', [card03, card04]);
const board03 = new Board('DONE', [card05, card06]);

kanban.add(board01);
kanban.add(board02);
kanban.add(board03);

console.log(kanban);

const container = document.querySelector('#container');
const newBoardButton = document.querySelector('#new-board-button');

newBoardButton.addEventListener('click', addBoard);

renderUI();


function renderUI(){

    const boardsHTML = kanban.boards.map((board, boardIndex) => {

        const cardsHTML = board.items.map((card, index) => {
            return card.getHTML(board, boardIndex, index);
        });

        return board.getHTML(boardIndex, cardsHTML);
    });

    container.innerHTML = boardsHTML.join('');

    enableNewCard();
}

function addBoard(e){
    const name = prompt('Name of the board');
    if(name){
        const board = new Board(name, []);
        kanban.add(board);

        renderUI();
    }
}

function enableNewCard(){
    document.querySelectorAll('.form-new').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const text = form.querySelector('.text').value;
            const card = new Card(text);

            const indexBoard = form.querySelector('.index-board').value;
            kanban.addCard(card, indexBoard);
            renderUI();
        });
    });

    configureSubmenus();
}

function configureSubmenus(){
    const moreButtons = document.querySelectorAll('.more-options');

    moreButtons.forEach(button => {
        button.addEventListener('click', showMoreOptions);        
    });

    const editBoardButton = document.querySelectorAll('.board-submenu-edit');
    const deleteBoardButton = document.querySelectorAll('.board-submenu-delete');
    const editCardButton = document.querySelectorAll('.card-submenu-edit');
    const deleteCardButton = document.querySelectorAll('.card-submenu-delete');

    editBoardButton.forEach(button => {
        button.addEventListener('click', editBoard);
    });
    deleteBoardButton.forEach(button => {
        button.addEventListener('click', deleteBoard);
    });
    editCardButton.forEach(button => {
        button.addEventListener('click', editCard);
    });
    deleteCardButton.forEach(button => {
        button.addEventListener('click', deleteCard);
    }); 
}

function showMoreOptions(e){
    const submenu = e.target.nextElementSibling;
    submenu.classList.toggle('submenu-active');
}

window.addEventListener('click', e => {
    if(!e.target.matches('.more-options')){
        const menus = Array.from(document.querySelectorAll('.submenu-active'));
        menus.forEach(menu => {
            if(menu.classList.contains('submenu-active')){
                menu.classList.remove('submenu-active');
            };
        });
    }
});

function editBoard(e){  
    const id = e.target.getAttribute('data-id');
    const index = e.target.getAttribute('data-index');
    const currentTitle = kanban.getBoard(index).title;
    const title = prompt('New title', currentTitle);
    if(title){
        kanban.updateBoard(id, index, title);
        renderUI();
    }
}
function deleteBoard(e){
    const index = e.target.getAttribute('data-index');
    kanban.removeBoard(index);
    renderUI();
}
function editCard(e){
    const indexCard = e.target.getAttribute('data-index');
    const indexBoard = e.target.getAttribute('data-board-index');

    const currentTitle = kanban.getBoard(indexBoard).get(indexCard).title;

    const title = prompt('New title', currentTitle);
    if(title){
        kanban.updateCard(indexBoard, indexCard, title);
        renderUI();
    }
}
function deleteCard(e){
    const indexCard = e.target.getAttribute('data-index');
    const indexBoard = e.target.getAttribute('data-board-index');

    kanban.removeCard(indexBoard, indexCard);
    
    renderUI();
}