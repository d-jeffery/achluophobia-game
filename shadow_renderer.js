
function draw_wall_shadow(x_coord, y_coord, from_x, from_y, shadow_depth) {
	//Get points
	var points = [ [from_x * SQUARE_WIDTH, from_y * SQUARE_WIDTH ],
			[from_x * SQUARE_WIDTH + SQUARE_WIDTH, from_y * SQUARE_WIDTH ],
			[from_x * SQUARE_WIDTH + SQUARE_WIDTH, from_y * SQUARE_WIDTH + SQUARE_WIDTH ],
			[from_x * SQUARE_WIDTH, from_y * SQUARE_WIDTH + SQUARE_WIDTH ] ];
	
	var actual_points = new Array();
	
	var dot_products = new Array();
	
	for (var i = 0; i < points.length; i++) {
		var j = (i < points.length - 1) ? i + 1 : 0;
			
		var light_vector_x = points[i][0] - x_coord;
		var light_vector_y = points[i][1] - y_coord;
			
		var nx = -(points[j][1] - points[i][1]);
		var ny = points[j][0] - points[i][0];
		
		var outcome = MathHelper.dotproduct([light_vector_x, light_vector_y], [nx, ny]);
		dot_products.push(outcome);
			
	}
	
	for(var i = 0; i < dot_products.length; i++) {
		var j = (i < dot_products.length - 1) ? i + 1 : 0;

		if (MathHelper.sign(dot_products[i]) == 1 && MathHelper.sign(dot_products[j]) == 1) {
			actual_points.push(points[j]);
		} else if (MathHelper.sign(dot_products[i]) == 1 && MathHelper.sign(dot_products[j]) == -1) {
			actual_points.push(points[j]);
			
			 var new_point_x = points[j][0] + (points[j][0] - x_coord) * shadow_depth;
			 var new_point_y = points[j][1] + (points[j][1] - y_coord) * shadow_depth;	
			 actual_points.push([new_point_x, new_point_y]);
			
		} else if (MathHelper.sign(dot_products[i]) == -1 && MathHelper.sign(dot_products[j]) == 1) {

			 var new_point_x = points[j][0] + (points[j][0] - x_coord) * shadow_depth;
			 var new_point_y = points[j][1] + (points[j][1] - y_coord) * shadow_depth;	
			 actual_points.push([new_point_x, new_point_y]);
			
			actual_points.push(points[j]);
		} 
	}
	
	if (actual_points.length != 0) {
		if (DEBUG) {
			ctx.fillStyle = "#FF00FF";
		} else {
			ctx.fillStyle = "#000000";
		}
		ctx.beginPath();
		ctx.moveTo(actual_points[0][0], actual_points[0][1]);
		for(var i = 1; i <actual_points.length; i++) {
			ctx.lineTo(actual_points[i][0], actual_points[i][1]);
				
		}
		ctx.closePath( );
		ctx.fill();
	}
}

function draw_shadows() {
	var square = translate_to_square(player.x, player.y);
	var distance_from = (Math.floor(player_sight.arc_length / SQUARE_WIDTH) + 4);
	var distance_start = Math.ceil(distance_from/2);
	var draw_shadow_depth = distance_from * SQUARE_WIDTH;
	
	var start_X = (square.x - distance_start < 0) ? 0 : square.x - distance_start;
	var start_Y = (square.y - distance_start < 0) ? 0 : square.y - distance_start;
	
	var stop_X = (square.x + distance_from > HOUSE_ROWS) ? HOUSE_ROWS : square.x + distance_from;
	var stop_Y = (square.y + distance_from > HOUSE_COLS) ? HOUSE_COLS : square.y + distance_from;
	
	for(var i = start_X; i < stop_X; i++) {
		for(var j = start_Y; j < stop_Y; j++) {
			if (HOUSE_LAYOUT[i][j] == 0) {
				
				draw_wall_shadow(player.x, player.y, i, j, draw_shadow_depth);
			}
		}
	}
}