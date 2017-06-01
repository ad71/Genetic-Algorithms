function calculateFitness() {
	var currentRecord = Infinity;
	for(var i = 0; i < population.length; ++i) {
		var d = calcDist(cities, population[i]);
		if (d < record) {
			record = d;
			bestpath = population[i];
		}
		if (d < currentRecord) {
			currentRecord = d;
			current = population[i];
		}
		fitness[i] = 1 / (d + 1);
	}
}

function normalize() {
	var sum = 0;
	for(var i = 0; i < fitness.length; ++i) {
		sum += fitness[i];
	}

	for(var i = 0; i < fitness.length; ++i) {
		fitness[i] = fitness[i]/sum;
	}
}

function nextGeneration() {
	var newpopulation = [];
	for(var i = 0; i < population.length; ++i) {
		var orderA = pickOne(population, fitness);
		var orderB = pickOne(population, fitness);
		var order = crossover(orderA, orderB);
		mutate(order, 0.01);
		newpopulation[i] = order;
	}
	population = newpopulation;
}

function pickOne(list, prob) {
	var i = 0;
	var r = random(1);

	while (r > 0) {
		r = r - prob[i];
		i++;
	}
	i--;
	return list[i].slice();
}

function mutate(order, mutationrate) {
	for(var i = 0; i < totalCities; ++i) {
		if(random(1) < mutationrate) {
			var indexA = floor(random(order.length));
			// var indexB = floor(random(order.length));
			// A better swap
			var indexB = (indexA + 1) % totalCities;
			swap(order, indexA, indexB);
		}
	}
}

function crossover(orderA, orderB) {
	var start = floor(random(orderA.length));
	var end = floor(random(start + 1, orderA.length));
	var neworder = orderA.slice(start, end);
	var left = totalCities - neworder.length;
	for(var i = 0; i < orderB.length; ++i) {
		var city = orderB[i];
		if (!neworder.includes(city)) {
			neworder.push(city);
		}
	}
	return neworder;
}