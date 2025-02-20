import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()
        // Setup
        // if (isTouchDevice()) {
        //     this.width = window.innerWidth
        //     this.height = window.innerHeight
        // } else {
        //     this.width = window.innerWidth * 0.75
        //     this.height = window.innerHeight
        // }
        // this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        this.setSizes()

        window.addEventListener('resize', () =>
        {
            // if (isTouchDevice()) {
            //     this.width = window.innerWidth
            //     this.height = window.innerHeight
            // } else {
            //     this.width = window.innerWidth * 0.75
            //     this.height = window.innerHeight
            // }
            // this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.setSizes()
            this.trigger('resize')
        })
    }
    setSizes() {
        if (this.isTouchDevice()) {
            this.width = window.innerWidth * 0.75
            this.height = window.innerHeight
        } else {
            this.width = window.innerWidth
            this.height = window.innerHeight
        }
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    }
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
}