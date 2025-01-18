"use strict";
// I know its called rainbow but ill also use this to animate stuff on the site wahoo.
setInterval(rainbow, 1000);
setInterval(toggleEepy, 1000);
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
function toggleEepy() {
    const eepyElement = document.getElementById('eepy');
    if (eepyElement) {
        eepyElement.textContent =
            eepyElement.textContent === "(～﹃～)~zZ" ? "(～﹃～)~ZzZ" : "(～﹃～)~zZ";
    }
    else {
        console.log("eepy element not found.");
    }
}
