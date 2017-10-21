var menu = function (game) {};

var start;

menu.prototype = {
    preload: function () {
        // load any button assets
        this.game.load.image('start', 'images/start.png');
        this.game.stage.smoothed = false;
    },

    create: function () {
        start = new Phaser.Button (this.game, this.game.world.centerX, this.game.world.centerY, 'start');
        start.anchor.set(0.5, 0.5);
        start.scale.setTo(4, 4);
        this.game.add.existing(start);

        start.onInputDown.add(function () {
            console.log("hey");
            this.game.state.start('Play');
        }, this)
    }
};