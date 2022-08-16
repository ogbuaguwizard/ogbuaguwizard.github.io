export default class gameImage{
    constructor(src){
        this.ready = false;
        this.img = new Image();
        this.img.src = src;
        

        let eventSheetLoaded = ()=>{ 
            this.ready = true; // all image has to be ready before changing Game State
            this.img.removeEventListener('load', eventSheetLoaded , false);
        }
        this.img.addEventListener('load', eventSheetLoaded , false);
    }
}