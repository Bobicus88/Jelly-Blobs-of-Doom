/**
* FILE NAME: Enemy.js
* WRITTEN BY: Alina Zheng
* DATE: 5/1/20
* PURPOSE: CS204 assignment 10
**/
var minDiameter = 5;                   // random size >= this
var maxDiameter = window.innerWidth/4; // random size <= this
var enemyDuration = 5000;              // time to cross the document
var directions = ["right", "left", "up", "down"];

class Enemy extends Blob{  

    /**
     * Helper function for setCoords and for constructor
     * Gets random direction
     */
    getRandDir() {
        var rand_ind = Math.floor(directions.length * Math.random());
        return directions[rand_ind]; 
    }

    /**
     * Helper function for constructor
     * Sets initial X,Y coordinates of enemy, based on what side it 
     * enters from and what testing mode we are in (test shrinking or test growing)
     * Coordinates are counted from the top-left corner
     */
    setCoords() {
        if (this.direction == "right") {
            this.setX(0 - this.diameter); 
            this.setY(random.intBetween(0, window.innerHeight)); 
        }
        else if (this.direction == "left") {
            this.setX(this.diameter + window.innerWidth); 
            this.setY(random.intBetween(0, window.innerHeight)); 
        }
        else if (this.direction == "up") {
            this.setX(random.intBetween(0, window.innerWidth)); 
            this.setY(window.innerHeight + this.diameter); 
        }
        else {
            this.setX(random.intBetween(0, window.innerWidth)); 
            this.setY(0 - this.diameter); 
        }
    }
    /**
     * Constructor of Enemy takes no arguments
     * Gives it a random color and random diameter
     * Determines its direction
     * Sets its initial location
     */
    constructor() {
        var diameter = random.intBetween(minDiameter, maxDiameter); 
        super(random.color(), diameter); 
        this.direction = this.getRandDir(); 
        this.setCoords(); 
        this.collision = false;
    }

    /**
     * Invoked when a collision happens, records that the 
     * enemy has collided with the Player, invokes Player's collide method
     */
    collide() {
        this.collision = true; 
        if (this.diameter < player.diameter) {
            this.remove(); 
        }
        player.collide(this); 
    }

    /**
     * Checks for collision (invoke during animation of Enemy)
     * First checks to see if this enemy has collided with the Player in the past,
     * and if so, skips any further processing
     * If it hasn't collided in the past, it updates the X and Y location, checks to see if
     * there is an intersection using the intersects method, and if so, invokes
     * the colide method
     */
    maybeCollide() {  
        if (!this.collision) {
            var left = parseInt($(this.dom_el).css("left")); 
            var top = parseInt($(this.dom_el).css("top")); 
            this.x = left + this.radius; 
            this.y = top + this.radius; 
            if (this.intersects(player)) {
                this.collide(); 
            }
        }
    }

    /**
     * Stops animation of Enemy, removes it from the document
     * Helper for Player when it eats a smaller blob or when animation is done
     */
    remove() {
        $(this.dom_el).stop(); 
        $(this.dom_el).remove(); 
    }

    /**
     * Starts jQuery animation of this enemy moving across the board
     * maybeCollide() is invoked during animation of movement of enemy to check 
     * for collisions with player
     */
    start() {
        var options = {duration: 4000, progress: this.maybeCollide.bind(this), complete: this.remove.bind(this)}
        var hor = window.innerWidth + this.diameter * 4; 
        var vert = window.innerHeight + this.diameter * 4; 
        if (this.direction == "right") {
            $(this.dom_el).animate({left: "+=" + hor}, options);
        } else if (this.direction == "left") {
            $(this.dom_el).animate({left: "-=" + hor}, options);
        } else if (this.direction == "up") {
            $(this.dom_el).animate({top: "-=" + vert}, options);
        } else {
            $(this.dom_el).animate({top: "+=" + vert}, options);
        }
    }
}
