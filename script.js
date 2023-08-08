const colorDisplays = document.querySelectorAll(".color-display");
const colorLists = document.querySelectorAll(".color-list");
const colorOptions = document.querySelectorAll(".color-option");

colorDisplays.forEach((display, index) => {
  display.addEventListener("click", () => {
    colorLists[index].classList.toggle("show");
  });
});

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const color = option.dataset.color;
    if (color) {
      option.parentNode.previousElementSibling.style.backgroundColor = color;
      option.parentNode.classList.toggle("show");
    }
  });
});

let currentRow = 0;
const maxGuesses = 6;
const secretKey = generateSecretKey();

document.querySelector("#submit-guess").addEventListener("click", submitGuess);

function submitGuess() {
  if (currentRow < maxGuesses) {
    const guess = Array.from(
      colorDisplays,
      (display) => display.style.backgroundColor
    );
    const guessItems = document
      .querySelectorAll(".guess-row")
      [currentRow].querySelectorAll(".guess-item");
    const guessResultItems = document
      .querySelectorAll(".guess-row")
      [currentRow].querySelectorAll(".guess-result-item");

    guessItems.forEach((item, index) => {
      item.style.backgroundColor = guess[index];
    });

    const validation = checkValidation(guess, secretKey);

    validation.forEach((result, index) => {
      if (result === "black") {
        guessResultItems[index].style.backgroundColor = "black";
      } else if (result === "lavender") {
        guessResultItems[index].style.backgroundColor = "lavender";
      }
    });

    currentRow++;
  } else {
    alert("You have exceeded the maximum number of attempts.");
  }
}

function checkValidation(guess, secretKey) {
  let result = [];
  let colorCountsGuess = {};
  let colorCountsSecret = {};

  for (let i = 0; i < guess.length; i++) {
    // Initialize color counts to 0
    colorCountsGuess[guess[i]] = 0;
    colorCountsSecret[secretKey[i]] = 0;
  }

  for (let i = 0; i < guess.length; i++) {
    // Count the number of each color in the guess and the secret key
    colorCountsGuess[guess[i]]++;
    colorCountsSecret[secretKey[i]]++;

    if (guess[i] === secretKey[i]) {
      result.push("black");
      // Decrease the count of the color that has already been counted as "black"
      colorCountsGuess[guess[i]]--;
      colorCountsSecret[secretKey[i]]--;
    }
  }

  for (let color in colorCountsGuess) {
    if (colorCountsGuess[color] > 0 && colorCountsSecret[color] > 0) {
      // Add "lavender" results for right colors in wrong positions
      let lavenderCount = Math.min(
        colorCountsGuess[color],
        colorCountsSecret[color]
      );
      for (let i = 0; i < lavenderCount; i++) {
        result.push("lavender");
      }
    }
  }

  return result;
}

function generateSecretKey() {
  const colors = ["red", "blue", "green", "yellow", "brown"];
  let secret = [];

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    secret.push(colors[randomIndex]);
  }

  return secret;
}

// ... existing code above ...

document.querySelector("#show-secret").addEventListener("click", showSecret);

function showSecret() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear any existing content

  secretKey.forEach((color) => {
    const colorCircle = document.createElement("div");
    colorCircle.style.backgroundColor = color;
    colorCircle.style.borderRadius = "50%"; // Make it a circle
    colorCircle.style.width = "30px";
    colorCircle.style.height = "30px";
    colorCircle.style.display = "inline-block";
    colorCircle.style.margin = "10px";
    resultDiv.appendChild(colorCircle);
  });
}
