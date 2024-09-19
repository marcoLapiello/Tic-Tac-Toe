let boardState = [
  null,
  "cross",
  null,
  "cross",
  null,
  null,
  "circle",
  "circle",
  "circle",
];

function createBoard() {
  let boardContainer = document.getElementById("gameBoard");
  let boardHTML = "<table>";

  for (let row = 0; row < 3; row++) {
    boardHTML += "<tr>";
    for (let column = 0; column < 3; column++) {
      let cellState = boardState[row * 3 + column];
      let symbol = "";
      if (cellState === "circle") {
        symbol = "O";
      } else if (cellState === "cross") {
        symbol = "X";
      }
      boardHTML += `<td>${symbol}</td>`;
    }
    boardHTML += "</tr>";
  }
  boardHTML += "</table>";
  boardContainer.innerHTML = boardHTML;
}
