let boardState = [null, null, null, null, null, null, null, null, null];

function createBoard() {
  let boardContainer = document.getElementById("gameBoard");
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
      boardHTML += `<td onclick="play(${cellIndex}, this)">${symbol}</td>`;;
    }
    boardHTML += "</tr>";
  }
  boardHTML += "</table>";
  boardContainer.innerHTML = boardHTML;
}

function play(cellIndex, cellElement) {
  
  if (boardState[cellIndex] === null) {
    boardState[cellIndex] = "cross";
    
    renderCell(cellIndex, cellElement);
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

function createCircleSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#00B0EE" stroke-width="9" fill="none" stroke-dasharray="283" stroke-dashoffset="283">
            <animate 
                attributeName="stroke-dashoffset"
                from="270"
                to="0"
                dur="0.4s"
                fill="freeze" />
        </circle>
    </svg>`;
}

function createCrossSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- First diagonal line -->
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
        
        <!-- Second diagonal line -->
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
    </svg>`;
}
