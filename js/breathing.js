// Detect if the audio context is supported.
window.AudioContext = (
  window.AudioContext ||
  window.webkitAudioContext ||
  null
);

if (!AudioContext) {
  throw new Error("AudioContext not supported!");
}

var BEAST_OFFSET = 150;

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
		this.backOffTimer = 2000;
		this.offset = BEAST_OFFSET;
		this.size = 18;
		this.backingOff = false;
	},
	draw : function() {
		if (this.backOffTimer > 0 && this.offset == BEAST_OFFSET) return;
		var x = player.x + Math.cos(this.angle * ( Math.PI / 180.0 ) ) * ( playerSight.arc_length + this.size - this.offset );
		var y = player.y + Math.sin(this.angle * ( Math.PI / 180.0 ) ) * ( playerSight.arc_length + this.size - this.offset );
		ctx.beginPath();
		ctx.arc( Math.floor(x), Math.floor(y), this.size, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#000000";
		ctx.fill();
	},
	update : function() {
		if (!this.backingOff && this.backOffTimer > 0) {
			this.backOffTimer--;
			return;
		}
		if (this.backingOff) {
			this.offset -= 8;
			if (this.source.volume > 0) this.source.volume = (this.source.volume - 0.01).toFixed(2);
		}
		if (this.offset < -100) {
			this.backingOff = false;
			this.offset = BEAST_OFFSET;
			this.source.volume = 0;
			this.angle = Math.ceil(Math.random() * 360);
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
		
		this.backOffTimer = Math.random() * 500 + 800;
	}

};

