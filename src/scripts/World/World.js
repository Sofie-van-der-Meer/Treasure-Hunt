import * as THREE from 'three'
import Experience from '../Experience.js'
import Mesh from './Mesh.js'
import AnimatedMesh from './AnimatedMesh.js'
import Model from './Model.js'
import AnimatedEnemy from './AnimatedEnemy.js'
import Environment from './Environment.js'
import parameters from '../parameters.js'
// import Floor from './Floor.js'
// import Fox from './Fox.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resourcesModels = this.experience.resourcesModels
        this.grassWidth = this.experience.resourcesMeshes.find(obj => obj.name == 'grass').width
        this.parameters = parameters.find(obj => obj.level == 'easy')

        this.setModels()
        this.setMeshes()
    }

    setModels() {
        this.resourcesModels.on('ready', () =>
        {
            this.fox = new AnimatedEnemy('fox', 'Survey')
            this.mouse = new Model('mouse', 'Survey')
        })
    }

    setMeshes() {
        this.grass = new Mesh('grass')
        this.soil = new Mesh('soil')
        this.environment = new Environment()

        let offset = this.grassWidth / 2
        let matrix = []
        let totalAmount = this.parameters.amountStones + this.parameters.amountTreasures
        const randomCoordinate = function(width, offset) {
            return Math.round(Math.random() * width - offset)
        }
        while (totalAmount) {
            const location = [randomCoordinate(this.grassWidth, offset), randomCoordinate(this.grassWidth, offset)]
            const locationExist = matrix.some( subArray => subArray.every( 
                (val, index) => val === location[index] ) )
            if ( !locationExist ) {
                matrix[totalAmount - 1] = location  
                totalAmount--
            }
        }
        for (let i = 0; i < this.parameters.amountStones; i++) {
            let randomY = i * 0.015
            const location = new THREE.Vector3(matrix[i][0], randomY, matrix[i][1])
            this.stone = new Mesh('stone', location);
        }
        this.treasures = []
        for (let i = 0; i < this.parameters.amountTreasures; i++) {
            const location = new THREE.Vector3(matrix[matrix.length - 1 - i][0], 0.35, matrix[matrix.length - 1 - i][1])
            this.treasures[i] = new AnimatedMesh('berry', location);
        }
    }

    update()
    {
        if (this.fox) this.fox.update()
        if (this.mouse) this.mouse.update()
        if (this.treasures) {
            for (const treasure of this.treasures) {
                treasure.update()
            }
        }
    }
}