
cc.Class({
    extends: cc.Component,

    properties: {
        clock:cc.Sprite,
        gameBoard:cc.Layout,
        scoreBoard:cc.Layout,
        time:60,
        count:0,
    },

    onLoad () {},

    start () {

    },

    update (dt) {
        this.time -=dt;
        this.count +=dt;
        if(this.count>=6){
            this.clock.fillRange -=0.1;
            this.count =0;
        }
        if(this.time > 24){
            this.clock.node.color = cc.Color.GREEN;
        }else if(this.time <24  && this.time >6){
            this.clock.node.color = cc.Color.YELLOW;
        }else{
            if(this.time >0){
                this.clock.node.color = cc.Color.RED;
            }else{
                this.clock.node.active = false;
                this.gameBoard.node.active = false;
                this.scoreBoard.node.active=true;
            }
        }
    },
});
