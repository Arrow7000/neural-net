// var path = new Path.Circle(view.center, 100);
// path.fillColor = '#000';

// Perceptron class
function Perceptron(inputNumber) {
	this.weightsArray = [];
	var c = 0.01;

	// Assign random weights to the inputs
	for (var i = 0; i < inputNumber; i++) {
		this.weightsArray[i] = Math.random() * 2 - 1;
		// console.log(this.weightsArray[i]);
	}



	// Run inputs through Perceptron and give output
	this.feedForward = function(inputArray) {
		var sum = 0;
		// console.log(inputArray);
		for (var i = 0; i < inputArray.length; i++) {
			sum += inputArray[i] * this.weightsArray[i]
		}
		return this.activate(sum);
	}

	// Activation function
	this.activate = function(sum) {
		if (sum > 0) return 1;
		else return -1;
	}

	this.train = function(inputArray, desired) {
		var guess = this.feedForward(inputArray);
		var error = desired - guess;
		for (var i = 0; i < this.weightsArray.length; i++) {
			this.weightsArray[i] += c * error * inputArray[i];
		}
	}

}

function Trainer(x, y, a) {
	this.inputs = [];
	this.answer;

	this.inputs = [];
	this.inputs[0] = x;
	this.inputs[1] = y;
	this.inputs[2] = 1;

	this.answer = a;
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
	traininglength = 2000,
	count = 0,
	circ;

function f(x) {
	return 2 * x + 1;
}

function setup() {
	ptron = new Perceptron(3);

	for (var i = 0; i < traininglength; i++) {
		var x = Math.random() * width;
		var y = Math.random() * height;
		var answer = 1;
		if (y < f(x)) answer = -1;
		training[i] = new Trainer(x, y, answer);
	}
	circ = [];
}

var style = {
	strokeColor: 'black',
	strokeWidth: 2
}

function draw() {
	// console.log("First trainer:", training[0].inputs);
	ptron.train(training[training.length - 1].inputs, training[training.length - 1].answer);
	// console.log(training[length].inputs);
	count = (count + 1) % training.length;
	// console.log(training.length);

	for (var i = 0; i < 2000; i++) {
		var guess = ptron.feedForward(training[i].inputs);
		var point = new Point(training[i].inputs[0], training[i].inputs[1]);
		// console.log(point);

		circ.push(new Path.Circle(point, 10));
		circ[i].style = style;
		if (guess > 0) {} else {
			circ[i].fillColor = 'black';
		}
	}
}

setup();
draw();
