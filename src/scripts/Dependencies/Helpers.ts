// This is just so that we can make base functions which we will use in multiple files

function getRandomInt(min: number, max: number): number { // Fetch a random number in the range determined by the two parameters
    return Math.floor(Math.random() * (max - min + 1)) + min;
}