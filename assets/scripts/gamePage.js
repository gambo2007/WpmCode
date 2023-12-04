var randomParagraph = require('random-paragraph');
cc.Class({
    extends: cc.Component,

    properties: {
        avatar : cc.Sprite,
        username:cc.Label,
        Atlas :cc.SpriteAtlas,
        words:cc.Label,
        editBox: cc.EditBox,
        inputArray: [],
        countTrue:0,
        countFalse:0,
        startTime: 0,
        endTime: 0,
        wordsPerMinute: 0,
        
    },

    onLoad () {
        this.countTrue =0;
        this.countFalse=0;
        this.inputArray =[],
        this.img = this.Atlas.getSpriteFrames();

        var jsonString = cc.sys.localStorage.getItem("gameData");
        var loadData = JSON.parse(jsonString);
        for (let num in this.img) {
            if (this.img[num].name === loadData.id) {
                this.avatar.spriteFrame = this.Atlas.getSpriteFrames()[num];
            }
        }
        this.username.string = "Hello " + loadData.value;
        this.startGame();

    },
    startGame() {
        this.startTimer();
        cc.log('start')
    },

    start () {
        this.words.string = randomParagraph({ sentences: 4});
    },

    update (dt) {},

    onTextChanged() {
        const lastChar = this.editBox.string[this.editBox.string.length - 1];
        if (lastChar === ' ') {
            const userInput = this.editBox.string.trim();
            
            if (userInput !== '') {
                this.inputArray.push(userInput);
    
                cc.log(this.inputArray);
                this.check();
                this.editBox.string = '';
                this.editBox.blur();
                this.editBox.focus();
            }
        }
    },

    check(){
        var Words = this.words.string.split(" ");
        if ( this.inputArray[this.inputArray.length-1] === Words[this.inputArray.length-1]) {
            this.countTrue++;
        }else{
            this.countFalse++;
        }

        cc.log(this.countTrue);
        cc.log(this.countFalse);
        cc.log(Words.length - (this.countFalse+this.countTrue));
        this.calculateWPM();

        this.scores = {
            countTrue:this.countTrue,
            countFalse:this.countFalse,
            MissingWord:Words.length - (this.countFalse+this.countTrue),
            WPM:this.wordsPerMinute,
        }
        var jsonString = JSON.stringify(this.scores);
        cc.sys.localStorage.setItem("scoresData", jsonString);
    },

    calculateWPM() {
        this.endTime = new Date().getTime();
        const elapsedSeconds = (this.endTime - this.startTime) / 1000;
        const wordsTyped = this.inputArray.length;

        if (elapsedSeconds > 0) {
            this.wordsPerMinute = Math.round((wordsTyped / elapsedSeconds) * 60);
            cc.log('Words Per Minute:', this.wordsPerMinute);
        }
    },

    startTimer() {
        this.startTime = new Date().getTime();
    },

});
