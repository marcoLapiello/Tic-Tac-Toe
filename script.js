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

    let winningCombination = checkWinningCombination();
    if (winningCombination) {
      document.getElementById("end").innerHTML = getEndTemplate();
      let lineColor =
        currentPlayer === "cross"
          ? "rgba(255, 192, 3, 0.3)"
          : "rgba(0, 176, 238, 0.3)";
      drawWinningLine(winningCombination, lineColor);
    } else {
      currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
      noWinner();
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

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boardState[a] !== null &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return combination;
    }
  }

  return null;
}

function drawWinningLine(winningCombination, lineColor) {
  const cells = document.querySelectorAll("td");

  let startCell = cells[winningCombination[0]].getBoundingClientRect();
  let endCell = cells[winningCombination[2]].getBoundingClientRect();

  let startX = startCell.left + startCell.width / 2;
  let startY = startCell.top + startCell.height / 2 - 3;
  let endX = endCell.left + endCell.width / 2;
  let endY = endCell.top + endCell.height / 2 - 3;

  let svgLine = getWinningLineTemplate(startX, startY, endX, endY, lineColor);

  document.body.insertAdjacentHTML("beforeend", svgLine);
}

function playAgain() {
  boardState = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "cross";
  document.getElementById("end").innerHTML = "";
  const existingLines = document.querySelectorAll("svg");
  existingLines.forEach((line) => line.remove());
  createBoard();
}

function noWinner() {
  if (boardState.includes(null)) {
    return false;
  } else {
    currentPlayer = "Nobody";
    document.getElementById("end").innerHTML = getEndTemplate();
  }
}
