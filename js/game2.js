var playState = {
    var pixelscale = 2;
    //var cursors;
    //var distance;

    var p1; // Player group
    var p2;
    var p1arm;
    var p2arm;

    // Keyboard key codes
    var p1up;
    var p1down;
    var p2up;
    var p2down;
    var p1jab;

    var bounceback;
    var p1delay;

    function preload () {
        console.log("preload");
        //Here is where you would load all your images and assets
        game.load.image('snail', 'images/snail.png');
        game.load.spritesheet('tiles','images/platformertiles.png',16,16);
        game.load.image('arm', 'images/arm.png');
        game.stage.smoothed = false;

        game.load.audio('kiss', 'sounds/kiss.wav');

        bounceback = 60;
        p1delay = 0;

    }

    function create () {
        console.log("create");
        //This function runs on creation of the game window

        // Bind keys to their functions
        //game.input.keyboard.addKeys({'p1up': Phaser.KeyCode.W, 'p1down': Phaser.KeyCode.S});
        p1down = game.input.keyboard.addKey(Phaser.Keyboard.W);
        p1jab = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        p1jab.onDown.add(jab, this);

        //Adding players
        p1 = game.add.sprite(game.world.centerX+300, game.world.centerY, 'snail');//add to game
        p1.anchor.setTo(.5,.5);//set anchor of sprite to its center
        p1.scale.setTo(pixelscale,pixelscale);//scale the image up

        p1arm = game.add.sprite(p1.x - 70, p1.y, 'arm');
        p1arm.anchor.setTo(.5,.5);
        p1arm.scale.setTo(3,1.5);

        p2 = game.add.sprite(game.world.centerX-300, game.world.centerY, 'snail');//add to game
        p2.anchor.setTo(.5,.5);//set anchor of sprite to its center
        p2.scale.setTo(-pixelscale,pixelscale);//scale the image up, reverse

        p2arm = game.add.sprite(p2.x + 70,p2.y,'arm');
        p2arm.anchor.setTo(.5,.5);
        p2arm.scale.setTo(3,1.5);
        

        // fill in a line of floor sprites using a Tile Sprite
        tiles = game.add.tileSprite(0, game.world.centerY-5+.5*p1.height, WINDOW_WIDTH, 32, 'tiles', 2);
        tiles.tileScale.setTo(pixelscale,pixelscale);


        // collision sound
        kiss = game.add.audio('kiss');
        

        //set background
        game.stage.backgroundColor = '70caff';


        //start physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //enable physics for objects
        game.physics.arcade.enable([p1, p1arm, p2, p2arm]);
        p1.body.setSize(60,50, 19);
        p2.body.setSize(60,50, -19);


        // players collide with world bounds
        p1.body.collideWorldBounds = true;
        p2.body.collideWorldBounds = true;

        // maximize velocity
        //p1.body.maxVelocity.setTo(40,0);
        //p2.body.maxVelocity.setTo(40,0);
        //p1arm.body.maxVelocity.setTo(40,0);
        //p2arm.body.maxVelocity.setTo(40,0);

        // players accelerate to each other
        p1.body.acceleration.setTo(-40,0);
        p2.body.acceleration.setTo(40,0);
        p1arm.body.acceleration.setTo(-40,0);
        p2arm.body.acceleration.setTo(40,0);
        

    }

    function hitSprite (sprite1, sprite2) {
        kiss.play();
    }



    function update(){

        //p1arm.x = p1.x - 70; // set player arm to move with players
        //p2arm.x = p2.x + 70; // set player arm to move with players


        // Player 1 arm movement controls
        if (game.input.keyboard.isDown(Phaser.Keyboard.I)) {
            if(p1arm.y > p1.y-20) {
                //console.log("down");
                p1arm.y -= 3;
            }
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.K)) {
            if(p1arm.y < p1.y+20) {
                //console.log("up");
                p1arm.y += 3;
            }
        }

        // Player 2 arm movements... later

        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            if(p2arm.y > p2.y-20) {
                //console.log("down");
                p2arm.y -= 3;
            }
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            if(p2arm.y < p2.y+20) {
                //console.log("up");
                p2arm.y += 3;
            }
        }


        // Collisions
        if (game.physics.arcade.collide(p1arm, p2arm))
        {
            console.log("clang");
            p1arm.body.velocity.setTo(bounceback,0);
            p2arm.body.velocity.setTo(-bounceback,0);
            p1.body.velocity.setTo(bounceback,0);
            p2.body.velocity.setTo(-bounceback,0);
            hitSprite(p1arm,p2arm);
            
        }

        if (game.physics.arcade.collide(p1,p2))
        {
            game.debug.text("colliding",30,60);
            console.log("collide");
            hitSprite(p1,p2); //--> This does!
            p1.body.velocity.setTo(40,0);
            //player1.body.velocity.setTo(40,0);      //apply backwards force
            p2.body.velocity.setTo(-40,0);
        }

        //if collision between player1 sword and player2 body, player 2 loses
        if (game.physics.arcade.overlap(p1arm,p2)) {
            console.log("Player 1 wins!");
            p2.destroy();
            p2arm.destroy();
            game.paused = true;
            game.state.start('win');
        }

        //player1.x-=.5;
        //player2.x+=.5;
    }

    function render() {
        game.debug.body(p1);
        game.debug.body(p2);
        game.debug.body(p1arm);
        game.debug.body(p2arm);
    }


    function jab () {
        if (p1delay>game.time.now){return;} // too early
        console.log(p1delay);
        p1arm.x -= 30;
        p1delay = game.time.now + 1000; // 1 second delay
    }
}