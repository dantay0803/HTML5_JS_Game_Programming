/**
 * Created by Dan on 30/09/2015.
 */
//SetDamageOfGuns
const DAMAGE_PISTOL = 20, DAMAGE_KAR98 = 100, DAMAGE_THOMPSON = 50, DAMAGE_SHOTGUN = 200;
//SetPriceOfWeapons
const COST_PISTOL = 250, COST_KAR98 = 750, COST_THOMPSON = 1000, COST_SHOTGUN = 500;
//SetWeaponFireDelay
const FIRERATE_PISTOL = 200, FIRERATE_KAR98 = 300, FIRERATE_THOMPSON = 100, FIRERATE_SHOTGUN = 300;
//SetWeaponAmmoAmount
const CLIPSIZE_PISTOL = 80, CLIPSIZE_KAR98 = 100, CLIPSIZE_THOMPSON = 124, CLIPSIZE_SHOTGUN = 40;
//SetTheMoneyAmountForHittingAndKillingZombie
const MONEY_ZOMBIEHIT = 10, MONEY_ZOMBIEKILL = 60;
//SetSpeedOfObjects
const SPEED_BULLET = 750, SPEED_PLAYER = 250, SPEED_ZOMBIE = 250;
//SetBasicCostOfUpgrades
const BASEMULTIPLIERCOST = 1000;
//UpgradeVariables
var healthMultiplier = 1;
var ammoMultiplier = 1;
var damageMultiplier = 1;
//GetUserDataFromDatabase
var databaseInfo = [];

//NewGameObject
var MyGame = {
    //GlobalVariables
    //AudioStatus
    playMusic: true,
    playSFX: true,
    //GameMusic
    //MusicForGameMenus
    music_menus: null,
    music_noComabt: null,
    music_comabt: null
};

//PlayButtonClick
MyGame.playButtonClick = function(){
    var buttonClick = game.add.audio('snd_buttonClick', 1, false);
    if(MyGame.playSFX){
        buttonClick.play();
    }
};

//SendUserDataToDatabase
MyGame.uploadUserData = function(){
    //XMLRequest
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './php/saveData.php');
    xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    jsonData = JSON.stringify(obj);
    xhr.onreadystatechange = function() {
        if (xhr.status === 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send('json=' + jsonData);
};

//SendUserDataToDatabase
MyGame.getUserData = function(){
    //XMLRequest
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "./php/getData.php");
    xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    xhr.send();
    var databaseResponse;
    xhr.onreadystatechange = function() {
        if (xhr.status === 200 && xhr.readyState == 4) {
            databaseResponse = xhr.responseText;
            console.log(databaseResponse);
        }

        var startChar = 0;
        var lastChar = databaseResponse.indexOf(" ");
        do {
            userID[userID.length] = databaseResponse.substring(startChar, lastChar);
            console.log(userID);
            /*startChar = lastChar + 1;
            lastChar = databaseResponse.indexOf(" ", startChar + 1);
            waves[waves.length] = databaseResponse.substring(startChar, lastChar);
            startChar = lastChar + 1;
            lastChar = databaseResponse.indexOf(" |", startChar + 1);
            password[password.length] = databaseResponse.substring(startChar, lastChar);
            startChar = lastChar + 3;
            lastChar = databaseResponse.indexOf(" ", startChar + 1);*/
        }
        while (lastChar != -1)
    }
};

MyGame.StateA = function (){

};

MyGame.StateA.prototype = {
    //LoadAssets
    preload: function(){
        //LoadGameAudio
        this.loadAudio();
        //LoadMapJsonFile
        game.load.tilemap('map_Level1', './Assets/Game/Maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
        //LoadFloorAndWallTiles
        game.load.image('MapTiles', './Assets/Game/Maps/MapTiles.png');
        //LoadDebrisTiles
        game.load.image('MapTiles2', './Assets/Game/Maps/MapTiles2.png');
        //LoadGameImages
        game.load.atlasJSONHash('spr_game', './Assets/Game/Sprites/sprietsheet_TheDeadOfNight.png', './Assets/Game/Sprites/spritesheet_TheDeadOfNight.json');
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
    },

    //LoadGameSounds
    loadAudio: function(){
        //LoadGameMusic
        //MenuMusic
        game.load.audio('music_mainMenu', './Assets/Game/Audio/Music/AdventureMeme.mp3');
        //GameMusic
        game.load.audio('music_game1', './Assets/Game/Audio/Music/50cmbag.mp3');
        game.load.audio('music_game2', './Assets/Game/Audio/Music/CoffeeBloodRemix.mp3');
        game.load.audio('music_game3', './Assets/Game/Audio/Music/CutTheWire.mp3');
        game.load.audio('music_game4', './Assets/Game/Audio/Music/Kraybsbigreveal.mp3');
        game.load.audio('music_game5', './Assets/Game/Audio/Music/parcial.mp3');
        game.load.audio('music_game6', './Assets/Game/Audio/Music/penombral.mp3');
        //LoadSFX
        //LoadInButtonClick
        game.load.audio('snd_buttonClick', './Assets/Game/Audio/SFX/buttonClick.wav');
        //LoadAmbientTracks
        game.load.audio('snd_Ambience1', './Assets/Game/Audio/SFX/Ambience1.wav');
        game.load.audio('snd_Ambience2', './Assets/Game/Audio/SFX/Ambience2.wav');
        game.load.audio('snd_Ambience3', './Assets/Game/Audio/SFX/Ambience3.wav');
    }
};