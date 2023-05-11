const DEFAULT_VALUE = 0;
const WIN_VALUE = 2048;
const randomValue = [2, 4];

let BOARD_SIZE = 4;

let SCORE = 0;

export const getScore = () => {
  return SCORE;
};

export const getEmptyBoard = (n) => {
  if (n != undefined) {
    BOARD_SIZE = n;
    SCORE = 0;
  }
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const temp = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      temp.push(DEFAULT_VALUE);
    }
    board.push(temp);
  }

  return board;
};

const hasValue = (board, value) => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === value) {
        return true;
      }
    }
  }
  return false;
};

export const isFull = (board) => {
  return !hasValue(board, DEFAULT_VALUE);
};

const getRandomPosition = () => {
  const rowPosition = Math.floor(Math.random() * BOARD_SIZE);
  const colPosition = Math.floor(Math.random() * BOARD_SIZE);
  return [rowPosition, colPosition];
};

export const generateRandom = (board) => {
  if (isFull(board)) {
    return board;
  }

  let [row, col] = getRandomPosition();
  while (board[row][col] !== DEFAULT_VALUE) {
    [row, col] = getRandomPosition();
  }

  board[row][col] = randomValue[Math.floor(Math.random() * randomValue.length)];
  return board;
};

const compress = (board) => {
  const newBoard = getEmptyBoard();
  for (let i = 0; i < BOARD_SIZE; i++) {
    let colIndex = 0;
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] !== DEFAULT_VALUE) {
        newBoard[i][colIndex] = board[i][j];
        colIndex++;
      }
    }
  }
  return newBoard;
};

const merge = (board) => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE - 1; j++) {
      if (board[i][j] !== DEFAULT_VALUE && board[i][j] === board[i][j + 1]) {
        board[i][j] = board[i][j] * 2;
        SCORE += board[i][j];
        board[i][j + 1] = DEFAULT_VALUE;
      }
    }
  }
  return board;
};

export const moveLeft = (board) => {
  const newBoard1 = compress(board);
  const newBoard2 = merge(newBoard1);
  return compress(newBoard2);
};

const reverse = (board) => {
  const reverseBoard = getEmptyBoard();

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      reverseBoard[i][j] = board[i][BOARD_SIZE - 1 - j];
    }
  }

  return reverseBoard;
};

export const moveRight = (board) => {
  const reversedBoard = reverse(board);
  const newBoard = moveLeft(reversedBoard);
  return reverse(newBoard);
};

const rotateLeft = (board) => {
  const rotateBoard = getEmptyBoard();

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      rotateBoard[i][j] = board[j][BOARD_SIZE - 1 - i];
    }
  }

  return rotateBoard;
};

const rotateRight = (board) => {
  const rotateBoard = getEmptyBoard();

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      rotateBoard[i][j] = board[BOARD_SIZE - 1 - j][i];
    }
  }

  return rotateBoard;
};

export const moveUp = (board) => {
  const rotateBoard = rotateLeft(board);
  const newBoard = moveLeft(rotateBoard);
  return rotateRight(newBoard);
};

export const moveDown = (board) => {
  const rotateBoard = rotateRight(board);
  const newBoard = moveLeft(rotateBoard);
  return rotateLeft(newBoard);
};

export const checkWin = (board) => {
  return hasValue(board, WIN_VALUE);
};

const hasDiff = (board, updatedBoard) => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] !== updatedBoard[i][j]) {
        return true;
      }
    }
  }
  return false;
};

export const isOver = (board) => {
  let beforeScore = SCORE;
  if (hasDiff(board, moveLeft(board))) {
    SCORE = beforeScore;
    return false;
  }
  if (hasDiff(board, moveRight(board))) {
    SCORE = beforeScore;
    return false;
  }
  if (hasDiff(board, moveUp(board))) {
    SCORE = beforeScore;
    return false;
  }
  if (hasDiff(board, moveDown(board))) {
    SCORE = beforeScore;
    return false;
  }
  SCORE = beforeScore;
  return true;
};
