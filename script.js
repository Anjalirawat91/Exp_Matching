// =========================
// Get HTML Elements
// =========================

const inputString = document.getElementById("inputString");
const pattern = document.getElementById("pattern");

const matchBtn = document.getElementById("matchBtn");
const clearBtn = document.getElementById("clearBtn");

const result = document.getElementById("result");


// =========================
// Match Button
// =========================

matchBtn.addEventListener("click", checkMatch);


// =========================
// Clear Button
// =========================

clearBtn.addEventListener("click", clearFields);


// =========================
// Main Function
// =========================

function checkMatch() {

    const text = inputString.value;
    const pat = pattern.value;


    // Check empty input
    if (text === "" || pat === "") {

        result.className = "invalid";

        result.textContent =
            "Please enter both string and pattern.";

        return;
    }


    // Check uppercase English letters
    if (!/^[A-Z]+$/.test(text)) {

        result.className = "invalid";

        result.textContent =
            "Invalid input. Use uppercase English letters only.";

        return;
    }


    // Check pattern syntax
    if (!isValidPattern(pat)) {

        result.className = "invalid";

        result.textContent =
            "Invalid Pattern";

        return;
    }


    // Start timer
    const startTime = performance.now();


    // Perform matching
    const isMatch = matchPattern(text, pat);


    // End timer
    const endTime = performance.now();

    const timeTaken =
        (endTime - startTime).toFixed(2);


    // Display result
    if (isMatch) {

        result.className = "success";

        result.innerHTML =
            `✓ Match Found<br>
             <small>Execution Time: ${timeTaken} ms</small>`;

    } else {

        result.className = "failure";

        result.innerHTML =
            `✗ No Match<br>
             <small>Execution Time: ${timeTaken} ms</small>`;
    }
}


// =========================
// Validate Pattern
// =========================

function isValidPattern(pat) {

    // Pattern must contain only
    // uppercase letters and +
    if (!/^[A-Z+]+$/.test(pat)) {
        return false;
    }


    // Pattern cannot start with +
    if (pat[0] === "+") {
        return false;
    }


    // Pattern cannot contain ++
    if (pat.includes("++")) {
        return false;
    }


    return true;
}


// =========================
// Pattern Matching
// =========================

function matchPattern(text, pat) {

    let textIndex = 0;
    let patternIndex = 0;


    while (patternIndex < pat.length) {

        const currentChar = pat[patternIndex];


        // Normal character
        if (
            patternIndex + 1 >= pat.length ||
            pat[patternIndex + 1] !== "+"
        ) {

            if (
                textIndex >= text.length ||
                text[textIndex] !== currentChar
            ) {
                return false;
            }

            textIndex++;
            patternIndex++;

        }


        // Character followed by +
        else {

            // The character must appear
            // at least once
            if (
                textIndex >= text.length ||
                text[textIndex] !== currentChar
            ) {
                return false;
            }


            // Match one or more occurrences
            while (
                textIndex < text.length &&
                text[textIndex] === currentChar
            ) {

                textIndex++;
            }


            // Move past character and +
            patternIndex += 2;
        }
    }


    // Pattern must cover
    // the complete input string
    return textIndex === text.length;
}


// =========================
// Clear Fields
// =========================

function clearFields() {

    inputString.value = "";

    pattern.value = "";

    result.className = "";

    result.textContent =
        "Enter a string and pattern to check.";
}