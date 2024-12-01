"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pricePerGamba = 50;
const gamba = document.getElementById("gambaBtn");
const gambaImg = document.getElementById("gambaStatusImg");
const gambaStatus = document.getElementById("gambaStatus");
gamba.addEventListener("click", () => handleGambaCalc());
//TODO: implement a sort of pity system.
let finalMessageTimeout;
// constants related to gamba logic
const jackpotNumber = 3;
function handleGambaCalc() {
    return __awaiter(this, void 0, void 0, function* () {
        let timeOutCancel = false; // This is purely just to fucking make sure the teasing "maybe you should spin again >:3" doesnt appear if there is no money left.
        if (!adjustCoins(-pricePerGamba)) {
            gambaStatus.innerHTML = "HAH you're poor! come back tomorrow.";
            gambaImg.src = images.find((img) => img.name === "noMoney").path;
            timeOutCancel = true;
            return;
        }
        updateCoinDisplay();
        gambaStatus.classList.remove("disappear");
        gambaStatus.innerHTML = "";
        if (finalMessageTimeout !== undefined) {
            clearTimeout(finalMessageTimeout);
        }
        gambaImg.src = images.find((img) => img.name === "spinning").path;
        gambaImg.classList.add('spinningAnim');
        const chance = Math.round(Math.random() * 5);
        const gambaWin = chance === jackpotNumber;
        if (Object.keys(gambaMessages).length === 0) {
            console.log('Loading messages...');
            yield loadGambaMessages(); // This ensures that messages are loaded
        }
        setTimeout(() => {
            if (gambaWin) {
                console.log(chance);
                gambaImg.src = images.find((img) => img.name === "win").path;
            }
            else {
                console.log(chance);
                gambaImg.src = images.find((img) => img.name === "loss").path;
            } // should give us a range that makes sense?
        }, 1750);
        // THIS IS ONLY HERE SO THAT THE ANIMATION ISNT JUST STOPPED AFTER THE TIMEOUT.
        setTimeout(() => {
            gambaImg.classList.remove('spinningAnim');
            if (gambaWin) {
                gambaStatus.innerHTML = getRanMessage("win");
                adjustCoins(pricePerGamba * 2);
                updateCoinDisplay();
                //TODO: implement a super rare chance to get a 50x of your gamba, for now it just doubles what you invested.
            }
            else {
                gambaStatus.innerHTML = getRanMessage("loss");
            }
        }, (2000));
        finalMessageTimeout = setTimeout(() => {
            if (!timeOutCancel) {
                gambaStatus.innerHTML = "maybe you should spin again >:3";
                gambaStatus.classList.add("disappear");
            }
        }, 7000);
    });
}
function getRanMessage(type) {
    if (!gambaMessages[type === "win" ? "winMessages" : "lossMessages"]) {
        return "Message not available.";
    }
    const filteredMessage = gambaMessages[type === "win" ? "winMessages" : "lossMessages"];
    const randomIndex = Math.floor(Math.random() * filteredMessage.length);
    return filteredMessage[randomIndex].message;
}
