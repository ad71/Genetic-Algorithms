var vehicle;
var food = [];
var poison = [];
var population;
var fitP;

function setup() {
  createCanvas(800, 600);
  fitP = createP('');
  vehicle = new Vehicle(width/2, height/2);
  for(var i = 0; i < 100; ++i) {
  	food.push(createVector(random(width), random(height)));
  }
  for(var i = 0; i < 100; ++i) {
  	poison.push(createVector(random(width), random(height)));
  }
  population = new Population(food, poison);
}

function draw() {
  background(51);
  for(var i = 0; i < food.length; ++i) {
  	fill(0, 255, 0);
  	noStroke();
  	ellipse(food[i].x, food[i].y, 8, 8);
  }
  for(var i = 0; i < poison.length; ++i) {
  	fill(255, 0, 0);
  	noStroke();
  	ellipse(poison[i].x, poison[i].y, 8, 8);
  }
  population.run();
  fitP.html('Maximum fitness: ' + population.maxFitness);
}