var menu = function (game) {};

var start;
var background;

menu.prototype = {
    preload: function () {
        // load any button assets
        this.game.load.spritesheet('start', 'images/begin_button.png', 3331, 1249);
        this.game.load.image('background', 'images/main_menu.png');
        this.game.stage.smoothed = false;
    },

    create: function () {
        this.game.stage.backgroundColor = '#182d3b';

        background = this.game.add.image(0,0, 'background');
        background.scale.setTo(.24, .24)

        start = new Phaser.Button (this.game, this.game.world.centerX, this.game.world.centerY+150, 'start', null, 0, 1, 0);
        start.anchor.set(0.5, 0.5);
        start.scale.setTo(0.05, 0.05);
        this.game.add.existing(start);

        start.onInputDown.add(function () {
            this.game.state.start('Play');
        }, this)
    }
};
