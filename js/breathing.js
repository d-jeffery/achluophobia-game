//Code sample stolen from http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/

// Detect if the audio context is supported.
window.AudioContext = (
  window.AudioContext ||
  window.webkitAudioContext ||
  null
);

if (!AudioContext) {
  throw new Error("AudioContext not supported!");
} 

var breathSound = {
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
		this.backOffTimer = 1000;
	},
	update : function() {
		if (this.backOffTimer > 0) {
			this.backOffTimer--;
			return;
		}
		if (this.source.volume < 1) {
			//Damn rounding errors
			this.source.volume = (this.source.volume + 0.001).toFixed(3);
		}
	},
	getAngle : function() {
		return this.angle;
	},
	newPosition : function() {
		if (this.backOffTimer > 0) {
			return;
		}
		this.angle = Math.ceil(Math.random() * 360);
		this.source.volume = 0;
		this.backOffTimer = Math.random() * 500 + 500;
	}

};

