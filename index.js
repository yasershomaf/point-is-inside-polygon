function pointIsInsidePolygon(point, polygon) {
	// Region arguments validation
	if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') {
		return {error: 'First argument should be a point with 2 (x & y) coordinate'};
	}
	if (!Array.isArray(polygon) || polygon.length < 3) {
		return {error:
			'Second argument should be an array of at least 3 points with 2 (x & y) coordinate'};
	}
	// End region

	// The relative position of the point to the polygon will be determined based on the number
	// of intersections of the horizontal line drawn starting from the point toward increasing
	// the x-axis

	var intersections = 0; // Number of intersections

	for (var i = 0; i < polygon.length; i++) { // Loop throw all of the polygon sides
		var startPoint = polygon[i]; // Start point of the side
		var endPoint = polygon[i + 1] || polygon[0]; // End point of the side
		var minX = Math.min(startPoint.x, endPoint.x); // Minimum x-coordinate of the side
		var maxX = Math.max(startPoint.x, endPoint.x); // Maximum x-coordinate of the side

		if (startPoint.y === endPoint.y) { // If the side is a horizontal line
			if (
				point.y === startPoint.y &&
				point.x >= minX &&
				point.x <= maxX
			) {
				return {onBorders: true};
			}
		}
	}
	return {};
}
pointIsInsidePolygon();