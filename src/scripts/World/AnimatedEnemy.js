import Model from "./Model.js"

export default class AnimatedEnemy extends Model {
    groupTick = 150
    subGroupTick = this.groupTick / 10
    values = ['', 0, 0, '']
    constructor(_sourcesName, _location, _hunter, _startPosition) {
        super(_sourcesName, _location, _startPosition)
        this.hunter = _hunter
        this.newPosition = _startPosition
        this.grassWidth = this.experience.resourcesMeshes.find(obj => obj.name == 'grass').width

        this.position = this.model.position
        this.rotation = this.model.rotation

        this.amountTicks = 0
        this.gotHunter = false
    }
    update() {
        super.update()
        this.amountTicks++

        if (this.amountTicks == this.groupTick) {
            this.position.x = this.newPosition[0]
            this.position.z = this.newPosition[1]

            const randomDirection = Math.random();
            // console.log(randomDirection);

            this.values =
            (randomDirection <= 0.25) ? ['x',  1, (Math.PI * 0.5), 'Xmax'] :
            (randomDirection <= 0.50) ? ['z',  1, (Math.PI * 0.0), 'Zmax'] :
            (randomDirection <= 0.75) ? ['x', -1, (Math.PI * 1.5), 'Xmin'] :
                                        ['z', -1, (Math.PI * 1.0), 'Zmin'] ;

            this.newPosition = this.setNewPosition(...this.values)
            this.amountTicks = 0
            this.gotHunter = false
        }

        if (this.position.x != this.newPosition[0]) this.position.x += (this.values[1] / this.groupTick)
        if (this.position.z != this.newPosition[1]) this.position.z += (this.values[1] / this.groupTick)
        
        this.isThereAHunterHere(this.position)
        // const check = this.listOfLives.children
        this.experience.dom.checkEndOfGame('Lives', 'lostGame')
    }
    isThereAHunterHere(position) {
        if (this.hunter.position.x === Math.round(position.x)
            && this.hunter.position.z === Math.round(position.z)) {
            if (this.gotHunter == false) {
                this.experience.dom.modifyListElement('remove', 'Lives') // capital letter!!
                this.gotHunter = true
            }                
        }

    }
}