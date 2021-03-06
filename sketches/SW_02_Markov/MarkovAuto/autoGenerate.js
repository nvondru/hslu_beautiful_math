let lines;
let source;
let words;
let dictionary = {};
let p;

function setup() {
  createCanvas(400, 400);

  let button = createButton("Generate");
  button.mousePressed(generateRandomText);
}

function generateRandomText() {
  lines = loadStrings("./sources/harrypotter.txt", () => {
    // convert string array to simple string
    lines.forEach((line) => {
      source += line;
      source += " ";
    });

    // create array containing all words
    words = splitTokens(source, [" "]);

    // for every word of our text
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let nextWord;
      if (i + 1 < words.length) {
        nextWord = words[i + 1];
      }

      // create an attribute in our dictionary for each word
      if (dictionary[word] === undefined) {
        dictionary[word] = [];
      }

      // add the next word to the list of possible following words
      dictionary[word].push(nextWord);
    }

    // random text generation
    let generatedText = "";
    // First word should be capital!
    let currentWord;
    do {
      currentWord = words[Math.floor(Math.random() * words.length)];
    } while (!startsWithCapitalLetter(currentWord));

    generatedText += currentWord;
    generatedText += " ";
    for (let i = 0; i < 300; i++) {
      currentWord =
        dictionary[currentWord][
          Math.floor(Math.random() * dictionary[currentWord].length)
        ];
      generatedText += currentWord;
      generatedText += " ";
    }

    // display text
    if (p != undefined) {
      p.remove();
    }
    p = createP(generatedText);
    p.style("font-size", "16px");
    p.position(10, 0);
  });
}
let currentWord;
do {
  currentWord = words[Math.floor(Math.random() * words.length)];
} while (!startsWithCapitalLetter(currentWord));
// ...
function startsWithCapitalLetter(word) {
  return /[A-Z]/.test(word[0]);
}
