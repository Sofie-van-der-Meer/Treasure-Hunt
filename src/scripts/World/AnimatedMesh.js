import Mesh from "./Mesh.js"
import Experience from "../Experience.js"

export default class AnimatedMesh extends Mesh {
    constructor(_sourcesName, _location) {
        super(_sourcesName, _location)
        this.experience = new Experience()
        this.time = this.experience.time
    }
    update() {
        this.mesh.rotation.y += this.time.delta * 0.001
        const timeCoordinate = this.time.elapsed * 0.001
        this.mesh.position.y = (Math.sin(timeCoordinate) * 0.1) + this.resource.y
        // console.log(this.time.delta);
    }
    destroyMesh(mesh) {
        if (this instanceof THREE.Mesh) {
        mesh.geometry.dispose()

        for (const key in mesh.material)
            {
                const value = mesh.material[key]

                if (value && typeof value.dispose === 'function')
                {
                    value.dispose()
                }
            }
        }
    }
}