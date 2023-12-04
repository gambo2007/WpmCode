cc.Class({
    extends: cc.Component,

    properties: {
        avatar: cc.Sprite,
        Atlas :cc.SpriteAtlas,
        editbox: cc.EditBox,
        loadingPage:cc.Layout,
        gamePage:cc.Layout,
        avatarDialog:cc.Layout,
    },

    onLoad() {
        this.id = 0;
        this.img = this.Atlas.getSpriteFrames();
        this.avatar.spriteFrame = this.img[this.id];
        this.playerData = {
            id:"",
            value: "",
        }
        this.jsonString='';
    },

    start() {
        cc.log(this.img)
    },

    update(dt) {
        
    },
    
    onSubmit(){
        this.playerData = {
            id: this.avatar.spriteFrame.name,
            value: this.editbox.string,
        }
        cc.log(this.playerData)
        var jsonString = JSON.stringify(this.playerData);
        cc.sys.localStorage.setItem("gameData", jsonString);
        cc.log("Game data saved!");
        this.loadingPage.node.active = false;
        this.gamePage.node.active = true;
    },

    onClickShowDiaLog(){
        if(!this.avatarDialog.node.active)
            this.avatarDialog.node.active =true;
        else
            this.avatarDialog.node.active =false;
    }
});
