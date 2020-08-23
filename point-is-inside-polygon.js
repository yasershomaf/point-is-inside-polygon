function pointIsInsidePolygon(point, polygon) {
	// Region arguments validation.
	if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') {
		return {error: 'First argument should be a point with 2 (x & y) coordinate'};
	}
	if (!Array.isArray(polygon) || polygon.length < 3) {
		return {error:
			'Second argument should be an array of at least 3 points with 2 (x & y) coordinate'};
	}
	// End region.

	// The relative position of the point to the polygon will be determined based on the number
	// of intersections of the horizontal line drawn starting from the point toward increasing
	// the x-axis.

	var intersections = 0; // Number of intersections.

	for (var i = 0; i < polygon.length; i++) { // Loop throw all of the polygon sides.
		var startPoint = polygon[i]; // Start point of the side.
		var endPoint = polygon[i + 1] || polygon[0]; // End point of the side.
		var minX = Math.min(startPoint.x, endPoint.x); // Minimum x-coordinate of the side.
		var maxX = Math.max(startPoint.x, endPoint.x); // Maximum x-coordinate of the side.
		var minY = Math.min(startPoint.y, endPoint.y); // Minimum y-coordinate of the side.
		var maxY = Math.max(startPoint.y, endPoint.y); // Maximum y-coordinate of the side.

		if (startPoint.y === endPoint.y) { // If the side is a horizontal line.
			if (
				point.y === startPoint.y &&
				point.x >= minX && point.x <= maxX // Point is between (start & end) points.
			) {
				return {inside: false, outside: false, onBorder: true};
			}
		}

		// If the side is NOT a horizontal line. And Exclude the scenario where the intersection
		// point is the end point of the side to make sure that it is not counted twice. Once
		// when it is at the start of a side, and once when it is at the end of another side.
		else if (point.y !== endPoint.y) {
			var intersectionX = (point.y - startPoint.y) * (endPoint.x - startPoint.x) / (
				endPoint.y - startPoint.y
			) + startPoint.x;

			// Intersection point should be between (start & end) points.
			intersectionX = intersectionX >= minX && intersectionX <= maxX &&
											point.y >= minY && point.y <= maxY &&
											intersectionX;

			if (intersectionX !== false) {
				if (intersectionX === point.x) { // If the intersection point is the point itself.
					return {inside: false, outside: false, onBorder: true};
				}
		
				// Accept only intersections in the direction of increasing the x-axis.
				if (intersectionX > point.x) {
					if (point.y === startPoint.y) {
						// Region Make sure that the intersection point is NOT a point of tangency.
						var prevPointIndex = (i - 1 + polygon.length) % polygon.length;
						while (polygon[prevPointIndex].y === startPoint.y) {
							prevPointIndex = (prevPointIndex - 1 + polygon.length) % polygon.length;
						}
						if (
							point.y > Math.min(polygon[prevPointIndex].y, endPoint.y) &&
							point.y < Math.max(polygon[prevPointIndex].y, endPoint.y)
						) {
							intersections++;
						}
						// End region.
					}
					else {
						intersections++;
					}
				}
			}
		}
	}
	return {inside: intersections % 2 === 1, outside: intersections % 2 === 0, onBorder: false};
}