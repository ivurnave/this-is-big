var controls = function (game) {};

var menu, backgroundColor = '#e3e0d5';

controls.prototype = {
    preload: function () {
        // load any button assets
        this.game.load.spritesheet('menu', 'images/menu_button.png', 3331, 1249);
    },

    create: function () {
        this.game.stage.backgroundColor = backgroundColor;

        menu = new Phaser.Button (this.game, this.game.world.centerX, this.game.world.centerY+150, 'menu', null, 0, 1, 0);
        menu.anchor.set(0.5, 0.5);
        menu.scale.setTo(0.05, 0.05);
        this.game.add.existing(menu);
        menu.onInputDown.add(function () {
            this.game.state.start('Menu');
        }, this)

        var text = " \
                    Player 1 Controls:\nW: move arm up, S: move arm down, D: jab\n\n \
                    Player 2 Controls:\nI: move arm up, K: move arm down, J: jab"

        // Add control text
        var header = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 230, "Controls");
        header.anchor.set(0.5);
        var controlsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, text);
        controlsText.anchor.set(0.5);
    }
};
