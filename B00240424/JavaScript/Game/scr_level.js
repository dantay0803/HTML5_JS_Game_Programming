/**
 * Created by Dan on 31/10/2015.
 */

MyGame.StateD = function(){
    //MovementKeys
    this.up, this.down, this.left, this.right = null;
    //CreatePlayerObject
    this.obj_player, this.obj_playerLegs = null;
    //SetPlayerSpeed
    this.playerSpeed = 275;
    //HoldBullets
    this.bullets;

    this.fireRate = 0;

    //DefinePathFindingEngine
    this.easystar = null;


    //zombieGroup
    this.zombieGroup;

    this.tween;
};

MyGame.StateD.prototype = {

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
        //DefineTheKeysForPlayerMovements
        this.setUpInput();
        //SetCameraToFollowPlayer
        game.camera.follow(this.obj_player);
        //CreateBulletGroup
        this.createBulletGroup();
        //CreateZombies
        this.createZombieGroup();

        //GetTheFirstBulletInsatnceFromThePreCreatedGroup
        var zombie = this.zombieGroup.getFirstExists(false);
        if(zombie){
            //PlaceTheBulletAtThePlayerObject
            zombie.reset(this.obj_player.x, this.obj_player.y+128);
        }
    },

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
        //BulletsHitWalls
        game.physics.arcade.collide(this.bullets, this.Wall1, this.destroyBullets, null, this);
        game.physics.arcade.collide(this.bullets, this.Wall2, this.destroyBullets, null, this);
        //ZombieCollisionWithWalls
        game.physics.arcade.collide(this.zombieGroup, this.Wall1);
        game.physics.arcade.collide(this.zombieGroup, this.Wall2);
    },

    //AddImagesToStage
    addImages: function(){
        //AddMapToTheGame
        this.setUpMap();
        //AddPlayerImagesToGame
        this.setPlayerObjects();
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
        if(game.time.now > this.fireRate){
            console.log("pew");
            //GetTheFirstBulletInsatnceFromThePreCreatedGroup
            var bullet = this.bullets.getFirstExists(false);

            if(bullet){
                //PlaceTheBulletAtThePlayerObject
                bullet.reset(this.obj_player.x, this.obj_player.y);
                game.physics.arcade.moveToPointer(bullet, 800);
                this.fireRate = game.time.now + 200;
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
        //SetAnchorPoints
        this.zombieGroup.forEach(function(zombie){
                zombie.anchor.setTo(0.5, 0.5);
            }
        );
    },

    //MoveZombies
    zombieMovement: function(){
        //GetThePlayerObjectProperties
        var player = this.obj_player;
        //UpdateMovementForAllZombies
        this.zombieGroup.forEach(function(zombie){
            //IfTheZombieIsWithinA64x64BoxAroundThePlayerStopMoving
            if(zombie.x >= player.x - 64 && zombie.x <= player.x + 64 &&
               zombie.y >= player.y - 64 && zombie.y <= player.y + 64){
                game.physics.arcade.moveToXY(zombie, player.x, player.y, 0);
                console.log("stop");
            }
            else{
                //MoveZombieToPlayer
                game.physics.arcade.moveToXY(zombie, player.x, player.y, 270);
            }
        });
    },

    //ZombieFacePlayer
    rotateZombie: function(){
        //GetThePropertiesOfThePlayerObject
        var player = this.obj_player;
        //RotateZombiesToFacePlayer
        this.zombieGroup.forEach(function(zombie){
                zombie.rotation = game.physics.arcade.angleBetween(zombie, player);
        });
    },

    //ChangeCursor
    updateCursor: function(){
        //GetBodyOfPage
        var elementToChange = document.getElementsByTagName("body")[0];
        //HideCursor
        elementToChange.style.cursor = "url(./Assets/Crosshair_02.png), none";
    }
};