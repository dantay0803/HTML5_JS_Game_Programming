/**
 * Created by Dan on 31/10/2015.
 */

MyGame.StateD = function(){
    //MovementKeys
    this.up, this.down, this.left, this.right = null;
};

MyGame.StateD.prototype = {

    //SetUpControlsState
    create: function(){
        //AddImagesToLevel
        this.addImages();
        //SetGameBounds
        game.world.setBounds(0, 0, 4928, 3840);
        //DefineTheKeysForPlayerMovements
        this.setUpInput();
    },

    update: function(){
        //MoveThePlayer
        this.movePlayerObject();
    },

    //AddImagesToStage
    addImages: function(){
        //AddMapToTheGame
        this.map = this.game.add.tilemap('level1');
        //LoadTileSetUsedToCreateMap
        //FirstParamIsTheTilesetNameDefinedInTiledAndTheSecondNameIsTheSpritesheetKey
        this.map.addTilesetImage('MapTiles', 'spr_tiles');
        //CreateMapLayer
        //LayerNameMustBeTheSameAsInTiled
        this.Floor = this.map.createLayer('Floor');
        this.Wall = this.map.createLayer('Wall');
        this.Wall2 = this.map.createLayer('Wall2');
    },

    //DefineTheKeysForPlayerMovements
    setUpInput: function(){
        //AddWASDKeysToMovePlayer
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    },

    //MoveThePlayer
    movePlayerObject: function() {
        if (this.up.isDown) {
            game.camera.y -= 8;
        }
        else if (this.down.isDown) {
            game.camera.y += 8;
        }
        if (this.left.isDown) {
            game.camera.x -= 8;
        }
        else if (this.right.isDown) {
            game.camera.x += 8;
        }
    },


};