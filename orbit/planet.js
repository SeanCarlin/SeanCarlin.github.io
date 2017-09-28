function Planet(x,y,u,theta,r,m,moveable,text){
	var currentDistance, realDistance;
	
	this.index = planets.length;
	this.x = x
	this.y = y;
	this.r = r;
	this.m = m;
	this.time = 0;
	this.moveable = moveable;
	this.text = text;
	
	// The resultant force and resultant force from the previous frame are stored
	// to get the difference in the forces
	this.resultantForce = {
		x: 0,
		y: 0,
		previous: {
			x: 0,
			y: 0
		}
	};
	
	// The components of velocity are the values which are added to the x, y positions each frame
	this.velocity = {
		x: 0,
		y: 0
	};
	
	// Thrust is the other force given to the object
	this.thrust = {
		modulus: u,
		theta: theta
	};
	
	console.log(u);
	
	// Gravitational Force
	this.gForce = {
		modulus: 0,
		theta: 0
	};
	
	cx.strokeStyle = "#ffffff";
	// Draws the sphere to the canvas
	this.draw = function(){
		if (this.index == 2){
			cx.strokeStyle = "#FF0000";
			cx.fillStyle = "#FF0000";
		}
		else {
			cx.strokeStyle = "#FFFFFF";
			cx.fillStyle = "#ffffff";
		}
		cx.beginPath();
		cx.arc(this.x,this.y,this.r,0,2*Math.PI);
		
		cx.fillText(this.text,this.x+this.r,this.y-this.r);
		cx.closePath();
		cx.stroke();
	};
}

/* 
		Ok this is the biggy. All the calculations are done here.
		
		Im not gonna comment in this function cus JS is interpreted and each comment would be read as the program is run
		and this function is called 600 times a second which would slow it down.
		
		Essentially it calculates the resultant force acting on that particluar body caused by the thrust
		and the gravitational forces from every other object.
		
		It then divides the resultant force by the mass of the object to find the acceleration.
		It adds the acceleration to the velocity and then finally adds the velocity componenents to the x and y positions.
		
		To calculate the total gravitational force on an object it cycles through every other body
		it calculates the distance between those two objects
		it converts that distance in pixels to distance in meters
		it calculates the angle between the two objects
		it then uses the equation F = G(m1*m2)/r^2 to calculate the graviational force acting on that object
		then it adds the components of that force to the resultant force components
		It repeats this for every other object
		
		Once the graviational forces have been calculated it then adds the components of the thrust vectors to the resultant force
		Then it calculates the change in the resultant forces by subtracting the vectors from the previous resultant force vectors
		
		Once it has the resultant force components, it divides them by the mass (F/m = a) to find the acceleration. Then it converts
		these values back into pixel values.
		
		It adds the acceleration to the velocity to give the new rate of change of pixels
		and finally it adds the velocity components to the x and y coordinates
*/


Planet.prototype.update = function(){
	var obj, deltaX, deltaY, accelerationX, accelerationY;
	
	this.resultantForce.x = 0;
	this.resultantForce.y = 0;
	
	for (var j = 0; j < planets.length; j++){
		if (j != this.index){
		
			obj = planets[j];
			currentDistance = getDistance(obj.x-this.x,obj.y-this.y);
			realDistance = actualDistance(currentDistance);

			this.gForce.theta = Math.atan2(obj.y-this.y,obj.x-this.x);
			this.gForce.modulus = G*(obj.m*this.m)/(realDistance*realDistance);
			
			this.resultantForce.x += this.gForce.modulus*Math.cos(this.gForce.theta);
			this.resultantForce.y += this.gForce.modulus*Math.sin(this.gForce.theta);

		}
	}
	
	
	if (this.time > 100000 && this.time < 100200){
		this.thrust.modulus -= 1033000;
	}
	
	
	this.resultantForce.x += this.thrust.modulus*Math.cos(this.thrust.theta);
	this.resultantForce.y += this.thrust.modulus*Math.sin(this.thrust.theta);
	
	deltaX = this.resultantForce.x - this.resultantForce.previous.x;
	deltaY = this.resultantForce.y - this.resultantForce.previous.y;
	
	this.resultantForce.previous.x = this.resultantForce.x;
	this.resultantForce.previous.y = this.resultantForce.y;
	
	this.thrust.modulus = getDistance(this.resultantForce.x,this.resultantForce.y);
	this.thrust.theta = Math.atan2(this.resultantForce.y,this.resultantForce.x);
	
	accelerationX = screenDistance(deltaX/this.m);
	accelerationY = screenDistance(deltaY/this.m);
	
	this.velocity.x += accelerationX;
	this.velocity.y += accelerationY;
	
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	
	this.time++;
	
};
