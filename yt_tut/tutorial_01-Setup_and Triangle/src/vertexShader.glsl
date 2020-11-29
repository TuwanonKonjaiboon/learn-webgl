precision mediump float;

attribute vec2 a_vertPosition;
attribute vec3 a_vertColor;

varying vec3 v_fragColor;

void main(){
  v_fragColor=a_vertColor;
  gl_Position=vec4(a_vertPosition,0.0,1.0);
}