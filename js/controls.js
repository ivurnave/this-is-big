var controls = function (game) {};

var menu, backgroundColor = '#e3e0d5';

controls.prototype = {
    preload: function () {
        // load any button assets
        this.game.load.spritesheet('menu', 'images/menu_button.png', 3331, 1249);
        this.game.load.image('controls', 'images/controls.png');
    },

    create: function () {
        this.game.stage.backgroundColor = backgroundColor;
        this.game.add.image(0, 0, 'controls');

        menu = new Phaser.Button (this.game, this.game.world.centerX, this.game.world.centerY+150, 'menu', null, 0, 1, 0);
        menu.anchor.set(0.5, 0.5);
        menu.scale.setTo(0.05, 0.05);
        this.game.add.existing(menu);
        menu.onInputDown.add(function () {
            this.game.state.start('Menu');
        }, this)

    }
};
