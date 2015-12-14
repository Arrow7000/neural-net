// Perceptron class
function Perceptron(numOfInputs) {
	this.weightsArray = [];
	var c = 0.01; // The learning constant

	// Assign random weights to the inputs
	for (var i = 0; i < numOfInputs; i++) {
		this.weightsArray[i] = Math.random() * 2 - 1; // Weight is between -1 and 1
		// console.log(this.weightsArray[i]);
	}

	// Run inputs through Perceptron and give output
	this.feedForward = function(inputArray) {
		var sum = 0;
		for (var i = 0; i < inputArray.length; i++) {
			sum += inputArray[i] * this.weightsArray[i]; // Multiplies input by weight and adds to sum
		}
		return this.activate(sum); // Stepwise function. If sum is less than 0 => -1, otherwise 1
	}

	// Activation function
	this.activate = function(sum) {
		if (sum > 0) return 1;
		else return -1;
	}

	// Trains Perceptron by feeding it with array of inputs and the desired answer, and updating weights accordingly
	this.train = function(inputArray, desired) {
		var guess = this.feedForward(inputArray);
		var error = desired - guess;
		for (var i = 0; i < this.weightsArray.length; i++) {
			// Actual training happens here! Weights are updated via feedback from the distance of its output from the desired answer
			this.weightsArray[i] += c * error * inputArray[i];
		}
	}

}

// Trainer object is just a list of inputs with a known answer
function Trainer(x, y, a) {
	this.inputs = [];
	this.answer = a;

	this.inputs = [];
	this.inputs[0] = x;
	this.inputs[1] = y;
	this.inputs[2] = 1;
}




/// Main

// var p = new Perceptron(3);
// var point = [50, -12, 1];
// var result = p.feedForward(point);

// console.log(result);



var ptron,
	width = view.bounds.width,
	height = view.bounds.height,
	training = [],
	trainingLength = 2000,
	count = 0,
	circ = [],
	style = {
		strokeColor: 'black',
		strokeWidth: 2
	};

// the line function
function f(x) {
	return 9 / 16 * x;
}


function setup() {
	ptron = new Perceptron(3);

	for (var i = 0; i < trainingLength; i++) {

		// x and y are assigned to random points in the canvas
		var x = Math.random() * width;
		var y = Math.random() * height;


		// If y is less than f(x), answer is -1, and 1 otherwise. 
		var answer = 1;
		if (y < f(x)) answer = -1;
		console.log("x:", x, "\ny:", y, "\nf(x)", f(x), "\nanswer", answer);

		// The training array is filled with Trainer objects
		// Each Trainer is effectively a list of inputs along with the desired answer
		// x and y are inputs, and answer is the answer
		training[i] = new Trainer(x, y, answer);
		// console.log("training[i]", training[i]);
	}
}






// Plays every frame
function onFrame() {

	for (var i = 0; i < 1; i++) { // Controls how many points are placed on the canvas per frame

		// ptron gets trained with the list of inputs as first arg and answers as 2nd arg
		ptron.train(training[count].inputs, training[count].answer);

		var guess = ptron.feedForward(training[count].inputs);
		var point = new Point(training[count].inputs[0], training[count].inputs[1]);




		// Draws the circles representing the (x,y) locations of every point
		circ.push(new Path.Circle(point, 10));
		circ[count].style = style;
		if (guess < 0) circ[count].fillColor = 'black';



		// Increments the count
		count = (count + 1) % training.length;
		console.log("count:", count);
	}

}


setup();
