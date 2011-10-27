/* Based on http://www.robotacid.com/PBeta/LSystem/index.html */

var lsystem = new LSystem();

var width = 1200;
var height = 600;

var HALF_PI = 3.141592 / 2;

function setup(axiom, ruleset, iterations) {
	lsystem = new LSystem(axiom, ruleset);
	lsystem.iterate(iterations);
}

function saveImage() {
	console.log("save");
	window.open(c.toDataURL());
}

function draw(x, y, axiom, ruleset, iterations, angle, zoom, drawtype) {
	a.fillStyle = "#fff";
	a.fillRect(0, 0, width, height);

	var angle_radians = parseFloat(angle) * (Math.PI / 360);

	lsystem.draw(x, y, zoom, angle_radians, drawtype);

	a.fillStyle = "#666";
	a.fillRect(0, 0, width, 20);
	a.fillStyle = "#fff";
	a.font = "bold 10px 'Lucida Grande', Helvetica";

	var str = "axiom: " + axiom + "         ";
	str += "ruleset: " + ruleset + "         ";
	str += "angle: " + angle + "º         ";
	str += "iterations: " + iterations + "         ";
	str += "zoom: " + zoom + "         ";
	str += "x: " + x + "    ";
	str += "y: " + y + "    ";
	str += "drawtype: " + drawtype;
	a.fillText(str, 5, 13);
}

function generate() {
	var axiom = document.getElementById("axiom").value;
	var ruleset = document.getElementById("ruleset").value;
	var angle = document.getElementById("angle").value;
	var iterations = document.getElementById("iterations").value;
	var zoom = document.getElementById("zoom").value;

	var x = document.getElementById("x").value;
	var y = document.getElementById("y").value;

	var drawtype = document.getElementById("drawtype").value;

	setup(axiom, ruleset, iterations);
	draw(x, y, axiom, ruleset, iterations, angle, zoom, drawtype);
}

generate();
