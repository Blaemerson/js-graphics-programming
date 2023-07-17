// Draw a 3D rectangle starting at (x, y, z) with provided width, height, and depth
function Rect3D(x, y, z, width, height, depth)
{
    return [ [x,       y,        z,       1.0],
             [x+width, y,        z,       1.0],
             [x,       y+height, z,       1.0],
             [x+width, y+height, z,       1.0],
             [x,       y,        z-depth, 1.0],
             [x+width, y,        z-depth, 1.0],
             [x,       y+height, z-depth, 1.0],
             [x+width, y+height, z-depth, 1.0] ];
}

// Draw a 3D rectangle centered at (xc, yc, zc) with provided width, height, and depth
function CenteredRect3D(xc, yc, zc, width, height, depth)
{
    return [ [xc-(width/2), yc-(height/2), zc+(depth/2), 1.0],
             [xc+(width/2), yc-(height/2), zc+(depth/2), 1.0],
             [xc-(width/2), yc+(height/2), zc+(depth/2), 1.0],
             [xc+(width/2), yc+(height/2), zc+(depth/2), 1.0],
             [xc-(width/2), yc-(height/2), zc-(depth/2), 1.0],
             [xc+(width/2), yc-(height/2), zc-(depth/2), 1.0],
             [xc-(width/2), yc+(height/2), zc-(depth/2), 1.0],
             [xc+(width/2), yc+(height/2), zc-(depth/2), 1.0] ];
}
