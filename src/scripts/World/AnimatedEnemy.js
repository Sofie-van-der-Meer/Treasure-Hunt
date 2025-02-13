import Model from "./Model.js"

export default class AnimatedEnemy extends Model {
    groupTick = 50
    constructor(_sourcesName, _location) {
        super(_sourcesName, _location)
        this.grassWidth = this.experience.resourcesMeshes.find(obj => obj.name == 'grass').width

        this.position = this.model.position
        this.rotation = this.model.rotation

        this.direction = ''
        this.kompassDirection = 'west'
        this.speed = 0
        this.stop = false

        this.amountTicks = 0
        this.i = 0   
        this.count = 0

        this.forbiddenArea = {
            Xmax: Math.floor(0 + this.grassWidth / 2),
            Xmin: Math.ceil(0 - this.grassWidth / 2),
            Zmax: Math.floor(0 + this.grassWidth / 2),
            Zmin: Math.ceil(0 - this.grassWidth / 2)
        } 
    }
    update() {
        super.update()
        this.amountTicks++

        // if (this.amountTicks == this.groupTick) {
        //     const randomDirection = Math.random()

        //     if (randomDirection <= 0.1) {
        //         (this.direction == 'right') ? this.direction = '' : this.direction = 'left';
        //     }
        //     else if (randomDirection >= 0.9) {
        //         (this.direction == 'left') ? this.direction = '' : this.direction = 'right';
        //     } 
        //     else { this.direction = '' }

        //     switch(this.kompassDirection) {
        //         case 'west':
        //             if (this.direction == 'right') {
        //                 this.kompassDirection = 'north'
        //             }
        //             else if (this.direction == 'left') {
        //                 this.kompassDirection = 'south'
        //             }
        //             break;

        //         case 'south':
        //             if (this.direction == 'right') {
        //                 this.kompassDirection = 'west'
        //             }
        //             else if (this.direction == 'left') {
        //                 this.kompassDirection = 'east'
        //             }
        //             break;

        //         case 'east':
        //             if (this.direction == 'right') {
        //                 this.kompassDirection = 'south'
        //             }
        //             else if (this.direction == 'left') {
        //                 this.kompassDirection = 'north'
        //             }
        //             break;

        //         case 'north':
        //             if (this.direction == 'right') {
        //                 this.kompassDirection = 'east'
        //             }
        //             else if (this.direction == 'left') {
        //                 this.kompassDirection = 'west'
        //             }
        //             break;

        //         default:
        //             break;
        //     }
        // // }

        // // if (this.amountTicks == this.groupTick) {
        //     const randomAnimation = Math.random()

        //     if (randomAnimation <= 0.30) {
        //         if (!this.speed == 0) {
        //             this.speed = 0
        //             this.playAnimation('Survey')
        //         }
        //     }
        //     else if (randomAnimation >= 0.70) {
        //         if (!this.speed == 2) {
        //             this.speed = 2
        //             this.playAnimation('Run')
        //         }
        //     } 
        //     else {
        //         if (!this.speed == 1) {
        //             this.speed = 1
        //             this.playAnimation('Walk')
        //         }
        //     }    
            
        //     this.stop = false
        //     this.amountTicks = 0
        //     console.log( 'direction: ' + this.direction + ' kompas: ' + this.kompassDirection + ' speed: ' + this.speed)
            
        // }

        // if (!this.speed == 0) {
            
        //     if (this.direction == '') {
        //         switch(this.kompassDirection) {
        //             case 'west':
        //                 if (this.position.z >= this.forbiddenArea.Zmax) { 
        //                     this.stop = true
        //                     this.playAnimation('Survey')
        //                     this.speed = 0
        //                     this.position.z = this.forbiddenArea.Zmax
        //                 } else this.position.z += this.speed * (1 / this.groupTick)
        //                 break;

        //             case 'south':
        //                 if (this.position.x <= this.forbiddenArea.Xmin) {
        //                     this.stop = true
        //                     this.playAnimation('Survey')
        //                     this.speed = 0
        //                     this.position.x = this.forbiddenArea.Xmin
        //                 } else this.position.x -= this.speed * (1 / this.groupTick)
        //                 break;

        //             case 'east':
        //                 if (this.position.z <= this.forbiddenArea.Zmin) { 
        //                     this.stop = true
        //                     this.playAnimation('Survey')
        //                     this.speed = 0
        //                     this.position.z = this.forbiddenArea.Zmin
        //                 } else this.position.z -= this.speed * (1 / this.groupTick)
        //                 break;

        //             case 'north':
        //                 if (this.position.x >= this.forbiddenArea.Xmax) {
        //                     this.stop = true
        //                     this.playAnimation('Survey')
        //                     this.speed = 0
        //                     this.position.x = this.forbiddenArea.Xmax
        //                 } else this.position.x += this.speed * (1 / this.groupTick)
        //                 break;

        //             default:
        //                 break;
        //         }                
        //     }


        //     if (this.direction == 'right') {
        //         this.rotation.y += (Math.PI * 0.5) * (1 / this.groupTick)
        //     }
            
        //     if (this.direction == 'left') {
        //         this.rotation.y -= (Math.PI * 0.5) * (1 / this.groupTick)
        //     }
        // }
    }
}