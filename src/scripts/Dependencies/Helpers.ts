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
        {src: "/assets/projectPreviews/pasman/pasManRegisterInvalidMail.png", caption:"attempting to register an account in pasman, using an invalid email."},
        {src: "/assets/projectPreviews/pasman/pasmanEmailFormatDetection.gif", caption:"demonstration of code being able to recognize a valid email format in pasman."},
        {src: "/assets/projectPreviews/pasman/pasManComputerLeaked.gif", caption: "checking how many breaches a password has been involved with in Pasman."},
        {src: "/assets/projectPreviews/pasman/pasManAccountDeletion.gif", caption: "deleting an account in Pasman."}
    ],

    LazGamba: [
        {src: "/assets/projectPreviews/lazGamba/losing.gif", caption: "not hitting the jackpot in LazGamba."},
        {src: "/assets/projectPreviews/lazGamba/winning.gif", caption: "hitting the jackpot in LazGamba."}


    ],

    Acto: [
        {src: "/assets/projectPreviews/acto/actionDelete.gif", caption: "Deleting an existing action in Acto."},
        {src: "/assets/projectPreviews/acto/completeAction.gif", caption: "Marking an action as complete in Acto."},
        {src: "/assets/projectPreviews/acto/createAction.gif", caption: "Creating an action in Acto."}

    ],

    MetaTune: [
        {src: "/assets/projectPreviews/metatune/metaDark.png", caption: "MetaTune with dark mode turned on."},
        {src: "/assets/projectPreviews/metatune/metaLight.png", caption: "MetaTune preview."},
        {src: "/assets/projectPreviews/metatune/metaToggle.gif", caption: "Toggling dark mode in MetaTune"}, // That moment when youre entire selling point isnt actually the functionality, but rather the fucking dark mode... idk what else to showcase lmao its pretty basic
        {src: "/assets/projectPreviews/metatune/metaUsage.gif", caption: "Uploading an audio file into MetaTune, and editing its connected meta data."}
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
    const projects = ["Notesu", "Pasman", "Acto", "LazGamba", "MetaTune"]
    projects.forEach(project => applySelectedPreview(project))  
 }

