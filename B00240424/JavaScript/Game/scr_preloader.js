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

MyGame.StateA = function (){

};

MyGame.StateA.prototype = {
    //LoadAssets
    preload: function(){
        //LoadMapJsonFile
        game.load.tilemap('map_Level1', './Assets/Game/Maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
        //LoadFloorAndWallTiles
        game.load.image('MapTiles', './Assets/Game/Maps/MapTiles.png');
        //LoadDebrisTiles
        game.load.image('MapTiles2', './Assets/Game/Maps/MapTiles2.png');
<<<<<<< HEAD
=======
        //LoadDebrisTiles
        game.load.image('gunPurchaseTiles', './Assets/Game/Maps/gunPurchaseTiles.png');

        game.load.image('spr_rifleOutline', './Assets/Game/Sprites/spr_rifleOutline.png');
>>>>>>> origin/master
        //LoadGameImages
        game.load.atlasJSONHash('spr_game', './Assets/Game/Sprites/sprietsheet_TheDeadOfNight.png', './Assets/Game/Sprites/spritesheet_TheDeadOfNight.json');
        //LoadMainMenuMusic
        game.load.audio('music_mainMenu', './Assets/Game/Audio/AdventureMeme.mp3');
        //LoadInButtonClick
        game.load.audio('snd_buttonClick', './Assets/Game/Audio/buttonClick.wav');
        //LoadFont
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    },

    create: function(){
        //SetScalePropertyOfGame
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //RefreshTheDisplayAfterScalingTheGame
        game.scale.refresh();
        //SetMenuMusicFile
        MyGame.music_menus = game.add.audio('music_mainMenu', 1, true);
        //LoadMenuAfterAssetsAreLoaded
        this.state.start('mainMenu');

    }
};