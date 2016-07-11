// Seats that has been chosen and paid
var paidSeats = "0.0 0.4 0.5 0.6 19.8 19.9 ";
// var paidSeats; // If all seats are available;
var chosenSeatsCount = 0;
var ticketPrice = 100;
var premiumPrice = 300;
var totalPrice = 0;
var premiumRows = 3;
var finalSeats = "";
var numberOfRows = 20;
var numberOfColumns = 20;
// seats-selection's logic board
var seats = [];
for (var i = 0; i < numberOfRows; i++){
  seats.push(new Array(numberOfColumns));
}

// Set a default value of 0 to every element of the nested seats array
for(var i = 0; i < seats.length; i ++){
  for(var y = 0; y <seats[i].length; y++){
    seats[i][y] = 0;
  }
}


// console.log(seats);

$(function(){
  var body = $('body');
  body.append($('<div id="front-screen">'));
  body.append('<div class="board">');
  var board = $('.board');
  var frontScreen = $('#front-screen');

  frontScreen.text("Stage");
  var column, row;

// Generates div tags according to the total number of rows
  for (var i = 0; i < numberOfRows; i++) {
    board.append($('<div class="row ' + i + '">').text(i));
  }

  row = $('.row');

  // Generates nested div tags according to the total number of columns

  for (var y = 0; y < numberOfRows; y++) {
    row.append($('<div class ="column ' + y + '">'));
  }

  column = $('.column');

  for(var i = 0; i < numberOfRows; i ++){
    for(var y = 0; y <seats[i].length; y++){
      // Setting wheelchair icons for the first two row and the side seats
      if(i < 2 && (y < 2 || y > 7)){
        $('.' + [i] + ' .' + [y]).append($('<i class="fa fa-wheelchair-alt" aria-hidden="true">'));
      } else {
        $('.' + [i] + ' .' + [y]).append($('<i class="fa fa-user" aria-hidden="true">'));
      }
    }
  }
  for(var i = 0; i < premiumRows; i++){
    $('.row.' + i).addClass('premium-rows');
  }

// Live message board for ticket price, ticket count
  board.append($('<h1 id="ticket-price">'));
  board.append($('<h1 id="ticket-count">'));
  var messagePrice = $('#ticket-price');
  var messageCount = $('#ticket-count');
  messagePrice.text("Total price is: $0.00");
  messageCount.text("Total number of seats: 0");

  // Give the paid seat a value of 2 and display a black user icon on the html
  if(paidSeats){
    // Splitting the paidseats string into an arrays of integers
    var paidSeatsIndex = paidSeats.split(" ");
    paidSeatsIndex.pop();
    console.log(paidSeatsIndex);
    for (var i = 0; i < paidSeatsIndex.length; i++){
      // Split the array again from the dot to differentiate rows and columns
      var splitIndex = paidSeatsIndex[i].split(".");
      seats[splitIndex[0]][splitIndex[1]] = 2;
      // $('.' + paidSeatsIndex[i][0] + ' .' + paidSeatsIndex[i][1]).text("X");
      // if(paidSeatsIndex[i].length === 3){
      //   $('.' + paidSeatsIndex[i][0] + ' .' + paidSeatsIndex[i][1] + ' i').css('color', 'black');
      //
      //   $('.' + paidSeatsIndex[i][0] + ' .' + paidSeatsIndex[i][1] + ' i').css('color', 'black');
      // }
      $('.' + splitIndex[0] + ' .' + splitIndex[1] + ' i').css('color', 'black');


    }
  }
  // $('.' + paidSeatsIndex[i][0] + ' .' + paidSeatsIndex[i][1]).text('X');


  column.on('click', function(){
    var rowIndex = $(this).parent().attr('class').split(' ')[1];
    var columnIndex = $(this).attr('class').split(' ')[1];
    // To reject overwriting any grid that already has been clicked
    if (chosenSeatsCount < 6){
      if (seats[rowIndex][columnIndex] === 0){
        $(this).children().css('color', 'blue');
        seats[rowIndex][columnIndex] = 1;
        chosenSeatsCount += 1;
        if(rowIndex < premiumRows){
          totalPrice += premiumPrice;
        } else {
          totalPrice += ticketPrice;
        }
        messagePrice.text("Total price is: $" + totalPrice + ".00");
        messageCount.text("Total number of seats: " + chosenSeatsCount);
      } else if (seats[rowIndex][columnIndex] === 1){
        $(this).children().css('color', 'grey');
        seats[rowIndex][columnIndex] = 0;
        chosenSeatsCount -= 1;
        if(rowIndex < premiumRows){
          totalPrice -= premiumPrice;
        } else {
          totalPrice -= ticketPrice;
        }
        messagePrice.text("Total price is: $" + totalPrice + ".00");
        messageCount.text("Total number of seats: " + chosenSeatsCount);

      } else {
        console.log("This seat has been taken");
      }
    } else {
      if (seats[rowIndex][columnIndex] === 1){
        $(this).children().css('color', 'grey');
        seats[rowIndex][columnIndex] = 0;
        chosenSeatsCount -= 1;
        if(rowIndex < premiumRows){
          totalPrice -= premiumPrice;
        } else {
          totalPrice -= ticketPrice;
        }
        messagePrice.text("Total price is: $" + totalPrice + ".00");
        messageCount.text("Total number of seats: " + chosenSeatsCount);

      } else {
        console.log("You can't choose more than 6 seats!");
      }
    }
  });

// When submit button is clicked, this will finalize
  $('#submit-btn').on('click', function(){
    event.preventDefault();
    for(var i = 0; i < seats.length; i ++){
      for(var y = 0; y <seats[i].length; y++){
        if(seats[i][y] !== 0){
          finalSeats = finalSeats + [i] + "." + [y] + " ";
        }
      }
    }
    console.log(finalSeats);
    console.log('submit button is clicked');
  });
});
