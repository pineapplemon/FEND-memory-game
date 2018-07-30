/*
 * Create a list that holds all of your cards
 */
 const icons = ["em em-rat", "em em-rat",
 "em em-ox", "em em-ox",
 "em em-tiger2", "em em-tiger2",
 "em em-rabbit2", "em em-rabbit2",
 "em em-dragon_face", "em em-dragon_face",
 "em em-snake", "em em-snake",
 "em em-horse", "em em-horse",
 "em em-goat", "em em-goat",
 "em em-monkey", "em em-monkey",
 "em em-rooster", "em em-rooster",
 "em em-dog2", "em em-dog2",
 "em em-pig2", "em em-pig2"];
 // Because it is a matching game we need two copies of each icon
 // 12 Zodiac x2 = 24

/*
 * Some global variables
 */
const cardsContainer = document.querySelector(".deck");

let openedCards = []; //save Cards in array to compare them
let matchedCards = [];

const movesCount = document.querySelector(".moves");
let moves = 0;
movesCount.innerHTML = "0";
const totalMoves = document.querySelector("#total_moves");

let firstClick = false;

let second = 0, minute = 0; hour = 0;
const timer = document.querySelector(".timer");
timer.innerHTML = "0 min 0 sec";
let liveTimer;

const totalTime = document.querySelector("#total_time");

const repeatBtn = document.querySelector(".play-again");
const repeatBtnModal = document.querySelector(".play-again-modal");

const ratingContainer = document.querySelector(".stars");
ratingContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

const totalRate = document.querySelector("#total_rate");

const modal = document.querySelector(".modal");
const closeBtnModal = document.querySelector(".close");

/*
 * Shuffle
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


/*
 * Initialize the game
 */
 function startGame() {
  // shuffle the deck
  deck = shuffle(icons);
  //Create the cards
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    //add icon in each Card
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);

    //Add Click event to each card
    click(card);
  }
  moves = 0;
  movesCount.innerHTML = moves;

  // Click event
   function click(card) {
    card.addEventListener("click", function() {

      if(firstClick) {
        startTimer();
        firstClick = false;
      }

      const currentCard = this;
      const previousCard = openedCards[0];

      if(openedCards.length === 1) {

          card.classList.add("open", "show", "disable");
          openedCards.push(this);

          //Compare the 2 open cards
          compare(currentCard, previousCard);

      } else {
      // no cards open

        currentCard.classList.add("open", "show", "disable");
        openedCards.push(this);
      }
    });
   }
 }

/*
 * Compare the 2 open cards
 */
 function compare(currentCard, previousCard) {
    if(currentCard.innerHTML === previousCard.innerHTML) {

      // Match
      currentCard.classList.add("match", "show", "disable");
      previousCard.classList.add("match", "show", "disable");

      matchedCards.push(currentCard, previousCard);

      openedCards = [];

      // Check if the game is Over
      isOver();

    } else {

      // Doesn't Match
      setTimeout(function() {
        currentCard.classList.remove("open", "show", "disable");
        previousCard.classList.remove("open", "show", "disable");

      }, 500);

      openedCards = []; // can't open multiple cards quickly at the same time

    }

    // Add new move to counter
    addMove();
 }

 /*
  * Count the number of moves
  */
  function addMove() {
    moves++;
    movesCount.innerHTML = moves;
    // start timer after first move
    if (moves == 1) {
      startTimer();
    }

    // Set rating after each move
    rating();
  }

  /*
   * Timer Start and Stop
   */

   // Call the timer function to start when the user first clicks on a card
   function startTimer() { // Timer begins incrementing 1 second after the user clicks?
     liveTimer = setInterval(function() {
       timer.innerHTML = `${minute} min ${second} sec`;
       second++;
       if (second == 60) {
         minute++;
         second= 0 ;
       }
       if (minute == 60) {
         hour++;
         minute= 0 ;
       }
     }, 1000);
   }

  function stopTimer() {
    clearInterval(liveTimer);
  }


/*
 * Check if the game is Over
 */
 function isOver() {
   if(matchedCards.length === icons.length) {
      stopTimer();
      toggleModal();
    }
 }

 /*
  * Modal Pop-up
  */
  function toggleModal() {
    modal.classList.toggle("display-modal");
    totalMoves.innerHTML = moves + 1; // workaround, modal pops up before final move is registered?
    totalRate.innerHTML = ratingContainer.innerHTML;
    totalTime.innerHTML = timer.innerHTML;
  }

 // Closes the modal if clicked outside of the modal
  function overlayClick(event) {
    if (event.target === modal) {
      toggleModal();
    }
  }

 window.addEventListener("click", overlayClick);

// Modal close button
 closeBtnModal.addEventListener("click", toggleModal);


/*
 * Rating
 */
 function rating() {
   switch(moves) { //just learned about switch function! :)
    case 28:
      ratingContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    break;

    case 40:
      ratingContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;

    break;
   }
 }

/*
 * Restart Buttons
 */
 repeatBtn.addEventListener("click", function() {
   repeat();
 });
 repeatBtnModal.addEventListener("click", function() {
   modal.style.top = "-150%"; // Hides the Modal
   repeat();
 });

/*
 * Reset Values
 */
 function reset() {
   // // Delete all cards
   cardsContainer.innerHTML = "";
   matchedCards = [];
   ratingContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
   firstClick = false;
   second = 0;
   minute = 0;
   hour = 0;
   timer.innerHTML = "0 min 0 sec";
   stopTimer();
 }

/*
 * Repeat game
 */
 function repeat() {
   icons.innerHTML = "";
   reset();
   startGame();
 }

// Start the game!
startGame();


//  Had the idea to match image with Chinese character.
//  Extra image resources in img/ folder

// Constructor function to set up CardData
//  function CardData(name, image, id, Zodiac) {
//      this.name = name;
//      this.image = image;
//      this.id = id;
//      this.Zodiac = Zodiac;
//  }
//  // Create new objects
//  let Rat = new CardData("Rat", "1-rat.png", "rat", 1);
//  let Shu = new CardData("Shu", "1-shu.png", "shu", 1);
//  let Ox = new CardData("Ox", "2-ox.png", "ox", 2);
//  let Niu = new CardData("Niu", "2-niu.png", "niu", 2);
//  let Tiger = new CardData("Tiger", "3-tiger.png", "tiger", 3);
//  let Hu = new CardData("Hu", "3-hu.png", "hu", 3);
//  let Rabbit = new CardData("Rabbit", "4-rabbit.png", "rabbit", 4);
//  let Tu = new CardData("Tu", "4-tu.png", "tu", 4);
//  let Dragon = new CardData("Dragon", "5-dragon.png", "dragon", 5);
//  let Long = new CardData("Long", "5-long.png", "long", 5);
//  let Snake = new CardData("Snake", "6-snake.png", "snake", 6);
//  let She = new CardData("She", "6-she.png", "she", 6);
//  let Horse = new CardData("Horse", "7-horse.png", "horse", 7);
//  let Ma = new CardData("Ma", "7-ma.png", "ma", 7);
//  let Ram = new CardData("Ram", "8-ram.png", "ram", 8);
//  let Yang = new CardData("Yang", "8-yang.png", "yang", 8);
//  let Monkey = new CardData("Monkey", "9-monkey.png", "monkey", 9);
//  let Hou = new CardData("Hou", "9-hou.png", "hou", 9);
//  let Rooster = new CardData("Rooster", "10-rooster.png", "rooster", 10);
//  let Ji = new CardData("Ji", "10-ji.png", "ji", 10);
//  let Dog = new CardData("Dog", "11-dog.png", "dog", 11);
//  let Gou = new CardData("Gou", "11-gou.png", "gou", 11);
//  let Pig = new CardData("Pig", "12-pig.png", "pig", 12);
//  let Zhu = new CardData("Zhu", "12-zhu.png", "zhu", 12);
// // push to the cards array
//  cards.push(Rat, Shu,
//    Ox, Niu,
//    Tiger, Hu,
//    Rabbit, Tu,
//    Dragon, Long,
//    Snake, She,
//    Horse, Ma,
//    Ram, Yang,
//    Monkey, Hou,
//    Rooster, Ji,
//    Dog, Gou,
//    Pig, Zhu);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
