/**
 * Created by Dan on 30/09/2015.
 */

//NewGameObject
var MyGame = {
    //GlobalVariables
    //AudioStatus
    playMusic: false,
    playSFX: false,
    //GameMusic
    //MusicForGameMenus
    music_menus: null,
    music_noComabt: null,
    music_comabt: null,
    //GameMoney
    money: 0
};


//PlayButtonClick
MyGame.playButtonClick = function(){
    var buttonClick = game.add.audio('snd_buttonClick', 1, false);
    if(MyGame.playSFX){
        buttonClick.play();
    }
};

MyGame.StateA = function (game){

};


MyGame.StateA.prototype = {
    //LoadAssets
    preload: function(){
        //LoadMapJsonFile
        game.load.tilemap('level1', './Assets/Game/Map.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('spr_tiles', './Assets/Game/MapTiles.png');

        //LoadImages
        game.load.atlasJSONHash('spr_game', './Assets/Game/sprietsheet_TheDeadOfNight.png', './Assets/Game/spritesheet_TheDeadOfNight.json');
        //LoadMainMenuMusic
        game.load.audio('music_mainMenu', './Assets/Game/Audio/AdventureMeme.mp3');
        //LoadInButtonClick
        game.load.audio('snd_buttonClick', './Assets/Game/Audio/buttonClick.wav');
    },

    create: function(){
        //SetScalePropertyOfGame
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        //SetMenuMusicFile
        MyGame.music_menus = game.add.audio('music_mainMenu', 1, true);

        //LoadMenuAfterAssetsAreLoaded
        this.state.start('mainMenu');
    }
};