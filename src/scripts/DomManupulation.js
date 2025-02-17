import Experience from "./Experience";
import parameters from "./parameters";

export default class DomManupulation {
    constructor() {
        this.parameters = parameters
        this.experience = new Experience()
        this.listOfLives = document.getElementById('listOfLives')
        this.listOfTreasures = document.getElementById('listOfTreasures')
        this.dialog = []
        this.dialog.introGame = document.getElementById('introGame')
        this.dialog.wonGame = document.getElementById('wonGame')
        this.dialog.lostGame = document.getElementById('lostGame')


        let amountLives = this.getParameter('easy', 'amountLives')
        let amountTreasures = this.getParameter('easy', 'amountTreasures')

        this.setList(amountLives, this.listOfLives, 'life', 'solid', 'heart')
        this.setList(amountTreasures, this.listOfTreasures, 'treasure', 'regular', 'gem')
    }

    getParameter(levelName, key)  {
        return parameters.find(obj => obj.level == levelName)[key]
    }

    setList(parameter, parent, listElName, iconStyle, iconName) {
        let fragment = new DocumentFragment();
        for (let j = 0; j < parameter; j++) {
            let li = document.createElement('li')
            li.classList.add(listElName)
            let i = document.createElement('i')
            i.classList.add(`fa-${iconStyle}`)
            i.classList.add(`fa-${iconName}`)
            i.classList.add('fa-xl')
            li.append(i)
            fragment.append(li)
        }
        parent.append(fragment)
    }
    modifyListElement(action, listName) {
        console.log(this[`listOf${listName}`])
        let nodeList =  this[`listOf${listName}`]
        if (action == 'add') {
            let node = nodeList.querySelector('.fa-regular')
            console.log(node);
            node.classList.remove('fa-regular')
            node.classList.add('fa-solid')
        }
        else if (action == 'remove') {
            let node = nodeList.querySelectorAll('.fa-solid')
            console.log(node);
            console.log(node[node.length - 1])
            node[node.length - 1].classList.remove('fa-solid')
            node[node.length - 1].classList.add('fa-regular')
        }
    }
    checkEndOfGame(listName, dialogName) {
        let check = 1
        const nodeList =  this[`listOf${listName}`]
        if (listName == 'Lives') {
            check = nodeList.querySelector('.fa-solid')
        }
        else if (listName == 'Treasures') {
            check = nodeList.querySelector('.fa-regular')
        }
        if (!check) {
            // this.setEndGame(dialogName)
            setTimeout(() => this.setEndGame(dialogName), 1000)
        }

    }
    setEndGame(dialogName) {
            const dialog = this.dialog[dialogName]
            dialog.showModal()
            this.experience.destroy()
            document.querySelector('canvas.webgl').remove()

            const playAgainBtn = dialog.querySelector('.playAgain')
            const playHarderBtn = dialog.querySelector('.playHarder')

            playAgainBtn.addEventListener('click', () => {
                this.experience.newGame('sameLevel')
                dialog.close()
            })
            if (playHarderBtn) {
                playHarderBtn.addEventListener('click', () => {
                    this.experience.newGame('higherLevel')
                    dialog.close()
                })
            }

    }
}