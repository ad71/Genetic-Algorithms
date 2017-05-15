function Vehicle (x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(0, 2);
	this.acc = createVector();
	this.fitness = 0;
	this.dna = new DNA();
	this.maxAttraction = this.dna.genes[0];
	this.maxRepel = this.dna.genes[1];
	this.maxSpeed = this.dna.genes[2];
	this.maxHealth = 100;
	this.health = this.maxHealth;
	this.r = 12;
	
	this.update = function() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	
	this.applyForce = function(force) {
		this.acc.add(force);
	}
	
	this.eat = function(list) {
		var record = Infinity;
		var closest = -1;
		for(var i = 0; i < list.length; ++i) {
			var d = this.pos.dist(list[i]);
			if(d < record) {
				record = d;
				closest = i;
			}
		}
		
		if(record < 5) {
			this.fitness += 1;
			list.splice(closest, 1);
			if (this.health + 25 <= this.maxHealth) {
				this.health += 25;
			} else {
				this.health = this.maxHealth;
			}
		} else if (closest > -1) {
			this.seek(list[closest]);
		}
	}
	
	this.avoid = function(list) {
		var record = Infinity;
		var closest = -1;
		for(var i = 0; i < list.length; ++i) {
			var d = this.pos.dist(list[i]);
			if(d < record) {
				record = d;
				closest = i;
			}
		}
		
		if (record < 5) {
			this.fitness -= 1;
			list.splice(closest, 1);
			if(this.health - 25 >= 0) {
				this.health -= 25;
			} else {
				this.health = 0;
			}
		} else if (closest > -1) {
			this.repel(list[closest]);
		}
	}
	
	this.seek = function(target) {
		var desired = p5.Vector.sub(target, this.pos);
		desired.setMag(this.maxSpeed);
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxAttraction);
		this.applyForce(steer);
	}
	
	this.repel = function(target) {
		var desired = p5.Vector.sub(this.pos, target);
		desired.setMag(this.maxSpeed);
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxRepel);
		this.applyForce(steer);
	}
	
	this.edges = function() {
		if(this.pos.x > width) this.pos.x = 0;
		if(this.pos.x < 0) this.pos.x = width;
		if(this.pos.y > height) this.pos.y = 0;
		if(this.pos.y < 0) this.pos.y = height;
	}
	
	this.show = function() {
		var mapped = map(this.health, 0, this.maxHealth, 0, 255);
		fill(255-mapped, mapped, 0);
		noStroke();
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI / 2);
		beginShape();
		vertex(0, -this.r);
		vertex(this.r / 2, this.r / 2);
		vertex(0, 0);
		vertex(-this.r / 2, this.r / 2);
		endShape();
		pop();
	}
	
	this.calcFitness = function() { 
		return this.fitness;
	}
}