let canvas;
let rootLinks = {};
let words = [];

let currentText;

function preload() {
  currentText = loadStrings("./sources/harrypotter.txt");
}

function setup() {
  const cWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const cHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  canvas = createCanvas(cWidth, cHeight);
  analyzeText(currentText);
  console.log(canvas.canvas);
  canvas.canvas.addEventListener("click", createFirstSentence);
  Array.from(document.getElementsByTagName("button")).forEach((btn) => {
    btn.addEventListener("click", (event) => {
      loadStrings(event.target.value, (text) => {
        analyzeText(text);
      });
    });
  });
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  displayComment(width, height);
}

function createFirstSentence(event) {
  let startingWord;
  // First word should be capital!
  do {
    let wordText = words[Math.floor(Math.random() * words.length)];
    startingWord = new Word(wordText, 0.5);
  } while (!startingWord.startsWithCapitalLetter());

  let firstSentence = generateRandomSentence(8, startingWord);
  displaySentence(
    firstSentence,
    { x: event.pageX, y: event.pageY },
    "horizontal"
  );
  canvas.canvas.removeEventListener("click", createFirstSentence);
}

function displaySentence(words, initialPosition, direction) {
  let container = document.createElement("div");
  words.forEach((word) => {
    let wordDiv = document.createElement("div");
    wordDiv.innerText = word.word + " ";
    wordDiv["word"] = word;
    container.appendChild(wordDiv);
    wordDiv.style.color =
      "hsl(120, 100%, " + map(word.probability, 0, 1, 0, 50) + "%)";
    wordDiv.style.fontSize = map(word.probability, 0, 1, 13, 30) + "px";
    wordDiv.classList.add("word");
    wordDiv.addEventListener("click", (event) => {
      let sentence = generateRandomSentence(10, wordDiv.word);
      console.log(direction);
      if (direction == "horizontal") {
        displaySentence(
          sentence,
          { x: event.pageX, y: event.pageY },
          "vertical"
        );
      } else {
        displaySentence(
          sentence,
          { x: event.pageX, y: event.pageY },
          "horizontal"
        );
      }
    });
  });
  container.addEventListener("mouseenter", (event) => {
    Array.from(document.getElementsByClassName("container")).forEach(
      (other) => {
        if (other != container) {
          other.classList.add("container--faded");
        }
      }
    );
  });
  container.addEventListener("mouseleave", (event) => {
    Array.from(document.getElementsByClassName("container")).forEach(
      (other) => {
        if (other != container) {
          other.classList.remove("container--faded");
        }
      }
    );
  });
  container.classList.add("container");
  console.log(1 + Math.floor(Math.random() * 2));
  container.classList.add(
    "container--" + direction + "--" + (1 + Math.floor(Math.random() * 2))
  );
  container.style.left = initialPosition.x + "px";
  container.style.top = initialPosition.y + "px";
  document.body.appendChild(container);
}
class RootLink {
  constructor(word) {
    this.word = word;
    this.chainLinks = [];
  }

  getNextChainLink() {
    let totalOccurences = 0;
    this.chainLinks.forEach((chainLink) => {
      totalOccurences += chainLink.occurences;
    });

    let currentChainLink;
    let probabilityRoll;
    let chainLinkProbability;
    do {
      probabilityRoll = Math.random();
      currentChainLink = this.chainLinks[
        Math.floor(Math.random() * this.chainLinks.length)
      ];
      chainLinkProbability = currentChainLink.occurences / totalOccurences;
      currentChainLink.probability = chainLinkProbability;
    } while (probabilityRoll > chainLinkProbability);
    return currentChainLink;
  }
}

class ChainLink {
  constructor(word) {
    this.word = word;
    this.occurences = 1;
  }

  increaseOccurenceCount() {
    this.occurences += 1;
  }
}

class Word {
  constructor(word, probability) {
    this.word = word;
    this.probability = probability;
  }
  hasPunctuationMark() {
    let lastChar = this.word.slice(-1);
    if (lastChar == "." || lastChar == "!" || lastChar == "?") {
      return true;
    } else {
      return false;
    }
  }
  startsWithCapitalLetter() {
    return /[A-Z]/.test(this.word[0]);
  }
}

function analyzeText(textAsStringArray) {
  rootLinks = {};
  let tempSource = "";
  textAsStringArray.forEach((line) => {
    tempSource += line;
    tempSource += " ";
  });

  // create array containing all words
  words = splitTokens(tempSource, [" "]);

  // for every word of our text
  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];
    let nextWord;
    if (i + 1 < words.length) {
      nextWord = words[i + 1];
    }

    let rootLink;
    // create an attribute in our dictionary for each word
    if (rootLinks[currentWord] === undefined) {
      rootLink = new RootLink(currentWord);
      rootLinks[currentWord] = rootLink;
    } else {
      rootLink = rootLinks[currentWord];
    }

    let currentChainLink = rootLink.chainLinks.find((chainLink) => {
      return chainLink.word == nextWord;
    });

    if (currentChainLink != undefined) {
      currentChainLink.increaseOccurenceCount();
    } else {
      rootLink.chainLinks.push(new ChainLink(nextWord));
    }
  }
}

/**
 * returns: Array of word objects
 */
function generateRandomSentence(preferredMaxLength, startingWord) {
  let sentence = [];
  let currentWord = {};
  sentence.push(startingWord);
  currentWord = startingWord;

  // get random weighted words according to probability
  while (sentence.length < preferredMaxLength - 1) {
    let chainLink = rootLinks[currentWord.word].getNextChainLink();
    console.log(chainLink.probability);

    currentWord = new Word(chainLink.word, chainLink.probability);
    sentence.push(currentWord);
  }

  // find word with punctuation mark
  while (!currentWord.hasPunctuationMark()) {
    let chainLink = rootLinks[currentWord.word].getNextChainLink();
    currentWord = new Word(chainLink.word, chainLink.probability);
    sentence.push(currentWord);
  }

  return sentence;
}
