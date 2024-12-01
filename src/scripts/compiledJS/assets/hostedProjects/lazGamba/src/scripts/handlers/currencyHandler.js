"use strict";
let lCoins = 300;
const saveCoins = () => {
    localStorage.setItem("currency", lCoins.toString());
};
const loadCoins = () => {
    const savedCoins = localStorage.getItem("currency");
    return savedCoins ? parseInt(savedCoins, 10) : 300;
};
const adjustCoins = (amount) => {
    if (lCoins + amount < 0) {
        return false;
    }
    else {
        lCoins += amount;
        saveCoins();
        return true;
    }
};
const initCoins = () => {
    lCoins = loadCoins();
};
const dailyBonus = () => {
    const lastBonus = localStorage.getItem("lastBonusDate");
    const today = new Date().toDateString();
    if (lastBonus !== today) {
        adjustCoins(300);
        localStorage.setItem("lastBonusDate", today);
        return true;
    }
    return false;
};
