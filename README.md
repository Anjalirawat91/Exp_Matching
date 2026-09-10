# Regular Expression Matcher

A simple web project that checks whether an input string matches a given pattern.

The project supports the `+` operator, which means one or more occurrences of the previous character.

## About

For example:

`AAAB` with pattern `A+B` → True

`AABA` with pattern `AA` → False

The program also detects invalid patterns.

## Features

- Enter an input string
- Enter a pattern
- Supports the `+` operator
- Checks complete string matching
- Detects invalid patterns
- Shows execution time
- Responsive design

## Technologies Used

- HTML
- CSS
- JavaScript
- Pattern Matching

## How It Works

The program checks the pattern character by character.

If `+` is present, the previous character must occur one or more times.

The complete input string must match the pattern for the result to be True.

## Author

**Anjali Rawat**
