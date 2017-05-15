var population;
var lifespan = 400;
var maxForce = 0.7;
var lifeP;
var count = 0;
var target;
var obstacle = [];
var generation = 1;
//var rx = 400;
//var ry = 400;
//var rw = 500;
//var rh = 40;
var IQ = 10;

function setup() {
  createCanvas(1300, 660);
  rocket = new Rocket();
  population = new Population();
  obstacle[0] = new Obstacle(400, 400, 500, 40);
  obstacle[1] = new Obstacle(100, 100, 20, 100);
  lifeP = createP();
  target = createVector(width/2, 50);
}

function draw() {
  background(0);
  population.run();
  lifeP.html('Generation: ' + generation);
  count++;
  if(count == lifespan) {
  	population.evaluate();
  	population.selection();
  	count = 0;
  	generation++;
  }
  //rect(rx, ry, rw, rh);
  for(var i = 0; i < obstacle.length; ++i) {
  	obstacle[i].show();
  }
  ellipse(target.x, target.y, 16, 16);
}

function Population() {
	this.rockets = [];
	this.matingPool = [];
	this.popsize = 50;
	for(var i = 0; i < this.popsize; ++i) {
		this.rockets[i] = new Rocket();
	}
	
	this.evaluate = function() {
		var maxfit = 0;
		//to normalize
		for(var i = 0; i < this.popsize; ++i) {
			this.rockets[i].calcFitness();
			if(this.rockets[i].fitness > maxfit) {
				maxfit = this.rockets[i].fitness;
			}
		}
		
		for(var i = 0; i < this.popsize; ++i) {
			this.rockets[i].fitness /= maxfit;
		}
		
		this.matingPool = [];
		for(var i = 0; i < this.popsize; ++i) {
			var n = this.rockets[i].fitness*100;
			for(var j = 0; j < n; ++j) {
				this.matingPool.push(this.rockets[i]);
			}
		}
	}
	
	this.selection = function() {
		var newRockets = [];
		for(var i = 0; i < this.rockets.length; ++i) {
			//var parentA = random(this.matingPool) returns a Rocket object
			var parentA = random(this.matingPool).dna;
			var parentB = random(this.matingPool).dna;
			//Ideally both parents shouldn't be the same
			var child = parentA.crossover(parentB);
			//child is a dna object
			child.mutate();
			newRockets[i] = new Rocket(child);
		}
		this.rockets = newRockets;
	}
	
	this.run = function() {
		for(var i = 0; i < this.popsize; ++i) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}
} 

function DNA(genes) {
	if(genes) {
		this.genes = genes;
	} else {
		this.genes = [];
		for(var i = 0; i < lifespan; ++i) {
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(maxForce);
		}
	}
	
	this.crossover = function(partner) {
		var newgenes = [];
		var mid = floor(random(this.genes.length));
		for(var i = 0; i < this.genes.length; ++i) {
			if (i > mid) {
				newgenes[i] = this.genes[i];
			} else {
				newgenes[i] = partner.genes[i];
			}
		}
		return new DNA(newgenes);
	}
	
	this.mutate = function() {
		for(var i = 0; i < this.genes.length; ++i) {
			if(random(1) < 0.01) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxForce);
			}
		}
	}
}

function Obstacle(x, y, w, h) {
	this.ox = x;
	this.oy = y;
	this.ow = w;
	this.oh = h;
	this.show = function() {
		fill(255);
		noStroke();
		rect(this.ox, this.oy, this.ow, this.oh);
	}
	
	this.crashed = function(x, y) {
		if(x > this.ox && x < this.ox + this.ow && y > this.oy && y < this.oy + this.oh) {
			return true;
		} else {
			return false;
		}
	}
}

function Rocket(dna) {
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.fitness = 0;
	this.completed = false;
	this.crashed = false;
	if(dna) {
		this.dna = dna;
	} else {
		this.dna = new DNA();
	}
	
	this.applyForce = function(force) {
		this.acc.add(force);
	}
	
	this.update = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if(d < 10) {
			this.completed = true;
			this.pos = target.copy();
		}
		//if(this.pos.x > obstacle[0].ox && this.pos.x < obstacle[0].ox + obstacle[0].ow && this.pos.y > obstacle[0].oy && this.pos.y < obstacle[0].oy + obstacle[0].oh) {
		//	this.crashed = true;
		//}
		for(var i = 0; i < obstacle.length; ++i) {
			if(obstacle[i].crashed(this.pos.x, this.pos.y)) {
				this.crashed = true;
			}
		}
		/*
		//To crash at window margins
		if(this.pos.x > width || this.pos.x < 0) {
			this.crashed = true;
		}
		
		if(this.pos.y > height || this.pos.y < 0) {
			this.crashed = true;
		}
		*/
		this.applyForce(this.dna.genes[count]);
		if(!this.completed && !this.crashed) {
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
		}
	}
	
	this.calcFitness = function() {
		var d = dist(target.x, target.y, this.pos.x, this.pos.y);
		//var od = dist(obstacle[0].ox, obstacle[0].oy, this.pos.x, this.pos.y);
		this.fitness = (height-d)*(height-d)*(height-d);
		//this.fitness += od;
		//if(d > od) {
		//	this.fitness = 0.01;
		//}
		if(this.completed) {
			this.fitness *= IQ;
		}
		if(this.crashed) {
			this.fitness = 0.01;
		}
	}
	
	this.show = function() {
		push();
		noStroke();
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + 3.1415926535897932/2);
		beginShape();
		vertex(0, -10);
		vertex(4, 10);
		vertex(0, 4);
		vertex(-4, 10);
		endShape();
		pop();
	}
}