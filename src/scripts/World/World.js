import * as THREE from 'three'
import Experience from '../Experience.js'
import Mesh from './Mesh.js'
import AnimatedMesh from './AnimatedMesh.js'
import AnimatedEnemy from './AnimatedEnemy.js'
import AnimatedHunter from './AnimatedHunter.js'
import Environment from './Environment.js'
import parameters from '../parameters.js'
import matrix from '../matrix.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resourcesModels = this.experience.resourcesModels
        this.grassWidth = this.experience.resourcesMeshes.find(obj => obj.name == 'grass').width
        this.parameters = parameters.find(obj => obj.level == 'easy')
        this.matrix = matrix
        this.forbiddenArea = {}

        this.setBoundries()
        this.setModels()
        this.setMeshes()
    }

    setModels() {
        this.resourcesModels.on('ready', () =>
        {
            this.fox = new AnimatedEnemy('fox', 'Survey')
            this.mouse = new AnimatedHunter('mouse', 'Survey', this.parameters.amountTreasures)
        })
    }

    setMeshes() {
        this.grass = new Mesh('grass')
        this.soil = new Mesh('soil')
        this.environment = new Environment()

        for (let i = 0; i < this.parameters.amountStones; i++) {
            let randomY = i * 0.015
            const location = new THREE.Vector3(this.matrix.stones[i][0], randomY, this.matrix.stones[i][1])
            this.stone = new Mesh('stone', location);
        }
        this.treasures = []
        for (let i = 0; i < this.parameters.amountTreasures; i++) {
            const location = new THREE.Vector3(this.matrix.treasures[this.matrix.treasures.length - 1 - i][0], 0.35, this.matrix.treasures[this.matrix.treasures.length - 1 - i][1])
            this.treasures[i] = new AnimatedMesh('berry', location);
        }
    }

    setBoundries() {
        this.forbiddenArea = {
            Xmax: Math.floor(0 + (this.grassWidth / 2)  + 1),
            Xmin: Math.ceil(0 - (this.grassWidth / 2)  - 1),
            Zmax: Math.floor(0 + (this.grassWidth / 2)  + 1),
            Zmin: Math.ceil(0 - (this.grassWidth / 2)  - 1)
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