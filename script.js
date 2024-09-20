let boardState = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "cross";

function createBoard() {
  let boardContainer = document.getElementById("gameBoard");
  let indicatorsContainer = document.getElementById("playerIndicators");

  let indicatorsHTML = getPlayersTemplate();
  let boardHTML = "<table>";

  for (let row = 0; row < 3; row++) {
    boardHTML += "<tr>";
    for (let column = 0; column < 3; column++) {
      let cellIndex = row * 3 + column;
      let cellState = boardState[cellIndex];
      let symbol = "";
      if (cellState === "circle") {
        symbol = createCircleSVG();
      } else if (cellState === "cross") {
        symbol = createCrossSVG();
      }
      boardHTML += `<td onclick="play(${cellIndex}, this)">${symbol}</td>`;
    }
    boardHTML += "</tr>";
  }
  boardHTML += "</table>";
  boardContainer.innerHTML = boardHTML;
  indicatorsContainer.innerHTML = indicatorsHTML;
}

function play(cellIndex, cellElement) {
  if (boardState[cellIndex] === null) {
    boardState[cellIndex] = currentPlayer;
    renderCell(cellIndex, cellElement);

    if (checkWinningCombination()) {
      document.getElementById("end").innerHTML = getEndTemplate();
    } else {
      currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
    }

    whoPlaysNow();
  }
}

function renderCell(cellIndex, cellElement) {
  let cellState = boardState[cellIndex];
  let symbol = "";
  if (cellState === "circle") {
    symbol = createCircleSVG();
  } else if (cellState === "cross") {
    symbol = createCrossSVG();
  }
  cellElement.innerHTML = symbol;
}

function whoPlaysNow() {
  let crossIndicator = document.getElementById("crossIndicator");
  let circleIndicator = document.getElementById("circleIndicator");
  if (currentPlayer === "cross") {
    crossIndicator.classList.add("highlight");
    circleIndicator.classList.remove("highlight");
  } else {
    crossIndicator.classList.remove("highlight");
    circleIndicator.classList.add("highlight");
  }
}

function checkWinningCombination() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      boardState[a] !== null &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

function playAgain() {
  boardState = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "cross";
  document.getElementById("end").innerHTML = "";
  createBoard();
}
