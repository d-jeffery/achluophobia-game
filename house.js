
//I HATE THIS CODE FROM TOP TO BOTTOM

var HOUSE_LAYOUT = new Array();
var HOUSE_ROWS = 60;
var HOUSE_COLS = 60;

var SQUARE_WIDTH = 40;

var FIRST_ROOM = true;

function find_random() {
	var foundSquare = false;
	
	var location = {};
	
	while(!foundSquare) {
		var randomX = Math.floor(Math.random() * (HOUSE_ROWS-2)) + 1;
		var randomY = Math.floor(Math.random() * (HOUSE_COLS-2)) + 1;
		
		if (HOUSE_LAYOUT[randomX][randomY] == 0) {
			if (HOUSE_LAYOUT[randomX + 1][randomY] == 1) {
				foundSquare = true;
				location.new_room = [-1, 0];
			}
			
			if (HOUSE_LAYOUT[randomX - 1][randomY] == 1) {
				if (foundSquare) {
					foundSquare = false;
					continue;
				}
				
				foundSquare = true;
				location.new_room = [1, 0];
			}
			
			if (HOUSE_LAYOUT[randomX][randomY + 1] == 1) {
				if (foundSquare) {
					foundSquare = false;
					continue;
				}
			
				foundSquare = true;
				location.new_room = [0, -1];
			}
			
			if (HOUSE_LAYOUT[randomX][randomY - 1] == 1) {
				if (foundSquare) {
					foundSquare = false;
					continue;
				}
				
				foundSquare = true;
				location.new_room = [0, 1];
			}
		}
	}
	
	location.door = [randomX, randomY];
	
	return location;
}

function add_room() {
	var location = find_random();
	
	var width = (Math.floor(Math.random() * 5) + 5);
	var height = (Math.floor(Math.random() * 5) + 5);
	
	var offset = 0;
	var startX = 0;
	var startY = 0;
	
	if (location.new_room[0] != 0) {
		width *= location.new_room[0];
		startY = Math.floor(Math.random()  * (height-1) * - 1);
	}
	if (location.new_room[1] != 0) {
		height *= location.new_room[1];
		startX = Math.floor(Math.random()  * (width-1)* - 1);
	}
	
	if (width < 0) {
		width = Math.abs(width);
		startX = startX + location.door[0] - width;
	} else {
		startX = startX + location.door[0] + location.new_room[0];
	}
	
	if (height < 0) {
		height = Math.abs(height);
		startY = startY + location.door[1] - height;
	} else {
		startY = startY + location.door[1] + location.new_room[1];
	}
	
	if (isFree(startX, startY, width, height)) {
		console.log(startX + " " + startY + " " + width + " " +height);	
		HOUSE_LAYOUT[ location.door[0] ][ location.door[1] ] = 1;
		
		dig_out(startX, startY, width, height);
		return true;
	} else {
		return false;
	}
}

function getRandomSquare(min_x, min_y, x_offset, y_offset) {
	var random_x = Math.floor(Math.random() * (x_offset)) + min_x;
	var random_y = Math.floor(Math.random() * (y_offset)) + min_y;
	return {x: random_x, y: random_y};

}

function hasFreeAdjacent(x, y) {
	if (x < HOUSE_ROWS && HOUSE_LAYOUT[x + 1][y] == 1) {
		return true;
	}
			
	if (x > 0 && HOUSE_LAYOUT[x - 1][y] == 1) {
		return true;
	}
			
	if (y <  HOUSE_COLS && HOUSE_LAYOUT[x][y + 1] == 1) {
		return true;
	}
			
	if (y > 0 && HOUSE_LAYOUT[x][y - 1] == 1) {
		return true;
	}
	
	return false;
}

function isFree(x, y, w, h) {
	for(var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			if (HOUSE_LAYOUT[x + i][y + j] != 0) return false;
		}
	}
	
	return true;
}

function dig_out(x, y, w, h) {
	for(var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			HOUSE_LAYOUT[x + i][y + j] = 1;
		}
	}
	
	if (!FIRST_ROOM) {
		var key_square = getRandomSquare(x, y, w, h);
		var new_key = new Key(key_square.x * SQUARE_WIDTH + SQUARE_WIDTH/2,
							key_square.y * SQUARE_WIDTH + SQUARE_WIDTH/2);
		GAME_OBJECTS.push(new_key);
	}
	
	if (FIRST_ROOM) FIRST_ROOM = false;
}

function translate_to_square(x, y) {
	var x_coord = Math.floor(x / SQUARE_WIDTH);
	var y_coord = Math.floor(y / SQUARE_WIDTH);
	
	return {x: x_coord, y: y_coord};
}


function draw_map() {

	for(var i = 0; i < HOUSE_ROWS; i++) {
		for(var j = 0; j < HOUSE_COLS; j++) {
			if (HOUSE_LAYOUT[i][j] != 0) {
				ctx.filleStyle = "#FFFFFF";
				ctx.beginPath();
				ctx.rect(i * SQUARE_WIDTH,
						 j * SQUARE_WIDTH,
						 SQUARE_WIDTH,
						 SQUARE_WIDTH);
				ctx.closePath( );
				ctx.fill();
			}
		}
	}
	
	
}

function init_house() {
	for(var i = 0; i < HOUSE_ROWS; i++) {
		HOUSE_LAYOUT[i] = new Array();
		for(var j = 0; j < HOUSE_COLS; j++) {
			HOUSE_LAYOUT[i][j] = 0;
		}
	}
	
	dig_out(28, 28, 6, 6);
	
	var room_count = 0;
	while(room_count < 6) {
		if (add_room()) ++room_count;
	}
	
	console.log();
}

