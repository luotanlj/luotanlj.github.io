"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var points = [];

var numTimesToSubdivide = 4;
var theta;
// function set1(){
// 	numTimesToSubdivide = prompt();
// }

window.onload = initTriangles();

function initTriangles(){
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if( !gl ){
        alert( "WebGL isn't available" );
    }

    // initialise data for Sierpinski gasket

    // first, initialise the corners of the gasket with three points.
    var vertices = [
        -0.5, -0.5,  0,
        0,  0.5,  0,
        0.5, -0.5,  0
    ];
    var vertices1 = [
        0,0,0,
        0,0,0,
        0,0,0
    ]
    theta = 60;
    vertices1[0] = vertices[0]*Math.cos(theta) - vertices[1]*Math.sin(theta);
    vertices1[1] = vertices[0]*Math.sin(theta) + vertices[1]*Math.cos(theta);

    vertices1[3] = vertices[3]*Math.cos(theta) - vertices[4]*Math.sin(theta);
    vertices1[4] = vertices[3]*Math.sin(theta) + vertices[4]*Math.cos(theta);

    vertices1[6] = vertices[6]*Math.cos(theta) - vertices[7]*Math.sin(theta);
    vertices1[7] = vertices[6]*Math.sin(theta) + vertices[7]*Math.cos(theta);
    // var u = vec3.create();
    // vec3.set( u, -1, -1, 0 );bazhegedanquxunhuan
    var u = vec3.fromValues( vertices1[0], vertices1[1], vertices1[2] );
    // var v = vec3.create();
    // vec3.set( v, 0, 1, 0 );
    var v = vec3.fromValues( vertices1[3], vertices1[4], vertices1[5] );
    // var w = vec3.create();
    // vec3.set( w, 1, -1, 0 );
    var w = vec3.fromValues( vertices1[6], vertices1[7], vertices1[8] );



    divideTriangle( u, v, w, numTimesToSubdivide );

    // configure webgl
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // load shaders and initialise attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // load data into gpu
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

    // associate out shader variables with data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    renderTriangles();
};

function triangle( a, b, c ){
    //var k;
    points.push( a[0], a[1], a[2] );
    points.push( b[0], b[1], b[2] );
    points.push( c[0], c[1], c[2] );
    // points.push( d[0], d[1], d[2] );
    // for( k = 0; k < 3; k++ )
    // 	points.push( a[k] );
    // for( k = 0; k < 3; k++ )
    // 	points.push( b[k] );
    // for( k = 0; k < 3; k++ )
    // 	points.push( c[k] );
}

function divideTriangle( a, b, c, count ){
    // check for end of recursion
    if( count === 0 ){
        triangle( a, b, c );
    }else{

        var ab = vec3.create();
        vec3.lerp( ab, a, b, 0.5 );
        var bc = vec3.create();
        vec3.lerp( bc, b, c, 0.5 );
        var ca = vec3.create();
        vec3.lerp( ca, c, a, 0.5 );

        --count;

        // three new triangles
        divideTriangle( a, ab, ca, count );
        divideTriangle( b, bc, ab, count );
        divideTriangle( c, ca, bc, count );
        divideTriangle( ca,ab,bc, count);
    }
}

function renderTriangles(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    // gl.drawArrays( gl.LINE_STRIP, 0, points.length/3 );

    for(var i=0;i<points.length;i+=3){
        gl.drawArrays(gl.LINE_LOOP,i,3);
    }
}

function inputNum(obj){
    // numTimesToSubdivide = document.getElementById("inpNum").value;
    theta = document.getElementById("inpNum").value;
    initTriangles();
    console.log("num:"+document.getElementById("inpNum").value);
}