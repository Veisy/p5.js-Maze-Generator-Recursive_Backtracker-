var cols, rows;
var w = 20;
var grid = [];

var current;

var stack = [];

let longestStack = [];

let turnbackFlag;  /*to avoid turnbacks
							while calculating longestStack */

let showLongest = true; /* to show longestStack length
													 only once */
        

function setup() {
  createCanvas(601, 601);
  cols = floor(width/w);
  rows = floor(height/w);
  //frameRate(5);

  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
  
}


function draw() {
  background(51);
  
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  
  current.highlight();
  
  // STEP 1
  var next = current.checkNeighbors();
  
  
  if (next) {
    next.visited = true;
    
		 // STEP 2
  	stack.push(current); 
    
    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  	
    turnbackFlag = true;
    
  } else if (stack.length > 0) {
    
    if (turnbackFlag === true) {
      stack.push(current);
      
      if (stack.length > longestStack.length) {
        longestStack = stack.slice();
     	}
    turnbackFlag = false;   
    }
    
    current = stack.pop();
    
  } else {
    
    longestStack[longestStack.length-1].final();
    
    for(let i = 0; i < longestStack.length-1; i++) {
      
      stroke(0, 220, 0);
      
      line(longestStack[i].a+w/2, longestStack[i].b+w/2,
           longestStack[i+1].a+w/2, longestStack[i+1].b+w/2);
      
    }
    
    if (showLongest === true) {
      console.log(longestStack.length);
      showLongest = false;
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}