function Population(food, poison) {
	this.vehicles = [];
	this.popsize = 10;
	this.maxFitness = 0;
	for(var i = 0; i < this.popsize; ++i) {
		this.vehicles[i] = new Vehicle(random(width), random(height));
	}
	
	this.run = function() {
		for(var i = 0; i < this.vehicles.length; ++i) {
			if(this.vehicles[i].health > 0) {
				this.vehicles[i].eat(food);
				this.vehicles[i].avoid(poison);
				this.vehicles[i].edges();
				this.vehicles[i].update();
				this.vehicles[i].show();
				this.vehicles[i].health -= 0.1;
				if(this.vehicles[i].fitness > this.maxFitness) {
					this.maxFitness = this.vehicles[i].fitness;
				}
			} else {
				food.push(this.vehicles[i].pos);
				this.vehicles.splice(i, 1);
			}
		}
	}
}