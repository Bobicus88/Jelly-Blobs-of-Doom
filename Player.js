/**
* FILE NAME: Player.js
* WRITTEN BY: Alina Zheng
* DATE: 5/1/20
* PURPOSE: CS204 assignment 10
**/

var winningDiameter = window.innerHeight / 2; // bigger than this wins
var losingDiameter = 5;                     // smaller than this loses
var growDiameter = 20;                      // grow by this many pixels
var shrinkDiameter = 5; 

class Player extends Blob {
    /**
     * Constructor for objects of class Player
     */
    constructor(color, diameter) {
       super(color, diameter); 
       this.setX(window.innerWidth / 2); 
       this.setY(window.innerHeight / 2); 
    }

    /**
     * Takes an x,y location and moves the DIV so that
     * the center is at the new location
     * @param {integer} x 
     * @param {integer} y 
     */
    move(x,y) {
        this.setX(x); 
        this.setY(y); 
    }

    /**
     * Grows this Player 
     * If the Player reaches the winning diameter, stops animation
     */
    grow() {
        this.diameter += growDiameter; 
        this.setDiameter(this.diameter); 
        if (this.diameter >= winningDiameter) {
           win(); 
        }
    }

    /**
     * Shrinks this Player
     * If Player reaches losing diameter, stops animation
     */
    shrink() {
        this.diameter -= shrinkDiameter; 
        this.setDiameter(this.diameter); 
        if (this.diameter <= losingDiameter) {
            lose(); 
        }
    }

    /**
     * Invoked when collision happens
     * Grows Player if enemy is smaller
     * Shrinks Player if enemy is larger
     * @param enemy the enemy Blob
     */
    collide(enemy) {
        if (enemy.diameter > this.diameter) {
            this.shrink(); 
        } else {
            this.grow(); 
        }
    }

}
