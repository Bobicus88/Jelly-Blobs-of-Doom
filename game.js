/**
 * FILE NAME: game.js
 * WRITTEN BY: Alina Zheng 
 * DATE: 4/28/20
 * PURPOSE: CS204 assignment 5
 */

 // global variable that keeps track of Player
var player = new Player("blue", 30); 

// global variable that keeps track of what testing mode we are in
var testingMode = 0; 

// variable that holds will hold the setInterval function (and will help stop genEnemy())
var interval; 

 /**
  * Clears the board
  * Creates a player, adds it to the board in the center
  * Uses setInterval to start generating a new enemy every 1 second, 
  * add them to the board and start them animating
  */
function startGame() {
    $("body").empty(); 
    player.addToGame("body");
    interval = setInterval(genEnemy, 1000);
}

/**
 * Clears the board
 * Displays "win" message
 */
function win() {
    clearInterval(interval); 
    $(".circle").stop(); 
    $(".circle").remove(); 
    var $message = $('<p></p>');
    $message.text("Congratulations, you won! Reload the page to play again."); 
    $("body").append($message);  
}

/**
 * Clears the board
 * Displays "lose" message
 */
function lose() {
    clearInterval(interval); 
    $(".circle").stop(); 
    $(".circle").remove(); 
    var $message = $('<p></p>');
    $message.text("Sorry, you lost. Reload the page to try again.");  
    $("body").append($message);    
}

/**
 * Helper function for startGame
 * Generates an enemy and starts its movement
 */
function genEnemy() {
    var enemy = new Enemy(); 
    // if we're testing growing
    if (testingMode == 1) {
        enemy.setDiameter(random.intBetween(minDiameter, player.diameter));  
    } // else if we're testing shrinking
    else if (testingMode == 0) {
        enemy.setDiameter(random.intBetween(player.diameter, maxDiameter)); 
    } 
    enemy.addToGame("body"); 
    enemy.start(); 
}

/**
 * Initiates normal gameplay when "Start Game" button is clicked
 */
$("#start").on("click", function() {
    testingMode = 0; 
    startGame(); 
});

/**
 * Initiates "test growing" mode when "Test Growing" button is clicked
 */
$("#testGrow").on("click", function() {
    testingMode = 1; 
    startGame(); 
});

/**
 * Initiates "test shrinking" mode when "Test Shrinking" button is clicked
 */
$("#testShrink").on("click", function() {
    testingMode = 2; 
    startGame(); 
});

/**
 * Event handler for moving Player blob with mouse
 */
$(document).on('mousemove', function (event) {
    player.setX(window.innerWidth / 2); 
    player.setY(window.innerHeight / 2); 
    player.move(event.clientX, event.clientY); 
})


