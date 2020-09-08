# Point is inside polygon

Algorithm to determine whether a point is inside a polygon

## Getting started:

Copy the ***pointIsInsidePolygon*** function code from [point-is-inside-polygon.js](https://github.com/yasershomaf/point-is-inside-polygon/blob/master/src/js/point-is-inside-polygon.js) and include it in your code.

## Usage:

```
const point = {x: 100, y: 100};
const polygon = [
	{x: 20, y: 125},
	{x: 12, y: 100},
	{x: 75, y: 30}
];
const position = pointIsInsidePolygon(point, polygon);
```

### Arguments:

1. ***point:*** An object with 2 keys:

	* ***x:*** X-coordinate of the point.
	* ***y:*** Y-coordinate of the point.

2. ***polygon:*** An array of the polygon&apos;s points. Each point is an object with 2 keys:

	* ***x:*** X-coordinate of the point.
	* ***y:*** Y-coordinate of the point.

### Return value:

* If the first argument ***point*** was not provided correctly it will return this error object:

```
{error: 'First argument should be a point with (x & y) coordinates'}
```

* If the second argument ***polygon*** was not provided correctly it will return this error object:

```
{error: 'Second argument should be an array of at least 3 points with (x & y) coordinates'}
```
* If both arguments were provided correctly it will return an object with 3 keys:

	1. **isInside** *(boolean):* `true` if the point was inside the polygon, and `false` if not.
	2. **isOutside** *(boolean):* `true` if the point was outside the polygon, and `false` if not.
	3. **isOnBorder** *(boolean):* `true` if the point was on the border of the polygon, and `false` if not.

```
{isInside: boolean, isOutside: boolean, isOnBorder: boolean}
```

## Explanation:

The relative position of the ***point*** to the ***polygon*** will be determined based on ***number of intersections*** between the ***polygon*** & the ***horizontal line*** drawn starting from the ***point*** toward ***increasing the x-axis***.
* If ***number of intersections*** was ***odd***, then the ***point*** is inside the ***polygon***.
![Point is inside polygon](https://raw.githubusercontent.com/yasershomaf/point-is-inside-polygon/master/inside.jpg)

* If ***number of intersections*** was ***even***, then the ***point*** is outside the ***polygon***.
![Point is outside polygon](https://raw.githubusercontent.com/yasershomaf/point-is-inside-polygon/master/outside.jpg)

*Clone the repository and run **index.html** in your browser to test it.*

## Author:

<table><tr><td><img src="https://avatars1.githubusercontent.com/u/28219390?s=400&u=e57cc257a4e7210045a942dc28be0d602f3dae46&v=4" alt="Yaser&apos;s avatar" width="100" style="border-radius: 50%;"/></td><td>Yaser Somaf<br/><a href="https://github.com/yasershomaf">https://github.com/yasershomaf</a><br/><a href="mailto:yasershomaf@gmail.com">yasershomaf@gmail.com</a></td></tr></table>
