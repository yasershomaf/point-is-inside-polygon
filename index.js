function pointIsInsidePolygon(point, polygon) {
	// Region arguments validation
	if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') {
		return {error: 'First argument should be a point with 2 (x & y) coordinate'};
	}
	if (!Array.isArray(polygon) || polygon.length < 3) {
		return {error: 'Second argument should be an array of at least 3 points with 2 (x & y) coordinate'};
	}
	// End region

}
pointIsInsidePolygon();