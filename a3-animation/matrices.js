// Multiply two 3D matrices <u> and <v>
function MatrixMultiply3D(u, v)
{
    var w = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (var i=0; i<3; i++)
    {
        for (var j=0; j<3; j++)
        {
            w[i][j] = (u[i][0] * v[0][j]) + (u[i][1] * v[1][j]) + (u[i][2] * v[2][j]);
        }
    }
    return w;
}


// Multiply matrix <m> and vector <v>
function VectorMultiply3D(m, p)
{
    var q = [];
    for (var i=0; i<3; i++)
    {
        q[i] = (m[i][0] * p[0] + m[i][1] * p[1] + m[i][2] * p[2]);
    }
    return q;
}

// Generate a matrix for translating an object by <x_offset> and <y_offset>
function Translation3D(x_offset, y_offset)
{
    var m = [[1, 0, x_offset], [0, 1, y_offset], [0, 0, 1]];
    return m;
}

// Generate composite matrix for rotating <degrees> degrees about (<x_pivot>, <y_pivot>)
function Rotation3D(x_pivot, y_pivot, degrees)
{
    var radians = degrees * (Math.PI / 180.0);
    var m1 = [[1, 0, x_pivot], [0, 1, y_pivot], [0, 0, 1]];
    var m2 = [[1, 0, -x_pivot], [0, 1, -y_pivot], [0, 0, 1]];
    var r = [[Math.cos(radians), -1.0*Math.sin(radians), 0.0], [Math.sin(radians), Math.cos(radians), 0.0], [0.0, 0.0, 1.0]];

    return MatrixMultiply3D(MatrixMultiply3D(m1, r), m2);
}

// Generate composite matrix for scaling x by <sx>, y by <sy> about (<x_pivot>, <y_pivot>)
function Scaling3D(x, y, sx, sy = sx) {
    var m1 = [[1, 0, x], [0, 1, y], [0, 0, 1]];
    var m2 = [[1, 0, -x], [0, 1, -y], [0, 0, 1]];
    var s = [[sx, 0, 0], [0, sy, 0], [0, 0, 1]];
    return MatrixMultiply3D(MatrixMultiply3D(m1, s), m2);
}
