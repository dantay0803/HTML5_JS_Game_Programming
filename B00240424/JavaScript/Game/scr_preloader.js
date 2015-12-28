/**
 * Created by Dan on 30/09/2015.
 */
//SetDamageOfGuns
const DAMAGE_PISTOL = 20, DAMAGE_KAR98 = 100, DAMAGE_THOMPSON = 50, DAMAGE_SHOTGUN = 300;
//SetPriceOfWeapons
const COST_PISTOL = 250, COST_KAR98 = 750, COST_THOMPSON = 1000, COST_SHOTGUN = 500;
//SetWeaponFireDelay
const FIRERATE_PISTOL = 200, FIRERATE_KAR98 = 300, FIRERATE_THOMPSON = 100, FIRERATE_SHOTGUN = 300;
//SetWeaponAmmoAmount
const CLIPSIZE_PISTOL = 80, CLIPSIZE_KAR98 = 100, CLIPSIZE_THOMPSON = 124, CLIPSIZE_SHOTGUN = 40;
//SetTheMoneyAmountForHittingAndKillingZombie
const MONEY_ZOMBIEHIT = 10, MONEY_ZOMBIEKILL = 60;
//SetSpeedOfObjects
const SPEED_BULLET = 750, SPEED_PLAYER = 275, SPEED_ZOMBIE = 270;
//SetBasicCostOfUpgrades
const BASEMULTIPLIERCOST = 1000;
//UpgradeVariables
var healthMultiplier = 1;
var ammoMultiplier = 1;
var damageMultiplier = 1;

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