import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        if (window.innerHeight > 600 && window.innerWidth > 600) {
            this.width = window.innerWidth
            this.height = window.innerHeight
        } else {
            this.width = window.innerWidth * 0.75
            this.height = window.innerHeight
        }
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () =>
        {
            if (window.innerHeight > 600 && window.innerWidth > 600) {
                this.width = window.innerWidth
                this.height = window.innerHeight
            } else {
                this.width = window.innerWidth * 0.75
                this.height = window.innerHeight
            }
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}