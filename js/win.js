var win = {
	create () {
		var splash = game.add.text(game.world.center.x, game.world.center.y, 'Player 1 Won!', 
														{font: '50px Arial', fill: '#ffffff'});
		var startkey = game.input.keyboard.addKey(Phaser.keyboard.SPACEBAR);
		startkey.onDown.addOnce(this.reset, this);
	},

	reset () {
		game.state.start('play');
	}
}