import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Mesh
{
    constructor(_sourcesName, _location)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resourcesMeshes
        this.resource = this.resources.find(obj => obj.name == _sourcesName);
        if (_location) {
            this.location = _location
        } else {this.setLocation()}

        this.setGeometry()
        this.setMaterial()
        this.setMesh()

    }
    setGeometry() {
        if (this.resource.type == 'BoxGeometry') {
            this.geometry = new THREE.BoxGeometry(
                this.resource.width, 
                this.resource.height, 
                this.resource.depth)
        }
        else if (this.resource.type == 'IcosahedronGeometry') {
            this.geometry = new THREE.IcosahedronGeometry(
                this.resource.radius, 
                this.resource.detail)
        }
        else if (this.resource.type == 'OctahedronGeometry') {
            this.geometry = new THREE.OctahedronGeometry(
                this.resource.radius, 
                this.resource.detail)
        }
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: this.resource.color
        })
    }
    setLocation() {
        this.location = new THREE.Vector3(this.resource.x, this.resource.y,this.resource.z)
    }
    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.copy(this.location)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}