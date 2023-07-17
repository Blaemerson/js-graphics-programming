// Plots all points that can be found using symmetry starting with the point (x, y)
function plotSymmetric(x, y) {
  points = [];
  var width = 5;
  points.push( x, y);
  points.push( x,-y);
  points.push(-x, y);
  points.push(-x,-y);
  points.push( y, x);
  points.push( y,-x);
  points.push(-y, x);
  points.push(-y,-x);
  for (var i = 1; i < width; i++)
  {
    points.push( x, y + i);
    points.push( x, y - i);

    points.push( x, -y + i);
    points.push( x, -y - i);

    points.push(-x, y + i);
    points.push(-x, y - i);

    points.push(-x, -y + i);
    points.push(-x, -y - i);

    points.push( y + i, x);
    points.push( y - i, x);

    points.push( y + i, -x);
    points.push( y - i, -x);

    points.push(-y + i, x);
    points.push(-y - i, x);

    points.push(-y + i, -x);
    points.push(-y - i, -x);
  }
  return points;
}

// Take in a center position given by xc, yc, and a radius r, and
// plot points of using the Midpoint Circle Algorithm
function drawCircle(xc, yc, r)
{
  var vertices = [];
  var points = [];

  // Initial decision paremeter and coordinates
  var p = 1 - r;
  var y = r;
  var x = 0;

  while (x <= y)
  {
    x++;
    if (p < 0) // stay on same row
    {
      points = plotSymmetric(x, y);
      for (var i = 0; i < points.length; i++)
      {
        vertices.push(points[i]);
      }
      p = p + (2*x) + 1;
    }
    else // move to next row
    {
      y--;
      points = plotSymmetric(x, y);
      for (var i = 0; i < points.length; i++)
      {
        vertices.push(points[i]);
      }
      p = p + (2*x) + 1 - (2*y);
    }
  }

  // Move the circle as desired by shifting each x and y by xc and yc, respectively
  for (var i = 0; i < vertices.length; i += 2)
  {
    vertices[i] = vertices[i] + xc;
    vertices[i+1] = vertices[i+1] + yc;
  }

  return vertices;
}
