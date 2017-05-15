function DNA() {
	this.genes = [];
	this.genes[0] = random(-5, 5);//maxAttraction
	this.genes[1] = random(-5, 5);//maxRepel
	this.genes[2] = random(0, 10);//maxSpeed
}