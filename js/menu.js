var menu = function (game) {};

var button;

menu.prototype = {
    preload: function () {
        // load any button assets
        this.game.load.image('button', 'images/arm.png');
    },

    create: function () {
        button = new Phaser.Button (this.game, this.game.world.centerX, this.game.world.centerY, 'button')
        this.game.add.existing(button);

        button.onInputDown.add(function () {
            console.log("hey");
            this.game.state.start('Play');
        }, this)
    }
};