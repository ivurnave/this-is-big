var menu = function (game) {};

var start, controls, background, backgroundColor = '#e3e0d5';;

menu.prototype = {
    preload: function () {
        // load any button assets
        this.game.load.spritesheet('start', 'images/begin_button.png', 3331, 1249);
        this.game.load.spritesheet('controls', 'images/controls_button.png', 3331, 1249);
        this.game.load.image('title', 'images/title_text.png');
        this.game.stage.smoothed = false;
    },

    create: function () {
        this.game.stage.backgroundColor = backgroundColor;

        title = this.game.add.image(this.game.world.centerX, this.game.world.centerY-20, 'title');
        title.anchor.set(0.5, 0.5);
        title.scale.setTo(.24, .24)

        start = new Phaser.Button (this.game, this.game.world.centerX-150, this.game.world.centerY+150, 'start', null, 0, 1, 0);
        start.anchor.set(0.5, 0.5);
        start.scale.setTo(0.05, 0.05);
        this.game.add.existing(start);

        controls = new Phaser.Button (this.game, this.game.world.centerX+150, this.game.world.centerY+150, 'controls', null, 0, 1, 0);
        controls.anchor.set(0.5, 0.5);
        controls.scale.setTo(0.05, 0.05);
        this.game.add.existing(controls);

        start.onInputDown.add(function () {
            this.game.state.start('Play');
        }, this)

        controls.onInputDown.add(function () {
            this.game.state.start('Controls');
        }, this)
    }
};
