var cities = [];
var totalCities = 15;
var record = Infinity;
var bestpath;
var current;

var population = [];
var popsize = 300;
var fitness = [];

function setup() {
	createCanvas(800, 600);
	// frameRate();
	var order = [];
	for(var i = 0; i < totalCities; ++i) {
		var v = createVector(random(width), random(height/2));
		cities[i] = v;
		order[i] = i;
	}

	for(var i = 0; i < popsize; ++i) {
		population[i] = shuffle(order);
	}
}

function draw() {
	background(0);

	//Genetic Algorithm
	calculateFitness();
	normalize();
	nextGeneration();

	stroke(255);
	strokeWeight(2);
	beginShape();
	noFill();
	for(var i = 0; i < bestpath.length; ++i) {
		var n = bestpath[i];
		vertex(cities[n].x, cities[n].y);
	}
	endShape();

	translate(0, height/2);

	stroke(255);
	strokeWeight(2);
	beginShape();
	noFill();
	for(var i = 0; i < current.length; ++i) {
		var n = current[i];
		vertex(cities[n].x, cities[n].y);
	}
	endShape();
}

function swap(a, i, j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
}

// slow calcDist function
function calcDist(points, order) {
	var sum = 0;
	for(var i = 0; i < order.length - 1; ++i) {
		var cityA = points[order[i]];
		var cityB = points[order[i + 1]];
		var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
		sum += d;
	}
	return sum;
}