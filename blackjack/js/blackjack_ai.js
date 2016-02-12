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
  this.score = 0;
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

// Creates a new deck of cards
function createDeck()
{
  for(var i=0; i<card_suits.length; i++)
  {
	for(var j=0; j<card_numbers.length; j++)
	{
	  var temporaryCard = new Card(card_numbers[j], card_suits[i]);
	  deck.push(temporaryCard);
	}
  }
  
  shuffle(deck);
  return deck;
}

// Delivers a card to a person
function hit(person)
{
  if(deck.length == 0)
  {
	createDeck();
  }
  var tempcard = deck.shift();
  person.hand.push(tempcard);
  person.score += tempcard.value;
  
  if(tempcard.number == 'A' && person.score > 21)
  {
	person.score -= 10;
  }
  
  if(person.score > 21)
  {
	person.score = -1;
	if(person.name == "player"){
	  $("#hit").hide();
      $("#stay").hide();
      $("#bet").hide();
	  dealerAI();
	  win(player, dealer);
	}
  }
  
  return person.hand;
}

// The dealer's AI
function dealerAI()
{
  while(dealer.score < 18 && dealer.score !== -1)
  {
	hit(dealer);
  }
}

// Winning check
function win(player1, player2)
{
  if(player1.score < player2.score)
  {
	console.log(player2.name + " wins");
  } 
  else if(player1.score > player2.score)
  {
	console.log(player1.name + " wins");
  } 
  else 
  {
	console.log("Tie");
  }
}

// Creates a new game
function newGame()
{
  player.hand = [];
  dealer.hand = [];
  player.score = 0;
  dealer.score = 0;
  // Betting before starting to play
	
  // Delivering the cards
  hit(player);
  hit(dealer);
  hit(player);
  hit(dealer);
  
  // Action of the player
  $("#hit").click(function()
  {
    hit(player);  
  });
  
  // Action for the dealer
  $("#stay").click(function()
  {
    dealerAI();
    $("#hit").hide();
    $("#stay").hide();
    $("#bet").hide();
    win(player, dealer);
  });
}

// MAIN FUNCTION
// Where the action starts
$(document).ready(function()
{
  // Firsts bets

	
  // Creates a new deck
  createDeck();
  
  // Starts a new game
  newGame();
  
  $("#new-game").click(function(){
	newGame();
	$("#hit").show();
    $("#stay").show();
    $("#bet").show(); 
  });
});