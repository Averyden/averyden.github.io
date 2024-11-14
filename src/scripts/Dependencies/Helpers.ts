// This is just so that we can make base functions which we will use in multiple files

function getRandomInt(min: number, max: number): number { // Fetch a random number in the range determined by the two parameters
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface IPicturePreview {
    src: string;
    caption: string;
}

const projectPreviews: { [key: string]: IPicturePreview[] } = {
    Notesu: [
        { src: "/assets/projectPreviews/notesu/addingNotes.gif", caption: "creating notes in Notesu."},
        { src: "/assets/projectPreviews/notesu/configDeadline.gif", caption: "configuring the deadline of a note in Notesu."}, 
        { src: "/assets/projectPreviews/notesu/configDelete.gif", caption: "deleting a note in Notesu."},
        { src: "/assets/projectPreviews/notesu/noteEditing.gif", caption: "editing a note in Notesu."},
        { src: "/assets/projectPreviews/notesu/notesuStill.png", caption: "Notesu preview."} //? the one singular png :troll:
    ],

    Pasman: [
        {src: "/assets/projectPreviews/pasman/pasManMainVault.png", caption: "Pasman main password vault that is completely empty."},
        {src: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", caption:"HAHAHSDUIFGUI"}
    ]
} // this is a HORRID way of doing it. BUT IT WORKS SO FUCK OYU!

function getRandomProjectPreview(project: string) : IPicturePreview | null {
    const collectionOfPreviews = projectPreviews[project]
    if (collectionOfPreviews && collectionOfPreviews.length > 0) {
        const index = Math.floor(Math.random() * collectionOfPreviews.length)
        return collectionOfPreviews[index]
    } else {
        console.log(`No previews were found for projectL ${project}...`)
        return null;
    }
}

function applySelectedPreview(project: string) : void {
    const selectedImg = getRandomProjectPreview(project)

    const imgElem = document.getElementById(`random${project}Preview`) as HTMLImageElement
    const capElem = document.getElementById(`random${project}Caption`)

    if (imgElem && capElem) {
        if (selectedImg) {
        imgElem.src = selectedImg.src;
        capElem.textContent = selectedImg.caption;

        imgElem.style.display = 'none';  
        imgElem.offsetHeight; 
        imgElem.style.display = ''; 
        } else {
            capElem.textContent = "[no current previews to show]"
            imgElem.style.display = ''
        }

    } else {
        console.log(`Could not find the image or caption element. for:${project}`);
    }
}

window.onload = function() {
    const projects = ["Notesu", "Pasman", "Acto"]
    projects.forEach(project => applySelectedPreview(project))  
 }

