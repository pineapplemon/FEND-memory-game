// Constructor function to set up CardData
var cards = [];

function CardData(name, image, id, Zodiac) {
    this.name = name;
    this.image = image;
    this.id = id;
    this.Zodiac = Zodiac;
}

// Create new objects
let Rat = new CardData("Rat", "1-rat.png", "rat", 1);
let Shu = new CardData("Shu", "1-shu.png", "shu", 1);
let Ox = new CardData("Ox", "2-ox.png", "ox", 2);
let Niu = new CardData("Niu", "2-niu.png", "niu", 2);
let Tiger = new CardData("Tiger", "3-tiger.png", "tiger", 3);
let Hu = new CardData("Hu", "3-hu.png", "hu", 3);
let Rabbit = new CardData("Rabbit", "4-rabbit.png", "rabbit", 4);
let Tu = new CardData("Tu", "4-tu.png", "tu", 4);
let Dragon = new CardData("Dragon", "5-dragon.png", "dragon", 5);
let Long = new CardData("Long", "5-long.png", "long", 5);
let Snake = new CardData("Snake", "6-snake.png", "snake", 6);
let She = new CardData("She", "6-she.png", "she", 6);
let Horse = new CardData("Horse", "7-horse.png", "horse", 7);
let Ma = new CardData("Ma", "7-ma.png", "ma", 7);
let Ram = new CardData("Ram", "8-ram.png", "ram", 8);
let Yang = new CardData("Yang", "8-yang.png", "yang", 8);
let Monkey = new CardData("Monkey", "9-monkey.png", "monkey", 9);
let Hou = new CardData("Hou", "9-hou.png", "hou", 9);
let Rooster = new CardData("Rooster", "10-rooster.png", "rooster", 10);
let Ji = new CardData("Ji", "10-ji.png", "ji", 10);
let Dog = new CardData("Dog", "11-dog.png", "dog", 11);
let Gou = new CardData("Gou", "11-gou.png", "gou", 11);
let Pig = new CardData("Pig", "12-pig.png", "pig", 12);
let Zhu = new CardData("Zhu", "12-zhu.png", "zhu", 12);

cards.push(Rat, Shu,
  Ox, Niu,
  Tiger, Hu,
  Rabbit, Tu,
  Dragon, Long,
  Snake, She,
  Horse, Ma,
  Ram, Yang,
  Monkey, Hou,
  Rooster, Ji,
  Dog, Gou,
  Pig, Zhu);

var filterPictures = [];
var filterCharacters = [];
for (var i = 0; i < cards.length; ++i) {
  if ((cards[i]%2)===0) {
    filterPictures.push(cards[i]);
  } else {
    filterCharacters.push(cards[i]);
  }
}

const gameModes = {
  pictures: {
    class: "pictures",
    pairs: 12,
  },
  characters: {
    class: "characters",
    pairs: 12,
  },
  picturesAndCharacters: {
    class: "char-pic",
    pairs: 12,
  }
};
