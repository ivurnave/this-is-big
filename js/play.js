// Decalre the play state
var play = function (game) {};

// Global variables for play state
var p1, p2, p1arm, p2arm, bounceback, jabDelay;

// Global input variables
var p1up, p1down, p1jab, p2up, p2down, p2jab;

// A player object that handles keyboard and jabs
function Player (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'snail');
    this.anchor.set(0.5, 0.5);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.jab = function (key) {

}


play.prototype = {
    preload: function () {
        console.log("%cPlay state","color:white; background:blue");
        console.log('preload');
        game.load.image('snail', 'images/snail.png');
        game.load.spritesheet('tiles','images/platformertiles.png',16,16);
        game.load.image('arm', 'images/arm.png');
        game.stage.smoothed = false;
        // game.load.audio('kiss', 'sounds/kiss.wav');

        // Set some constants
        bounceback = 60;
        jabDelay = 1000;

        // Key bindings
        p1up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        p1down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        p1jab = game.input.keyboard.addKey(Phaser.Keyboard.D);
        p2up = game.input.keyboard.addKey(Phaser.Keyboard.I);
        p2down = game.input.keyboard.addKey(Phaser.Keyboard.K);
        p2jab = game.input.keyboard.addKey(Phaser.Keyboard.L);
    },

    create: function () {
        console.log('create');
    }
}