let rootLinks = {};
let words = [];

let currentText;

function preload() {
  currentText = loadStrings("./sources/harrypotter.txt");
}

function setup() {
  createCanvas(400, 400);

  analyzeText(currentText);
  // console.log(generateRandomSentence(15));

  console.log(rootLinks["Mr."]);

  // test probability calculation
  for (let i = 0; i < 100; i++) {
    let currentWord = new Word("Mr.", 1);
    let chainLink = rootLinks["Mr."].getNextChainLink();

    console.log("Mr. " + chainLink.word + " / " + chainLink.occurences);
  }

  // create first random sentence
  // Should start with capital letter
  // should have aprox. 15 words
  // should end with a punctuation mark
  // each word is styled according to its occurences
  // probable -> small/red
  // unprobable -> big/green

  // Word.onclick = create new random sentence
}

class RootLink {
  constructor(word) {
    this.word = word;
    this.chainLinks = [];
  }

  //  THIS SHIT IS RIGGED!!!
  getNextChainLink() {
    let totalOccurences = 0;
    this.chainLinks.forEach((chainLink) => {
      totalOccurences += chainLink.occurences;
    });

    let currentChainLink;
    let probabilityRoll = Math.random();
    let chainLinkProbability;
    do {
      console.log(Math.floor(Math.random() * this.chainLinks.length));
      currentChainLink = this.chainLinks[
        Math.floor(Math.random() * this.chainLinks.length)
      ];

      chainLinkProbability = currentChainLink.occurences / totalOccurences;
      if (probabilityRoll < chainLinkProbability) {
        console.log(
          "Probability of " +
            currentChainLink.word +
            " is " +
            chainLinkProbability +
            " / Roll was: " +
            probabilityRoll
        );
        break;
      }
    } while (probabilityRoll < chainLinkProbability);
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
  constructor(word, occurences) {
    this.word = word;
    this.occurences = occurences;
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

  console.log(rootLinks);
}

/**
 * returns: Array of word objects
 */
function generateRandomSentence(preferredMaxLength) {
  let sentence = [];
  let currentWord = {};

  // First word should be capital!
  do {
    let wordText = words[Math.floor(Math.random() * words.length)];
    currentWord = new Word(wordText, 1);
  } while (!currentWord.startsWithCapitalLetter());
  sentence.push(currentWord);

  // get random weighted words according to probability
  while (sentence.length < preferredMaxLength - 1) {
    let chainLink = rootLinks[currentWord.word].getNextChainLink();
    currentWord = new Word(chainLink.word, chainLink.occurences);
    sentence.push(currentWord);
  }

  // find word with punctuation mark
  while (!currentWord.hasPunctuationMark()) {
    let chainLink = rootLinks[currentWord.word].getNextChainLink();
    currentWord = new Word(chainLink.word, chainLink.occurences);
    sentence.push(currentWord);
  }

  return sentence;
}

function displaySentence(words) {}
