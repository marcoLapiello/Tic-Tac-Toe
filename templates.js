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

function getEndTemplate() {
  return /*html*/ `
      ${currentPlayer} wins!
      <button id="endBtn" onclick="playAgain()">Play again</button>
    `;
}
