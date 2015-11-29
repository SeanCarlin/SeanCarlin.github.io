c.width = 500;
c.height = 500;

var cx = c.getContext("2d");

var cells = [],
    cellSize = 10;
		rows = Math.floor(c.height / cellSize),
		cols = Math.floor(c.width / cellSize),
		probability = 20,
    n = rows * cols,
    generations = 0,
    time = undefined;


function init(){
	var i, j;
	for (i = 0; i < rows; i++){
		for (j = 0; j < cols; j++){
		  cells.push({x: j, y: i, dead: true});
		}
	}
}

function draw(){
	var i, row, col, cell;
	for (i = 0; i < n; i++){
		cell = cells[i];
		if (!cell.dead){
		  cx.fillRect(cell.x*cellSize,cell.y*cellSize,cellSize,cellSize);
		}
	}
}

function update(){
	var i, cell, friends = [];
	for (i = 0; i < n; i++){
		friends.push(neighbours(i));
  }

  for (i = 0; i < n; i++){
		cell = cells[i];
    f = friends[i]
    if (cell.dead && f === 3){
      cell.dead = false;
    }
    if (f < 2 || f > 3){
  		cell.dead = true;
    }
	}
}

function neighbours(index){
	var i, f = 0, cell, dy, dx,
			cellX = cells[index].x,
			cellY = cells[index].y;

	for (i = 0; i < n; i++){
		cell = cells[i];

    dx = Math.abs(cellX - cell.x);
    dy = Math.abs(cellY - cell.y);

    if (cell.dead || dx === 0 && dy === 0 || dx >= 2 || dy >= 2){
      continue;
    }

    else{
        f++;
    }
  }

  return f;
}

function mainloop(){
	cx.clearRect(0,0,c.width,c.height);
  gen.innerHTML = generations;
  update();
	draw();
  generations++;
}

function start(){
  time = setInterval(mainloop, 100);
}

function stop(){
  clearInterval(time);
}

function clearCanvas(){
  var i;
  generations = 0;
  gen.innerHTML = generations;
  cx.clearRect(0,0,c.width,c.height);
  for (i = 0; i < n; i++){
    cells[i].dead = true;
  }
}

function randomGrid(){
  var i;
  for (i = 0; i < n; i++){
    cells[i].dead = Math.floor(Math.random()*100) < probability ? false : true;
  }
  draw();
}

addEventListener("click", function(e){
  var x = Math.floor((e.pageX - (innerWidth / 2 - c.width / 2)) / cellSize),
      y = Math.floor((e.pageY - (innerHeight / 2 - c.height / 2)) / cellSize),
      i;
      
  for (i = 0; i < n; i++){
    if (cells[i].x === x && cells[i].y === y){
      if (cells[i].dead){
        cx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
        cells[i].dead = false;
      }
      else {
        cx.clearRect(x*cellSize, y*cellSize, cellSize, cellSize);
        cells[i].dead = true;
      }
    }
  }
});

init();
