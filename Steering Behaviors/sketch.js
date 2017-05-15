var vehicles = [];
var food = [];
var poison = [];
var debug;

function setup() {
	createCanvas(800, 640);
	for(var i = 0; i < 100; ++i) {
  		vehicles[i] = new Vehicle (random(width), random(height));
	}
  	for(var i = 0; i < 40; ++i) {
  		food.push(createVector(random(width), random(height)));
  	}
  	for(var i = 0; i < 20; ++i) {
  		poison.push(createVector(random(width), random(height)));
  	}
  	
  	debug = createCheckbox();
}

function draw() {
  background(51);
  
  if(random(1) < 0.1) {
  	food.push(createVector(random(width), random(height)));
  }
  
  if(random(1) < 0.01) {
  	poison.push(createVector(random(width), random(height)));
  }
  
  for(var i = 0 ; i < food.length; ++i) {
  	fill(0, 255, 0);
  	noStroke();
  	ellipse(food[i].x, food[i].y, 4, 4);
  }
  for(var i = 0; i < poison.length; ++i) {
  	fill(255, 0, 0);
  	noStroke();
	ellipse(poison[i].x, poison[i].y, 4, 4);
  }
  
  for(var i = vehicles.length - 1; i > 0; --i) {
  	vehicles[i].behaviors(food, poison);
  	vehicles[i].boundaries();
  	vehicles[i].update();
  	vehicles[i].show();
  	var newVehicle = vehicles[i].clone();
  	if (newVehicle !== null) {
  		newVehicle.health = 1;
  		vehicles.push(newVehicle);
  	}
  	if(vehicles[i].dead()) {
  		food.push(vehicles[i].pos);
  		vehicles.splice(i, 1);
  	}
  }
}

function mousePressed () {
	vehicles.push(new Vehicle (mouseX, mouseY));
}