//
// Implementing animated canvas tutorial from:
// https://youtu.be/EO6OkltgudE
//

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctxt = canvas.getContext('2d');
var tau = Math.PI * 2;


function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.hue = Math.random() * 360;

	this.draw = function() {
		ctxt.beginPath();
		ctxt.arc(this.x, this.y, this.radius, 0, tau, false);
		ctxt.strokeStyle = 'hsla(' + this.hue +',' + '100%,50%,50%)';
		ctxt.stroke();
	}

	this.update = function() {
	 	if ((this.x > innerWidth - this.radius && this.dx > 0) ||
	 		 (this.x < this.radius && this.dx < 0)) {
			this.dx = -this.dx;
		}
		this.x += this.dx;

		if ((this.y > innerHeight - this.radius && this.dy > 0) ||
			 (this.y < this.radius && this.dy < 0)) {
			this.dy = -this.dy;
		}
		this.y += this.dy;

		this.draw();
	}
}


var circleArray = [];
for (i = 0; i < 100; i++) {
	var radius = 30;
	var x = Math.random() * (innerWidth - 2 * radius) + radius;
	var y = Math.random() * (innerHeight - 2 * radius) + radius;
	var v_mag = Math.random() + 0.1;
	var v_arg = Math.random() * tau;
	var dx = v_mag * Math.cos(v_arg);
	var dy = v_mag * Math.sin(v_arg);
	circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
	requestAnimationFrame(animate);
	ctxt.clearRect(0, 0, innerWidth, innerHeight);
	for (i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();
