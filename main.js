
var draw;
// var colors = ['006494','247BA0','1B98E0','E8F1F2'];
// var colors = ['3a86ff', '8338ec', 'ff006e', 'fb5607', 'ffbe0b'];
var colors = ['fff'];
var focus = {
	x: innerWidth*0.6,
	y: 300
};
var G = 1500;
var N = 5;
var H = 600;
var vel ={
	maxV: 1,
	minV: 0.9
};
var points = [];

function Point(){
	this.x = (-0.5+Math.random())*300 + innerWidth*0.6;
	this.y = (-0.5+Math.random())*300 + H/2;//Math.random()<0.5? -2 : H+2;
	this.vx = Math.random()<0.5 ? (vel.minV+Math.random()*vel.maxV) : -(vel.minV+Math.random()*vel.maxV);
	this.vy = this.y > H/2 ? (vel.minV+Math.random()*vel.maxV) : -(vel.minV+Math.random()*vel.maxV);
	this.color = colors[Math.floor(Math.random() * colors.length)];
	this.locations = [];
	this.render = draw.polyline(this.locations).fill('none').stroke('#'+this.color, {width:4});
}

Point.prototype.draw = function(){
	this.locations.push([this.x,this.y]);
	if (this.locations.length > 100){
		this.locations.shift();
	}
	this.render.plot(this.locations);
}

Point.prototype.update = function(){
	var delta = {
		x: focus.x - this.x,
		y: focus.y - this.y
	}
	var theta = Math.atan2(delta.y, delta.x);
	var rsquared = delta.x*delta.x + delta.y*delta.y + 1000;
	var acceleration = G/rsquared;

	this.vx += acceleration * Math.cos(theta);
	this.vy += acceleration * Math.sin(theta);

	for (var i = 0; i < points.length; i++){
		delta.x = this.x-points[i].x;
		delta.y = this.y-points[i].y;
		if (delta.x === 0 && delta.y === 0)
			continue;

		theta = Math.atan2(delta.x, delta.y);
		rsquared = delta.x*delta.x + delta.y*delta.y + 1000;
		acceleration = -G*0.2/rsquared;

		this.vx += acceleration * Math.cos(theta);
		this.vy += acceleration * Math.sin(theta);
	}

	this.x += this.vx;
	this.y += this.vy;

}

function main(){
	for(var i=0; i < N; i++){
		points[i].update();
		points[i].draw();
	}

	requestAnimationFrame(main);
}

// SVG.on(document, 'DOMContentLoaded', function() {
// 	draw = SVG().addTo('#c').size(innerWidth, H);
// 	console.log('done');
// 	for(var i=0; i < N; i++){
// 		points.push(new Point());
// 	}

// 	main();

// });

addEventListener("click", function(e){
	if(e.clientY < H){
		focus.x = e.clientX;
		focus.y = e.clientY;
	}
});
















