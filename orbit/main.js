c.width = innerWidth;							// Setting the dimensions of the canvas
c.height = innerHeight;


var cx = c.getContext("2d"),					// cx allows drawing to the canvas. c refers to the html element canvas
	G = 6.674*Math.pow(10,-11),					// gravitational constant
	earthRadius =  200,							// The radius of the earth in pixels
	pixel = 6371000/earthRadius,				// The distance represented by 1 pixel (the real radius of the earth / the radius in pixels)
	earthMass = 5.972*Math.pow(10,24),			// Real mass of the earth in kg
	issMass = 419455,							// Mass of the ISS in kg
	iterationsPerTick = 10,						// How many times the positions are updated every frame (it would be to slow if just 1)
	tick = 0,									// The current frame
	totalTime = 3000,							// The number of frames before the program stops
	u = 7672,									// The initial horizontal velocity given to the ISS causing it to orbit
	planets = [];								// The array in which the data of each planet is stored (planet refers to any body so could be earth or iss)


// Converts degrees to radians
function toRadians(x){
	return x*Math.PI/180;
}

// Creating the first planet (the earth)
// Parameters are x coordinate, y coordinate, initial velocity, angle for inital velocity, the radius of the circle, the mass, whether it can move, a label
planets.push(new Planet(c.width/2, c.height/2, 0, 0, earthRadius, earthMass, true, ""));


//planets.push(new Planet(c.width/2, c.height/2-earthRadius-screenDistance(400000), u*issMass, 0, 1, issMass, true, "ISS"));
//planets.push(new Planet(0, c.height/2-100, u*issMass*0.5, toRadians(60), 1, issMass, true, "A001"));


// Creating 30 other rockets
for (var i = 0; i < 30; i++){
	planets.push(new Planet(5,Math.random()+c.height/2,issMass*u*Math.random(),Math.PI-Math.random()*2*Math.PI,1,issMass,true,""));
}


// The equation to find orbital velocity
function getOrbitalVelocity(m1,m2,r){
	//SQRT(G*M/R)
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


// Gets the pixel distance between to objects using pythagoras theorem
function getDistance(x,y){
	return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}


// This is executed once every 0.016s (60 frames per second)
function main(){
	var i, j;
	
	cx.fillStyle = "rgba(0,0,0,0.05)";
	cx.fillRect(0,0,c.width,c.height);
	cx.fillStyle = "#FFFFFF";

	for (j = 0; j < iterationsPerTick; j++){
		for (i = 0; i < planets.length; i++){
			planets[i].update();
		}
	}
	
	for (i = 0; i < planets.length; i++){
		planets[i].draw();
	}
	
	tick++;
	
	if (tick < totalTime){
		requestAnimationFrame(main);
	}
	
	else {
		getFitnessValues();
	}
}


main();













