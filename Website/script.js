
var points = [],
	theta,
	scaledVx, scaledVy,
	d, G = 6, x, y,
	colors = ['blue', 'white'], mouse = false;

addEventListener("load", function(){

	c.width = 265;
	c.height = 265;

	var cx = c.getContext('2d'), j;

	cx.fillStyle = 'black';

	function sigmoid(t){
		return 1/(1+Math.exp(-0.3*t));
	}

	function distance(ax,ay,bx,by){
		return Math.sqrt(Math.pow(ax-bx,2) + Math.pow(ay-by,2));
	}
	
	function draw(){
		cx.fillStyle = 'black';
		cx.fillRect(0,0,c.width,c.height);
		

		for (i = 0; i < points.length; i++){
			cx.fillStyle = colors[points[i][4]];
			cx.beginPath();
			cx.moveTo(points[i][0], points[i][1]);
			cx.arc(points[i][0], points[i][1], 5, 0, 2*Math.PI);
			cx.closePath();
			cx.fill();

			if (mouse){
				d = distance(x,y,points[i][0],points[i][1]);
				theta = Math.atan2(points[i][1]-y,points[i][0]-x);
				points[i][2] += 100*G*Math.cos(theta)/(d*d);
				points[i][3] += 100*G*Math.sin(theta)/(d*d);
			}

			/*d = distance(c.width/2,c.height/2,points[i][0],points[i][1]);
			theta = Math.atan2(points[i][1]-c.height/2,points[i][0]-c.width/2);
			points[i][2] -= 0.0000001*G*Math.cos(theta)*(d*d);
			points[i][3] -= 0.0000001*G*Math.sin(theta)*(d*d);*/
		}

		for (i = 0; i < points.length; i++){
			for (j = 0; j < points.length; j++){
				if (i !== j){
					cx.strokeStyle = colors[points[j][4]];
					cx.beginPath();
					cx.moveTo(points[i][0], points[i][1]);
					if (points[i][5] && points[j][5])
						cx.lineTo(points[j][0], points[j][1]);

					cx.closePath();
					cx.stroke();

					d = distance(points[i][0],points[i][1],points[j][0],points[j][1]);
					theta = Math.atan2(points[i][1]-points[j][1],points[i][0]-points[j][0]);
					if (points[i][4] != points[j][4]){
						points[i][2] += G*Math.cos(theta)/(d*d);
						points[i][3] += G*Math.sin(theta)/(d*d);
					}
					else {
						points[i][2] -= G/2*Math.cos(theta)/(d*d);
						points[i][3] -= G/2*Math.sin(theta)/(d*d);
					}
				}
			}

			//points[i][2] += Math.random()-0.5;
			//points[i][3] += Math.random()-0.5;

			

			if ((points[i][0] < 20 && points[i][2] < 0) || (points[i][0] > c.width-20 && points[i][2] > 0)){
				points[i][2] *= -0.3;
			}

			if ((points[i][1] < 20 && points[i][3] < 0) || (points[i][1] > c.height-20 && points[i][3] > 0)){
				points[i][3] *= -0.3;
			}

			points[i][2] *= 0.98;
			points[i][3] *= 0.98;

			scaledVx = sigmoid(points[i][2])*2-1;
			scaledVy = sigmoid(points[i][3])*2-1;

			points[i][0] += scaledVx;
			points[i][1] += scaledVy;
		}
		
		

		requestAnimationFrame(draw);
	}

	for (var i = 0; i < 30; i++){
		points.push([50+Math.random()*(c.width-2*50), 50+Math.random()*(c.height-2*50), Math.random()*4-2, Math.random()*4-2, Math.floor(Math.random()*colors.length), Math.random()<0.15? true : false]);
	}
	//points = [[65,103,0,0],[93,199,0,0],[8,44,0,0],[38,285,0,0],[294,80,0,0]]
	draw();


	c.addEventListener("mousemove", function(e){
		mouse = true;
		x = e.clientX - c.offsetLeft;
		y = e.clientY - c.offsetTop;
	});

	c.addEventListener("mouseout", function(e){
		mouse = false;
	});

});