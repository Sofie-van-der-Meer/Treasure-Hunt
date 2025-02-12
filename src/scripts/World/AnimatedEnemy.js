import Model from "./Model.js"
import Experience from "../Experience.js"

export default class AnimatedEnemy extends Model {
    constructor(_sourcesName, _location) {
        super(_sourcesName, _location)
        this.experience = new Experience()
        this.time = this.experience.time
        this.position = this.model.position
        this.rotation = this.model.rotation

        this.direction = ''
        this.speed = 0

        this.amountTicks = 0

        console.log(this.model);
        // this.i = 100
        // this.right = 0
        // this.left = 0
        // while( this.i) {
        //     // let randomDirection = Math.random()
        //     let randomAnimation = Math.random()

        //     if (randomAnimation <= 0.30) {
        //         console.log('Survey');
        //         this.left++
        //     }
        //     else if (randomAnimation >= 0.70) {
        //         console.log('Run');
        //         this.right++
        //     } else {
        //         console.log('Walk');
        //     }  
        //     this.i--      
        // }
        // console.log(`Run: ${this.right}, Survey: ${this.left}`)

    }
    update() {
        super.update()
        this.amountTicks++

        if (this.amountTicks == 100) {
            const randomDirection = Math.random()
            const randomAnimation = Math.random()

            if (randomDirection <= 0.2) {
                this.direction = 'left'
            }
            else if (randomDirection >= 0.8) {
                this.direction = 'right'
            }  
            
            if (randomAnimation <= 0.33) {
                if (!this.speed == 0) {
                    this.speed = 0
                    this.playAnimation('Survey')
                }
            }
            else if (randomAnimation >= 0.66) {
                if (!this.speed == 1) {
                    this.speed = 1
                    this.playAnimation('Walk')
                }
            } 
            else {
                if (!this.speed == 2) {
                    this.speed = 2
                    this.playAnimation('Run')
                }
            }
            this.amountTicks = 0
        }

        if (!this.speed == 0) {
            this.position.z += (0.02 * this.speed)
        }
        if (this.direction == 'right') {
            this.rotation.y += (0.02 * this.speed)
        }
        
        if (this.direction == 'left') {
            this.rotation.y -= (0.02 * this.speed)
        }

        // console.log(this.time.elapsed

        // )


        
        // this.mesh.rotation.y += this.time.delta * 0.001
        // const timeCoordinate = this.time.elapsed * 0.001
        // this.mesh.position.y = (Math.sin(timeCoordinate) * 0.1) + this.resource.y
        // console.log(this.time.delta);
    }
}