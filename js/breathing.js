// Detect if the audio context is supported.
window.AudioContext = (
  window.AudioContext ||
  window.webkitAudioContext ||
  null
);

if (!AudioContext) {
  throw new Error("AudioContext not supported!");
}

var BEAST_OFFSET = 200;

var beast = {
	init : function() {
		if (typeof(this.source) != "undefined") {
			this.source.pause();
		} else {
			this.source = new Audio("breath.ogg");
			this.source.loop = true;
		}
		this.source.volume = 0;
		this.source.play();
		this.angle = Math.ceil(Math.random() * 360);
		this.x = Math.floor(Math.cos(this.angle * ( Math.PI / 180.0 ) ) * ( 50 ));
		this.y = Math.floor(Math.sin(this.angle * ( Math.PI / 180.0 ) ) * ( 50 ));
		this.backOffTimer = 1200;
		this.offset = 0;
		this.speed = 6;
		this.size = 18;
		this.backingOff = false;
	},
	draw : function() {
		if (this.backOffTimer > 0 && this.offset == 0) return;
		ctx.beginPath();
		ctx.arc( player.x + Math.floor(this.x), player.y + Math.floor(this.y), this.size, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#000000";
		ctx.fill();
	},
	update : function() {
		if (!this.backingOff && this.backOffTimer > 0) {
			this.backOffTimer--;
			return;
		}
		if (this.backingOff) {
			this.offset += this.speed;
			var escapeAngle = MathHelper.getAngleTo(0, 0, this.x, this.y) - (MathHelper.getAngleTo(WIDTH/2, HEIGHT/2, MOUSEX, MOUSEY) - MathHelper.getAngleTo(0, 0, this.x, this.y));
			this.x = this.x + Math.floor(Math.cos( escapeAngle * ( Math.PI / 180.0 ) ) * ( this.speed ));
			this.y = this.y + Math.floor(Math.sin( escapeAngle * ( Math.PI / 180.0 ) ) * ( this.speed ));
			if (this.source.volume > 0) this.source.volume = (this.source.volume - 0.01).toFixed(2);
		}
		if (this.offset > BEAST_OFFSET) {
			this.backingOff = false;
			this.offset = 0;
			this.source.volume = 0;
			this.angle = Math.ceil(Math.random() * 360);
			this.x = Math.floor(Math.cos(this.angle * ( Math.PI / 180.0 ) ) * ( 50 ));
			this.y = Math.floor(Math.sin(this.angle * ( Math.PI / 180.0 ) ) * ( 50 ));
		}
		if (!this.backingOff && this.source.volume < 1) {
			//Damn rounding errors
			this.source.volume = (this.source.volume + 0.01).toFixed(2);
		}
	},
	getAngle : function() {
		return this.angle;
	},
	newPosition : function() {
		if (this.backOffTimer > 0) {
			return;
		}
		this.backingOff = true;
		
		this.backOffTimer = Math.random() * 500 + 600;
	}

};

