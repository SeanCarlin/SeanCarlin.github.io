
var n = 30, i,
	fitnessValues = [];

function getFitnessValues(){	
	for (i = 1; i < planets.length-1; i++){
		fitnessValues.push(calculateFitness(planets[i].time));
	}
}

function calculateFitness(t){
	return t / (totalTime*iterationsPerTick);
}

//for (i = 0; i < timeValues.length; i++){
//	console.log(timeValues[i]);
//}