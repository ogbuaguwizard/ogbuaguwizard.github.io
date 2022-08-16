export default class Sound{
    constructor(src){
        this.maxVol;
        this.ready = false;

        this.audio = new Audio();
        this.audioType = supportedAudioFormat(this.audio);
        this.audio.src = src + this.audioType;
        //this.audio.load();
        
        //<---------------------------------------------------------------------------->
        // Take care of type support
        function supportedAudioFormat(audio){
            let returnExtension = "";
            if(audio.canPlayType("audio/mp3") == "probably" || audio.canPlayType("audio/mp3") == "maybe") {
                returnExtension = ".mp3";
            }
            else if(audio.canPlayType("audio/wav") == "probably" || audio.canPlayType("audio/wav") == "maybe") {
                returnExtension = ".wav";
            }
             else if (audio.canPlayType("audio/ogg") == "probably" || audio.canPlayType("audio/ogg") == "maybe") {
                returnExtension = ".ogg";
            } 
            return returnExtension;
        }

        let soundLoaded = ()=> {
                this.ready = true; // all audio has to be ready before changing Game State
                this.audio.removeEventListener("canplaythrough",soundLoaded, false);
        }
        this.audio.addEventListener("canplaythrough",soundLoaded, false);
    }
    play(volume, loop) {
        (volume) ? this.vol = volume :  this.vol = 1;
        (loop) ? this.audio.loop = true : this.audio.loop = false; 
        
        this.audio.currentTime = 0;
        this.audio.volume = this.vol;
        this.audio.play();        
    }
    pause(){
        this.audio.pause();
    }
    resume(){
        this.audio.play();
    }
    mute(){
        this.audio.muted = true;
        
    }
    unMute(){
        this.audio.muted = false;
    }
    end(){
        this.pause();
        this.audio.currentTime = 0;
    }
    fadeIn(volume,loop){
        (loop) ? this.audio.loop = true : this.audio.loop = false;
        this.maxVol = volume || 1; 
        this.audio.volume = 0;

        let fadeAudio = setInterval(() =>{
            if(this.audio.volume < this.maxVol){
                this.vol = this.audio.volume  + 0.01; 
                this.audio.volume = (this.vol > 1) ? 1 : this.vol;
                console.log(this.audio.volume) 
            }
            else{   
                clearInterval(fadeAudio);
            }
        }, 200) 
        this.audio.play();
    }
    fadeOut(){
        let fadeAudio = setInterval(() =>{
            if(this.audio.volume > 0){
                this.vol = this.audio.volume  - 0.01; 
                this.audio.volume = (this.vol < 0) ? 0 : this.vol;
                console.log(this.audio.volume)
            }
            else{  
                //stop audio
                this.end();
                clearInterval(fadeAudio);
            }
        }, 200)
    }
}
