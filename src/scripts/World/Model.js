import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Model
{
    constructor(_sourcesName, _currentAnimation)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resourcesModels
        this.source = this.resources.items[_sourcesName]
        this.sourceModel = this.resources.sources.find(obj => obj.name == _sourcesName)
        this.currentAnimation = _currentAnimation
        this.time = this.experience.time
        this.debug = this.experience.debug

        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder(_sourcesName)
        }

        this.setModel()
        this.setAnimation()

        console.log(this.model);
    }

    setModel()
    {
        this.model = this.source.scene
        this.model.scale.set(this.sourceModel.scale, this.sourceModel.scale,
            this.sourceModel.scale)
        this.scene.add(this.model)

        this.model.traverse((child) => child.castShadow = (child instanceof THREE.Mesh))
    }
    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.actions = {}

        for (let i = 0; i < this.source.animations.length; i++) {
            const animation = this.source.animations[i]
            this.animation.actions[animation.name] = this.animation.mixer.clipAction(animation)
        }
        
        this.animation.actions.current = this.animation.actions[this.currentAnimation]
        this.animation.actions.current.play()
        this.playAnimation('Survey')

        // Debug
        if (this.debug.active)
        {
            const debugObject = {}

            for (let i = 0; i < this.source.animations.length; i++) {
                const animationName = this.source.animations[i].name
                debugObject[`play${animationName}`] = () => this.animation.play(animationName)
                this.debugFolder.add(debugObject, `play${animationName}`)
            }
            debugObject.stopAnimation = () => this.stopAnimation()
            this.debugFolder.add(debugObject, 'stopAnimation')
        }
    }
    playAnimation(name) {
        const newAction = this.animation.actions[name]
        const oldAction = this.animation.actions.current

        newAction.reset()
        newAction.play()
        newAction.crossFadeFrom(oldAction, 1)

        this.animation.actions.current = newAction
        this.currentAnimation = newAction
    }
    stopAnimation() {
        this.animation.mixer.stopAllAction()
    }
    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}