class Cell {
  
  constructor(i, j) {

    this.i = i;
    this.j = j;
    this.a = i*w;
    this.b = j*w;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  checkNeighbors() {
    
    var neighbors = [];

    var top    = grid[index(this.i,  this.j -1)];
    var right  = grid[index(this.i+1,  this.j)];
    var bottom = grid[index(this.i,  this.j+1)];
    var left   = grid[index(this.i-1,  this.j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }

  }
  
  highlight() {
    
    noStroke();
    fill(0, 255, 0);
    rect(this.a+w/5, this.b+w/5, w*3/5, w*3/5);

  }

  show() {
    
    stroke(255);
    if (this.walls[0]) {
      line(this.a    , this.b    , this.a + w, this.b);
    }
    if (this.walls[1]) {
      line(this.a + w, this.b    , this.a + w, this.b + w);
    }
    if (this.walls[2]) {
      line(this.a + w, this.b + w, this.a    , this.b + w);
    }
    if (this.walls[3]) {
      line(this.a    , this.b + w, this.a    , this.b);
    }

    if (this.visited) {
      
      noStroke();
      fill(255, 0, 255, 100);
      rect(this.a, this.b, w, w);
    }
  }
 
  
	final() {
  
  	var gapofRect = floor(w/4);
    fill(255, 0, 0, 100);
    rect(this.a+w/5, this.b+w/5, w*3/5, w*3/5);
  }
    
    
    
}