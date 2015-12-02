
function size(){
  if (innerWidth < 496){
    c.width = innerWidth-6;
    c.style.marginLeft = "0";
  }
  else{
    c.width = 496;
    c.style.marginLeft = "calc((100vw - "+c.width+"px) / 2)";
  }
}

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
      pulsar: [[25,24], [25,23], [24,24], [26,24], [26,25], [26,26], [25,26], [24,26], [24,25], [25,27]],
      dino: [[31,7],[33,7],[34,7],[35,7],[36,7],[37,7],[38,7],[26,8],[27,8],[30,8],[31,8],[32,8],[33,8],[38,8],[39,8],[25,9],[26,9],[27,9],[30,9],[31,9],[32,9],[33,9],[39,9],[24,10],[25,10],[26,10],[27,10],[29,10],[30,10],[31,10],[32,10],[33,10],[34,10],[35,10],[36,10],[37,10],[38,10],[39,10],[40,10],[23,11],[24,11],[27,11],[28,11],[29,11],[32,11],[33,11],[34,11],[35,11],[22,12],[23,12],[27,12],[28,12],[33,12],[35,12],[36,12],[22,13],[23,13],[25,13],[28,13],[30,13],[33,13],[36,13],[37,13],[38,13],[39,13],[40,13],[41,13],[42,13],[19,14],[20,14],[21,14],[22,14],[23,14],[25,14],[28,14],[30,14],[33,14],[36,14],[37,14],[38,14],[39,14],[41,14],[42,14],[19,15],[20,15],[21,15],[22,15],[23,15],[25,15],[28,15],[30,15],[33,15],[34,15],[36,15],[42,15],[43,15],[15,16],[16,16],[17,16],[18,16],[19,16],[20,16],[21,16],[22,16],[23,16],[28,16],[34,16],[36,16],[40,16],[41,16],[42,16],[43,16],[13,17],[14,17],[15,17],[16,17],[17,17],[18,17],[19,17],[20,17],[21,17],[36,17],[39,17],[40,17],[41,17],[42,17],[43,17],[11,18],[12,18],[13,18],[14,18],[36,18],[37,18],[38,18],[39,18],[40,18],[10,19],[11,19],[12,19],[13,19],[36,19],[37,19],[10,20],[11,20],[36,20],[37,20],[38,20],[39,20],[40,20],[41,20],[42,20],[43,20],[44,20],[9,21],[10,21],[11,21],[37,21],[38,21],[39,21],[44,21],[45,21],[9,22],[10,22],[11,22],[15,22],[16,22],[37,22],[38,22],[39,22],[45,22],[10,23],[11,23],[38,23],[39,23],[46,23],[10,24],[11,24],[38,24],[39,24],[46,24],[10,25],[11,25],[38,25],[39,25],[41,25],[42,25],[43,25],[44,25],[45,25],[46,25],[10,26],[11,26],[12,26],[13,26],[14,26],[29,26],[30,26],[38,26],[39,26],[40,26],[41,26],[12,27],[13,27],[14,27],[15,27],[27,27],[28,27],[29,27],[38,27],[39,27],[13,28],[14,28],[15,28],[16,28],[17,28],[18,28],[19,28],[24,28],[25,28],[26,28],[27,28],[39,28],[16,29],[17,29],[18,29],[19,29],[20,29],[21,29],[22,29],[23,29],[24,29],[39,29],[40,29],[41,29],[42,29],[43,29],[44,29],[45,29],[46,29],[19,30],[20,30],[21,30],[22,30],[23,30],[24,30],[25,30],[26,30],[30,30],[31,30],[39,30],[40,30],[41,30],[46,30],[47,30],[20,31],[21,31],[22,31],[23,31],[24,31],[25,31],[26,31],[27,31],[28,31],[29,31],[30,31],[31,31],[32,31],[33,31],[34,31],[39,31],[40,31],[41,31],[47,31],[22,32],[23,32],[24,32],[25,32],[26,32],[27,32],[28,32],[29,32],[30,32],[31,32],[32,32],[33,32],[34,32],[39,32],[40,32],[41,32],[47,32],[26,33],[27,33],[28,33],[29,33],[30,33],[31,33],[32,33],[33,33],[34,33],[39,33],[40,33],[41,33],[42,33],[43,33],[44,33],[45,33],[46,33],[47,33],[48,33],[39,34],[40,34],[41,34],[47,34],[48,34],[39,35],[40,35],[41,35],[40,36],[41,36]]
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

addEventListener("resize", size);


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
size();
init();
