// Decalre the play state
var play = function (game) {};

// Global variables for play state
var p1, p2, p1arm, p2arm, bounceback, jabDelay;

// Global input variables
var p1up, p1down, p1jab, p2up, p2down, p2jab;

var pixelscale = 2;

// A player object that handles keyboard and jabs
function Player (game, x, y, playerNum) {
    Phaser.Sprite.call(this, game, x, y, 'snail');
    this.arm = new Arm(this.game, this.x, this.y, this.playerNum);
    this.game.add.existing(this.arm);
    // Phaser.Sprite.call(this, game, x, y, 'arm');
    this.anchor.set(0.5, 0.5);
    if (playerNum === 1) {
        this.scale.setTo(-pixelscale, pixelscale);    
    } else {
        this.scale.setTo(pixelscale, pixelscale);
    }

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.jab = function (key) {
    // TODO
}

// An arm object, to be a child of the player object
function Arm (game, x, y, playerNum) {
    if (playerNum === 1) {
        Phaser.Sprite.call(this, game, x, y, 'arm');
    } else {
        Phaser.Sprite.call(this, game, x, y, 'arm');
    }
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

        // check stufffff

    },

    update: function () {
        // TODO
        handleInputs();
        if (jabDelay) {
            jabDelay--;
        }
    }
}

handleInputs = function () {
    if (p1up.isDown) {
        console.log("p1up is pressed");
    }
}

function jab () {
    if (jabDelay > 0) {return;}
    console.log("Jab!");
    jabDelay = 60;
}