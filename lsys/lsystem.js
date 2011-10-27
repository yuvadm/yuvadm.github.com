/* LSystem */

function LSystem(axiom, ruleset) {
	this.alphabet = ['F', '+', '-', '[', ']'];
	this.axiom = axiom;
	this.rule = ["", "+", "-", "[", "]"];
	this.tree = "";

	this.rule[0] = ruleset;

	this.draw = function(x, y, zoom, angle, drawtype) {
		a.fillStyle = "#000";
		a.strokeStyle = "#000";

		a.save();
		a.translate(x, y);

		var i;

		for (i=0; i<this.tree.length; i++) {
			switch (this.tree.charAt(i)) {
				case 'F':
					switch (drawtype) {
						case 'line':
							a.beginPath();
							a.moveTo(0, 0);
							a.lineTo(zoom, 0);
							a.closePath();
							a.stroke();
							break;
						case 'hollow_circle':
							a.beginPath();
							a.arc(0, 0, zoom / 10, 0, Math.PI*2, true);
							a.closePath();
							a.stroke();
							break;
						case 'filled_circle':
							a.beginPath();
							a.arc(0, 0, zoom / 10, 0, Math.PI*2, true);
							a.closePath();
							a.fill();
							break;
						case 'faint':
							a.fillStyle = "rgba(0, 0, 0, " + (i / this.tree.length) + ")";
							a.beginPath();
							a.moveTo(Math.random() - .5, Math.random() - .5);
							a.lineTo(Math.sin(zoom) + (zoom / 2), Math.random() - .5);
							a.lineTo(zoom, 0);
							a.closePath();
							a.fill();
							break;
						case 'small_circles':
							a.fillStyle = "rgba(0, 0, 0, " + (i / this.tree.length) + 0.2 + ")";
							a.beginPath();
							a.moveTo(Math.random() - .5, Math.random() - .5);
							a.lineTo(Math.sin(zoom) + (zoom / 2), Math.random() - .5);
							a.arc(Math.sin(zoom) + (zoom / 2), Math.random() - .5, zoom / 5, 0, Math.PI*2, true);
							a.lineTo(zoom, 0);
							a.closePath();
							a.fill();
							break;
						case 'triangles':
							a.fillStyle = "rgba(0, 0, 0, " + (i / this.tree.length) + ")";
							a.beginPath();

							var dist = zoom / 2;
							var halfdist = dist / 2;
							a.moveTo(0, dist);
							a.lineTo(halfdist, halfdist);
							a.lineTo(dist, 0);
							a.lineTo(halfdist, -halfdist);
							a.lineTo(0, -dist);
							a.closePath();
							a.fill();
							break;
						case 'more_circles':
							a.fillStyle = "rgba(0, 0, 0, " + Math.random() + ")";
							a.beginPath();
							a.arc(Math.random() + .5, Math.random() - .5, (i / this.tree.length) * 5, 0, Math.PI*2, true);
							a.closePath();
							a.fill();

							a.fillStyle = "rgba(0, 0, 0, " + Math.random() + ")";
							a.beginPath();
							a.arc(Math.random() - .5, Math.random() + .5, (i / this.tree.length) * 3, 0, Math.PI*2, true);
							a.closePath();
							a.fill();

							break;
						case 'hatch':
							var red = Math.random() * 255;
							var green = Math.random() * 255;
							var blue = Math.random() * 255;
							a.strokeStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + (i / this.tree.length) + ")";
							a.beginPath();

							var dist = zoom / 2;
							a.moveTo(-dist, -dist);
							a.lineTo(dist, -dist);
							a.moveTo(-dist, 0);
							a.lineTo(dist, 0);
							a.moveTo(-dist, dist);
							a.lineTo(dist, dist);
							a.closePath();
							a.stroke();
							break;
					}
					a.translate(zoom, 0);
					break;

				case '+':
					a.rotate(angle);
					break;

				case '-':
					a.rotate(-angle);
					break;

				case '[':
					a.save();
					break;

				case ']':
					a.restore();
					break;
			}
		}
		a.restore();
	}

	this.iterate = function(max_length) {
		this.tree = this.axiom;
		var rule_length = [];
		var i;

		for (i=0; i<this.alphabet.length; i++) {
			rule_length[i] = this.rule[i].length;
		}

		for (i=0; i<max_length; i++) {
			var new_length = 0;
			var j;

			for (j=0; j<this.tree.length; j++) {
				var c = this.tree.charAt(j);
				var k;

				for (k=0; k<this.alphabet.length; k++) {
					if (c == this.alphabet[k]) {
						new_length += rule_length[k];
						break;
					}
				}
			}

			var new_tree = [];
		
			for (j=0; j<this.tree.length; j++) {
				var c = this.tree.charAt(j);
				var k;

				for (k=0; k<this.alphabet.length; k++) {
					if (c == this.alphabet[k]) {
						new_tree.push(this.rule[k]);
						break;
					}
				}
			}
			this.tree = new_tree.join("");
		}
	}
}
