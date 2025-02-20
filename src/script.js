import Experience from "./scripts/Experience.js";

const dialogIntroScreen = document.getElementById('introScreen')
const dialogIntroGame = document.getElementById('introGame')
const fullScreenBtn = document.getElementById('toggleFullScreen')

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}


fullScreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();

        dialogIntroScreen.hidden = true
        dialogIntroGame.hidden = false

        if (isTouchDevice()) {
            document.body.classList.add('touch-device')
        } else document.body.classList.add('non-touch-device')
    }
    else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
})

if (screen.width < screen.height) {
    alert('set your device on landscape ')
}




const playBtns = document.querySelectorAll('.play')
playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!document.querySelector('canvas.webgl')) {
            const canvas = document.createElement('canvas')
            canvas.classList.add('webgl')
            document.body.prepend(canvas)
        }
        const canvas = document.querySelector('canvas.webgl')
        new Experience(canvas, btn.classList[1]);

        // document.querySelector('dialog[open]').close()
        document.querySelector('div:not([hidden])').hidden = true
    })
    
});


