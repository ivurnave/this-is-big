// Decalre the play state
var play = function (game) {};

// Global variables for play state
var p1, p2, bounceback, jabDelay;

// Global input variables
var p1up, p1down, p1jab, p2up, p2down, p2jab;

var pixelscale = 2;

// A player object
function Player (game, x, y, playerNum) {
    Phaser.Sprite.call(this, game, x, y, 'snail');
    this.anchor.set(0.5, 0.5);
    this.num = playerNum;
    this.game.physics.enable(this); // set physics for player
    if (playerNum === 1) {
        this.arm = new Arm(this.game, this.x+70, this.y, this.playerNum);
        this.game.add.existing(this.arm);
        this.scale.setTo(-pixelscale, pixelscale);    
        this.body.acceleration.setTo(40,0);
    } else {
        this.arm = new Arm(this.game, this.x-70, this.y, this.playerNum);
        this.game.add.existing(this.arm);
        this.scale.setTo(pixelscale, pixelscale);
        this.body.acceleration.setTo(-40,0);
    }
    
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    this.arm.body.velocity = this.body.velocity;
    if (this.num === 1)
        this.arm.x = this.x+70;
    else {
        this.arm.x = this.x-70;
    }
}

Player.prototype.jab = function (key) {
    // TODO
}

// An arm object, to be a child of the player object
function Arm (game, x, y, playerNum) {
    Phaser.Sprite.call(this, game, x, y, 'arm');
    this.game.physics.enable(this); // enable physics for arm
    this.anchor.setTo(.5,.5);
    this.scale.setTo(3,1.5);
}
Arm.prototype = Object.create(Phaser.Sprite.prototype);
Arm.prototype.constructor = Arm;


play.prototype = {
    preload: function () {
        console.log("%cPlay state","color:white; background:blue");
        console.log('preload');
        this.game.load.image('snail', 'images/snail.png');
        this.game.load.spritesheet('tiles','images/platformertiles.png',16,16);
        this.game.load.image('arm', 'images/arm.png');
        this.game.stage.smoothed = false;
        // game.load.audio('kiss', 'sounds/kiss.wav');

        // Set some constants
        bounceback = 60;
        jabDelay = 0;

        // Key bindings
        p1up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        p1down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        p1jab = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        p2up = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
        p2down = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
        p2jab = this.game.input.keyboard.addKey(Phaser.Keyboard.L);

        //set background
        this.game.stage.backgroundColor = '70caff';

    },
    
    create: function () {
        console.log('create');
        
        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        p1 = new Player(
            this.game,
            this.game.world.centerX-300,
            this.game.world.centerY,
            1 // player num
        );
        this.game.add.existing(p1);
        p1jab.onDown.add(jab, this);
        
        p2 = new Player(
            this.game,
            this.game.world.centerX+300,
            this.game.world.centerY,
            2 // player num
        );
        this.game.add.existing(p2);
        

    },
    
    // Called every frame of the game (I think 30 fps?)
    update: function () {
        // TODO
        this.handleInputs();
        this.handleCollisions();
        // This ought to get put inside the player code, not out here!
        if (jabDelay) {
            jabDelay--;
        }
    },
    
    // Use this function to look at the hit-boxes
    render: function () {
        // this.game.debug.body(p1);
        // this.game.debug.body(p1.arm);
        // this.game.debug.body(p2);
        // this.game.debug.body(p2.arm);
    },

    // Handle inputs for the players
    handleInputs: function () {
        if (p1up.isDown && p1.arm.y > (p1.y - 30)) {
            p1.arm.y -= 3;
        } else if (p1down.isDown && p1.arm.y < (p1.y + 30)) {
            p1.arm.y += 3;
        }

        if (p2up.isDown && p2.arm.y > (p2.y - 30)) {
            p2.arm.y -= 3;
        } else if (p2down.isDown && p2.arm.y < (p2.y + 30)) {
            p2.arm.y += 3;
        }

    
        // Testing

    },

    handleCollisions: function () {
        // TODO
        // console.log(p1.arm);
        // console.log(p2.arm);
        // console.log(this);
        if (this.game.physics.arcade.collide(p1, p2)) {
            // p1.body.acceleration = p2.body.acceleration = 0;
            this.game.paused = true;
            p1.body.velocity.x = -bounceback;
            p2.body.velocity.x = bounceback;
        }
        if (this.game.physics.arcade.collide(p1.arm, p2.arm)) {
            console.log('clang');
            p1.body.velocity.x = -bounceback;
            p2.body.velocity.x = bounceback;
        }
    }
}



function jab () {
    if (jabDelay > 0) {return;}
    console.log("Jab!");
    jabDelay = 60;
}