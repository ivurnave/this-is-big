var WINDOW_WIDTH = 800;
var WINDOW_HEIGHT = 500 ;
var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, 'gameDiv');//, { preload: preload, create: create, update:update, render:render});

game.state.add('play');
game.state.add('win');

game.state.start('play');