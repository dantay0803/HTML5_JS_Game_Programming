/**
 * Created by Dan on 25/10/2015.
 */


MyGame.StateC = function(game){
    this.backButton = null;
    this.enterKey = null;
};

MyGame.StateC.prototype = {

    //SetUpControlsState
    create: function(){
        //AddImagesToMainMenu
        this.addImages();
        //SetTheButtonObjectProperties
        this.buttonObjectSettings();
        //SetUpInputKeys
        this.playerKeyboardInput();
    },

    update: function(){

    },

    //AddImagesToStage
    addImages: function(){
        //AddBackgroundToGame
        this.add.sprite(0, 0, 'spr_game', 'bg_controls.png');
        //AddButtonsToGame
        this.backButton = this.add.sprite(145, 592, 'spr_game', 'spr_backButton.png');
    },


    //SetTheBackButtonProperties
    buttonObjectSettings: function(){
        this.backButton.anchor.setTo(0.5);
        this.backButton.inputEnabled = true;
        this.backButton.events.onInputDown.add(this.backButtonPressed, this);
    },

    //DefineKeyboardInput
    playerKeyboardInput: function(){
        //PressEnterToGoToDifferentState
        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.backButtonPressed, this);
    },

    //GoToControlsPageWhenButtonClicked
    backButtonPressed: function(){
        //PlayButtonClick
        MyGame.playButtonClick();
        //GoToControlsPage
        this.state.start('mainMenu');
    }


};