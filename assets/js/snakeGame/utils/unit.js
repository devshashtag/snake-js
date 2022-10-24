import { board } from '../app.js';

export const unit = {
  px: (pos) => `${pos}px`,
  rem: (pos) => `${pos}rem`,
  number: (pos) => parseInt(pos),

  block: (block) => {
    return {
      x: parseInt(block.style.left) / board.block.size,
      y: parseInt(block.style.top) / board.block.size,
    };
  },
  isEqual: (pos1, pos2) => pos1.x == pos2.x && pos1.y == pos2.y,
};
