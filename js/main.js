var path = new Path.Circle(view.center, 100);
path.fillColor = '#000';

// Perceptron class
function Perceptron(inputNumber) {
	this.weights = [];
	var c = 0.01;

	// Assign random weights to the inputs
	for (var i = 0; i < inputNumber; i++) {
		this.weights[i] = Math.random() * 2 - 1;
		console.log(this.weights[i]);
	}



	// Run inputs through Perceptron and give output
	this.feedForward = function(inputs) {
		var sum = 0;
		for (var i = 0; i < inputs.length; i++) {
			sum += inputs[i] * this.weights[i]
		}
		return this.activate(sum);
	}

	// Activation function
	this.activate = function(sum) {
		if (sum > 0) return 1;
		else return -1;
	}

	this.train = function(inputs, desired) {
		var guess = this.feedForward(inputs);
		var error = desired - guess;
		for (var i = 0; i < this.weights.length; i++) {
			this.weights[i] += c * error * inputs[i];
		}
	}

}

function Trainer(x, y, a) {
	var inputs = [];
	var answer;

	inputs = [];
	inputs[0] = x;
	inputs[1] = y;
	inputs[2] = 1;

	answer = a;
}




// Main

// var p = new Perceptron(3);
// var point = [50, -12, 1];
// var result = p.feedForward(point);

// console.log(result);



var ptron,
	width = view.bounds.width,
	height = view.bounds.height;

var training = [],
	traininglength = 2000;

var count = 0;

function f(x) {
	return 2 * x + 1;
}

function setup() {
	ptron = new Perceptron(3);

	for (var i = 0; i < traininglength.length; i++) {
		var x = Math.random() * width - width / 2;
		var y = Math.random() * height - height / 2;
		var answer = 1;
		if (y < f(x)) answer = -1;
		training[i] = new Trainer(x, y, answer);
	}
}

function draw() {
	ptron.train(training.length.inputs, training.length.answer);
	console.log(training.length.inputs);
	count = (count + 1) % training.length;
}

setup();
draw();
