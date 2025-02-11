import Experience from '../Experience.js'
import Grass from './Grass.js'
import Environment from './Environment.js'
// import Floor from './Floor.js'
// import Fox from './Fox.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        this.grass = new Grass()
        this.environment = new Environment()
        // this.floor = new Floor()
        // this.fox = new Fox()

        // this.resources.on('ready', () =>
        // {
        //     console.log('testdebugging');
        //     this.grass = new Grass()
        //     this.environment = new Environment()
        //     console.log('testdebugging');
        // })
        
        console.log('loaded: world');
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}