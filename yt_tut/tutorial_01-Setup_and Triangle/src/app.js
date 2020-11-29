const vertexShaderText = `
  precision mediump float;

	attribute vec2 a_vertPosition;
	attribute vec3 a_vertColor;
	varying vec3 v_fragColor;

  void main () {
		v_fragColor = a_vertColor;
		gl_Position = vec4(a_vertPosition, 0.0, 1.0);
  }
`;
const fragmentShaderText = `
	precision mediump float;
	
	varying vec3 v_fragColor;

  void main () {
    gl_FragColor = vec4(v_fragColor, 1.0);
  }
`;
const init = function () {
    console.log("...initiate");
    let canvas = document.getElementById("game-surface");
    let gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("WebGL not supported, falling back on experimental-webgl");
        gl = canvas.getContext("experimental-webgl");
    }
    if (!gl) {
        alert("Your browser does not support WebGL");
    }
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    /**
     * create shaders
     */
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error("ERROR compiling vertex shader!", gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(fragmentShader));
        return;
    }
    /**
     * create program
     */
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("ERROR linking program!", gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("ERROR validate program!", gl.getProgramInfoLog(program));
        return;
    }
    /**
     * clear buffers
     */
    let triangleVertices = [
        // X, Y,				R, G, B
        0.0, 0.5, 1.0, 1.0, 0.0,
        -0.5, -0.5, 0.0, 0.7, 1.0,
        0.5, -0.5, 0.3, 1.0, 0.2,
    ];
    let triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    let postionAttributeLocation = gl.getAttribLocation(program, 'a_vertPosition');
    let colorAttributeLocation = gl.getAttribLocation(program, 'a_vertColor');
    gl.vertexAttribPointer(postionAttributeLocation, // Attribute location
    2, // Number of elements per attribute
    gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex,
    0 // Offset from the beginning of a single vetex to this attribute
    );
    gl.vertexAttribPointer(colorAttributeLocation, // Attribute color
    3, // Number of elements per attribute
    gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex,
    2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vetex to this attribute
    );
    gl.enableVertexAttribArray(postionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
};
//# sourceMappingURL=app.js.map