var sizeLoc;
var vertices = []
var colors   = []
var n = 2;
var size = 1.0;
var delay = 1000;
var num = 1.0;


function init(){
    // var canvas = document.getElementById( "triangle-canvas" );
    // gl = WebGLUtils.setupWebGL( canvas );
    // if( !gl ){
    //     alert( "WebGL isn't available" );
    window.onkeypress = function(e){
        if(e.charCode === 51){
            num = 1.2;
        }else if(e.charCode===50){
            num = 0.8;
        }else if(e.charCode===49){
            console.log(49);
            num=1.0;
        }
    }
    // }


    var canvas = document.getElementById( "triangle-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if( !gl ){
        alert( "WebGL isn't available" );
    }

    // canvas = document.getElementById( "rot-canvas" );
    // gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
    // if( !gl ){
    //     alert( "WebGL isn't available" );
    // }

    colors.push(1.0,0.0,1.0);
    colors.push(0.0,0.0,1.0);
    // vertices.push(-0.55,0.55,-0.55,0.75);
    vertices.push(0.1,0.5, 0.4,0.75);
    console.log(vertices);
    drawCircle01();

    // colors.push()
    // colors.push(1.0,0.0,1.0);
    colors.push(0.0,0.0,0.0);
    vertices.push(-0.6,0.5,0.1,0.0,0.8,0.5);


    colors.push(0.5,0.5,0.5);
    vertices.push(-0.4,0.3,0.1,0.0,0.6,0.3,0.1,0.6,-0.4,0.3);

    // vertices.push(0.5,0.35,0.5,0.45,
    //     0.7,0.45,0.7,0.35);
    // colors.push(1.0,0.5,0.5);
    // colors.push(1.0,0.5,0.5);

    console.log(vertices);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1, 1, 1, 1.0 );

    // Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

    // Associate external shader variables with data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    sizeLoc = gl.getUniformLocation( program, "size" );

    // render();
    renderSquare();
}

// function render(){
//
// }

function drawCircle01(){
    var nowx = vertices[2];
    var nowy = vertices[3];
    var x;
    var y;
    var degree = 2*Math.PI*(1/360);
    for(var i=0;i<360;i++){
        x = (nowx-vertices[0])*Math.cos(degree) - (nowy-vertices[1])*Math.sin(degree) + vertices[0];
        y = (nowx-vertices[0])*Math.sin(degree) + (nowy-vertices[1])*Math.cos(degree) + vertices[1];
        vertices.push(x,y);
        colors.push(0.0,0.0,1.0);
        nowx = x;
        nowy = y;
        n++;
    }
}

function triangles(){

}

function renderSquare(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform1f(sizeLoc,size);

    console.log(vertices.length);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 362);//恒星

    gl.drawArrays(gl.TRIANGLE_STRIP,362,3);

    gl.drawArrays(gl.TRIANGLE_STRIP,365,5);



    // // set uniform values
    // theta += direction * 0.1;
    // if( theta > 2 * Math.PI )
    //     theta -= (2 * Math.PI);
    // else if( theta < -2 * Math.PI )
    //     theta += ( 2 * Math.PI );
    //
    // gl.uniform1f( thetaLoc, theta );
    // gl.uniform1f(spendLoc,spend);
    //
    //
    // gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    // update and render
    setTimeout( function (){ size *= num; requestAnimFrame( renderSquare ); }, delay );
}