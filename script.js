const inputString = document.getElementById("inputString");
const pattern = document.getElementById("pattern");

const matchBtn = document.getElementById("matchBtn");
const clearBtn = document.getElementById("clearBtn");

const result = document.getElementById("result");


matchBtn.addEventListener("click", checkMatch);


clearBtn.addEventListener("click", clearFields);


function checkMatch() {

    const text = inputString.value;
    const pat = pattern.value;


    if (text === "" || pat === "") {

        result.className = "invalid";

        result.textContent =
            "Please enter both string and pattern.";

        return;
    }


    if (!/^[A-Z]+$/.test(text)) {

        result.className = "invalid";

        result.textContent =
            "Invalid input. Use uppercase English letters only.";

        return;
    }


    if (!isValidPattern(pat)) {

        result.className = "invalid";

        result.textContent =
            "Invalid Pattern";

        return;
    }


    const startTime = performance.now();


    const isMatch = matchPattern(text, pat);


    const endTime = performance.now();

    const timeTaken =
        (endTime - startTime).toFixed(2);


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


function isValidPattern(pat) {

    if (!/^[A-Z+]+$/.test(pat)) {
        return false;
    }

    if (pat[0] === "+") {
        return false;
    }

    if (pat.includes("++")) {
        return false;
    }


    return true;
}


function matchPattern(text, pat) {

    let textIndex = 0;
    let patternIndex = 0;


    while (patternIndex < pat.length) {

        const currentChar = pat[patternIndex];


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


        else {
            if (
                textIndex >= text.length ||
                text[textIndex] !== currentChar
            ) {
                return false;
            }

            while (
                textIndex < text.length &&
                text[textIndex] === currentChar
            ) {

                textIndex++;
            }


            patternIndex += 2;
        }
    }

    return textIndex === text.length;
}


function clearFields() {

    inputString.value = "";

    pattern.value = "";

    result.className = "";

    result.textContent =
        "Enter a string and pattern to check.";
}