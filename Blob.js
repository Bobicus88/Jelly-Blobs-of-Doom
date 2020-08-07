/**
* FILE NAME: Blob.js
* WRITTEN BY: Alina Zheng
* DATE: 3/25/20
* PURPOSE: CS204 assignment 10
**/

class Blob {
    /**
     * Constructor for objects of class Blob
     * @param {String} color 
     * @param {int} diameter 
     * @param {int} radius 
     * @param {int} x 
     * @param {int} y 
     * @param {String} dom_el 
     */
    constructor(color, diameter) {
        this.x = 0; 
        this.y = 0; 
        this.dom_el = $("<div></div>").addClass("circle");
        this.setColor(color); 
        this.setDiameter(diameter); 
        this.setRadius(diameter / 2); 
    }

    /**
     * Adds this Blob to body
     */
    addToGame(appendee) {
        $(appendee).append(this.dom_el); 
    }

    /**
     * Sets this Blob's color, updates DOM element's CSS
     * @param {String} color 
     */
    setColor(color) {
        this.color = color; 
        this.dom_el.css("background-color", color)
    }

    /**
     * Sets this Blob's diameter (and updates radius), updates DOM element's CSS
     * @param {int} diameter 
     */
    setDiameter(diameter) {
        this.diameter = diameter; 
        this.radius = diameter / 2; 
        this.dom_el.css("width", diameter); 
        this.dom_el.css("height", diameter); 
        this.dom_el.css("top", this.y - this.radius); 
        this.dom_el.css("left", this.x - this.radius); 
    }

    /**
     * Sets this Blob's radius, updates DOM element's CSS
     * @param {int} radius
     */
    setRadius(radius) {
        this.setDiameter(radius * 2); 
    }

    /**
     * @return the diameter of this Blob
     */
    getDiameter() {
        return this.diameter; 
    }

    /**
     * @return the radius of this Blob
     */
    getRadius() {
        return this.radius; 
    }

    /**
     * @return the x-coordinate of this Blob
     */
    getX() {
        return this.x; 
    }

    /**
     * @return the y-coordinate of this blob
     */
    getY() {
        return this.y; 
    }
    
    /**
     * Changes the x-coordinate of the center
     * Update the y-position of the DOM element
     * @param {int} x 
     */
    setX(x) {
        this.x = x; 
        this.dom_el.css("left", this.x - this.radius); 
    }

    /**
     * Changes the y-coordinate of the center
     * Updates the y-position to the DOM element
     * @param {int} y 
     */
    setY(y) {
        this.y = y; 
        this.dom_el.css("top", this.y - this.radius); 
    }

    /**
     * Determines whether this Blob and the other Blob intersect
     * @param {Blob} other 
     * @return true if they do intersect, false if they don't 
     */
    intersects(other) {
        var dx = this.getX() - other.getX();
        var dy = this.getY() - other.getY();
        var distance_squared = (dx * dx + dy * dy);
    
        var r1 = this.getRadius();
        var r2 = other.getRadius();
        var rsum = r1+r2;
        var closer = (distance_squared <= rsum*rsum);
        return closer; 
    }
}
