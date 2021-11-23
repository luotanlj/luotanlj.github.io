// "use strict";

"use strict";

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function main() {
    // Get A WebGL context
    // var canvas1 = document.querySelector("#squ");
    var canvas = document.querySelector("#triangle");

    var gl = canvas.getContext("webgl");
    // var gl1 = canvas1.getContext("webgl");
    if (!gl) {
        console.log("error");
        return;
    }

    // Get the strings for our GLSL shaders
    var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

    // create GLSL shaders, upload the GLSL source, compile the shaders
    // var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    // var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    var program = createProgram(gl, vertexShader, fragmentShader);


    // var vertexShader1 = createShader(gl1, gl1.VERTEX_SHADER, vertexShaderSource);
    // var fragmentShader1 = createShader(gl1, gl1.FRAGMENT_SHADER, fragmentShaderSource);
    // var program1 = createProgram(gl1, vertexShader, fragmentShader);

    // Link the two shaders into a program
    // var program = createProgram(gl, vertexShader, fragmentShader);

    // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    // var positionAttributeLocation1 = gl1.getAttribLocation(program, "a_position");
    // 从着色程序中找到u_resolution属性值所在的位置
    // var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");


    // Create a buffer and put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();
    // var positionBuffer1 = gl1.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // gl1.bindBuffer(gl1.ARRAY_BUFFER, positionBuffer);

    // var positions = [
    //     1, 0.5,
    //     1, -1,
    //     1, 0.3,
    //     -1, -0.3,
    //     0.3, 1.0,
    //     0, 0.3,
    // ];
    // var positions = new Float32Array([
    //     100, 200,
    //     200, 200,
    //     100, 30,
    //     100, 30,
    //     200, 200,
    //     200, 30,
    // ]);

    //类型数组构造函数Float32Array创建顶点数组
    var positions=new Float32Array([0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,0,-1]);
    var positions1=new Float32Array([0.5,0.5,-0.5,0.5,-0.5,-0.5]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    // gl1.bufferData(gl1.ARRAY_BUFFER, positions1, gl1.STATIC_DRAW);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions),gl.STATIC_DRAW);


    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // gl1.viewport(0, 0, gl1.canvas.width, gl1.canvas.height);
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl1.clearColor(0, 0, 0, 0);
    // gl1.clear(gl1.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    // gl1.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);
    // gl1.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // gl1.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    // gl1.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    // 设置全局变量 分辨率
    // gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // draw
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    // gl1.drawArrays(primitiveType, offset, count);
    gl.drawArrays(gl.LINE_LOOP,0,4);
    gl.drawArrays(gl.TRIANGLES,2,3);
}

main();