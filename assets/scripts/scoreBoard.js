
cc.Class({
    extends: cc.Component,

    properties: {
        trueNumber:cc.Label,
        wrongNumber:cc.Label,
        missingWorld:cc.Label,
        Wpm:cc.Label,
    },
    onLoad () {

        var jsonString = cc.sys.localStorage.getItem("scoresData");
        var loadData = JSON.parse(jsonString);

        this.trueNumber.string = loadData.countTrue;
        this.wrongNumber.string = loadData.countFalse;
        this.missingWorld.string = loadData.MissingWord;
        this.Wpm.string =loadData.WPM;
    },

    start () {

    },

    // update (dt) {},
});
