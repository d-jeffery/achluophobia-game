var player = {
	x: 0,
	y: 0,
	width: 30,

	init: function() {
		this.x = (HOUSE_ROWS * SQUARE_WIDTH)/2 + SQUARE_WIDTH/2;
		this.y = (HOUSE_COLS * SQUARE_WIDTH)/2 + SQUARE_WIDTH/2;
	},
	
	draw: function() {
		
		if (DEBUG) {
			ctx.fillStyle = "#00FF00";
		} else {
			ctx.fillStyle = "#FFFFFF";
		}
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.width/2, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
		
		
		player_sight.draw();
	},
	
	update: function() {
		if (rightDown) {
			this.x = this.x + 1;
			var point_1 = translate_to_square(this.x + this.width/2, this.y - this.width/2);
			var point_2 = translate_to_square(this.x + this.width/2, this.y + this.width/2);

			if (HOUSE_LAYOUT[point_1.x][point_1.y] == 0 ||
				HOUSE_LAYOUT[point_2.x][point_2.y] == 0) {
				this.x = this.x - 1;
			}
		}
		if (leftDown) {
			this.x = this.x - 1;
			
			var point_1 = translate_to_square(this.x - this.width/2, this.y - this.width/2);
			var point_2 = translate_to_square(this.x - this.width/2, this.y + this.width/2);

			if (HOUSE_LAYOUT[point_1.x][point_1.y] == 0 ||
				HOUSE_LAYOUT[point_2.x][point_2.y] == 0) {
				this.x = this.x + 1;
			}
		}
		if (upDown) {
			this.y = this.y - 1;
			
						
			var point_1 = translate_to_square(this.x - this.width/2, this.y - this.width/2);
			var point_2 = translate_to_square(this.x + this.width/2, this.y - this.width/2);

			if (HOUSE_LAYOUT[point_1.x][point_1.y] == 0 ||
				HOUSE_LAYOUT[point_2.x][point_2.y] == 0) {
				this.y = this.y + 1;
			}
		}
		if (downDown) {
			this.y = this.y + 1;
									
			var point_1 = translate_to_square(this.x - this.width/2, this.y + this.width/2);
			var point_2 = translate_to_square(this.x + this.width/2, this.y + this.width/2);

			if (HOUSE_LAYOUT[point_1.x][point_1.y] == 0 ||
				HOUSE_LAYOUT[point_2.x][point_2.y] == 0) {
				this.y = this.y - 1;
			}
		}
	}
};

var player_sight = {
	arc_length : 150,
	arc_angle : 30,
	draw: function() {
	
		var startX = player.x;
		var startY = player.y;
		
		var rotateTo = MathHelper.getAngleTo(WIDTH/2, HEIGHT/2, MOUSEX, MOUSEY) - this.arc_angle/2;
		
		ctx.save();	
		ctx.translate(startX, startY);
		
		ctx.rotate(rotateTo * Math.PI/180);
		
		if (DEBUG) {
			ctx.fillStyle = "#00FF00";
		} else {
			ctx.fillStyle = "#FFFFFF";
		}
		
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0 + this.arc_length, 0);
		ctx.arc(0, 0, this.arc_length, 0, Math.PI/180 * this.arc_angle, false);
		ctx.lineTo(0 , 0);
		ctx.closePath();
		ctx.fill();
		
		ctx.rotate(-rotateTo * Math.PI/180);

		ctx.translate(-startX, -startY);
		ctx.restore();
		

	}
};