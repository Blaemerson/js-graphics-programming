// Draws an ellipse centered at (<xc>, <yc>) with 2*<rx> length major axis and 2*<ry> length minor axis
function drawEllipse(xc, yc, rx, ry) {
    var vertices = [];
    var points = [];

    // Initial decision paremeter and coordinates
    var rx2 = rx * rx;
    var ry2 = ry * ry;
    var p = rx2 - rx2 * ry + (0.25) * rx2;
    var y = ry;
    var x = 0;

    // First region
    while (2 * ry2 * x <= 2 * rx2 * y)
    {
        x++;
        if (p < 0) // stay on same row
        {
            p = p + 2 * ry2 * x + ry2;
        }
        else // move to next row
        {
            y--;
            p = p + 2 * ry2 * x + ry * ry - 2 * rx2 * y
        }
        // Plot points by symmetry
        points.push(xc + x, yc + y);
        points.push(xc - x, yc + y);
        points.push(xc + x, yc - y);
        points.push(xc - x, yc - y);
    }
    // Second region
    p = ry2 * (0.5 + x) * (0.5 + x) + rx2 * (y - 1) * (y - 1) - rx2 * ry2;
    while (y != 0) {
        y--;
        if (p > 0) {
            p = p - 2 * rx2 * y + rx2;
        }
        else {
            x++;
            p = p - (2 * rx2 * y) + rx2 + 2 * ry2 * x;
        }
        // Plot points by symmetry
        points.push(xc + x, yc + y);
        points.push(xc - x, yc + y);
        points.push(xc + x, yc - y);
        points.push(xc - x, yc - y);
    }

    for (var i = 0; i < points.length; i++) {
        vertices.push(points[i]);
    }

    return vertices;
}

// Draw circle centered at (<xc>, <yc>) with radius <r> using Midpoint Circle Algorithm
function drawCircle(xc, yc, r) {
    var vertices = [];
    var points = [];

    // Initial decision paremeter and coordinates
    var p = 1 - r;
    var y = r;
    var x = 0;

    while (x <= y) {
        x++;
        if (p < 0) { // stay on same row
            p = p + (2*x) + 1;
        }
        else { // move to next row
            y--;
            p = p + (2*x) + 1 - (2*y);
        }
        // Plot points by symmetry
        points.push(xc + x, yc + y);
        points.push(xc - x, yc + y);
        points.push(xc + x, yc - y);
        points.push(xc - x, yc - y);
        points.push(xc + y, yc + x);
        points.push(xc - y, yc + x);
        points.push(xc + y, yc - x);
        points.push(xc - y, yc - x);
    }
    for (var i = 0; i < points.length; i++) {
        vertices.push(points[i]);
    }

    return vertices;
}
