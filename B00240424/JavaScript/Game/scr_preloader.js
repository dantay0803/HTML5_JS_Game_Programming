/**
 * Created by Dan on 30/09/2015.
 */
//GetUserDataFromDatabase
var databaseInfo = [];

MyGame.StateB = function (){

};

MyGame.StateB.prototype = {

    //LoadAssets
    preload: function(){
        //SetSFXFiles
        MyGame.buttonClick = game.add.audio('snd_buttonClick', 1, false);
        //SetMenuMusicFiles
        MyGame.music_menus = game.add.audio('music_mainMenu', 0.5, true);
        //SetMenuMusicFiles
        MyGame.music_combat1 = game.add.audio('music_game1', 0.01, true);
        MyGame.music_combat2 = game.add.audio('music_game2', 0.01, true);
        MyGame.music_combat3 = game.add.audio('music_game3', 0.01, true);
        MyGame.music_combat4 = game.add.audio('music_game4', 0.01, true);
        MyGame.music_combat5 = game.add.audio('music_game5', 0.01, true);
        MyGame.music_combat6 = game.add.audio('music_game6', 0.01, true);
        MyGame.music_noCombat1 = game.add.audio('snd_Ambience1', 0.1, true);
        MyGame.music_noCombat2 = game.add.audio('snd_Ambience2', 0.1, true);
        MyGame.music_noCombat3 = game.add.audio('snd_Ambience3', 0.1, true);
        //SetSFXFiles
        MyGame.purchaseGun = game.add.audio('snd_GunPurchase', 1, false);
        MyGame.shotAssaultRiffle = game.add.audio('snd_ShotAssaultRiffle', 2, false);
        MyGame.shotKAR98 = game.add.audio('snd_ShotKAR98', 2, false);
        MyGame.shotPistol = game.add.audio('snd_ShotPistol', 2, false);
        MyGame.shotShotgun = game.add.audio('snd_ShotShotgun', 2, false);
        MyGame.zombieHit1 = game.add.audio('snd_ZombieHit1', 1, false);
        MyGame.zombieHit2 = game.add.audio('snd_ZombieHit2', 1, false);
        MyGame.zombieHit3 = game.add.audio('snd_ZombieHit3', 1, false);
        MyGame.zombieHit4 = game.add.audio('snd_ZombieHit4', 1, false);
    },

    create: function(){
        //AddLoadingScreenToScene
        var background = this.add.sprite(0, 0, 'spr_game', 'spr_loading.png');
    },

    update: function(){
        //LoadMenuAfterAssetsAreLoaded
        if(this.cache.isSoundDecoded('snd_ZombieHit4')){
            console.log(1);
            this.state.start('mainMenu');
        }
        else{
            console.log(0);
        }
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