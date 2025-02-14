import Model from "./Model.js"

export default class AnimatedEnemy extends Model {
    groupTick = 150
    subGroupTick = this.groupTick / 10
    values = ['', 0, 0, '']
    newPosition = [0, 0]
    constructor(_sourcesName, _location) {
        super(_sourcesName, _location)
        this.grassWidth = this.experience.resourcesMeshes.find(obj => obj.name == 'grass').width

        this.position = this.model.position
        this.rotation = this.model.rotation

        this.amountTicks = 0
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
        }

        if (this.position.x != this.newPosition[0]) this.position.x += (this.values[1] / this.groupTick)
        if (this.position.z != this.newPosition[1]) this.position.z += (this.values[1] / this.groupTick)

    }
}