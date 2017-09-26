c.width = innerWidth;							// Setting the dimensions of the canvas
c.height = innerHeight;


var cx = c.getContext("2d"),					// cx allows drawing to the canvas. c refers to the html element canvas
	G = 6.674*Math.pow(10,-11),					// gravitational constant
	earthRadius =  6371000,						// The radius of the earth in pixels
	pixel = 460000000/innerWidth,				// The distance represented by 1 pixel (the real radius of the earth / the radius in pixels)
	earthMass = 5.972*Math.pow(10,24),			// Real mass of the earth in kg
	moonMass = 7.34767309*Math.pow(10,22),		// Mass of the moon in kg
	issMass = 419455,							// Mass of the ISS in kg
	iterationsPerTick = 100,					// How many times the positions are updated every frame (it would be to slow if just 1)
	tick = 0,									// The current frame
	u = 8400,									// The initial horizontal velocity given to the ISS causing it to orbit
	planets = [];								// The array in which the data of each planet is stored (planet refers to any body so could be earth or iss)



// Converts degrees to radians
function toRadians(x){
	return x*Math.PI/180;
}

function toDegrees(x){
	return x*180/Math.PI;
}

// Creating the first planet (the earth)
// Parameters are x coordinate, y coordinate, initial velocity, angle for inital velocity, the radius of the circle, the mass, whether it can move, a label

// Sun
//planets.push(new Planet(c.width-10,c.height/2,0,0,0.5,1.989*Math.pow(10,30),true,"Sun"));

// Earth
planets.push(new Planet(100,c.height/2,0,0,screenDistance(earthRadius),earthMass,false,""));

// Moon
planets.push(new Planet(100+screenDistance(384400000),c.height/2,0,0,screenDistance(1737000),moonMass,false,""));

// Rocket
planets.push(new Planet(100,c.height/2-screenDistance(earthRadius+400000),10800*issMass,toRadians(-40.84),.1,issMass,true,""));



// The equation to find orbital velocity
function getOrbitalVelocity(m1,m2,r){
	return Math.sqrt(G*(m1+m2)/r);
}

// Converting pixel distance to actual distance
function actualDistance(s){
	return s*pixel;
}

// Converting actual distance to screen distance
function screenDistance(s){
	return s/pixel;
}

// Converts program time to real time in seconds
function realTime(programTime){
	return programTime/(60*iterationsPerTick);
}


// Gets the pixel distance between to objects using pythagoras theorem
function getDistance(x,y){
	return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}


// This is executed once every 0.016s (60 frames per second)
function main(){
	var i, j;
	
	

	for (j = 0; j < iterationsPerTick; j++){
		for (i = 0; i < planets.length; i++){
			if (planets[i].moveable)
				planets[i].update();
		}
	}
	
	cx.fillStyle = "rgba(0,0,0,0.01)";
	cx.fillRect(0,0,c.width,c.height);
	cx.fillStyle = "#FFFFFF";
	for (i = 0; i < planets.length; i++){
		planets[i].draw();
	}

	
	tick++;
	
	requestAnimationFrame(main);
}


main();
