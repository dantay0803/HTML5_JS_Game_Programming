/**
 * Created by Dan on 31/10/2015.
 */

//UsedToIncreaseTheZombiesHealthForEverRoundThePlayerSurvives
var zombieHealthMultiplier = 1;

MyGame.StateD = function(){
    //MovementKeys
    this.up, this.down, this.left, this.right = null;
    //CreatePlayerObject
    this.obj_player, this.obj_playerLegs = null;
    //SetPlayerSpeed
    this.playerSpeed = 275;
    //HoldBullets
    this.bullets;
    //SetTheFireRateOfTheWeapons
    this.fireRate = 0;
    //0=pistol
    this.equipedWeapon = 0;
    //ZombieObjectsAndVariables
    //zombieGroup
    this.zombieGroup;
    //DefineGUIVariablesAndObjects
    //DefineHealth
    this.healthCount = 100;
    //DefineHealthTextAndSprite
    this.txt_health, this.spr_health;
    //DefineAmmoAmount
    this.ammoCount = 3000;
    //DefineAmmoCountTextAndSprite
    this.txt_ammoCount, this.spr_ammo;
    //DefineMoneyAmount
    this.moneyCount = 200;
    //DefineMoneyCountTextAndSprite
    this.txt_moneyCount, this.spr_money;
};

MyGame.StateD.prototype = {
    //InitilizeGame
    init: function(){
        //StartArcadePhysics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //SetGameBounds
        game.world.setBounds(0, 0, 5056, 3904);
        //ChangeTheCursorToACrosshairImage
        this.updateCursor();
    },

    //SetUpControlsState
    create: function(){
        //AddImagesToLevel
        this.addImages();
        //CreateZombies
        this.createZombieGroup();
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
        //CreateBulletGroup
        this.createBulletGroup();
        //SetUpGUI
        this.setUpGUI();
        //DefineTheKeysForPlayerMovements
        this.setUpInput();
        //SetCameraToFollowPlayer
        game.camera.follow(this.obj_player);
    },

    //updateGame
    update: function() {
        //CheckForInGameCollision
        this.collisionChecking();
        //MoveThePlayer
        this.movePlayerObject();
        //RotatePlayerObjectToFaceMouse
        this.rotatePlayerObject();
        //MoveZombies
        this.zombieMovement();
        //RotateZombieToFacePlayer
        this.rotateZombie();
    },

    //CheckForInGameCollision
    collisionChecking: function(){
        //CheckForCollisionWithMapObjects
        game.physics.arcade.collide(this.obj_player, this.Wall1);
        game.physics.arcade.collide(this.obj_player, this.Wall2);
        //CheckPlayerCollisionWithZombies
        game.physics.arcade.collide(this.obj_player, this.zombieGroup);
        //BulletsHitWalls
        game.physics.arcade.collide(this.bullets, this.Wall1, this.destroyBullets, null, this);
        game.physics.arcade.collide(this.bullets, this.Wall2, this.destroyBullets, null, this);
        //ZombieCollisionWithZombies
        game.physics.arcade.collide(this.zombieGroup);
        //ZombieCollisionWithWalls
        game.physics.arcade.collide(this.zombieGroup, this.Wall1);
        game.physics.arcade.collide(this.zombieGroup, this.Wall2);
        //ZombiesCollisionWithBullets
        game.physics.arcade.overlap(this.zombieGroup, this.bullets, this.zombieDamage, null, this);
    },

    //AddImagesToStage
    addImages: function(){
        //AddMapToTheGame
        this.setUpMap();
        //AddPlayerImagesToGame
        this.setPlayerObjects();
    },

    //SetUpGUI
    setUpGUI: function(){
        //AddHealthGUI
        //HealthImage
        this.spr_health = this.add.sprite(game.camera.width - 230, game.camera.height - 115, 'spr_game', 'spr_healthDisplay.png');
        //FixToCameraPosition
        this.spr_health.fixedToCamera = true;
        //IncreaseImageSize
        this.spr_health.scale.setTo(3, 3);
        //HealthText
        this.txt_health = game.add.text(game.camera.width - 155, game.camera.height - 87, this.healthCount, {fontSize: '35px', fill: '#ffffff'});
        //SetFont
        this.txt_health.font = 'VT323';
        //FixToCameraPosition
        this.txt_health.fixedToCamera = true;
        //AddAmmoGUI
        //AmmoImage
        this.spr_ammo = this.add.sprite(game.camera.width - 135, game.camera.height - 115, 'spr_game', 'spr_ammoDisplay.png');
        //FixToCameraPosition
        this.spr_ammo.fixedToCamera = true;
        //IncreaseImageSize
        this.spr_ammo.scale.setTo(3, 3);
        //AmmoText
        this.txt_ammoCount = game.add.text(game.camera.width - 60, game.camera.height - 87, this.ammoCount, {fontSize: '35px', fill: '#ffffff'});
        //SetFont
        this.txt_ammoCount.font = 'VT323';
        //FixToCameraPosition
        this.txt_ammoCount.fixedToCamera = true;
        //AddMoneyGUI
        //AddImage
        this.spr_money = this.add.sprite(game.camera.width - 200, game.camera.height - 50, 'spr_game', 'spr_moneyDisplay.png');
        //FixToCameraPosition
        this.spr_money.fixedToCamera = true;
        //IncreaseImageSize
        this.spr_money.scale.setTo(1.5, 1.5);
        //MoneyText
        this.txt_moneyCount = game.add.text(game.camera.width - 150, game.camera.height - 45, this.moneyCount, {fontSize: '35px', fill: '#ffffff'});
        //SetFont
        this.txt_moneyCount.font = 'VT323';
        //FixToCameraPosition
        this.txt_moneyCount.fixedToCamera = true;
    },

    //DefineMapObject
    setUpMap: function(){
        this.map = this.game.add.tilemap('map_Level1');
        //LoadTileSetUsedToCreateMap
        //FirstParamIsTheTilesetNameDefinedInTiledAndTheSecondNameIsTheSpritesheetKey
        this.map.addTilesetImage('MapTiles', 'MapTiles');
        //CreateMapLayer
        //LayerNameMustBeTheSameAsInTiled
        this.Floor = this.map.createLayer('Floor');
        this.Wall1 = this.map.createLayer('Wall1');
        this.Wall2 = this.map.createLayer('Wall2');
        //SetUpCollisionsOnMapWallLayers
        this.map.setCollisionBetween(0, 20, true, 'Wall1');
        this.map.setCollisionBetween(0, 20, true, 'Wall2');
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
        //CenterPlayerBody
        this.obj_player.anchor.setTo(0.5, 0.5);
        //EnablePhysicsOnPlayerBody
        this.physics.enable(this.obj_player, Phaser.Physics.ARCADE);
        this.obj_player.enableBody = true;
    },

    //PlayerShootGun
    playerShoot: function(){
        //AddShootingDelay
        if(game.time.now > this.fireRate && this.ammoCount > 0){
            //GetTheFirstBulletInsatnceFromThePreCreatedGroup
            var bullet = this.bullets.getFirstExists(false);
            if(bullet){
                //PlaceTheBulletAtThePlayerObject
                bullet.reset(this.obj_player.x, this.obj_player.y);
                game.physics.arcade.moveToPointer(bullet, 1000);
                this.fireRate = game.time.now + 200;
                //ReduceAmmoCount
                this.ammoCount--;
                //UpdateTheGUI
                this.txt_ammoCount.text = this.ammoCount;
            }
        }
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
        bullet.kill();
    },

    //DefineTheKeysForPlayerMovements
    setUpInput: function(){
        //AddWASDKeysToMovePlayer
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        //PlayerShooting
        game.input.onDown.add(this.playerShoot, this);
    },

    //MoveThePlayer
    movePlayerObject: function() {
        //SetPlayerVelocity
        this.obj_player.body.velocity.set(0);
        //MovePlayer
        if (this.up.isDown) {
            this.obj_player.body.velocity.y -= this.playerSpeed;
            //PlayMoveLeftAnimation
            this.obj_playerLegs.play('playerMoveLeft');
        }
        else if (this.down.isDown) {
            this.obj_player.body.velocity.y += this.playerSpeed;
            //PlayMoveRightAnimation
            this.obj_playerLegs.play('playerMoveRight');
        }
        if (this.left.isDown) {
            this.obj_player.body.velocity.x -= this.playerSpeed;
            //PlayMoveLeftAnimation
            this.obj_playerLegs.play('playerMoveLeft');
        }
        else if (this.right.isDown) {
            this.obj_player.body.velocity.x += this.playerSpeed;
            //PlayMoveRightAnimation
            this.obj_playerLegs.play('playerMoveRight');
        }
        //StopAnimationsWhenPlayerIsNotMoving
        if(this.up.isUp && this.down.isUp && this.left.isUp && this.right.isUp){
            this.obj_playerLegs.frameName = "Player__Legs_StandStill.png";
        }
        //SetThePositionOfThePlayerLegObjectToThePositionOfThePlayerBody
        this.obj_playerLegs.x = this.obj_player.x;
        this.obj_playerLegs.y = this.obj_player.y;
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
            //SetHealth
            zombie.hp = 100 * zombieHealthMultiplier;
            //CreateZombieAnimations
            //ZombieWalkAnimation
            zombie.animations.add('zombieWalk', ['Zombie_Walk_LeftStep_01.png', 'Zombie_Walk_LeftStep_02.png', 'Zombie_Walk_RightStep_01.png', 'Zombie_Walk_RightStep_02.png'], 5, true);
            //ZombieAttackAnimation
            zombie.animations.add('zombieAttack', ['Zombie_Attack_01.png', 'Zombie_Attack_02.png', 'Zombie_Attack_03.png', 'Zombie_Attack_04.png', 'Zombie_Attack_05.png', 'Zombie_Attack_06.png'], 5, false);
            //ZombieDeath
            zombie.animations.add('zombieDeath', ['Zombie_Death_01.png', 'Zombie_Death_02.png', 'Zombie_Death_03.png', 'Zombie_Death_04.png', 'Zombie_Death_05.png', 'Zombie_Death_06.png', 'Zombie_Death_07.png', 'Zombie_Death_08.png', 'Zombie_Death_09.png', 'Zombie_Death_10.png'], 10, false);
        });
    },

    //MoveZombies
    zombieMovement: function(){
        //GetThePlayerObjectProperties
        var player = this.obj_player;
        //UpdateMovementForAllZombies
        this.zombieGroup.forEach(function(zombie){
            //IfTheZombieIsWithinA64x64BoxAroundThePlayerStopMoving
            if(zombie.hp <= 0
                || zombie.x >= player.x - 64 && zombie.x <= player.x + 64 && zombie.y <= player.y + 64 && zombie.y >= player.y - 64){
                //StopZombieFromMoving
                zombie.body.velocity.x = 0;
                zombie.body.velocity.y = 0;
            }
            else {
                if(zombie.hp > 0){
                    //MoveZombieToPlayer
                    game.physics.arcade.moveToXY(zombie, player.x, player.y, 270);
                    zombie.play('zombieWalk');
                }
            }
        });
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
    zombieDamage: function(zombie, bullet){
        //ApplyBulletDamage
        switch(this.equipedWeapon) {
            //ApplyPistolDamage
            case 0:
                zombie.hp -= 20;
                break;
            //ApplyKar98KDamage
            case 1:
                zombie.hp -= 100;
                break;
            //ApplyTommyGunDamage
            case 2:
                zombie.hp -= 50;
                break;
            //ApplyShotgunDamage
            case 3:
                zombie.hp -= 300;
        }
        //CheckZombieHealthForDestroying
        if(zombie.hp <= 0){
            //PlayDeathAnimation
            zombie.play('zombieDeath');
            //KillObjectOnceDeathAnimationIsComplete
            zombie.animations.currentAnim.onComplete.addOnce(function(){
                zombie.kill();
            });
        }
        //BulletDestroy
        this.destroyBullets(bullet);
    }
};