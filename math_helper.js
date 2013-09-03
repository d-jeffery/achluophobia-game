var MathHelper = {
	getAngleTo: function(x1, y1, x2, y2) {
		var deltaY = y2 - y1;
		var deltaX = x2 - x1;
		return (Math.atan2(deltaY, deltaX) * (180 / Math.PI));
	},
	dotproduct: function(a,b) {
		var n = 0;
		var lim = Math.min(a.length,b.length);
		for (var i = 0; i < lim; i++) n += a[i] * b[i];
		return n;
	},
	sign: function(x) {
		return x ? x < 0 ? -1 : 1 : 0;
	}
}
