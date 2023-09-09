import CONFIG from './settings.js';

import { snake } from './game.js';

class Board {
  constructor() {
    this.columns = CONFIG.board.columns;
    this.rows = CONFIG.board.rows;
    this.gap = CONFIG.board.gap;

    this.blockSize = CONFIG.board.blockSize;

    this.width = this.columns * this.blockSize;
    this.height = this.rows * this.blockSize;

    this.boardElement = document.getElementById('board');

    // board size
    this.setSize(this.boardElement, {
      width: this.width,
      height: this.height,
    });
  }

  addElement(className, parent = this.boardElement) {
    const element = document.createElement('div');

    this.setElementClass(element, className);
    parent.appendChild(element);

    return element;
  }

  setElementClass(element, className) {
    if (!className) {
      console.error(element, 'invalid class name', className, '!');
      return false;
    }

    if (typeof className == 'string') element.classList.add(className);
    else element.classList.add(...className);
  }

  addBlock(className, position) {
    const size = this.blockSize - this.gap;
    const blockElement = this.addElement(className);

    this.setBlockSize(blockElement, size);
    this.setBlockPosition(blockElement, position);

    return blockElement;
  }

  removeBlock(block) {
    if (!block) {
      console.error(block, 'not exist !');
      return false;
    }

    this.boardElement.removeChild(block);
    return true;
  }

  setSize(element, { width, height } = {}) {
    if (!width || !height) {
      console.error(element, 'invalid size', width, height, '!');
      return false;
    }

    element.style.width = this.toRem(width);
    element.style.height = this.toRem(height);

    return true;
  }

  setBlockSize(element, size) {
    if (!size) {
      console.error(element, 'invalid size', size, '!');
      return false;
    }

    element.style.width = this.toRem(size);

    return true;
  }

  setBlockPosition(element, position) {
    if (!position) {
      console.error(element, 'invalid position', position, '!');
      return false;
    }

    if (position.center) position = this.centerPosition();
    if (position.random) position = this.randomPosition();

    element.style.left = this.toRem(position.x * this.blockSize);
    element.style.top = this.toRem(position.y * this.blockSize);

    return true;
  }

  getBlockPosition(block) {
    return {
      x: parseFloat(block.style.left) / this.blockSize,
      y: parseFloat(block.style.top) / this.blockSize,
    };
  }

  toRem(num) {
    return num + 'rem';
  }

  centerPosition() {
    return {
      x: this.columns / 2 - (this.columns % 2 == 0 ? 0 : 0.5),
      y: this.rows / 2 - (this.rows % 2 == 0 ? 0 : 0.5),
    };
  }

  randomPosition() {
    const freePositions = this.freePositions();

    if (!freePositions) return;

    return freePositions[Math.floor(Math.random() * freePositions.length)];
  }

  freePositions() {
    const blocks = snake.blocks;

    // check if no space is free
    if (blocks.length >= this.columns * this.rows) return false;

    // blocks position
    const blocksPosition = blocks.map((block) => this.getBlockPosition(block));

    let freePositions = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (blocksPosition.some((pos) => pos.x == x && pos.y == y)) {
          continue;
        }

        freePositions.push({ x, y });
      }
    }

    return freePositions;
  }

  isOnBoard(position) {
    if (!position) {
      console.error(position, 'invalid position !');
      return false;
    }

    const { x, y } = position;

    const vertical = 0 <= y && y < this.rows;
    const horizontal = 0 <= x && x < this.columns;

    return vertical && horizontal;
  }
}

export default Board;
