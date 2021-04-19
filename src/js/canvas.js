import utils, { randomColor, randomIntFromRange } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2,
};
let gravity = 1;
let friction = 0.9;
const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});
let animationId;
let ballArray = [];

// Objects
class Ball {
	constructor(x, y, radius, color, dx, dy) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.dy = dy;
		this.dx = dx;
		this.touched = 0;
		this.id = Math.random();
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	}

	kill() {
		this.radius = 0;
		ballArray = ballArray.filter((item) => item.id != this.id);
		console.log("in kill", ballArray.length);
	}

	update() {
		if (this.y + this.radius + this.dy >= canvas.height) {
			this.dy = -this.dy * friction;
			this.touched += 1;
		} else {
			this.dy += gravity;
		}

		if (
			this.x + this.radius + this.dx >= canvas.width ||
			this.x - this.radius <= 0
		) {
			this.dx = -this.dx;
		}
		this.x += this.dx;
		this.y += this.dy;

		if (this.touched == 300) {
			setTimeout(() => {
				console.log("ordered to kill", this.touched);
				this.kill();
			}, 500);
		}

		this.draw();
	}
}

// Implementation
// let ball;
function init() {
	for (let i = 0; i < 10; i++) {
		let radius = randomIntFromRange(20, 40);
		let x = randomIntFromRange(radius, canvas.width - radius);
		let y = randomIntFromRange(0, canvas.height - radius);
		let dx = randomIntFromRange(-2, 2);
		let dy = randomIntFromRange(-2, 2);
		let color = randomColor(colors);
		ballArray.push(new Ball(x, y, radius, color, dx, dy));
	}
	// ball = new Ball(canvas.width / 2, canvas.height / 2, 30, "red", 2);
}

// Animation Loop
function animate() {
	animationId = requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	ballArray.forEach((ball) => {
		ball.update();
	});
	// ball.update();
}

init();
animate();
