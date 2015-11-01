/**
 * Created by Dan on 31/10/2015.
 */

MyGame.StateD = function(){

};

MyGame.StateD.prototype = {

    //SetUpControlsState
    create: function(){
        //AddImagesToLevel
        this.addImages();
    },

    update: function(){

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
    }

};