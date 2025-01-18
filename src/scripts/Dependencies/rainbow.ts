// I know its called rainbow but ill also use this to animate stuff on the site wahoo.

setInterval(rainbow, 1000)
setInterval(eepyFrame1, 2000)
function rainbow() {
    const toColor = document.getElementById('rainbow')
    if (toColor != null) {
        toColor.style.color = getRandomColor()   
    } else {
        console.log("No elements to rainbow.")
    }
}

function getRandomColor() {
    let charset = "0123456789ABCDEF"
    let color = "#"
    for (var i = 0; i<6; i++) {
        color += charset[Math.floor(Math.random() * 16)]
    }
    return color
}



function eepyFrame1() {
    const eepyElement = document.getElementById('eepy') as HTMLSpanElement
    eepyElement.innerHTML = "(～﹃～)~zZ"
}

function eepyFrame2() {
    const eepyElement = document.getElementById('eepy') as HTMLSpanElement
    eepyElement.innerHTML = "(～﹃～)~ZzZ"
}

