"use strict";
// This may seem redundant, but this is just initializing stuff for the site, like setting currency and such. 
// This is only so that the handlers dont get cluttered with useless stuff
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
initCoins();
const lblCoins = document.getElementById("coinLabel");
const updateCoinDisplay = () => {
    if (lblCoins) {
        lblCoins.innerText = `L-coins: ${lCoins}`;
    }
};
if (dailyBonus()) {
    console.log("Awarded daily bonus/reset");
    updateCoinDisplay();
}
else {
    console.log("Daily bonus/reset is already claimed.");
}
updateCoinDisplay();
let gambaMessages = {};
const loadGambaMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("src/dictionaries/mainGambaDictionaries.json");
        const text = yield response.text();
        console.log('Raw Response:', text);
        gambaMessages = JSON.parse(text);
        console.log('Parsed Messages:', gambaMessages);
    }
    catch (error) {
        console.error('Error loading or parsing JSON:', error);
    }
});
loadGambaMessages();
const images = [
    { name: "loss", path: "assets/img/GAMBA imgs/loss.webp" }, // User didnt win anything.
    { name: "spinning", path: "assets/img/GAMBA imgs/speen.webp" }, // for when the user has pressed the button and we are calculating the chances of a win. 
    { name: "win", path: "assets/img/GAMBA imgs/win.png" }, // static win image because paint.net cant make gifs!
    { name: "noMoney", path: "assets/img/GAMBA imgs/noMoreMoney.webp" }, // User lost it all for the day.
    { name: "waiting", path: "assets/img/GAMBA imgs/waiting.webp" }
];
