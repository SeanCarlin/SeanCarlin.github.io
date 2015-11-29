c.width = 496;
c.height = 496;

var cx = c.getContext("2d");

var cells = [],
    cellSize = 8;
		rows = Math.floor(c.height / cellSize),
		cols = Math.floor(c.width / cellSize),
		probability = 20,
    n = rows * cols,
    generations = 0,
    population = 0,
    time = undefined,
    flag = false,
    patterns = {
      gliderGun: [[4,8],[5,8],[4,9],[5,9],[14,8],[14,9],[14,10],[15,11],[16,12],[17,12],[19,11],[20,10],[20,9],[20,8],[19,7],[17,6],[16,6],[15,7],[18,9],[21,9],[26,9],[25,8],[25,7],[25,6],[24,8],[24,7],[24,6],[26,5],[28,4],[28,5],[28,9],[28,10],[38,6],[39,6],[38,7],[39,7]],
      glider: [[4,3], [4,4], [4,5], [3,5], [2,4]],
      pentadecathlon: [[22,25], [23,25], [24,24], [24,26], [25,25], [26,25], [27,25], [28,25], [29,24], [29,26], [30,25], [31,25]],
      pulsar: [[25,24], [25,23], [24,24], [26,24], [26,25], [26,26], [25,26], [24,26], [24,25], [25,27]]
    };

function init(){
	var i, j;
	for (i = 0; i < rows; i++){
		for (j = 0; j < cols; j++){
		  cells.push({x: j, y: i, dead: true});
		}
	}
  updateInfo();
}

function initPattern(p){
  var i, cell;
  resetCanvas();
  for (i = 0; i < n; i++){
    for (j = 0; j < p.length; j++){
      cell = cells[i];
      if (cell.x === p[j][0] && cell.y === p[j][1]){
        cell.dead = false;
      }
    }
  }
  draw();
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
	var i, cell, neighbours = [];
  population = 0;
	for (i = 0; i < n; i++){
		neighbours.push(checkNeighbours(i));
  }

  for (i = 0; i < n; i++){
		cell = cells[i];
    f = neighbours[i];

    if (cell.dead && f === 3){
      cell.dead = false;
    }
    if (f < 2 || f > 3){
  		cell.dead = true;
    }
	}
}

function checkPopulation(){
  var i;
  population = 0;
  for (i = 0; i < n; i++){
    if (!cells[i].dead)
      population++;
  }
}

function updateInfo(){
  gen.innerHTML = generations;
  num.innerHTML = population;
}

function checkNeighbours(index){
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

    else {
        f++;
    }
  }

  return f;
}

function mainloop(){
	cx.clearRect(0,0,c.width,c.height);
  checkPopulation();
  updateInfo();
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

function resetCanvas(){
  var i;
  generations = 0;
  population = 0;
  updateInfo();
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
  checkPopulation();
  updateInfo();
  draw();
}

addEventListener("mousedown", function(e){
  eventHandler(e);
  flag = true;
});

addEventListener("mousemove", function(e){
  if (flag)
    eventHandler(e);
});

addEventListener("mouseup", function(e){
  flag = false;
});


function eventHandler(e){
  var x = Math.floor((e.pageX - c.offsetLeft - 3) / cellSize),
      y = Math.floor((e.pageY - c.offsetTop - 3) / cellSize),
      i;

  for (i = 0; i < n; i++){
    cell = cells[i];
    if (cell.x === x && cell.y === y){
      if (cell.dead){
        cx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
        cell.dead = false;
      }
      else if (!cell.dead && !flag){
        cx.clearRect(x*cellSize, y*cellSize, cellSize, cellSize);
        cell.dead = true;
      }
    }
  }
}


// Lift-off
init();
