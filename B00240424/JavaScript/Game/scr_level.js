/**
 * Created by Dan on 31/10/2015.
 */
//SetDamageOfGuns
const DAMAGE_PISTOL = 20, DAMAGE_KAR98 = 100, DAMAGE_THOMPSON = 50, DAMAGE_SHOTGUN = 300;
//SetPriceOfWeapons
const COST_PISTOL = 100, COST_KAR98 = 200, COST_THOMPSON = 300, COST_SHOTGUN = 400;
//SetWeaponFireDelay
const FIRERATE_PSITOL = 200, FIRERATE_KAR98 = 300, FIRERATE_THOMPSON = 100, FIRERATE_SHOTGUN = 300;
//SetWeaponAmmoAmount
const CLIPSIZE_PISTOL = 30, CLIPSIZE_KAR98 = 30, CLIPSIZE_THOMPSON = 30, CLIPSIZE_SHOTGUN = 30;
//SetTheMoneyAmountForHittingAndKillingZombie
const MONEY_ZOMBIEHIT = 10, MONEY_ZOMBIEKILL = 60;
//SetSpeedOfObjects
const SPEED_BULLET = 750, SPEED_PLAYER = 275, SPEED_ZOMBIE = 270;

//0=moneyDisplay, 1=healthDisplay, 2=ammoDisplay, 3=weaponPurchaseInfo
var GUIElements = [[null, null], [null, null], [null, null], [null, null]];
//SetTheDelayBetweenShots
var fireRateDelay = FIRERATE_PSITOL, currentFireRateDelay = 0;
//SetBulletDamage;
var bulletDamage = DAMAGE_PISTOL;
//InGamePlayerMoney
var playerMoney = 20000;
//DefineAmmoAmount
var playerAmmo = CLIPSIZE_PISTOL;
//UsedToIncreaseTheZombiesHealthForEverRoundThePlayerSurvives
var zombieHealthMultiplier = 1;
//SetZombieDamage
var  zombieDamage = 10;

MyGame.StateD = function(){
    //MovementKeys
    this.up, this.down, this.left, this.right, this.purchaseKey = null;
    //CreatePlayerObject
    this.obj_player, this.obj_playerLegs = null;
    //HoldBullets
    this.bullets = null;
    //zombieGroup
    this.zombieGroup = null;
    //ParticleEmitters
    this.bloodSplatter, this.shellCasings = null;

    this.avalibleWeapons = [];
};

MyGame.StateD.prototype = {
    //InitializeGame
    init: function(){
        //StartArcadePhysics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //SetGameBounds
        game.world.setBounds(-10, -10, 5066, 3914);
        //ChangeTheCursorToACrosshairImage
        this.updateCursor();
    },

    //SetUpControlsState
    create: function(){
        //AddMapToTheGame
        this.setUpMap();
        //AddWeaponPurchaseObjects
        this.addWeaponPurchaseObjectsToLevel();
        //CreateBloodParticles
        this.setupBloodParticles();
        //CreateShellCasingParticles
        this.setupShellCasingParticles();
        //CreateSmokeParticles
        this.setupSmokeParticles();
        //AddPlayerImagesToGame
        this.setPlayerObjects();
        //CreateZombies
        this.createZombieGroup();
        //CreateBulletGroup
        this.createBulletGroup();
        //AddLightEffectSprite
        this.setUpLightEffect();
        //SetUpGUI
        this.setUpGUI();
        //DefineTheKeysForPlayerMovements
        this.setUpInput();
        //SetCameraToFollowPlayer
        game.camera.follow(this.obj_player);
        //GetTheFirstBulletInstanceFromThePreCreatedGroup
        var zombie = this.zombieGroup.getFirstExists(false);
        if(zombie){
            //PlaceTheBulletAtThePlayerObject
            zombie.reset(this.obj_player.x, this.obj_player.y+128);
        }
        var zombie2 = this.zombieGroup.getFirstExists(false);
        if(zombie2){
            //PlaceTheBulletAtThePlayerObject
            zombie2.reset(this.obj_player.x+100, this.obj_player.y+128);
        }
    },

    //updateGame
    update: function() {
        //LightEffectToFollowPlayer
        this.lightEffectFollow();
        //CheckForInGameCollision
        this.collisionChecking();
        //MoveThePlayer
        this.movePlayerObject();
        //PlayerStoodOnTopOfGuns
        this.playerCollideWithGunIcon();
        //RotatePlayerObjectToFaceMouse
        this.rotatePlayerObject();
        //ZombieMovementAndPlayerAttacking
        this.zombieActions();
        //RotateZombieToFacePlayer
        this.rotateZombie();
    },

    //AddWeaponPurchaseObjectsToLevel
    addWeaponPurchaseObjectsToLevel: function(){
        //Pistol
        this.avalibleWeapons[0] = this.add.sprite(2176, 3776, 'spr_game', 'spr_pistolOutline.png');
        //KAR98
        this.avalibleWeapons[1] = this.add.sprite(3712, 3200, 'spr_game', 'spr_shotgunOutline.png');
        //Thompson
        this.avalibleWeapons[2] = this.add.sprite(448, 320, 'spr_game', 'spr_rifleOutline.png');
        //Shotgun
        this.avalibleWeapons[3] = this.add.sprite(1024, 64, 'spr_game', 'spr_shotgunOutline.png');
    },

    //PlayerStoodOnTopOfGuns
    playerCollideWithGunIcon: function(){
        //HoldWeaponValuesWhenPlayerIsStandingOnThem
        var weaponCost, weaponKey;
        //Pistol
        if((this.obj_player.x >= this.avalibleWeapons[0].x && this.obj_player.x <= this.avalibleWeapons[0].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[0].y && this.obj_player.y <= this.avalibleWeapons[0].y+64)){
            GUIElements[3][1].text = "M1911 \nPress Space to purchase, Cost: " + COST_PISTOL;
            //SetWeaponValuesWhenOnTopOfIcon
            weaponCost = COST_PISTOL;
            weaponKey = 0;
        }
        //KAR98
        else if((this.obj_player.x >= this.avalibleWeapons[1].x && this.obj_player.x <= this.avalibleWeapons[1].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[1].y && this.obj_player.y <= this.avalibleWeapons[1].y+64)){
            GUIElements[3][1].text = "KARK98 \nPress Space to purchase, Cost: " + COST_KAR98;
            //SetWeaponValuesWhenOnTopOfIcon
            weaponCost = COST_KAR98;
            weaponKey = 1;
        }
        //Thompson
        else if((this.obj_player.x >= this.avalibleWeapons[2].x && this.obj_player.x <= this.avalibleWeapons[2].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[2].y && this.obj_player.y <= this.avalibleWeapons[2].y+64)){
            GUIElements[3][1].text = "Thompson \nPress Space to purchase, Cost: " + COST_THOMPSON;
            //SetWeaponValuesWhenOnTopOfIcon
            weaponCost = COST_THOMPSON;
            weaponKey = 2;
        }
        //Shotgun
        else if((this.obj_player.x >= this.avalibleWeapons[3].x && this.obj_player.x <= this.avalibleWeapons[3].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[3].y && this.obj_player.y <= this.avalibleWeapons[3].y+64)){
            GUIElements[3][1].text = "Shotgun \nPress Space to purchase, Cost: " + COST_SHOTGUN;
            //SetWeaponValuesWhenOnTopOfIcon
            weaponCost = COST_SHOTGUN;
            weaponKey = 3;
        }
        //NotOnTopOfAnyGunIcons
        else{
            GUIElements[3][1].text = "";
        }
        //CheckForSpacebarPressAndCheckPlayerMoneyToBuyNewGunOrAmmo
        if(this.purchaseKey.isDown && playerMoney >= weaponCost){
            this.gunPurchased(weaponKey);
            //UpdateGUI
            GUIElements[0][1].text = playerMoney;
        }
    },

    //PlayerPurchaseGun
    gunPurchased: function(gunIcon){
        switch(gunIcon){
            //PurchasedPistol
            case 0:
                bulletDamage = DAMAGE_PISTOL;
                fireRateDelay = FIRERATE_PSITOL;
                playerMoney -= COST_PISTOL;
                playerAmmo = CLIPSIZE_PISTOL;
                console.log("pistol bought");
                break;
            //PurchasedKAR98
            case 1:
                bulletDamage = DAMAGE_KAR98;
                fireRateDelay = FIRERATE_KAR98;
                playerMoney -= COST_KAR98;
                playerAmmo = CLIPSIZE_KAR98;
                console.log("KARK bought");
                break;
            //PurchasedThompson
            case 2:
                bulletDamage = DAMAGE_THOMPSON;
                fireRateDelay = FIRERATE_THOMPSON;
                playerMoney -= COST_THOMPSON;
                playerAmmo = CLIPSIZE_THOMPSON;
                console.log("Thompson bought");
                break;
            //PurchasedShotGun
            case 3:
                bulletDamage = DAMAGE_SHOTGUN;
                fireRateDelay = FIRERATE_SHOTGUN;
                playerMoney -= COST_SHOTGUN;
                playerAmmo = CLIPSIZE_SHOTGUN;
                console.log("Shotgun bought");
                break;
        }
        GUIElements[2][1].text = playerAmmo;
    },

    //CheckForInGameCollision
    collisionChecking: function(){
        //CheckForCollisionWithMapObjects
        game.physics.arcade.collide(this.obj_player, this.Wall1);
        game.physics.arcade.collide(this.obj_player, this.Wall2);
        game.physics.arcade.collide(this.obj_player, this.Debris);
        //CheckPlayerCollisionWithZombies
        game.physics.arcade.collide(this.obj_player, this.zombieGroup);
        game.physics.arcade.collide(this.zombieGroup, this.obj_player);
        //ZombieCollisionWithZombies
        game.physics.arcade.collide(this.zombieGroup);
        //ZombieCollisionWithWalls
        game.physics.arcade.collide(this.zombieGroup, this.Wall1);
        game.physics.arcade.collide(this.zombieGroup, this.Wall2);
        game.physics.arcade.collide(this.zombieGroup, this.Debris);
        //ZombiesCollisionWithBullets
        game.physics.arcade.overlap(this.zombieGroup, this.bullets, this.damageZombie, null, this);
        //BulletsHitWalls
        game.physics.arcade.collide(this.bullets, this.Wall1, this.destroyBullets, null, this);
        game.physics.arcade.collide(this.bullets, this.Wall2, this.destroyBullets, null, this);
        game.physics.arcade.collide(this.bullets, this.Debris, this.destroyBullets, null, this);
        //SetCollisionWithShellCasingAndWall
        game.physics.arcade.collide(this.shellCasings, this.Wall1);
        game.physics.arcade.collide(this.shellCasings, this.Wall2);
    },

    //Particles
    setupBloodParticles: function(){
        //CreateParticleSystem
        this.bloodSplatter = this.add.emitter(0, 0, 150);
        //SetParticleSprite
        this.bloodSplatter.makeParticles('spr_game', 'spr_bloodSplatter.png');
        //DisableGravity
        this.bloodSplatter.gravity = 0;
        //DisableRotation
        this.bloodSplatter.setRotation();
        //SetTheSpeedOfTheParticles
        this.bloodSplatter.setXSpeed(0, 0);
        this.bloodSplatter.setYSpeed(0, 0);
        //AddScaleAnimationToMakeParticleSmallerAndAppearToSoakIntoGround
        this.bloodSplatter.setScale(1, 0, 1, 0, 5000, "Linear");
    },

    //SpawnInBloodSplatterParticles
    spawnBloodSplatterParticle: function(objectPosition){
        //SetThePositionOfTheParticles
        //XPosition
        if(this.obj_player.x < objectPosition.x){
            this.bloodSplatter.x = objectPosition.x + 32;
        }
        else if(this.obj_player.x > objectPosition.x){
            this.bloodSplatter.x = objectPosition.x - 32;
        }
        //YPosition
        if(this.obj_player.y < objectPosition.y){
            this.bloodSplatter.y = objectPosition.y+32;
        }
        else if(this.obj_player.y > objectPosition.y){
            this.bloodSplatter.y = objectPosition.y-32;
        }
        for(var i=0; i<5; i++){
            this.bloodSplatter.x += game.rnd.integerInRange(-10, 10);
            this.bloodSplatter.y += game.rnd.integerInRange(-5, 5);
            //EmnitParticle
            this.bloodSplatter.start(true, 3000, null, 1);
        }
    },

    //CreateShellCasingParticles
    setupShellCasingParticles: function(){
        //CreateEmitter
        this.shellCasings = this.add.emitter(0,0,256);
        //SetParticleSprite
        this.shellCasings.makeParticles('spr_game', 'spr_shellCasing.png');
        //DisableGravity
        this.shellCasings.gravity = 0;
        //SetTheRotationOfTheBullet
        this.shellCasings.setRotation(1, 360);
        //SetTheSpeedOfTheBullet
        this.shellCasings.setXSpeed(-100, 100);
        this.shellCasings.setYSpeed(-100, 100);
        this.shellCasings.angularDrag = 50;
    },

    //SpawnShellCasingParticlesInGamed
    spawnShellCasingParticle: function(){
        //SetPositionOfParticles
        this.shellCasings.position = this.obj_player.position;
        //EmitParticles
        this.shellCasings.start(true, 1000, null, 1);
    },

    //CreateSmokeParticles
    setupSmokeParticles: function(){
        //CreateEmitter
        this.smoke = this.add.emitter(0,0,256);
        //SetParticleSprite
        this.smoke.makeParticles('spr_game', 'spr_smoke1.png');
        //AddAnimation
        this.smoke.forEach(function(smoke){
            smoke.animations.add('anim_smoke', ['spr_smoke1.png', 'spr_smoke2.png', 'spr_smoke3.png', 'spr_smoke4.png', 'spr_smoke5.png'], 5, false);
        });
        //DisableGravity
        this.smoke.gravity = 0;
        //DisableRotation
        this.smoke.setRotation();
        //DisableMovement
        this.smoke.setXSpeed(0, 0);
        this.smoke.setYSpeed(0, 0);
    },

    //SpawnSmokeParticleInGame
    spawnSmokeParticle: function(bullet){
        //SetPositionOfParticles
        this.smoke.x = bullet.x;
        this.smoke.y = bullet.y
        //EmitParticles
        this.smoke.start(true, 1000, null, 1);
        //PlayAnimationForAllParticlesThatExists
        this.smoke.forEachExists(function(smoke) {
            //CheckIfAnimationIsNotPlaying
            if (!smoke.animations.isPlaying){
                //IfNotPlayAnimation
                smoke.animations.play('anim_smoke');
            }
        });
    },

    //AddAnOverlayOnTheScreenThatGivesTheIllusionOfLightComingFromThePlayer
    setUpLightEffect: function(){
        this.light = game.add.image(this.obj_player.x, this.obj_player.y, 'spr_game', 'spr_light.png');
        this.light.anchor.setTo(0.5, 0.5);
    },

    //LightEffectToFollowPlayer
    lightEffectFollow: function(){
        if(this.obj_player.x < game.world.width - (70*5) && this.obj_player.x > 64 * 5){
            this.light.x = this.obj_player.x;
        }
        if(this.obj_player.y < game.world.height - (64*5) && this.obj_player.y > 64 * 3){
            this.light.y = this.obj_player.y;
        }
    },

    //SetUpGUI
    setUpGUI: function(){
        //AddGUIImages
        //MoneyImage
        GUIElements[0][0] = this.add.sprite(game.camera.x + 5, game.camera.height - 50, 'spr_game', 'spr_moneyDisplay.png');
        //HealthImage
        GUIElements[1][0] = this.add.sprite(game.camera.width - 75, game.camera.height - 115, 'spr_game', 'spr_healthDisplay.png');
        //AmmoImage
        GUIElements[2][0] = this.add.sprite(game.camera.width - 75, game.camera.height - 70, 'spr_game', 'spr_ammoDisplay.png');
        //SetScaleOfGUISpritesAndFixThemToTheCamera
        for(var i=0; i<GUIElements.length-1; i++){
            GUIElements[i][0].fixedToCamera = true;
            GUIElements[i][0].scale.setTo(3, 3);
        }
        //ManuallySetGUIMoneySpriteSize
        GUIElements[0][0].scale.setTo(1.5, 1.5);
        //AddGUIText
        //MoneyText
        GUIElements[0][1] = game.add.text(game.camera.x + 60, game.camera.height - 47.5, playerMoney, {fontSize: '35px', fill: '#ffffff'});
        //HealthText
        GUIElements[1][1] = game.add.text(game.camera.width - 95, game.camera.height - 87, this.obj_player.hp, {fontSize: '35px', fill: '#ffffff'});
        //AmmoText
        GUIElements[2][1] = game.add.text(game.camera.width - 95, game.camera.height - 40, playerAmmo, {fontSize: '35px', fill: '#ffffff'});
        //GunInfo
        GUIElements[3][1] = game.add.text(game.camera.width/2, game.camera.height/2+40, "", {fontSize: '35px', fill: '#ffffff'});
        GUIElements[3][1].anchor.setTo(0.5, 0.5);
        //SetGUITextProperties
        for(var i=0; i<GUIElements.length; i++){
            //SetFont
            GUIElements[i][1].font = 'VT323';
            //FixToCameraPosition
            GUIElements[i][1].fixedToCamera = true;
        }
    },

    //DefineMapObject
    setUpMap: function(){
        this.map = this.game.add.tilemap('map_Level1');
        //LoadTileSetUsedToCreateMap
        //FirstParamIsTheTilesetNameDefinedInTiledAndTheSecondNameIsTheSpritesheetKey
        this.map.addTilesetImage('MapTiles', 'MapTiles');
        this.map.addTilesetImage('MapTiles2', 'MapTiles2');
<<<<<<< HEAD
=======
        this.map.addTilesetImage('gunPurchaseTiles', 'gunPurchaseTiles');
>>>>>>> origin/master
        //CreateMapLayer
        //LayerNameMustBeTheSameAsInTiled
        this.Floor = this.map.createLayer('Floor');
        this.Wall1 = this.map.createLayer('Wall1');
        this.Wall2 = this.map.createLayer('Wall2');
        this.Debris = this.map.createLayer('Debris');
        this.DebrisDetails = this.map.createLayer('DebrisDetail');
<<<<<<< HEAD
=======
        //this.icons = this.map.createLayer('gunPurchaseIcons');
>>>>>>> origin/master
        //SetUpCollisionsOnMapWallLayers
        this.map.setCollisionBetween(0, 20, true, 'Wall1');
        this.map.setCollisionBetween(0, 20, true, 'Wall2');
        this.map.setCollisionBetween(1, 34, true, 'Debris');
    },

    //SetUpPlayer
    setPlayerObjects: function(){
        //AddPlayerLegs
        this.obj_playerLegs = this.add.sprite(1730, 3450, 'spr_game', 'Player__Legs_StandStill.png');
        //CreateMoveLeftAnimationForPlayerLegs
        this.obj_playerLegs.animations.add('playerMoveLeft', ['Player__Legs_StepLeft_01.png', 'Player__Legs_StepLeft_02.png'], 5, true);
        //CreateMoveRightAnimationForPlayerLegs
        this.obj_playerLegs.animations.add('playerMoveRight', ['Player__Legs_StepRight_01.png', 'Player__Legs_StepRight_02.png'], 5, true);
        //CenterPlayerLegs
        this.obj_playerLegs.anchor.setTo(0.5, 0.5);
        //AddPlayerSprite
        this.obj_player = this.add.sprite(1730, 3450, 'spr_game', 'Pistol_Stand.png');
        //CreateDeathAnimation
        this.obj_player.animations.add('playerDeath', ['Player_Death_01.png', 'Player_Death_02.png', 'Player_Death_03.png', 'Player_Death_04.png', 'Player_Death_05.png', 'Player_Death_06.png','Player_Death_07.png', 'Player_Death_08.png', 'Player_Death_09.png', 'Player_Death_10.png', 'Player_Death_11.png',], 5, false);
        //CenterPlayerBody
        this.obj_player.anchor.setTo(0.5, 0.5);
        //EnablePhysicsOnPlayerBody
        this.physics.enable(this.obj_player, Phaser.Physics.ARCADE);
        this.obj_player.enableBody = true;
        //SetPlayerAsImmovableSoZombiesCannotPushItAround
        this.obj_player.body.immovable = true;
        //SetPlayerHealth
        this.obj_player.hp = 100;
        //ApplyDamageToPlayer
        this.obj_player.applyDamage = function(){
            //ReduceHealth
<<<<<<< HEAD
            this.hp -= zombieDamage;
            //UpdateTheGUI
            GUIElements[1][1].text = this.hp;
=======
            this.hp -= 10;
>>>>>>> origin/master
            //GameOver
            if(this.hp <= 0){
                //PlayerBloodEffect
                this.bloodEffect();
                //ShowGameOverText
                var txt_gameOver = game.add.text(game.camera.x + (game.camera.width / 2), game.camera.y + (game.camera.height / 2), "Game Over!", {fontSize: '72px', fill: '#ffffff'});
                //CenterText
                txt_gameOver.anchor.setTo(0.5, 0.5);
                //SetTextFont
                txt_gameOver.font = 'VT323';
                //playDeathAnimation
                this.animations.play('playerDeath');
                this.animations.currentAnim.onComplete.addOnce(this.goToUpGrades, this);
            }
        };
        //BloodSplatterEffect
        this.obj_player.bloodEffect = function(){
            //CreateParticleSystem
            var blood = game.add.emitter(this.x, this.y, 1);
            //SetParticleSprite
            blood.makeParticles('spr_game', 'spr_bloodSplatter.png');
            //DisableGravity
            blood.gravity = 0;
            //DisableRotation
            blood.setRotation();
            //SetTheSpeedOfTheParticles
            blood.setXSpeed(0, 0);
            blood.setYSpeed(0, 0);
            //AddScaleAnimation
            blood.setScale(1, 5, 1, 5, 5000, "Linear");
            //EmnitParticle
            blood.start(true, 3000, null, 1);
<<<<<<< HEAD
        };
=======
        },
>>>>>>> origin/master
        //ChangeToUpgradeLevel
        this.obj_player.goToUpGrades = function(){
            //ChangeToUpgradesLevel
            game.state.start('upgrades');
        };
<<<<<<< HEAD
=======

>>>>>>> origin/master
    },

    //PlayerShootGun
    playerShoot: function(){
        //AddShootingDelay
        if(game.time.now > currentFireRateDelay && playerAmmo > 0){
            //GetTheFirstBulletInsatnceFromThePreCreatedGroup
            var bullet = this.bullets.getFirstExists(false);
            if(bullet){
                //ApplyScreenShakeWhenShooting
                game.time.events.repeat(10, 5, this.screenShake, this);
                //SpawnShellCasingParticle
                this.spawnShellCasingParticle();
                //PlaceTheBulletAtThePlayerObject
                bullet.reset(this.obj_player.x, this.obj_player.y);
                game.physics.arcade.moveToPointer(bullet, SPEED_BULLET);
                currentFireRateDelay = game.time.now + fireRateDelay;
                //ReduceAmmoCount
                playerAmmo--;
                //UpdateTheGUI
                GUIElements[2][1].text = playerAmmo;
            }
        }
    },

    //ScreenShakeEffect
    screenShake: function(){
        game.camera.x += game.rnd.integerInRange(-10, 10);
        game.camera.y += game.rnd.integerInRange(-10, 10);
    },

    //CreateBulletGroup
    createBulletGroup: function(){
        //CreateGroup
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        //EnablePhysics
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        //PreCreateAGroupOfBulletsToUse
        this.bullets.createMultiple(75, 'spr_game', 'spr_bullet.png');
        //SetAnchorPoints
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        //CheckIfBulletGoesOutOfBoundsAndDestroyThem
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
    },

    //DestroyBulletOnCollisionWithWall
    destroyBullets: function(bullet){
        this.spawnSmokeParticle(bullet);
        bullet.kill()
    },

    //DefineTheKeysForPlayerMovements
    setUpInput: function(){
        //AddWASDKeysToMovePlayer
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.purchaseKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //PlayerShooting
        game.input.onDown.add(this.playerShoot, this);
    },

    //MoveThePlayer
    movePlayerObject: function() {
        //SetPlayerVelocity
        this.obj_player.body.velocity.set(0);
        //MovePlayer
        if (this.up.isDown) {
            this.obj_player.body.velocity.y -= SPEED_PLAYER;
            //PlayMoveLeftAnimation
            this.obj_playerLegs.play('playerMoveLeft');
        }
        else if (this.down.isDown) {
            this.obj_player.body.velocity.y += SPEED_PLAYER;
            //PlayMoveRightAnimation
            this.obj_playerLegs.play('playerMoveRight');
        }
        if (this.left.isDown) {
            this.obj_player.body.velocity.x -= SPEED_PLAYER;
            //PlayMoveLeftAnimation
            this.obj_playerLegs.play('playerMoveLeft');
        }
        else if (this.right.isDown) {
            this.obj_player.body.velocity.x += SPEED_PLAYER;
            //PlayMoveRightAnimation
            this.obj_playerLegs.play('playerMoveRight');
        }
        //StopAnimationsWhenPlayerIsNotMoving
        if(this.up.isUp && this.down.isUp && this.left.isUp && this.right.isUp){
            this.obj_playerLegs.frameName = "Player__Legs_StandStill.png";
        }
        //SetThePositionOfThePlayerLegObjectToThePositionOfThePlayerBody
        this.obj_playerLegs.position = this.obj_player.position;
    },

    //RotatePlayerObjectsToFaceMouse
    rotatePlayerObject: function(){
        this.obj_player.rotation = game.physics.arcade.angleToPointer(this.obj_player);
        this.obj_playerLegs.rotation = game.physics.arcade.angleToPointer(this.obj_playerLegs);
    },

    //CreateZombieObjects
    createZombieGroup: function(){
        //CreateGroup
        this.zombieGroup = game.add.group();
        //EnableBodyProperties
        this.zombieGroup.enableBody = true;
        //EnablePhysics
        this.zombieGroup.physicsBodyType = Phaser.Physics.ARCADE;
        //PreCreateZombies
        this.zombieGroup.createMultiple(100, 'spr_game', 'Zombie_Stand.png');
        //AddPropertiesToEachZombieInTheGroup
        this.zombieGroup.forEach(function(zombie){
            //SetAnchorPoints
            zombie.anchor.setTo(0.5, 0.5);
            //SetBaseHealth
            zombie.hp = 100;
            //DelayToStopZombiesAttackingTooFast
            zombie.zombieAttackDelay = 5000;
            zombie.zombieAttackTimer = game.time.now + zombie.zombieAttackDelay;
            //CreateZombieAnimations
            //ZombieWalkAnimation
            zombie.animations.add('zombieWalk', ['Zombie_Walk_LeftStep_01.png', 'Zombie_Walk_LeftStep_02.png', 'Zombie_Walk_RightStep_01.png', 'Zombie_Walk_RightStep_02.png'], 5, true);
            //ZombieAttackAnimation
            zombie.animations.add('zombieAttack', ['Zombie_Attack_01.png', 'Zombie_Attack_02.png', 'Zombie_Attack_03.png', 'Zombie_Attack_04.png', 'Zombie_Attack_05.png', 'Zombie_Attack_06.png'], 5, false);
            //ZombieDeath
            zombie.animations.add('zombieDeath', ['Zombie_Death_01.png', 'Zombie_Death_02.png', 'Zombie_Death_03.png', 'Zombie_Death_04.png', 'Zombie_Death_05.png', 'Zombie_Death_06.png', 'Zombie_Death_07.png', 'Zombie_Death_08.png', 'Zombie_Death_09.png', 'Zombie_Death_10.png'], 10, false);
        });
    },

    //ZombieMovementAndAttack
    zombieActions: function(){
        //GetThePlayerObjectProperties
        var player = this.obj_player;
        //UpdateMovementForAllZombies
        this.zombieGroup.forEach(function(zombie){
            //IfTheZombieIsWithinA64x64BoxAroundThePlayerStopMoving
            if(zombie.hp <= 0 || zombie.x >= player.x - 70 && zombie.x <= player.x + 70 && zombie.y <= player.y + 70 && zombie.y >= player.y - 70){
                //StopZombieFromMoving
                zombie.body.velocity.x = 0;
                zombie.body.velocity.y = 0;
                //ZombieAttackPlayerWhenTheAttackDelayIsSmallerThanTheCurrentTime
                if(game.time.now > zombie.zombieAttackTimer && zombie.hp > 0) {
                    //PlayAttackAnimation
                    zombie.play('zombieAttack');
                    //DamagePlayerFunction
                    zombie.animations.currentAnim.onComplete.addOnce(function(){
                        //CheckPlayerIsStillInRange
                        if(zombie.x >= player.x - 80 && zombie.x <= player.x + 80 && zombie.y <= player.y + 80 && zombie.y >= player.y - 80){
                            //SetZombieToIdleAnimationAfterAttack
                            zombie.frameName = "Zombie_Stand.png";
                            //IfTrueApplyDamage
                            player.applyDamage();
                        }
                    });
                    //IncreaseTheValueOfTheZombieAttackDelay
                    zombie.zombieAttackTimer = game.time.now + zombie.zombieAttackDelay;
                }
            }
            else if(zombie.hp > 0 && (zombie.x < player.x - 70 || zombie.x > player.x + 70 || zombie.y < player.y - 70 || zombie.y > player.y + 70)){
                //MoveZombieToPlayer
                game.physics.arcade.moveToXY(zombie, player.x, player.y, SPEED_ZOMBIE);
                zombie.play('zombieWalk');
            }
        });
<<<<<<< HEAD
=======
            //UpdateTheGUI
            this.txt_health.text = this.obj_player.hp;
>>>>>>> origin/master
    },

    //ZombieFacePlayer
    rotateZombie: function(){
        //GetThePropertiesOfThePlayerObject
        var player = this.obj_player;
        //RotateZombiesToFacePlayer
        this.zombieGroup.forEach(function(zombie){
            //OnlyRotateWhenZombieIsAlive
            if(zombie.hp > 0){
                zombie.rotation = game.physics.arcade.angleBetween(zombie, player);
            }
        });
    },

    //ChangeCursor
    updateCursor: function(){
        //GetBodyOfPage
        var elementToChange = document.getElementsByTagName("body")[0];
        //HideCursor
        elementToChange.style.cursor = "url(./Assets/Crosshair_02.png), none";
    },

    //ApplyDamageToZombies
    damageZombie: function(zombie, bullet){
        //BulletDestroy
        bullet.kill();
        //PlayBloodSplatterAnimation
        this.spawnBloodSplatterParticle(zombie);
        //AddMoneyForDamagingAZombie
        playerMoney += MONEY_ZOMBIEHIT;
        //ApplyDamage
        zombie.hp -= bulletDamage;
        //CheckZombieHealthForDestroying
        if(zombie.hp <= 0){
            //AddMoneyForKillingAZombie
            playerMoney += MONEY_ZOMBIEKILL;
            //PlayDeathAnimation
            zombie.play('zombieDeath');
            //KillObjectOnceDeathAnimationIsComplete
            zombie.animations.currentAnim.onComplete.addOnce(function(){
                zombie.kill();
            });
        }
        //UpdateGUI
        GUIElements[0][1].text = playerMoney;
    }
};