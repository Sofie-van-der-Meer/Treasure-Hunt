import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'

import sourcesModels from './sourcesModels.js'
import sourcesMeshes from './sourcesMeshes.js'
import DomManupulation from './DomManupulation.js'

let instance = null;

export default class Experience {
    constructor(_canvas, _level) {
        if(instance) return instance;
        instance = this

        this.canvas = _canvas
        this.level = _level
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resourcesModels = new Resources(sourcesModels)
        this.resourcesMeshes = sourcesMeshes
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.dom = new DomManupulation()

        this.sizes.on('resize', () => this.resize());
        this.time.on('tick', () => this.update());
    }
    
    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
    
    destroy() {
        
        this.sizes.off('resize')
        this.time.off('tick')

        this.scene.traverse( (child) => 
        {
            if (child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
        
                for (const key in child.material)
                {
                    const value = child.material[key]
        
                    if (value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })
        
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        instance = null

    }
}   