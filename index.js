var pointX = document.getElementById('point-x');
var pointY = document.getElementById('point-y');
var polygonX = document.getElementById('polygon-x');
var polygonY = document.getElementById('polygon-y');
var addButton = document.getElementById('add');
var clearButton = document.getElementById('clear');
var polygonList = document.getElementById('polygon-list');
var checkButton = document.getElementById('check');
var canvas = document.getElementById('canvas');

var polygon = [];

addButton.addEventListener('click', function() {
	var x = parseInt(polygonX.value, 10) || 0;
	var y = parseInt(polygonY.value, 10) || 0;
	polygon.push({x: x, y: y});
	var newPoint = document.createElement('li');
	newPoint.innerText = 'X: ' + x + ', Y: ' + y;
	polygonList.appendChild(newPoint);
});

clearButton.addEventListener('click', function() {
	polygon = [];
	polygonList.innerText = '';
});

checkButton.addEventListener('click', function() {
	var x = parseInt(pointX.value, 10) || 0;
	var y = parseInt(pointY.value, 10) || 0;
	console.log(pointIsInsidePolygon({x: x, y: y}, polygon));
	canvas.width = window.innerWidth - 42;
	canvas.height = (window.innerWidth - 42) / 2;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var minXCoord = Math.min(...polygon.map(function(point) {
		return point.x;
	}), x, -7) - 3;
	var maxXCoord = Math.max(...polygon.map(function(point) {
		return point.x;
	}), x) + 3;
	var minYCoord = Math.min(...polygon.map(function(point) {
		return point.y;
	}), y, -7) - 3;
	var maxYCoord = Math.max(...polygon.map(function(point) {
		return point.y;
	}), y) + 3;
	var scale;
	if (maxXCoord - minXCoord > 2 * (maxYCoord - minYCoord)) {
		scale = canvas.width / (maxXCoord - minXCoord);
	}
	else {
		scale = canvas.height / (maxYCoord - minYCoord);
	}
	
	// Region Draw x-axis & y-axis.
	ctx.beginPath();
	ctx.moveTo(-minXCoord * scale, canvas.height);
	ctx.lineTo(-minXCoord * scale, 0);
	ctx.moveTo(0, canvas.height + minYCoord * scale);
	ctx.lineTo(canvas.width, canvas.height + minYCoord * scale);
	ctx.lineWidth = 1;
	ctx.stroke();
	// End region.

	// Region Draw the polygon.
	ctx.beginPath();
	ctx.moveTo(
		(polygon[polygon.length - 1].x - minXCoord) * scale,
		canvas.height - (polygon[polygon.length - 1].y - minYCoord) * scale
	);
	for (var i = 0; i < polygon.length; i++) {
		ctx.lineTo(
			(polygon[i].x - minXCoord) * scale,
			canvas.height - (polygon[i].y - minYCoord) * scale
		);
	}
	ctx.lineWidth = 1;
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx.stroke();
	// End region.

	// Region Draw a horizontal line starting from the point.
	ctx.beginPath();
	ctx.moveTo((x - minXCoord) * scale, canvas.height - (y - minYCoord) * scale);
	ctx.lineTo(canvas.width, canvas.height - (y - minYCoord) * scale);
	ctx.setLineDash([3, 9]);
	ctx.strokeStyle = 'blue';
	ctx.stroke();
	// End region.

	// Region Draw intersection points.
	for (var i = 0; i < polygon.length; i++) { // Loop throw all of the polygon sides.
		var startPoint = polygon[i]; // Start point of the side.
		var endPoint = polygon[i + 1] || polygon[0]; // End point of the side.

		// If the side is NOT a horizontal line. And Exclude the scenario where the intersection
		// point is the end point of the side to make sure that it is not counted twice. Once
		// when it is at the start of a side, and once when it is at the end of another side.
		if (startPoint.y !== endPoint.y && y !== endPoint.y) {
			var intersectionX = (y - startPoint.y) * (endPoint.x - startPoint.x) / (
				endPoint.y - startPoint.y
			) + startPoint.x;

			// Intersection point should be between (start & end) points.
			intersectionX = intersectionX >= Math.min(startPoint.x, endPoint.x) &&
											intersectionX <= Math.max(startPoint.x, endPoint.x) &&
											y >= Math.min(startPoint.y, endPoint.y) &&
											y <= Math.max(startPoint.y, endPoint.y) &&
											intersectionX;

			// Intersection point should NOT be the point itself, and it should also be
			// in the direction of increasing the x-axis.
			if (intersectionX !== false && intersectionX > x) {
				ctx.fillStyle='blue';
				ctx.fillRect(
					(intersectionX - minXCoord) * scale - 3,
					canvas.height - (y - minYCoord) * scale - 3,
					6,
					6
				);
			}
		}
	}
	// End region.

	// Region Draw the point.
	ctx.fillStyle='red';
	ctx.fillRect((x - minXCoord) * scale - 3, canvas.height - (y - minYCoord) * scale - 3, 6, 6);
	// End region.
});