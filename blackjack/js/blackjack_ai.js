// CONSTANT VARIABLES
const card_numbers = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
const card_suits = ['s','h','c','d'];

// OTHER VARIABLES
var deck = [];
var player = new Person("player");
var dealer = new Person("dealer");

// OBJECTS
// Person
function Person(name)
{
  this.name = name;
  this.hand = [];
  this.money = 500;
  this.points = 0;
  this.bet = 0;
}

// Card
function Card(number, suit)
{
  this.number = number;
  this.suit = suit;
  
  if(number == 'A')
  {
    this.value = 11;
  } 
  else if (number == 'J' || number == 'Q' || number == 'K')
  {
	this.value = 10;
  } 
  else 
  {
	this.value = number;
  }
}

//FUNCTIONS

// Shuffles an array
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) 
{
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) 
  {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function bet(person, bet_money)
{
	if(bet_money > person.money)
	{
		console.log("ERROR. Not enough money. Please bet a little less.");
	}
	else
	{
		bet_money = person.bet;
		person.money -= bet_money;
	}
}