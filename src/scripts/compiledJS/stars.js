"use strict";
//* Fetch canvas and set up the init sizes
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//! Arbitruary variables instead of repeating canvas.height or .width when needed
const ch = canvas.height;
const cv = canvas.width;
//* we create a star class, which includes all the information and functions needed for the stars to be created and move around.
class Star {
    constructor() {
        this.x = Math.random() * cv;
        this.y = Math.random() * ch;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.direction = Math.random() * Math.PI * 2;
    }
    //* this will reset the star to have random properties
    //* This may also seem counter intuitive but we have a reset method so we can reset when stars go to the edge. 
    //* Else the the canvas will just be blank at some point.
    reset() {
        this.x = Math.random() * cv;
        this.y = Math.random() * ch;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.direction = Math.random() * Math.PI * 2;
    }
    //* This will update the stars, yippee
    update() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
        if (this.x < 0 || this.x > cv || this.y < 0 || this.y > ch) {
            this.reset();
        }
    }
    draw() {
        var chance; // for the funny
        chance = Math.random;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "white"; //TODO: Find out how to make it range between white, light pink and a slight purple.
        //TODO: it should like fade between the colors, because the way it works now is just constantly shifting in color, per frame update.
        ctx.fill();
    }
}
const stars = Array.from({ length: 500 }, () => new Star()); // * Create the instance of stars inside a star var.
function animate() {
    ctx.clearRect(0, 0, cv, ch);
    stars.forEach((star) => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}
//* Make sure canvas is resized when the window is.
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
//* Animate the damn thing
animate();
