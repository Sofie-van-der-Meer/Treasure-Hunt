import Experience from "./scripts/Experience.js";

new Experience(document.querySelector('canvas.webgl'));

// const dialogWonGame = document.querySelector('#wonGame')
// const dialogLostGame = document.querySelector('#lostGame')
// const playAgainBtn = document.querySelector('.playAgain')
// const playHarderBtn = document.querySelector('.playHarder')

// playAgainBtn.addEventListener('click', () => {
//     new Experience(document.querySelector('canvas.webgl'), 'easy');
//     dialogWonGame.close()
// })
// if (playHarderBtn) {
//     playHarderBtn.addEventListener('click', () => {
//         new Experience(document.querySelector('canvas.webgl'), 'medium');
//         dialogLostGame.close()
//     })
// }