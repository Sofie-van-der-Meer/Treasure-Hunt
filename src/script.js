import Experience from "./scripts/Experience.js";

const dialogIntroGame = document.getElementById('introGame')
dialogIntroGame.showModal()

const play = document.querySelectorAll('.play')
play.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!document.querySelector('canvas.webgl')) {
            const canvas = document.createElement('canvas')
            canvas.classList.add('webgl')
            document.body.prepend(canvas)
        }
        const canvas = document.querySelector('canvas.webgl')
        new Experience(canvas, btn.classList[1]);

        document.querySelector('dialog[open]').close()
    })
    
});
