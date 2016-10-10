# PetalJs
PetalJs is recreation of <http://www.jqueryscript.net/animation/jQuery-Plugin-For-Sakura-Petals-Falling-Animation-Sakura.html> using html5 canvas and requestAnimationFrame.

## Demo
<https://jbpark0509.github.io/petal.html>

## Installation

1. Download petal.js and include it in your project. Then PetalJs will be available in your window object as window.PetalJs!

	`<script src="path/petal.js"></script>`

2. Create a canvas element in your html file with id.

		<canvas id="petals"></canvas>
		
3. Declare your own PetalJs. PetalJs accepts two arguments, canvas id and options. Here is an example of a CompressorJs declaration.

		var container = new PetalJs("canvasId", {
			numPetals: 50,
			maxVel: 2,
			minVel: 1,
			color: "rgba(255, 183, 197, .8)"
		});

## Configuration

You can declare your PetalJs with the following options:

Option | Description
------ | -----------
numPetals | Number of petals. Default is set to 50.
maxVel | Maximum velocity of your petal. Default is set to 2.
minVel | Minimum velocity of your petal. Default is set to 1.
color | Color of your petal. Accepts hex, rgb, rgba. Default is set to "rgba(255, 183, 197, .8)".

## Author
Jeong Park <jbpark0509@hotmail.com>