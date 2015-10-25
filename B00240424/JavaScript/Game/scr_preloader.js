/**
 * Created by Dan on 30/09/2015.
 */

//NewGameObject
var MyGame = {};


var musicIsPlaying = true;
var sfxIsPlaying = true;


MyGame.StateA = function (game){

};


MyGame.StateA.prototype = {
    //LoadAssets
    preload: function(){
        //LoadMainMenuImages
        game.load.atlasJSONHash('spr_mainMenu', './Assets/Game/spr_mainMenu.png', './Assets/Game/spr_mainMenu.json');

        //LoadMainMenuMusic
        game.load.audio('music_mainMenu', './Assets/Game/Audio/AdventureMeme.mp3');
        //LoadInButtonClick
        game.load.audio('snd_buttonClick', './Assets/Game/Audio/buttonClick.wav');
    },

    create: function(){
        //LoadMenuAfterAssetsAreLoaded
        this.state.start('mainMenu');
    }
};