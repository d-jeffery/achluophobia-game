var ctx;
var canvas;
var canvas = document.createElement('canvas');

var HEIGHT;
var WIDTH;

var DEBUG = false;

var GAME_OBJECTS = new Array();

var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;

var MOUSEX;
var MOUSEY;

document.onkeydown = function onKeyDown(evt) {
  if (evt.keyCode == 39 || evt.keyCode == 68) rightDown = true;
  if (evt.keyCode == 37 || evt.keyCode == 65) leftDown = true;
  if (evt.keyCode == 38 || evt.keyCode == 87) upDown = true;
  if (evt.keyCode == 40 || evt.keyCode == 83) downDown = true;
}

document.onkeyup = function onKeyUp(evt) {
  if (evt.keyCode == 39 || evt.keyCode == 68) rightDown = false;
  if (evt.keyCode == 37 || evt.keyCode == 65) leftDown = false;
  if (evt.keyCode == 38 || evt.keyCode == 87) upDown = false;
  if (evt.keyCode == 40 || evt.keyCode == 83) downDown = false;
}

document.onmousemove = function mouseMove(event) {
		var x = new Number();
        var y = new Number();

        if (event.x != undefined && event.y != undefined)
        {
          x = event.x;
          y = event.y;
        }
        else // Firefox method to get the position
        {
          x = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
          y = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
        }

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
		
		MOUSEX = x;
		MOUSEY = y;
		
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function render() {
	requestAnimationFrame(render);
	clear();
	ctx.save();	
	
	
    ctx.translate(-player.x + WIDTH/2, -player.y + HEIGHT/2);
		
	if (DEBUG) draw_map();	
	
	player.draw();	
		
	for(var i = 0; i < GAME_OBJECTS.length; i++) {
		GAME_OBJECTS[i].draw();
	}
	draw_shadows();
	
	
	ctx.translate(player.x - WIDTH/2, player.y - HEIGHT/2);
	ctx.restore();

}

function loop() {
	/*
	ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(Math.PI/180*30);
    ctx.translate(-player.x,-player.y);
	player.draw();
	player.update();	
	ctx.restore();
	*/	
	
	player.update();
	for(var i = 0; i < GAME_OBJECTS.length; i++) {
		GAME_OBJECTS[i].update();
	}	
}

function init_game() {
	canvas = document.getElementById("no-where-to-go");
	ctx = canvas.getContext("2d");
	
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	
	init_house();
	
	//GAME_OBJECTS.push(player);
	player.init();
	
	setInterval(loop, 5);
	requestAnimationFrame(render);
	
}

init_game();