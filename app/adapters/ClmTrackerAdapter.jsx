
export default class ClmTrackerAdapter {
    constructor(){
        this.ctracker = new clm.tracker
    }

    init(pModel){
        this.ctracker.init(pModel);
    }
    start(videoInput){
        this.ctracker.start(videoInput);
    }
    draw(videoInput){
        this.ctracker.draw(videoInput);
    }
    score(){
        return this.ctracker.getScore();
    }
    getCurrentPosition(){
        return this.ctracker.getCurrentPosition();
    }
    getCurrentParameters(){
        return this.ctracker.getCurrentParameters();
    }

}
