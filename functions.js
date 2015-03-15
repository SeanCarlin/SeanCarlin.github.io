(function(){

	var c = document.getElementById("c"),
		ctx = c.getContext("2d"),
		lines = [],
		spacing = 5,
		directions = ["LEFT", "RIGHT"],
		colors = ["#87BDB1", "#AACCB1", "#C3DBB4", "#D3E2B6"],
		n, i, y = 0;

	c.width = innerWidth;
	c.height = 320;

	if (innerHeight < 600)
		c.height = 200;

	n = c.height / spacing;

	for (i = 0; i < n; i++){
		y += spacing;
		lines.push({
			x: Math.floor(Math.random() * c.width),
			y: y,
			width: 20,
			height: 2,
			speed: Math.random(),
			direction: directions[Math.floor(Math.random() * directions.length)],
			color: colors[Math.floor(Math.random() * colors.length)]
		});
	}

	function draw(){
		var i;
		ctx.clearRect(0,0,c.width,c.height);

		for (i = 0; i < n; i++){

			if (lines[i].opacity > 0.6)
				lines[i].opacity -= 0.3;

			ctx.fillStyle = lines[i].color;
			ctx.fillRect(lines[i].x, lines[i].y, lines[i].width, lines[i].height);

			if (lines[i].direction == "RIGHT")
				lines[i].x += lines[i].speed;

			if (lines[i].direction == "LEFT")
				lines[i].x -= lines[i].speed;

			if (lines[i].x > c.width && lines[i].direction == "RIGHT")
				lines[i].x = 0 - lines[i].width;

			if (lines[i].x < 0 - lines[i].width && lines[i].direction == "LEFT")
				lines[i].x = c.width;
		}

		requestAnimationFrame(draw);
	}

	draw();

}());

$('a').click(function (e) {
    e.preventDefault();
    var goTo = this.getAttribute("href");

    setTimeout(function(){
         window.location = goTo;
    },200);       
}); 