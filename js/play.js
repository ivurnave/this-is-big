// Declare the play state
var play = function (game) {};

// Global variables for play state
var p1, p2, bounceback, jabDelay, crowdNoise;

// Global input variables
var p1up, p1down, p1jab, p2up, p2down, p2jab;

var imageScale = .15;

var gameIsPaused;
var resetButton;

// A player object
function Player (game, x, y, playerNum) {
    // instance variables
    this.num = playerNum;
    this.jabDelay = 0;
    if (playerNum == 1) {
        Phaser.Sprite.call(this, game, x, y, 'snail1');
        this.anchor.set(0.5, 0.5);
        this.game.physics.enable(this);
        this.sword = new Sword(this.game, this.x+120, this.y, this.num);
        this.game.add.existing(this.sword)
        this.scale.setTo(imageScale, imageScale);    
        this.body.acceleration.setTo(40,0);
    } else {
        Phaser.Sprite.call(this, game, x, y, 'snail2');
        this.anchor.set(0.5, 0.5);
        this.game.physics.enable(this);
        this.sword = new Sword(this.game, this.x-120, this.y, this.num);
        this.game.add.existing(this.sword);
        this.scale.setTo(imageScale, imageScale);
        this.body.acceleration.setTo(-40,0);
    }
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    if (!gameIsPaused) {
        // Update sword velocity
        this.sword.body.velocity = this.body.velocity;
        if (this.num === 1 && !this.jabDelay) {
            this.sword.x = this.x+120;
        } else if (this.num === 2 && !this.jabDelay) {
            this.sword.x = this.x-120;
        }
        
        // Handle jab delay
        if (this.jabDelay) {
            this.jabDelay--;
            if (this.num === 1) {
                this.sword.x--;
            } else {
                this.sword.x++;
            }
        }
    }
}
Player.prototype.jab = function () {
    if (!gameIsPaused) {
        if (this.jabDelay > 0) {return;}
        if (this.num === 1) {
            this.sword.x += 60;
        } else {
            this.sword.x -= 60;
        }
        this.jabDelay = 60;
    }
}

// A sword object, to be a child of the player object
function Sword (game, x, y, playerNum) {
    Phaser.Sprite.call(this, game, x, y, 'sword');
    this.game.physics.enable(this); // enable physics for sword
    if (playerNum === 1) {
        this.anchor.setTo(.1,.5);
    } else {
        this.anchor.setTo(.9,.5);
    }
    this.scale.setTo(3,1.5);
}
Sword.prototype = Object.create(Phaser.Sprite.prototype);
Sword.prototype.constructor = Sword;


play.prototype = {
    init: function () {
        this.game.renderer.renderSession.roundPixels = true;
    },

    preload: function () {
        console.log("%cPlay state","color:white; background:blue");
        console.log('preload');


        // Load images
        // this.game.load.image('snail', 'images/snail.png');
        this.game.load.image('snail1', 'images/snail1.png');
        this.game.load.image('snail1dead', 'images/snail1dead.png');
        this.game.load.image('snail2', 'images/snail2.png');
        this.game.load.image('snail2dead', 'images/snail2dead.png');
        this.game.load.spritesheet('tiles','images/platformertiles.png',16,16);
        this.game.load.image('sword', 'images/arm.png');
        this.game.load.image('button', 'images/restart.png');
        this.game.stage.smoothed = false;

        // Load sounds
        this.game.load.audio('crowdNoise', 'sounds/crowdNoise.mp3');
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
        p2jab = this.game.input.keyboard.addKey(Phaser.Keyboard.J);

        //set background
        this.game.stage.backgroundColor = '#e5d195';

    },
    
    create: function () {
        console.log('create');
        
        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create players
        p1 = new Player(
            this.game,
            this.game.world.centerX-300,
            this.game.world.centerY,
            1 // player num
        );
        this.game.add.existing(p1);
        p1jab.onDown.add(p1.jab, p1);
        
        p2 = new Player(
            this.game,
            this.game.world.centerX+300,
            this.game.world.centerY,
            2 // player num
        );
        this.game.add.existing(p2);
        p2jab.onDown.add(p2.jab, p2);

        // Create reset button
        resetButton = new Phaser.Button (this.game, this.game.world.centerX, this.game.world.centerY-200, 'button', this.restart);
        resetButton.anchor.set(0.5, 0.5);
        resetButton.scale.setTo(4, 4);
        gameIsPaused = false;

        // Create sounds
        // crowdNoise = new Phaser.Sound(this.game, 'crowdNoise', 1, true);
        // crowdNoise.autoplay = true;
        // this.game.add.existing(crowdNoise);
        crowdNoise = this.game.sound.add('crowdNoise', 1, true);
        // crowdNoise.fadeIn(500, true);
        crowdNoise.play();
    },
    
    // Called every frame of the game (I think 60 fps?)
    update: function () {
        // console.log(crowdNoise.volume);
        if (!gameIsPaused) {
            this.handleInputs();
            this.handleCollisions();
        } 
    },
    
    // Use this function to look at the hit-boxes
    // Use for drawing the arms!
    render: function () {
        // Hitboxes
        this.game.debug.body(p1);
        this.game.debug.body(p1.sword);
        this.game.debug.body(p2);
        this.game.debug.body(p2.sword);

        var shoulderOffsetx = 70;
        var shoulderOffsety = 20;

        // Player 1 arm
        // this.game.context.strokeStyle = '#75bfea';
        this.game.context.strokeStyle = '#a35c44';
        this.game.context.lineWidth = 8;
        this.game.context.beginPath();
        this.game.context.moveTo(p1.x + shoulderOffsetx, p1.y + shoulderOffsety);
        this.game.context.lineTo(p1.sword.x, p1.sword.y);
        this.game.context.stroke();
        this.game.context.closePath();
        // shoulder
        this.game.context.fillStyle = '#a35c44';
        this.game.context.beginPath();
        this.game.context.arc(p1.x + shoulderOffsetx, p1.y + shoulderOffsety, 10, 2 * Math.PI, false);
        this.game.context.fill();
        this.game.context.closePath();
        // hand
        this.game.context.fillStyle = '#a35c44';
        this.game.context.beginPath();
        this.game.context.arc(p1.sword.x, p1.sword.y, 5, 2 * Math.PI, false);
        this.game.context.fill();
        this.game.context.closePath();


        // Player 2 arm
        this.game.context.strokeStyle = '#a35c44';
        this.game.context.lineWidth = 8;
        this.game.context.beginPath();
        this.game.context.moveTo(p2.x - shoulderOffsetx, p2.y + shoulderOffsety);
        this.game.context.lineTo(p2.sword.x, p2.sword.y);
        this.game.context.stroke();
        this.game.context.closePath();
        // shoulder
        this.game.context.fillStyle = '#a35c44';
        this.game.context.beginPath();
        this.game.context.arc(p2.x - shoulderOffsetx, p2.y + shoulderOffsety, 10, 2 * Math.PI, false);
        this.game.context.fill();
        this.game.context.closePath();
        // hand
        this.game.context.fillStyle = '#a35c44';
        this.game.context.beginPath();
        this.game.context.arc(p2.sword.x, p2.sword.y, 5, 2 * Math.PI, false);
        this.game.context.fill();
        this.game.context.closePath();
    },

    // Handle inputs for the players
    handleInputs: function () {
        // p1 inputs
        if (p1up.isDown && p1.sword.y > (p1.y - 30)) {
            p1.sword.y -= 3;
        } else if (p1down.isDown && p1.sword.y < (p1.y + 30)) {
            p1.sword.y += 3;
        }

        // p2 inputs
        if (p2up.isDown && p2.sword.y > (p2.y - 30)) {
            p2.sword.y -= 3;
        } else if (p2down.isDown && p2.sword.y < (p2.y + 30)) {
            p2.sword.y += 3;
        }
    },

    handleCollisions: function () {
        if (this.game.physics.arcade.collide(p1, p2)) {
            this.game.paused = true;
            p1.body.velocity.x = -bounceback;
            p2.body.velocity.x = bounceback;
        }
        if (this.game.physics.arcade.overlap(p1.sword, p2.sword)) {
            console.log('clang');
            p1.body.velocity.x = -bounceback;
            p2.body.velocity.x = bounceback;
        }

        // Check if p1 wins
        if (this.game.physics.arcade.overlap(p1.sword, p2)) {
            // Check if tie
            if (this.game.physics.arcade.overlap(p2.sword, p1)) {
                console.log("Tie!");
                this.game.add.existing(resetButton);
                p1.body.velocity = 0;
                p1.body.acceleration = 0;
                p1.sword.body.velocity = 0;
                p2.body.velocity = 0;
                p2.body.acceleration = 0;
                p2.sword.body.velocity = 0;

                var snail2dead = this.game.add.sprite(p2.x, p2.y, 'snail2dead');
                snail2dead.anchor.set(0.5, 0.5);
                snail2dead.scale.setTo(imageScale, imageScale);

                var snail1dead = this.game.add.sprite(p1.x, p1.y, 'snail1dead');
                snail1dead.anchor.set(0.5, 0.5);
                snail1dead.scale.setTo(imageScale, imageScale);

                p1.destroy();
                p2.destroy();

                gameIsPaused = true;

            } else { // p1 wins
                console.log('Player 1 wins!');
                this.game.add.existing(resetButton);
                p1.body.velocity = 0;
                p1.body.acceleration = 0;
                p1.sword.body.velocity = 0;
                p2.body.velocity = 0;
                p2.body.acceleration = 0;
                p2.sword.body.velocity = 0;
    
                // testing
                var snail2dead = this.game.add.sprite(p2.x, p2.y, 'snail2dead');
                snail2dead.anchor.set(0.5, 0.5);
                snail2dead.scale.setTo(imageScale, imageScale);
                p2.destroy();
                gameIsPaused = true;
            }
        } else if (this.game.physics.arcade.overlap(p2.sword, p1)) { // p2 wins
            console.log('Player 2 wins!');
            
            this.game.add.existing(resetButton);
            p1.body.velocity = 0;
            p1.body.acceleration = 0;
            p1.sword.body.velocity = 0;
            p2.body.velocity = 0;
            p2.body.acceleration = 0;
            p2.sword.body.velocity = 0;

            var snail1dead = this.game.add.sprite(p1.x, p1.y, 'snail1dead');
            snail1dead.anchor.set(0.5, 0.5);
            snail1dead.scale.setTo(imageScale, imageScale);
            p1.destroy();
            gameIsPaused = true;
        }
    },

    restart: function () {
        console.log('restart');
        this.game.state.start(this.game.state.current);
    }
}