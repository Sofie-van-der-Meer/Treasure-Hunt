import Experience from "./Experience";

export default class DomManupulation {
    constructor() {
        this.experience = new Experience()
        this.listOfLives = document.getElementById('listOfLives')
        this.listOfTreasures = document.getElementById('listOfTreasures')
        let amountLives = this.experience.world.parameters.amountLives
        let amountTreasures = this.experience.world.parameters.amountTreasures

        this.setList(amountLives, this.listOfLives, 'life', 'solid', 'heart')
        this.setList(amountTreasures, this.listOfTreasures, 'treasure', 'regular', 'gem')
    }

    setList(parameter, parent, listElName, iconStyle, iconName) {
        if (parent.children.length > 0) {
            this.clearList(parent)
        }
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
    clearList(parent) {
        let children = parent.querySelectorAll('li')
        children.forEach(child => {
            child.remove()
        });
    }

    modifyListElement(listName) {
        let nodeList =  this[`listOf${listName}`]
        const changeClassName = function (nodeList, oldClassName, newClassname, position) {
            let node
            if (position) {
                node = nodeList.querySelectorAll(`.${oldClassName}`)
                node = node[node.length + position]
            } else node = nodeList.querySelector(`.${oldClassName}`)
            if (node && node.classList) {
                node.classList.remove(oldClassName)
                node.classList.add(newClassname)
            }
        }

        if (listName == 'Treasures') {
            changeClassName(nodeList, 'fa-regular', 'fa-solid', 0)
        }
        else if (listName == 'Lives') {
            changeClassName(nodeList, 'fa-solid', 'fa-regular', - 1)
        }
        this.checkEndOfGame(listName)
    }
    checkEndOfGame(listName) {
        let check = 1
        let className
        let dialogName
        const nodeList =  this[`listOf${listName}`];

        (listName == 'Lives') ? className = 'fa-solid' :
        (listName == 'Treasures') ? className = 'fa-regular' :
        className = '';

        check = nodeList.querySelector(`.${className}`)

        if (check) return;

        (listName == 'Lives') ? dialogName = 'lostGame' :
        (listName == 'Treasures') ? dialogName = 'wonGame' :
        dialogName = '';

        setTimeout(() => this.setEndGame(dialogName), 500)

    }
    setEndGame(dialogName) {
        const dialog = document.getElementById(dialogName)
        dialog.showModal()
        this.experience.destroy()
        const oldCanvas = document.querySelector('canvas.webgl')
        if (oldCanvas) oldCanvas.remove()
    }
}