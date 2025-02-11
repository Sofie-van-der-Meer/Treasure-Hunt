import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Grass
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

        console.log('loaded: grass');
    }
    setGeometry() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
    }
    setTextures() {
        this.textures = {}

        this.textures.color = 'red'
    }
    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: this.textures.color
        })
    }
    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}