"use strict";
//! Rewrite of the notesu popup logic because that fucking sucked
class Popup {
    constructor(container) {
        this.errorCodes = {
            "unknownType": "1x5638",
            "unknownConfig": "1x5861",
        };
        this.container = document.getElementById(container);
        this.titleElement = this.container.querySelector("#popupTitle");
        this.messageElement = this.container.querySelector("#popupText");
        this.confirmButton = this.container.querySelector("#btnConfirm");
        this.cancelButton = this.container.querySelector("#btnCancel");
        this.cancelButton.addEventListener("click", () => this.hide());
        //This is still a messy way to do it, but infinitely better than whatever the fuck i was doing with notesu
        this.config = {
            "caseInfo": {
                title: "You shouldn't be able to see me",
                confirmText: "OK",
                onConfirm: this.hide
            },
            "error": {
                title: "Error",
                confirmText: "OK",
                onConfirm: this.hide
            },
        };
    }
    show(type, message = "No message provided.") {
        let config = this.config[type];
        if (!config) {
            const errCode = this.errorCodes["unknownType"];
            message = `Unknown popup type "${type}"\n(error ${errCode})`;
            config = this.config["error"];
        }
        if (config === this.config["error"] || config === this.config["caseInfo"]) {
            this.cancelButton.style.display = "none";
        }
        this.titleElement.textContent = config.title;
        this.messageElement.innerHTML = message;
        this.confirmButton.textContent = config.confirmText;
        if (config === this.config["caseInfo"]) {
            this.titleElement.textContent = `Info for: ${selectedGambaCase.name}`;
        }
        const newConfirmButton = this.confirmButton.cloneNode(true);
        this.confirmButton.replaceWith(newConfirmButton);
        this.confirmButton = newConfirmButton;
        this.confirmButton.addEventListener("click", config.onConfirm.bind(this));
        this.container.classList.add("visible");
    }
    hide() {
        this.container.classList.remove("visible");
    }
}
