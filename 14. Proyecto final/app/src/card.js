import { generateId } from "./ids.js";

export default class Card{
    id;
    title;

    constructor(title){
        this.title = title;
        this.id = generateId();
    }
    
    getHTML(board, boardIndex, index){
        const id = `card--${this.id}`;
        const dataId = `data-id="${id}"`;
        return `
            <div class="card" id="${id}" data-boardid="board--${board.id}" draggable="true">
                <div class="card-wrapper" ${dataId}>
                    <div class="title" ${dataId}>
                        ${this.title}
                    </div>
                    <div class="options" ${dataId}>
                        <button class="more-options" ${dataId}>...</button>
                        <div class="submenu">
                            <ul>
                                <li><a href="#" class="card-submenu-edit" ${dataId} data-index="${index}" data-board-index="${boardIndex}">Editar</a></li>
                                <li><a href="#" class="card-submenu-delete" ${dataId} data-index="${index}" data-board-index="${boardIndex}">Eliminar</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="placeholder" data-id="${id}" id="${generateId()}"></div>
            </div>
        `;
    }

}