function testCalculateLine() {
  // Test 1: Partial match, with two correct colors in the right position
  let guess = ["red", "blue", "brown", "brown"];
  let secretKey = ["red", "blue", "green", "yellow"];
  console.log(
    "Test 1:\nGuess:",
    guess.join(", "),
    "\nSecret-Key:",
    secretKey.join(", "),
    "\nOutput:",
    checkValidation(guess, secretKey).join(", ")
  );
  console.assert(
    JSON.stringify(checkValidation(guess, secretKey)) ===
      JSON.stringify(["black", "black"]),
    "Test 1 not passed" //This message will be returned if the test fails, otherwise passed
  );

  // Test 2: Partial match, with correct colors but in wrong positions
  guess = ["yellow", "green", "blue", "red"];
  secretKey = ["red", "blue", "green", "yellow"];
  console.log(
    "Test 2:\nGuess:",
    guess.join(", "),
    "\nSecret-Key:",
    secretKey.join(", "),
    "\nOutput:",
    checkValidation(guess, secretKey).join(", ")
  );
  console.assert(
    JSON.stringify(checkValidation(guess, secretKey)) ===
      JSON.stringify(["lavender", "lavender", "lavender", "lavender"]),
    "Test 2 not passed" //This message will be returned if the test fails, otherwise passed
  );

  // Test 3: Partial match, with one correct color in the right position and one correct color in the wrong position
  guess = ["red", "green", "brown", "brown"];
  secretKey = ["brown", "green", "blue", "yellow"];
  console.log(
    "Test 3:\nGuess:",
    guess.join(", "),
    "\nSecret-Key:",
    secretKey.join(", "),
    "\nOutput:",
    checkValidation(guess, secretKey).join(", ")
  );
  console.assert(
    JSON.stringify(checkValidation(guess, secretKey)) ===
      JSON.stringify(["black", "lavender"]),
    "Test 3 not passed"
  );

  // Test 4: Partial match, with two correct color in the right position, with repetation
  guess = ["brown", "green", "brown", "green"];
  secretKey = ["brown", "green", "blue", "yellow"];
  console.log(
    "Test 4:\nGuess:",
    guess.join(", "),
    "\nSecret-Key:",
    secretKey.join(", "),
    "\nOutput:",
    checkValidation(guess, secretKey).join(", ")
  );
  console.assert(
    JSON.stringify(checkValidation(guess, secretKey)) ===
      JSON.stringify(["black", "black"]),
    "Test 4 not passed"
  );

  // Test 5: Completely wrong guess
  guess = ["brown", "brown", "brown", "brown"];
  secretKey = ["red", "blue", "green", "yellow"];
  console.log(
    "Test 5:\nGuess:",
    guess.join(", "),
    "\nSecret-Key:",
    secretKey.join(", "),
    "\nOutput:",
    checkValidation(guess, secretKey).join(", ")
  );
  console.assert(
    JSON.stringify(checkValidation(guess, secretKey)) === JSON.stringify([]),
    "Test 5 not passed"
  );

  // Test 6: Exact match
  guess = ["red", "blue", "green", "yellow"];
  secretKey = ["red", "blue", "green", "yellow"];
  console.log(
    "Test 6:\nGuess:",
    guess.join(", "),
    "\nSecret-Key:",
    secretKey.join(", "),
    "\nOutput:",
    checkValidation(guess, secretKey).join(", ")
  );
  console.assert(
    JSON.stringify(checkValidation(guess, secretKey)) ===
      JSON.stringify(["black", "black", "black", "black"]),
    "Test 6 not passed"
  );
}
