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
    constructor(_canvas) {
        if(instance) return instance;
        instance = this

        this.dom = new DomManupulation()
        this.canvas = _canvas
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resourcesModels = new Resources(sourcesModels)
        this.resourcesMeshes = sourcesMeshes
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

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

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        while(this.scene.children.length) {
            const child = this.scene.children[0]
            if (child instanceof THREE.Mesh)
                {
                    this.scene.remove(child)
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
            else {
                if (child.type !== 'PerspectiveCamera') {
                console.log('unhandeled scene object: ', child)
// work here tomorrow
                }
            }
        }

        // this.scene.forEach((child) =>
        // {
        //     if (child instanceof THREE.Mesh)
        //     {
        //         this.scene.remove(child)
        //         child.geometry.dispose()

        //         for (const key in child.material)
        //         {
        //             const value = child.material[key]

        //             if (value && typeof value.dispose === 'function')
        //             {
        //                 value.dispose()
        //             }
        //         }
        //     }
        // })

        this.scene.dispose()
        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
    
    newGame(levelUp) {
        console.log(levelUp);
        
    }
}