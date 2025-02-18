import Model from "./Model.js"

export default class AnimatedEnemy extends Model {
    groupTick = 50
    subGroupTick = this.groupTick / 10
    values = ['', 0, 0, '']
    constructor(_sourcesName, _location, _hunter, _startPosition) {
        super(_sourcesName, _location, _startPosition)
        this.hunter = _hunter
        this.newPosition = _startPosition
        this.grassWidth = this.experience.world.grassWidth
        this.movement = this.experience.world.parameters.enemyMovement
        this.position = this.model.position
        this.rotation = this.model.rotation
        this.treasuresAreObstacles = true

        this.amountTicks = 0
        this.gotHunter = false
    }
    update() {
        super.update()
        this.amountTicks++

        if (this.amountTicks == this.groupTick) {
            this.position.x = this.newPosition[0]
            this.position.z = this.newPosition[1]

            if (this.movement == 'random') this.getRandomStep()
            else this.getTargetedStep(this.position)

            this.amountTicks = 0
            this.gotHunter = false
        }

        if (this.position.x != this.newPosition[0]) this.position.x += (this.values[1] / this.groupTick)
        if (this.position.z != this.newPosition[1]) this.position.z += (this.values[1] / this.groupTick)
        
        this.isThereAHunterHere(this.position)
    }
    isThereAHunterHere(position) {
        if (this.hunter.position.x === Math.round(position.x)
            && this.hunter.position.z === Math.round(position.z)) {
            if (this.gotHunter == false) {
                this.experience.dom.modifyListElement('Lives')
                this.gotHunter = true
            }                
        }
    }
    getRandomStep() {
        const randomDirection = Math.random();

        this.values = 
        (randomDirection <= 0.25) ? ['x',  1, (Math.PI * 0.5), 'Xmax'] :
        (randomDirection <= 0.50) ? ['z',  1, (Math.PI * 0.0), 'Zmax'] :
        (randomDirection <= 0.75) ? ['x', -1, (Math.PI * 1.5), 'Xmin'] :
                                    ['z', -1, (Math.PI * 1.0), 'Zmin'] ;

        this.newPosition = this.setNewPosition(...this.values)
    }
    getTargetedStep(enemyPosition, exisitingValue = 0) {
        let coordinate
        if (exisitingValue) {
            (exisitingValue[0] == 'z') ? coordinate = 'x' : coordinate = 'z';
        }
        else if (this.hunter.position.x != enemyPosition.x && this.hunter.position.z != enemyPosition.z) {
            const randomCoordinate = Math.random();
            (randomCoordinate > 0.5) ? coordinate = 'z' : coordinate = 'x' ;
        } 
        else if (this.hunter.position.x == enemyPosition.x) coordinate = 'z'
        else if (this.hunter.position.z == enemyPosition.z) coordinate = 'x'

        if (coordinate == 'z') {
            if (this.hunter.position.z > enemyPosition.z) {
                this.values = ['z',  1, (Math.PI * 0.0), 'Zmax']
            } else {
                this.values = ['z', -1, (Math.PI * 1.0), 'Zmin']
            }
        } 
        else if (coordinate == 'x') {
            if (this.hunter.position.x > enemyPosition.x) {
                this.values = ['x',  1, (Math.PI * 0.5), 'Xmax']
            } else {
                this.values = ['x', -1, (Math.PI * 1.5), 'Xmin']
            }
        }
        this.newPosition = this.setNewPosition(...this.values)

        if (   this.position.x == this.newPosition[0] 
            && this.position.z == this.newPosition[1]
        ) {
            this.getRandomStep()
        }
    }
}