var mr = 0.01;

function Vehicle (x, y, dna) {
	this.acc = createVector();
	this.vel = createVector(0, -2);
	this.pos = createVector(x, y);
	this.r = 8;
	this.maxspeed = 4;
	this.maxforce = 0.5;
	this.health = 1;
	
	this.dna = [];
	if (dna === undefined) {
		this.dna[0] = random(-2, 2);
		this.dna[1] = random(-2, 2);
		//food pereption
		this.dna[2] = random(100);
		//poison perception
		this.dna[3] = random(100);
	} else {
		//Mutation
		this.dna[0] = dna[0];
		if (random(1) < mr) {
			this.dna[0] += random(-0.1, 0.1);
		}
		this.dna[1] = dna[1];
		if (random(1) < mr) {
			this.dna[1] += random(-0.1, 0.1);
		}
		this.dna[2] = dna[2];
		if (random(1) < mr) {
			this.dna[2] += random(-10, 10);
		}
		this.dna[3] = dna[3];
		if (random(1) < mr) {
			this.dna[3] += random(-10, 10);
		}
	}
	
	this.update = function() {
		this.health -= 0.01;
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	
	this.applyForce = function(force) {
		this.acc.add(force);
	}
	
	this.eat = function(list, nutrition, perception) {
		var record = Infinity;
		var closest = null;
		for(var i = list.length - 1; i >= 0; --i) {
			var d = this.pos.dist(list[i]);
			
			if(d < this.maxspeed) {
				list.splice(i, 1); //removes '1' element from food at index closest
				this.health += nutrition;
			} else if(d < record && d < perception) {
				record = d;
				closest = list[i];
			}
		}
	
		if (closest !== null) {
			return this.seek(closest);
		}
		return createVector();
	}
	
	this.behaviors = function(good, bad) {
		var steerG = this.eat(good, 0.3, this.dna[2]);
		var steerB = this.eat(bad, -0.75, this.dna[3]);
		
		steerG.mult(this.dna[0]);
		steerB.mult(this.dna[1]);
		
		this.applyForce(steerG);
		this.applyForce(steerB);
	}
	
	this.dead = function() {
		return (this.health < 0);
	}
	
	this.seek = function(target) {
		var desired = p5.Vector.sub(target, this.pos);
		desired.setMag(this.maxspeed);
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxforce);
		return steer;
	}
	
	this.clone = function() {
		if(random(1) < 0.001) {
			return new Vehicle(this.pos.x, this.pos.y, this.dna);
		} else {
			return null;
		}
	}
	
	this.show = function() {
		var theta = this.vel.heading() + PI / 2;
		push();
		var gr = color(0, 255, 0);
		var rd = color(255, 0, 0);
		var col = lerpColor(rd, gr, this.health);
	
		fill(col);
		stroke(col);
		translate(this.pos.x, this.pos.y);
		rotate(theta);
		beginShape();
		vertex(0, -this.r);
		vertex(this.r/2, this.r/2);
		vertex(0, 0);
		vertex(-this.r/2, this.r/2);
		endShape();
		if(debug.checked()) {
			stroke(0, 255, 0);
			noFill();
			line(0, 0, 0, -this.dna[0]*40);
			ellipse(0, 0, this.dna[2] * 2);
			stroke(255, 0, 0);
			noFill();
			line(0, 0, 0, -this.dna[1]*40);
			ellipse(0, 0, this.dna[3] * 3);
		}
		pop();
	}
	
	this.boundaries = function() {
		
		
		if(this.pos.x > width) this.pos.x = 0;
		if(this.pos.x < 0) this.pos.x = width;
		if(this.pos.y > height) this.pos.y = 0;
		if(this.pos.y < 0) this.pos.y = height;
		//The function below applies a centre-seeking force to vehicles at the boundary
		
		//TODO: fix error in this function
		/*var d = 25;
		var desired = null;
		if(this.pos.x < d) {
			desired = createVector(this.maxspeed, this.vel.x);
		} else if (this.pos.x > width - d) {
			desired = createVector(-this.maxspeed, -this.vel.x);
		}
		
		if(this.pos.y < d) {
			desired = createVector(this.vel.x, this.maxspeed);
		} else if (this.pos.y > height - d) {
			desired = createVector(this.vel.x, -this.maxSpeed);
		}
		
		if(desired != null) {
			desired.normalize();
			desired.mult(this.maxspeed);
			var steer = p5.Vector.sub(desired, this.vel);
			steer.limit(this.maxforce);
			this.applyForce(steer);
		}*/
	}
}