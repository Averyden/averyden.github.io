"use strict";
setInterval(rainbow, 1000);
function rainbow() {
    const toColor = document.getElementById('rainbow');
    if (toColor != null) {
        toColor.style.color = getRandomColor();
    }
    else {
        console.log("No elements to rainbow.");
    }
}
function getRandomColor() {
    let charset = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
        color += charset[Math.floor(Math.random() * 16)];
    }
    return color;
}
