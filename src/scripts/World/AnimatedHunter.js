import Model from "./Model.js"

export default class AnimatedHunter extends Model {
    groupTick = 50
    constructor(_sourcesName, _location, _treasures, _startPosition) {
        super(_sourcesName, _location, _startPosition)
        this.grassWidth = this.experience.resourcesMeshes.find(obj => obj.name == 'grass').width
        this.position = this.model.position
        this.rotation = this.model.rotation

        this.setEvents()
    }
    // update() {
    //     super.update()
    // }
    setEvents() {
        addEventListener('keydown', (event) => {
            let values = 
            (event.code == 'ArrowDown')  ? ['x',  1, Math.PI * 0.5, 'Xmax'] :
            (event.code == 'ArrowLeft')  ? ['z',  1, Math.PI * 0.0, 'Zmax'] :
            (event.code == 'ArrowUp')    ? ['x', -1, Math.PI * 1.5, 'Xmin'] :
            (event.code == 'ArrowRight') ? ['z', -1, Math.PI * 1.0, 'Zmin'] :
            [];
            const position = this.setNewPosition(...values)
            this.position.x = position[0]
            this.position.z = position[1]

            this.isThereATreasureHere(position)

            this.experience.dom.checkEndOfGame('Treasures', 'wonGame')
        })
    }
    isThereATreasureHere(position) {
        const check = this.treasuresMatrix.findIndex(obj => 
            obj[0] === position[0] && obj[1] === position[1] )

        if (check >= 0) {
            const treasureMesh = this.scene.children.findIndex(obj => 
                   obj.position.x === position[0] 
                && obj.position.z === position[1] 
                && obj.isMesh)
            
            this.destroyTreasure(this.scene.children[treasureMesh])
            this.treasuresMatrix[check] = [100, 100]
            this.experience.dom.modifyListElement('add', 'Treasures')
        }
    }
    destroyTreasure(treasure) {
        treasure.geometry.dispose()

        for (const key in treasure.material)
        {
            const value = treasure.material[key]

            if (value && typeof value.dispose === 'function')
            {
                value.dispose()
            }
        }
        this.scene.remove(treasure)
    }
}