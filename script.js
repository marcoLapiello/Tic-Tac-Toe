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
    // Switch player after move
    currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
    // Update player indicators
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

function createCircleSVG() {
  return /*html*/ `
     <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#00B0EE" stroke-width="9" fill="none" stroke-dasharray="283" stroke-dashoffset="283">
            <animate 
                attributeName="stroke-dashoffset"
                from="270"
                to="0"
                dur="0.4s"
                fill="freeze" />
        </circle>
    </svg>
  `;
}

function createCrossSVG() {
  return /*html*/ `
    
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        
        <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC003" stroke-width="9" stroke-linecap="round">
            <animate 
                attributeName="x2"
                from="20"
                to="80"
                dur="0.4s"
                fill="freeze" />
            <animate 
                attributeName="y2"
                from="20"
                to="80"
                dur="0.4s"
                fill="freeze" />
        </line>
        
        
        <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC003" stroke-width="9" stroke-linecap="round">
            <animate 
                attributeName="x1"
                from="20"
                to="80"
                dur="0.4s"
                fill="freeze" />
            <animate 
                attributeName="y1"
                from="80"
                to="20"
                dur="0.4s"
                fill="freeze" />
        </line>
    </svg>
  `;
}

function getPlayersTemplate() {
  return /*html*/ `
        <div class="player-indicator">
      <div id="crossIndicator" class="${
        currentPlayer === "cross" ? "highlight" : ""
      }">
        ${createCrossSVG()}
      </div>
      <div id="circleIndicator" class="${
        currentPlayer === "circle" ? "highlight" : ""
      }">
        ${createCircleSVG()}
      </div>
    </div>
    `;
}
