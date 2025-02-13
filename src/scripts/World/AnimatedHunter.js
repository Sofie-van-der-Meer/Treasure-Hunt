import Model from "./Model.js"

export default class AnimatedHunter extends Model {
    groupTick = 50
    constructor(_sourcesName, _location) {
        super(_sourcesName, _location)
        this.grassWidth = this.experience.resourcesMeshes.find(obj => obj.name == 'grass').width

        this.position = this.model.position
        this.rotation = this.model.rotation

        // this.direction = ''
        // this.kompassDirection = 'west'
        // this.speed = 0
        // this.stop = false

        // this.amountTicks = 0
        // this.i = 0   
        // this.count = 0

        this.forbiddenArea = {
            Xmax: Math.floor(0 + this.grassWidth / 2),
            Xmin: Math.ceil(0 - this.grassWidth / 2),
            Zmax: Math.floor(0 + this.grassWidth / 2),
            Zmin: Math.ceil(0 - this.grassWidth / 2)
        } 
        this.setEvents()
    }
    update() {
        super.update()
    }
    setEvents() {
        // element.addEventListender(event, handler, [options])
        addEventListener('keydown', (event) => {
            if (event.code == 'ArrowLeft') {
                console.log('ArrowLeft')
                this.changePosition('x', 1, Math.PI * 0.5)
            }
            if (event.code == 'ArrowUp') {
                console.log('ArrowUp')
                this.changePosition('z', 1, Math.PI * 0)
            }
            if (event.code == 'ArrowRight') {
                console.log('ArrowRight')
                this.changePosition('x', -1, Math.PI * 1.5)
            }
            if (event.code == 'ArrowDown') {
                console.log('ArrowDown')
                this.changePosition('z', -1, Math.PI * 1)
            }
        })
    }
    changePosition(coordinate, value, direction) {
        this.position[coordinate] += value;
        this.rotation.y = direction
    }
}