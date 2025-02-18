import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        if (this.debug.active)
            {
                this.debugFolder = this.debug.ui.addFolder('camera')
            }
            
        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(23, 16, 3)
        this.scene.add(this.instance)

        // Debug
        if (this.debug.active)
            {
                this.debugFolder
                    .add(this.instance.position, 'x')
                    .name('cameraPositionX')
                    .min(- 5)
                    .max(50)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.instance.position, 'y')
                    .name('cameraPositionY')
                    .min(- 5)
                    .max(50)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.instance.position, 'z')
                    .name('cameraPositionZ')
                    .min(- 5)
                    .max(50)
                    .step(0.001)
            }
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}