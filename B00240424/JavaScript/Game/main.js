/**
 * Created by Dan on 30/09/2015.
 */
var game;

window.onload = function(){
    console.log(1);
    game = new Phaser.Game(896, 512, Phaser.AUTO, 'gameCanvas', {preload: preload, create: create, update: update});
};

function preload(){
    //Load background image
    game.load.image("bg", "./Images/Game/forest_001_1920x1080.png");
}

function create(){
    game.add.sprite(0, 0, "bg");
}

function update(){

}