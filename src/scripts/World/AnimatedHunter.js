import Model from "./Model.js"

export default class AnimatedHunter extends Model {
    groupTick = 50
    constructor(_sourcesName, _location, _treasures) {
        super(_sourcesName, _location)
        this.grassWidth = this.experience.resourcesMeshes.find(obj => obj.name == 'grass').width
        this.position = this.model.position
        this.rotation = this.model.rotation
        // this.matrix = this.matrix.slice(0, -_treasures)
        // this.treasuresMatrix = this.matrix.slice(-_treasures)
        console.log(this.treasuresMatrix);

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
        })
    }
    isThereATreasureHere(position) {
        const check = this.treasuresMatrix.findIndex(obj => 
            obj[0] === position[0] && obj[1] === position[1] )
        console.log(check);
        if (check != -1) {
            let treasureMesh = this.experience.world.treasures.find(obj => 
                obj.location.x === position[0] && obj.location.z === position[1])
            // this.destroyTreasure(treasureMesh)

            this.destroyMesh(treasureMesh)
            document.querySelector('.transparant').classList.remove('transparant');
        }
    }
    // destroyTreasure(treasure) {
    //     console.log('DESTROYYYY!!!');
    //     if (treasure instanceof )
    //     treasure.geometry.dispose()

    //     for (const key in treasure.material)
    //     {
    //         const value = treasure.material[key]

    //         if (value && typeof value.dispose === 'function')
    //         {
    //             value.dispose()
    //         }
    //     }
    // }
}