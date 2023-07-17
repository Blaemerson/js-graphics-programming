// Expand a point vertically
function vertical(x, y, n)
{
  var points = [];
  points.push(x, y);
  for (var i=1; i<=n; i++)
  {
    points.push(x, y+i);
    points.push(x, y-i);
  }
  return points;
}

// Expand a point horizontally
function horizontal(x, y, n)
{
  var points = [];
  points.push(x, y);
  for (var i=1; i<=n; i++)
  {
    points.push(x+i, y);
    points.push(x-i, y);
  }
  return points;
}

// Draw a line using Bresenham's Algorithm
function drawLine(x0, y0, xend, yend, thickness)
{
  var vertices = [];

  if (x0 > xend)
  {
    // swap points
    var t = x0;
    x0 = xend;
    xend = t;
    t = y0;
    y0 = yend;
    yend = t;
  }

  if (x0 == xend) // vertical line
  {
    var start = y0;
    var finish = yend;
    if (y0 > yend)
    {
      start = yend;
      finish = y0;
    }
    for (var i=start; i<=finish; i++)
    {
      var v = horizontal(x0, i, thickness);
      for (var j=0; j<v.length; j+=2)
      {
        vertices.push(v[j], v[j+1]);
      }
    }
  }
  else if (y0 == yend)  //horizontal line
  {
    var start = x0;
    var finish = xend;
    if (x0 > xend)
    {
      start = xend;
      finish = x0;
    }
    for (var i=start; i<=finish; i++)
    {
      var v = vertical(i, y0, thickness);
      for (var j=0; j<v.length; j+=2)
      {
        vertices.push(v[j], v[j+1]);
      }
    }
  }
  else
  {
    var m = (1.0 * (yend - y0)) / (1.0 * (xend - x0));
    if ((m < 1.0) && (-1.0*m < 1.0))
    {
      // Bresenham's Algorithm assuming abs(slope) < 1.0
      var yincrement = 1;
      if (m < 0)
      {
        yincrement = -1;
      }
      var dx = xend - x0;
      var dy = (yend - y0) * yincrement;
      var twodx = 2 * dx;
      var twody = 2 * dy;
      var twodydx = twody - twodx;
      var pk = twody - dx;
      var xk = x0;
      var yk = y0;

      var v = vertical(x0, y0, thickness);
      for (var j=0; j<v.length; j+=2)
      {
          vertices.push(v[j], v[j+1]);
      }
      var v = vertical(xend, yend, thickness);
      for (var j=0; j<v.length; j+=2)
      {
          vertices.push(v[j], v[j+1]);
      }

      while (xk < xend)
      {
        if (pk < 0)
        {
          var v = vertical(xk+1, yk, thickness);
          for (var j=0; j<v.length; j+=2)
          {
              vertices.push(v[j], v[j+1]);
          }
          pk = pk + twody;
        }
        else
        {
          var v = vertical(xk+1, yk+yincrement, thickness);
          for (var j=0; j<v.length; j+=2)
          {
              vertices.push(v[j], v[j+1]);
          }
          pk = pk + twodydx;
          yk = yk + yincrement;
        }
        xk = xk + 1;
      }
    }
    else
    {
      // Bresenham's Algorithm assuming abs(slope) > 1.0
      var yincrement = 1;
      if (m < 0)
      {
        yincrement = -1;
      }
      var dx = xend - x0;
      var dy = (yend - y0) * yincrement;
      var twodx = 2 * dx;
      var twody = 2 * dy;
      var twodxdy = twodx - twody;
      var pk = twodx - dy;
      var xk = x0;
      var yk = y0;

      var v = horizontal(x0, y0, thickness);
      for (var j=0; j<v.length; j+=2)
      {
          vertices.push(v[j], v[j+1]);
      }
      var v = horizontal(xend, yend, thickness);
      for (var j=0; j<v.length; j+=2)
      {
          vertices.push(v[j], v[j+1]);
      }

      while ((yk * yincrement) < (yend * yincrement))
      {
        if (pk < 0)
        {
          var v = horizontal(xk, yk+yincrement, thickness);
          for (var j=0; j<v.length; j+=2)
          {
              vertices.push(v[j], v[j+1]);
          }
          pk = pk + twodx;
        }
        else
        {
          var v = horizontal(xk+1, yk+yincrement, thickness);
          for (var j=0; j<v.length; j+=2)
          {
              vertices.push(v[j], v[j+1]);
          }
          pk = pk + twodxdy;
          xk = xk + 1;
        }
        yk = yk + yincrement;
      }
    }
  }

  return vertices;
}

// Draw outline of face defined by pt1, pt2, pt3, pt4, with provided thickness
function drawOutline(pt1, pt2, pt3, pt4, thickness = 1) {
  var vertices = [];

  // Using a multiple .push() instead of .concat() helped the program run much faster
  var v = drawLine(1.0*pt1[0]/pt1[3], 1.0*pt1[1]/pt1[3], 1.0*pt2[0]/pt2[3], 1.0*pt2[1]/pt2[3], thickness);
  for (var j=0; j<v.length; j+=2)
  {
    vertices.push(v[j], v[j+1]);
  }
  v = drawLine(1.0*pt2[0]/pt2[3], 1.0*pt2[1]/pt2[3], 1.0*pt3[0]/pt3[3], 1.0*pt3[1]/pt3[3], thickness);
  for (var j=0; j<v.length; j+=2)
  {
    vertices.push(v[j], v[j+1]);
  }
  v =  drawLine(1.0*pt3[0]/pt3[3], 1.0*pt3[1]/pt3[3], 1.0*pt4[0]/pt4[3], 1.0*pt4[1]/pt4[3], thickness);
  for (var j=0; j<v.length; j+=2)
  {
    vertices.push(v[j], v[j+1]);
  }
  v =  drawLine(1.0*pt4[0]/pt4[3], 1.0*pt4[1]/pt4[3], 1.0*pt1[0]/pt1[3], 1.0*pt1[1]/pt1[3], thickness);
  for (var j=0; j<v.length; j+=2)
  {
     vertices.push(v[j], v[j+1]);
  }
  return vertices;
}
