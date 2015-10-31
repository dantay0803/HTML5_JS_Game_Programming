/**
 * Created by Dan on 25/10/2015.
 */


MyGame.StateB = function (){
    this.mainMenuButtons = [];
    //DefineKeysForMenuNavigation
    this.enterKey=null;
    this.wKey = null;
    this.upKey = null;
    this.sKey = null;
    this.downKey = null;
    //ObjectsToActIsIndecatorsToTheStatusOfTheAudio
    this.musicStatusIndecator = null;
    this.sfxStatusIndecator = null;
};

MyGame.StateB.prototype = {
    //SetUpMainMenuState
    create: function(){
        //PlayMenuMusic
        this.playMainMenuMusic();
        //AddImagesToMainMenu
        this.addImages();
        //CheckAudioVariablesStatusToUpdateImages
        this.checkAudioStatus();
        //SetTheButtonObjectProperties
        this.buttonObjectSettings();
        //SetUpInputKeys
        this.playerKeyboardInput();
    },

    update: function(){
        //MouseOverButtons
        this.mouseOverButtons();
        //SlightlyMoveSelectedButtonDownToSimulateItAsSelected
        this.animateButtonSelection();
    },

    //AddImagesToStage
    addImages: function(){
        //AddBackgroundToGame
        this.add.sprite(0, 0, 'spr_game', 'bg_mainMenu.png');
        //AddButtonsToGame
        this.mainMenuButtons[0] = this.add.sprite(416, 250, 'spr_game', 'spr_StartButton.png');
        this.mainMenuButtons[1] = this.add.sprite(416, 350, 'spr_game', 'spr_ControlsButton.png');
        this.mainMenuButtons[2] = this.add.sprite(335, 450, 'spr_game', 'spr_MusicButton.png');
        this.mainMenuButtons[3] = this.add.sprite(495, 450, 'spr_game', 'spr_SFXButton.png');
    },

    //CheckAudioVariablesStatusToUpdateImages
    checkAudioStatus: function(){
        //AddLineThroughMusicImageToIndicateMusicIsNotPlaying
        if(!MyGame.playMusic){
            this.musicStatusIndecator = this.add.sprite(310, 420, 'spr_game', 'spr_audioMutedIndecator.png');
        }
        //AddLineThroughSFXImageToIndicateSFXAreDisabled
        if(!MyGame.playSFX){
            this.sfxStatusIndecator = this.add.sprite(470, 420, 'spr_game', 'spr_audioMutedIndecator.png');
        }
    },

    //CheckForMouseOverButton
    mouseOverButtons: function(){
        //ChangeButtonImageToSelectedImageFrame
        if(this.mainMenuButtons[0].input.pointerOver()){
            this.mainMenuButtons[0].frameName = 'spr_StartButtonSelected.png';
            this.mainMenuButtons[0].y = 260;
            this.mainMenuButtons[1].frameName = 'spr_ControlsButton.png';
            this.mainMenuButtons[1].y = 350;
            this.mainMenuButtons[2].frameName = 'spr_MusicButton.png';
            this.mainMenuButtons[2].y = 450;
            this.mainMenuButtons[3].frameName = 'spr_SFXButton.png';
            this.mainMenuButtons[3].y = 450;
        }
        else if(this.mainMenuButtons[1].input.pointerOver()){
            this.mainMenuButtons[1].frameName = 'spr_ControlsButtonSelected.png';
            this.mainMenuButtons[1].y = 360;
            this.mainMenuButtons[0].frameName = 'spr_StartButton.png';
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[2].frameName = 'spr_MusicButton.png';
            this.mainMenuButtons[2].y = 450;
            this.mainMenuButtons[3].frameName = 'spr_SFXButton.png';
            this.mainMenuButtons[3].y = 450;
        }
        else if(this.mainMenuButtons[2].input.pointerOver()){
            this.mainMenuButtons[2].frameName = 'spr_MusicButtonSelected.png';
            this.mainMenuButtons[2].y = 460;
            this.mainMenuButtons[1].frameName = 'spr_ControlsButton.png';
            this.mainMenuButtons[1].y = 350;
            this.mainMenuButtons[0].frameName = 'spr_StartButton.png';
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[3].frameName = 'spr_SFXButton.png';
            this.mainMenuButtons[3].y = 450;
        }
        else if(this.mainMenuButtons[3].input.pointerOver()){
            this.mainMenuButtons[3].frameName = 'spr_SFXButtonSelected.png';
            this.mainMenuButtons[3].y = 460;
            this.mainMenuButtons[0].frameName = 'spr_StartButton.png';
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[1].frameName = 'spr_ControlsButton.png';
            this.mainMenuButtons[1].y = 350;
            this.mainMenuButtons[2].frameName = 'spr_MusicButton.png';
            this.mainMenuButtons[2].y = 450;
        }
    },

    //SetTheButtonObjectProperties
    buttonObjectSettings: function(){
        //LoopThroughButtons
        for(var i = 0; i<this.mainMenuButtons.length; i++){
            //EnableMouseInputOnButtons
            this.mainMenuButtons[i].inputEnabled = true;
            //SetAnchorToCenterOfImage
            this.mainMenuButtons[i].anchor.setTo(0.5);
        }
        //AddButtonPressEvents
        this.mainMenuButtons[0].events.onInputDown.add(this.startSelected, this);
        this.mainMenuButtons[1].events.onInputDown.add(this.controlsPageSelected, this);
        this.mainMenuButtons[2].events.onInputDown.add(this.toggleMusic, this);
        this.mainMenuButtons[3].events.onInputDown.add(this.toggleSFX, this);
    },

    //StartGameWhenButtonClicked
    startSelected: function(){
        //PlayButtonClick
        MyGame.playButtonClick();
        this.state.start('level');
    },

    //GoToControlsPageWhenButtonClicked
    controlsPageSelected: function(){
        //PlayButtonClick
        MyGame.playButtonClick();
        //GoToControlsPage
        this.state.start('controls');
    },

    //ToggleStatusOfMusic
    toggleMusic: function(){
        //PlayButtonClick
        MyGame.playButtonClick();
        if(MyGame.playMusic && MyGame.music_menus.isPlaying){
            MyGame.playMusic = false;
            //stopMusic
            MyGame.music_menus.stop();
            //AddLineThroughMusicImageToIndicateMusicIsNotPlaying
            this.musicStatusIndecator = this.add.sprite(310, 420, 'spr_game', 'spr_audioMutedIndecator.png');
        }
        else{
            //musicIsPlaying = true;
            MyGame.playMusic = true;
            //playMusic
            MyGame.music_menus.play();
            //RemoveLineThroughMusicImageToIndicateMusicIsPlaying
            if(this.musicStatusIndecator != null){
                this.musicStatusIndecator.destroy();
            }
        }
    },

    //ToggleStatusOfSFX
    toggleSFX: function(){
        if(MyGame.playSFX){
            MyGame.playSFX = false;
            //AddLineThroughSFXImageToIndicateSFXAreDisabled
            this.sfxStatusIndecator = this.add.sprite(470, 420, 'spr_game', 'spr_audioMutedIndecator.png');
        }
        else{
            MyGame.playSFX = true;
            //AddLineThroughSFXImageToIndicateSFXAreEnabled
            if(this.sfxStatusIndecator != null){
                this.sfxStatusIndecator.destroy();
            }
        }
        //PlayButtonClick
        MyGame.playButtonClick();
    },

    //PlayMusic
    playMainMenuMusic: function(){
        //AddMusic
        if(MyGame.playMusic && !MyGame.music_menus.isPlaying){
            MyGame.music_menus.play();
        }
    },

    //DefineKeyboardInput
    playerKeyboardInput: function(){
        //PressEnterToGoToDifferentState
        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.enterKeySelection, this);
        //PressWKeyToMoveUpMenu
        this.wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.wKey.onDown.add(this.moveMenuSelectionUp, this);
        //PressUPArrowKeyToMoveUpMenu
        this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.upKey.onDown.add(this.moveMenuSelectionUp, this);
        //PressSKeyToMoveDownMenu
        this.sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.sKey.onDown.add(this.moveMenuSelectionDown, this);
        //PressDOWNArrowKeyToMoveDownMenu
        this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.downKey.onDown.add(this.moveMenuSelectionDown, this);
    },

    //SelectedMenuButtonsWhenKeyboardPressed
    moveMenuSelectionUp: function(){
        //CheckNoButtonsAreCurrentlySelected
        if(this.mainMenuButtons[0].frameName==='spr_StartButton.png' && this.mainMenuButtons[1].frameName==='spr_ControlsButton.png'
        && this.mainMenuButtons[2].frameName==='spr_MusicButton.png' && this.mainMenuButtons[3].frameName==='spr_SFXButton.png'){
            //IfNoButtonsAreSelectedSetStartButtonAsSelected
            this.mainMenuButtons[0].frameName = 'spr_StartButtonSelected.png';
        }
        //CheckIfStartButtonIsSelected
        else if(this.mainMenuButtons[0].frameName === 'spr_StartButtonSelected.png'){
            //IfStartButtonIsSelectedThenUnselectTheStartButtonAndSelectSFXButton
            this.mainMenuButtons[0].frameName = 'spr_StartButton.png';
            this.mainMenuButtons[3].frameName = 'spr_SFXButtonSelected.png';
        }
        //CheckIfSFXButtonIsSelected
        else if(this.mainMenuButtons[3].frameName === 'spr_SFXButtonSelected.png'){
            //IfSFXButtonIsSelectedThenUnselectTheSFXButtonAndSelectMusicButton
            this.mainMenuButtons[3].frameName = 'spr_SFXButton.png';
            this.mainMenuButtons[2].frameName = 'spr_MusicButtonSelected.png';
        }
        //CheckIfMusicButtonIsSelected
        else if(this.mainMenuButtons[2].frameName === 'spr_MusicButtonSelected.png'){
            //IfMusicButtonIsSelectedThenUnselectTheMusicButtonAndSelectControlsButton
            this.mainMenuButtons[2].frameName = 'spr_MusicButton.png';
            this.mainMenuButtons[1].frameName = 'spr_ControlsButtonSelected.png';
        }
        //CheckIfControlsButtonIsSelected
        else if(this.mainMenuButtons[1].frameName === 'spr_ControlsButtonSelected.png'){
            //IfControlsButtonIsSelectedThenUnselectTheControlsButtonAndSelectStartButton
            this.mainMenuButtons[1].frameName = 'spr_ControlsButton.png';
            this.mainMenuButtons[0].frameName = 'spr_StartButtonSelected.png';
        }
    },

    //SelectedMenuButtonsWhenKeyboardPressed
    moveMenuSelectionDown: function(){
        //CheckNoButtonsAreCurrentlySelected
        if(this.mainMenuButtons[0].frameName==='spr_StartButton.png' && this.mainMenuButtons[1].frameName==='spr_ControlsButton.png'
            && this.mainMenuButtons[2].frameName==='spr_MusicButton.png' && this.mainMenuButtons[3].frameName==='spr_SFXButton.png'){
            //IfNoButtonsAreSelectedSetStartButtonAsSelected
            this.mainMenuButtons[0].frameName = 'spr_StartButtonSelected.png';
        }
        //CheckIfStartButtonIsSelected
        else if(this.mainMenuButtons[0].frameName === 'spr_StartButtonSelected.png'){
            //IfStartButtonIsSelectedThenUnselectTheStartButtonAndSelectControlsButton
            this.mainMenuButtons[0].frameName = 'spr_StartButton.png';
            this.mainMenuButtons[1].frameName = 'spr_ControlsButtonSelected.png';
        }
        //CheckIfControlsButtonIsSelected
        else if(this.mainMenuButtons[1].frameName === 'spr_ControlsButtonSelected.png'){
            //IfControlsButtonIsSelectedThenUnselectTheControlsButtonAndSelectMusicButton
            this.mainMenuButtons[1].frameName = 'spr_ControlsButton.png';
            this.mainMenuButtons[2].frameName = 'spr_MusicButtonSelected.png';
        }
        //CheckIfMusicButtonIsSelected
        else if(this.mainMenuButtons[2].frameName === 'spr_MusicButtonSelected.png'){
            //IfMusicButtonIsSelectedThenUnselectTheMusicButtonAndSelectSFXButton
            this.mainMenuButtons[2].frameName = 'spr_MusicButton.png';
            this.mainMenuButtons[3].frameName = 'spr_SFXButtonSelected.png';
        }
        //CheckIfSFXButtonIsSelected
        else if(this.mainMenuButtons[3].frameName === 'spr_SFXButtonSelected.png'){
            //IfSFXButtonIsSelectedThenUnselectTheSFXButtonAndSelectStartButton
            this.mainMenuButtons[3].frameName = 'spr_SFXButton.png';
            this.mainMenuButtons[0].frameName = 'spr_StartButtonSelected.png';
        }
    },

    //SlightlyMoveSelectedButtonDownToSimulateItAsSelected
    animateButtonSelection: function(){
        //CheckWhatButtonHasSelectedThenMoveThatButtonDown10PixelsToShowItAsSelected
        if(this.mainMenuButtons[0].frameName === 'spr_StartButtonSelected.png'){
            this.mainMenuButtons[0].y = 260;
            this.mainMenuButtons[1].y = 350;
            this.mainMenuButtons[2].y = 450;
            this.mainMenuButtons[3].y = 450;
        }
        else if(this.mainMenuButtons[1].frameName === 'spr_ControlsButtonSelected.png'){
            this.mainMenuButtons[1].y = 360;
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[2].y = 450;
            this.mainMenuButtons[3].y = 450;
        }
        else if(this.mainMenuButtons[2].frameName === 'spr_MusicButtonSelected.png'){
            this.mainMenuButtons[2].y = 460;
            this.mainMenuButtons[1].y = 350;
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[3].y = 450;


        }
        else if(this.mainMenuButtons[3].frameName === 'spr_SFXButtonSelected.png'){
            this.mainMenuButtons[3].y = 460;
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[1].y = 350;
            this.mainMenuButtons[2].y = 450;
        }
        //CheckIfTheMusicIsNotMutedAndTheMusicToggleButtonIsSelectedToMoveTheStatusIndicator
        if(this.musicStatusIndecator != null && this.mainMenuButtons[2].frameName === 'spr_MusicButtonSelected.png'){
            this.musicStatusIndecator.y = 430;
        }
        else{
            this.musicStatusIndecator.y = 420;
        }
        //CheckIfTheSFXIsNotMutedAndTheSFXToggleButtonIsSelectedToMoveTheStatusIndicator
        if(this.sfxStatusIndecator != null && this.mainMenuButtons[3].frameName === 'spr_SFXButtonSelected.png'){
            this.sfxStatusIndecator.y = 430;
        }
        else{
            this.sfxStatusIndecator.y = 420;
        }
    },

    //EnterKeyButtonSelection
    enterKeySelection: function(){
        //IfStartButtonSelectedAndEnterKeyPressedStartGame
        if(this.mainMenuButtons[0].frameName === 'spr_StartButtonSelected.png'){
            this.startSelected();
        }
        //IfControlsButtonSelectedAndEnterKeyPressedGoToControlsPage
        if(this.mainMenuButtons[1].frameName === 'spr_ControlsButtonSelected.png'){
            this.controlsPageSelected();
        }
        //IfMusicButtonSelectedAndEnterKeyPressedToggleMusic
        if(this.mainMenuButtons[2].frameName === 'spr_MusicButtonSelected.png'){
            this.toggleMusic();
        }
        //IfSFXtButtonSelectedAndEnterKeyPressedToggleSFX
        if(this.mainMenuButtons[3].frameName === 'spr_SFXButtonSelected.png'){
            this.toggleSFX();
        }
    }

};