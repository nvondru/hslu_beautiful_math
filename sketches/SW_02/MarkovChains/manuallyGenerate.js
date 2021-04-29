let rootLinks = {};

let currentText;

function preload() {
  currentText = loadStrings("./sources/harrypotter.txt");
}

function setup() {
  createCanvas(400, 400);

  analyzeText(currentText);

  // create first random sentence
  // Should start with capital letter
  // should have aprox. 15 words
  // should end with a punctuation mark
  // each word is styled according to its probability
  // probable -> small/red
  // unprobable -> big/green

  // Word.onclick = create new random sentence
}

class RootLink {
  constructor(word) {
    this.word = word;
    this.chainLinks = [];
  }

  getNextChainLink() {}
}

class ChainLink {
  constructor(word) {
    this.word = word;
    this.probability = 1;
  }

  increaseProbability() {
    this.probability += 1;
  }

  getSelfAsRoot() {
    // return the object in the dictionary as rootlink
  }
}

class Word {
  constructor(word, probability) {
    this.word = word;
    this.probability = probability;
  }
}

function analyzeText(textAsStringArray) {
  let tempSource = "";
  textAsStringArray.forEach((line) => {
    tempSource += line;
    tempSource += " ";
  });

  // create array containing all words
  let words = splitTokens(tempSource, [" "]);

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
      chainLink.word == nextWord;
    });

    if (currentChainLink != undefined) {
      currentChainLink.increaseProbability();
    } else {
      rootLink.chainLinks.push(new ChainLink(nextWord));
    }
  }

  console.log(rootLinks);
}

/**
 * returns: Array of word objects
 */
function generateRandomSentence(preferredMaxLength) {
  let words = [];

  while (words.length < preferredMaxLength && !currentWordHasPunctuationMark) {}
}

function displaySentence(words) {}
