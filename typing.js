const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore.",
    // ... (other sentences)
];

const slogans = [
    "Type it right, make it bright!",
    "Swift fingers, sharp mind!",
    // ... (other slogans)
];

const quoteElement = document.getElementById('quote');
const inputTextElement = document.getElementById('input-text');
const resultElement = document.getElementById('result');
const changeBtn = document.getElementById('change-btn');
const submitBtn = document.getElementById('submit-btn');

let timerStart, timerEnd;

function startTypingTest() {
    const newText = getRandom(sentences);
    setElementText(quoteElement, newText);
    inputTextElement.value = '';
    resultElement.innerHTML = '';
    startTimer();
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function setElementText(element, text) {
    element.innerHTML = text;
}

function startTimer() {
    timerStart = Date.now();
}

function stopTimer() {
    timerEnd = Date.now();
}

function calculateTypingSpeed() {
    const elapsedMilliseconds = timerEnd - timerStart;
    const elapsedMinutes = elapsedMilliseconds / (1000 * 60);
    const originalText = quoteElement.textContent.trim();
    const enteredText = inputTextElement.value.trim();
    const wordCount = originalText.split(' ').length;
    const wordsPerMinute = Math.round(wordCount / elapsedMinutes);
    setElementText(resultElement, `Typing speed: ${wordsPerMinute} words per minute`);
}

function changeSlogan() {
    setElementText(quoteElement, getRandom(slogans));
}

function highlightMistakes() {
    const originalText = quoteElement.textContent.trim();
    const enteredText = inputTextElement.value.trim();
    const originalWords = originalText.split(' ');
    const enteredWords = enteredText.split(' ');

    let highlightedText = originalWords.map((word, index) =>
        enteredWords[index] !== word
            ? `<span class="mistake">${word}</span>`
            : `<span>${word}</span>`
    ).join(' ');

    setElementText(quoteElement, highlightedText);
}

changeBtn.addEventListener('click', function() {
    startTypingTest();
    changeSlogan();
});

submitBtn.addEventListener('click', function() {
    stopTimer();
    calculateTypingSpeed();
    changeSlogan();
});

inputTextElement.addEventListener('input', function() {
    if (!timerStart) {
        startTimer();
    }
    highlightMistakes();
});

startTypingTest();
changeSlogan();
