let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning pattern array
let winningPattern = [
  [0, 1, 2], [0, 3, 6], [2, 5, 8], [6, 7, 8],
  [3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6],
];

// Player 'x' plays first
let xTurn = true;
let count = 0;

// Disable all the buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // Enable popup
  popupRef.classList.remove("hide");
};

// Enable all buttons (for new game and restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // Disable popup
  popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter === "x") {
    msgRef.innerHTML = "&#x1F389;<br> 'x' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'o' Wins";
  }
};

// Function for a draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E;<br>It's a Draw";
};

// New game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// Win logic
const winChecker = () => {
  // Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    // Check if elements are filled
    // If 3 empty elements are the same, it would give a win
    if (element1 !== "" && element2 !== "" && element3 !== "") {
      if (element1 === element2 && element2 === element3) {
        // If all 3 buttons have the same values, then pass the values to win function
        winFunction(element1);
        return; // Exit the function if there's a winner
      }
    }
  }

  // Check for a draw
  if (count === 9) {
    drawFunction();
  }
};

// Display x/o on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      // Display x
      element.innerText = "x";
      element.disabled = true;
    } else {
      xTurn = true;
      // Display y
      element.innerText = "o";
      element.disabled = true;
    }
    // Increment count on each click
    count += 1;
    // Check for win on every click
    winChecker();
  });
});

// Enable buttons and disable popup on page load
window.onload = enableButtons;
