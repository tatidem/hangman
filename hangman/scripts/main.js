let body = document.body;

// header
let header = document.createElement('header');
header.classList.add('header');
body.appendChild(header);

// header 
// h1
let gameTitle = document.createElement('h1');
gameTitle.classList.add('hangman__title');
gameTitle.textContent = 'HANGMAN GAME';
header.appendChild(gameTitle);

// header
//  div divider
let divider = document.createElement('div');
divider.classList.add('divider');
header.appendChild(divider);

// div game-container
let container = document.createElement('div');
container.classList.add('game-container');
body.appendChild(container);

// div game-container
//    div hangman
let hangman = document.createElement('div');
hangman.classList.add('hangman');
container.appendChild(hangman);

// div hangman
//  img hangman__img
let hangmanImage = document.createElement('img');
hangmanImage.classList.add('hangman__img');
hangmanImage.src = './img/gallows.svg';
hangmanImage.alt = 'hangman';
hangman.appendChild(hangmanImage);



// div game-container
//    div game
let gameBlock = document.createElement('div');
gameBlock.classList.add('game');
container.appendChild(gameBlock);

// div game
//   h2 game__hint
let hintTitle = document.createElement('h2');
hintTitle.classList.add('game__hint');
hintTitle.textContent = 'Hint: ';
gameBlock.appendChild(hintTitle);

// h2 game__hint
//  p game__hint-text

let hintText = document.createElement('span');
hintText.classList.add('game__hint-text');
hintText.textContent = 'A device used to transmit sound over long distances.';
hintTitle.appendChild(hintText);

// div game
//   h2 game__incorrect-guess
let incorrectGuesses = document.createElement('h2');
incorrectGuesses.classList.add('game__incorrect-guess');
incorrectGuesses.textContent = 'Incorrect guesses: ';
gameBlock.appendChild(incorrectGuesses);


// h2 game__incorrect-guess
//  p game__incorrect-score
let incorrectGuessesScore = document.createElement('span');
incorrectGuessesScore.classList.add('game__incorrect-score');
incorrectGuessesScore.textContent = '0 / 6';
incorrectGuesses.appendChild(incorrectGuessesScore);

// div game
//   ul word-letters
//    li 
let wordToGuess = document.createElement('ul');
wordToGuess.classList.add('game__word-letters');
let wordLength = 7;

for (let i = 0; i < wordLength; i++) {
    let letter = document.createElement('li');
    letter.textContent = '';
    wordToGuess.appendChild(letter);
    letter.classList.add('letter');
}
gameBlock.appendChild(wordToGuess);

wordToGuess.children[2].classList.add('guessed');
wordToGuess.children[2].textContent ='A'





// body
// div game-modal
let modal = document.createElement('div');
modal.classList.add('modal');
body.appendChild(modal);

// div modal
//  div modal__content

let modalContent = document.createElement('div');
modalContent.classList.add('modal__content');
modal.appendChild(modalContent);

// div modal__content

let modalImage = document.createElement('img');
modalImage.classList.add('modal__img');
modalImage.src = './img/sad.gif';
modalImage.alt = 'sad';
modalContent.appendChild(modalImage);

let modalTitle = document.createElement('h3');
modalTitle.classList.add('modal__title');
modalTitle.textContent = 'Game Over!';
modalContent.appendChild(modalTitle);

let modalText = document.createElement('p');
modalText.classList.add('modal__text');
modalText.textContent = 'The correct word was: ';
modalContent.appendChild(modalText);

let modalAnswer = document.createElement('span');
modalAnswer.classList.add('modal__answer');
modalAnswer.textContent = 'Rainbow';
modalText.appendChild(modalAnswer);

let modalButton = document.createElement('button');
modalButton.classList.add('modal__btn');
modalButton.textContent = 'Play again';
modalContent.appendChild(modalButton);


let currentWord;
let wrongAttemp = 0;
const maxAttemps = 6;
let correctLetters = [];



const getRandomWord = () => {
  const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  hintText.innerText = hint;
  wordToGuess.innerHTML = word.split('').map(letter => `<li class="letter"></li>`).join('');
};
getRandomWord();

const gameOver = (win) => {
  setTimeout(() => {
    modalTitle.innerText = win ? `Congratulations!`: `Game over!`;
    modalText.innerText = win ? `You guessed the word: ${currentWord}`: `The correct word was: ${currentWord}`;
    modalImage.src = `img/${win ? 'good' : 'sad'}.gif`;
    // modalAnswer.innerHTML = `${currentWord}`;
    modal.classList.add ('show');
  }, 300);
}

// div game
//   div game__keyboard

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let keyboard = document.createElement('div');
keyboard.classList.add('game__keyboard');
alphabet.forEach(letter => {
    let key = document.createElement('button');
    key.textContent = letter;
    keyboard.appendChild(key);
    
    const startGame = (key, clickedLetter) => {
      if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
          if (letter === clickedLetter){
            correctLetters.push(letter);
            wordToGuess.children[index].innerText = letter;
            wordToGuess.children[index].classList.add('guessed');
          };
      });
      } else{
        wrongAttemp++;
        hangmanImage.src = `img/hangman-${wrongAttemp}.svg`;
        }

        key.disabled = true;
        incorrectGuessesScore.innerText = `${wrongAttemp} / ${maxAttemps}`;

        if (wrongAttemp === maxAttemps) return gameOver(false);
        if (correctLetters.length === currentWord.length) return gameOver(true);
      };

    key.addEventListener('click', event => startGame(event.target, letter));
    
});
gameBlock.appendChild(keyboard);

//new game
modalButton.addEventListener('click', () => {
 
  wrongAttemp = 0;
  correctLetters = [];
  hangmanImage.src = './img/gallows.svg';
  incorrectGuessesScore.innerText = '0 / 6';
  modal.classList.remove('show');


  let keys = document.querySelectorAll('button');
  keys.forEach(key => {
    key.disabled = false;
  });

  getRandomWord();
});