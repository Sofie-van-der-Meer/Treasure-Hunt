import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Model
{
    constructor(_sourcesName, _currentAnimation, _startPosition)
    {
        this.currentAnimation = _currentAnimation
        this.startPosition =    _startPosition

        this.experience =       new Experience()
        this.scene =            this.experience.scene
        this.time =             this.experience.time
        this.debug =            this.experience.debug
        this.matrix =           this.experience.world.matrix
        this.forbiddenArea =    this.experience.world.forbiddenArea
        this.resources =        this.experience.resourcesModels
        this.source =           this.resources.items[_sourcesName]
        this.sourceModel =      this.resources.sources.find(obj => obj.name == _sourcesName)
        this.stonesMatrix =     this.matrix.stones
        this.treasuresMatrix =  this.matrix.treasures
        this.treasuresAreObstacles = false

        // if (this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder(_sourcesName)
        // }

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.source.scene
        this.model.scale.set(this.sourceModel.scale, this.sourceModel.scale,
            this.sourceModel.scale)
        this.model.position.x = this.startPosition[0]
        this.model.position.z = this.startPosition[1]
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

        // Debug (not activated now)
        // if (this.debug.active)
        // {
        //     const debugObject = {}

        //     for (let i = 0; i < this.source.animations.length; i++) {
        //         const animationName = this.source.animations[i].name
        //         debugObject[`play${animationName}`] = () => this.animation.play(animationName)
        //         this.debugFolder.add(debugObject, `play${animationName}`)
        //     }
        //     debugObject.stopAnimation = () => this.stopAnimation()
        //     this.debugFolder.add(debugObject, 'stopAnimation')
        // }
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
    setNewPosition(coordinate, value, direction, key) {
        let newPosition = [this.position.x, this.position.z];
        (coordinate == 'x') ? newPosition[0] += value : newPosition[1] += value;
        let obstacle = this.checkNewPositionOnObstacles(newPosition)
        this.rotation.y = direction
        let posCoor = (coordinate == 'x') ? newPosition[0] : newPosition[1];

        if ( obstacle || posCoor == this.forbiddenArea[key]) {
                if (this.currentAnimation._clip.name != 'Survey') {
                    this.playAnimation('Survey')
                }
                return [this.position.x, this.position.z];
            }
            else if (this.currentAnimation._clip.name == 'Survey') {
                this.playAnimation('Walk')
            }
        return newPosition
    }
    checkNewPositionOnObstacles(newPosition) {
        let newPositionIsTreasure
        let newPositionIsObstacle = this.stonesMatrix.find(obj => 
            obj[0] === newPosition[0] && obj[1] === newPosition[1])

        if (this.treasuresAreObstacles) {
            newPositionIsTreasure = this.treasuresMatrix.find(obj => 
                obj[0] === newPosition[0] && obj[1] === newPosition[1])
        }
        return newPositionIsObstacle ? newPositionIsObstacle : newPositionIsTreasure ? newPositionIsTreasure : false;
    }
}