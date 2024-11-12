"use strict";
// This is just so that we can make base functions which we will use in multiple files
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomNotesuPreview() {
    const collectionOfPreviews = [
        { src: "/assets/projectPreviews/notesuGifs/addingNotes.gif", caption: "creating notes in Notesu." },
        { src: "/assets/projectPreviews/notesuGifs/configDeadline.gif", caption: "configuring the deadline of a note in Notesu." },
        { src: "/assets/projectPreviews/notesuGifs/configDelete.gif", caption: "deleting a note in Notesu." },
        { src: "/assets/projectPreviews/notesuGifs/noteEditing.gif", caption: "editing a note in Notesu." },
        { src: "/assets/projectPreviews/notesuGifs/notesuStill.png", caption: "Notesu preview." } //? the one singular png :troll:
    ]; // this is a HORRID way of doing it. BUT IT WORKS SO FUCK OYU!
    const index = Math.floor(Math.random() * collectionOfPreviews.length);
    return collectionOfPreviews[index];
}
function applySelectedNotesuPreview() {
    const selectedImg = getRandomNotesuPreview();
    const imgElem = document.getElementById("randomNotesuPreview");
    const capElem = document.getElementById("randomNotesuCaption");
    if (imgElem && capElem) {
        imgElem.src = selectedImg.src;
        capElem.textContent = selectedImg.caption;
        imgElem.style.display = 'none';
        imgElem.offsetHeight;
        imgElem.style.display = '';
    }
    else {
        console.log("Could not find the image or caption element.");
    }
    console.log("we did");
}
window.onload = function () {
    applySelectedNotesuPreview();
};
