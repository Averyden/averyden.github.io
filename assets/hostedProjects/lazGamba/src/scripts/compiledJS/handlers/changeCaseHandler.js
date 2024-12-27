"use strict";
let currentCaseIndex = 0;
let selectedGambaCase = null;
const changeBackground = (color) => {
    const body = document.body;
    body.style.transition = "background-color 1s ease";
    body.style.background = color;
};
const updateBackgroundAndPrice = () => {
    if (gambaCases && gambaCases.length > 0) {
        selectedGambaCase = gambaCases[currentCaseIndex];
        changeBackground(selectedGambaCase.background);
        const gambaCostLabel = document.getElementById("gambaCost");
        if (gambaCostLabel) {
            gambaCostLabel.innerText = `Price: ${selectedGambaCase.cost} L-coins`;
        }
    }
};
const setupButtons = () => {
    const rightBtn = document.getElementById("changeCaseRight");
    const leftBtn = document.getElementById("changeCaseleft");
    if (rightBtn && leftBtn) {
        rightBtn.addEventListener("click", () => {
            if (gambaCases && gambaCases.length > 0) {
                currentCaseIndex = (currentCaseIndex + 1) % gambaCases.length;
                updateBackgroundAndPrice();
            }
        });
        leftBtn.addEventListener("click", () => {
            if (gambaCases && gambaCases.length > 0) {
                currentCaseIndex = (currentCaseIndex - 1 + gambaCases.length) % gambaCases.length;
                updateBackgroundAndPrice();
            }
        });
    }
};
if (window.gambaCasesLoaded) {
    updateBackgroundAndPrice();
    setupButtons();
}
else {
    window.addEventListener("gambaCasesLoaded", () => {
        updateBackgroundAndPrice();
        setupButtons();
    });
}
