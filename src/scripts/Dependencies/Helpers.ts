// This is just so that we can make base functions which we will use in multiple files

function getRandomInt(min: number, max: number): number { // Fetch a random number in the range determined by the two parameters
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface INotesuPreview {
    src: string;
    caption: string;
}

function getRandomNotesuPreview() : INotesuPreview {
    const collectionOfPreviews: INotesuPreview[] = [
        { src: "assets/projectPreviews/notesuGifs/addingNotes.gif", caption: "creating notes in Notesu."},
        { src: "assets/projectPreviews/notesuGifs/configDeadline.gif", caption: "configuring the deadline of a note in Notesu."}, 
        { src: "assets/projectPreviews/notesuGifs/configDelete.gif", caption: "deleting a note in Notesu."},
        { src: "assets/projectPreviews/notesuGifs/noteEditing.gif", caption: "editing a note in Notesu."},
        { src: "assets/projectPreviews/notesuGifs/notesuStill.png", caption: "Notesu preview."} //? the one singular png :troll:
    ] // this is a HORRID way of doing it. BUT IT WORKS SO FUCK OYU!

    const index = Math.floor(Math.random() * collectionOfPreviews.length)
    return collectionOfPreviews[index]
}

function applySelectedNotesuPreview() : void {
    const selectedImg = getRandomNotesuPreview()

    const imgElem = document.getElementById("randomNotesuPreview") as HTMLImageElement
    const capElem = document.getElementById("randomNotesuCaption")

    if (imgElem && capElem) {
        imgElem.src = selectedImg.src;
        capElem.textContent = selectedImg.caption;

        imgElem.style.display = 'none';  
        imgElem.offsetHeight; 
        imgElem.style.display = ''; 

    } else {
        console.log("Could not find the image or caption element.");
    }
    console.log("we did")
}

applySelectedNotesuPreview()

