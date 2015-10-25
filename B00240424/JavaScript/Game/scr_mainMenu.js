/**
 * Created by Dan on 25/10/2015.
 */


MyGame.StateB = function (){
    this.mainMenuButtons = [];
    this.buttonSelector, this.enterKey, this.wKey, this.sKey, this.music, this.buttonClick = null;
};

MyGame.StateB.prototype = {
    //SetUpMainMenuState
    create: function(){
        //PlayBackgroundMusicForTheMenu
        this.playMainMenuMusic();
        //AddImagesToMainMenu
        this.addImages();
        //UpdateButtonProperties
        this.setButtonProperties();
        //SetPlayerInput
        this.playerKeyboardInput();
    },

    update: function(){
        //CheckForMouseOverButtons
        this.mouseOverButtons();
    },

    //PlayMusic
    playMainMenuMusic: function(){
        //AddMusic
        this.music = game.add.audio('music_mainMenu');
        if(musicIsPlaying){
            this.music.play();
        }
    },

    //PlayButtonClick
    playButtonClick: function(){
        this.buttonClick = game.add.audio('snd_buttonClick');
        if(sfxIsPlaying){
            this.buttonClick.play();
        }
    },

    //DefineKeyboardInput
    playerKeyboardInput: function(){
        //PressEnterToGoToDifferentState
        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.menuSelection, this);
        //PressWKeyToMoveUpMenu
        this.wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.wKey.onDown.add(this.moveButtonSelectorUp, this);
        //PressUPArrowKeyToMoveUpMenu
        this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.upKey.onDown.add(this.moveButtonSelectorUp, this);
        //PressSKeyToMoveDownMenu
        this.sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.sKey.onDown.add(this.moveButtonSelectorDown, this);
        //PressDOWNArrowKeyToMoveDownMenu
        this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.downKey.onDown.add(this.moveButtonSelectorDown, this);
    },

    //MoveButtonSelectorUpInTheMainMenuToHighlightButtonsOnKeyDown
    moveButtonSelectorUp: function(){
        this.buttonSelector.y -= 100;
        if(this.buttonSelector.y < 300){
            this.buttonSelector.y = 500;
        }
    },

    //MoveButtonSelectorDownInTheMainMenuToHighlightButtonsOnKeyDown
    moveButtonSelectorDown: function(){
        this.buttonSelector.y += 100;
        if(this.buttonSelector.y > 500){
            this.buttonSelector.y = 300;
        }
    },

    //ChangeStateOnEnterKeyPress
    menuSelection: function(){
        if(this.buttonSelector.y === 300){
            this.startSelected();
        }
        else if(this.buttonSelector.y === 400){
            this.controlsSelected();
        }
        else if(this.buttonSelector.y === 500){
            this.optionsSelected();
        }
    },

    //CheckForMouseOverButtonsAndPositionButtonSelector
    mouseOverButtons: function(){
        if(this.mainMenuButtons[0].input.pointerOver() & this.buttonSelector.y != 300){
            this.buttonSelector.y = 300;
        }
        else if(this.mainMenuButtons[1].input.pointerOver() & this.buttonSelector.y != 400){
            this.buttonSelector.y = 400;
        }
        else if(this.mainMenuButtons[2].input.pointerOver() & this.buttonSelector.y != 500){
            this.buttonSelector.y = 500;
        }
    },

    //AddImagesToStage
    addImages: function(){
        //AddBackgroundToGame
        this.add.sprite(0, 0, 'spr_mainMenu', 'spr_mainMenuBackground');
        //AddButtonImagesToGame
        this.mainMenuButtons.push(this.add.sprite(416, 300, 'spr_mainMenu', 'spr_start'));
        this.mainMenuButtons.push(this.add.sprite(416, 400, 'spr_mainMenu', 'spr_controls'));
        this.mainMenuButtons.push(this.add.sprite(416, 500, 'spr_mainMenu', 'spr_options'));
        //AddButtonSelectorToGameAndSetAnchorPoint
        this.buttonSelector = this.add.sprite(416, 300, 'spr_mainMenu', 'spr_buttonSelector');
        this.buttonSelector.anchor.setTo(0.5);
    },

    //SetPropertiesOfTheMainMenuButtons
    setButtonProperties: function(){
        for(var i=0; i<this.mainMenuButtons.length; i++){
            //CenterButtons
            this.mainMenuButtons[i].anchor.setTo(0.5);
            //EnableInputToButtons
            this.mainMenuButtons[i].inputEnabled = true;
        }
        //AddButtonPressEvents
        this.mainMenuButtons[0].events.onInputDown.add(this.startSelected, this);
        this.mainMenuButtons[1].events.onInputDown.add(this.controlsSelected, this);
        this.mainMenuButtons[2].events.onInputDown.add(this.optionsSelected, this);
    },

    //StartGameWhenButtonClicked
    startSelected: function(){
        //PlayButtonClick
        this.playButtonClick();
        //this.state.start('game');
    },

    //GoToControlsPageWhenButtonClicked
    controlsSelected: function(){
        //PlayButtonClick
        this.playButtonClick();
        this.state.start('controls');
    },

    //GoToOptionsPageWhenButtonClicked
    optionsSelected: function(){
        //PlayButtonClick
        this.playButtonClick();
        //this.state.start('options');
    }
};