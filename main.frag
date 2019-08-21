/*{
  glslify: true,
  frameskip: 2,
  pixelRatio: 1,
  audio: true,
  midi: true,
  osc: 3333,

  "IMPORTED": {
    v0: { PATH: './vj/catmac/00007.mp4' },
    v1: { PATH: "./vj/catmac/00014.mp4" },
    v2: { PATH: "./polam1.png" },
  },
  PASSES: [
    { TARGET: "layer0" },
    { TARGET: "layer1" },
    {},
  ],
}*/
precision highp float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D backbuffer;
uniform sampler2D midi;
uniform sampler2D v0;
uniform sampler2D v1;
uniform sampler2D v2;
uniform sampler2D layer0;
uniform sampler2D layer1;
uniform int PASSINDEX;
uniform float volume;

#define PI 3.141593
#define SQRT3 1.7320508

#include "./pre.glsl"
#include "./post.glsl"

vec2 pre(in vec2 uv, in int layer) {
  if (layer == 0) {
    uv = iHoldX(uv, fract(time));
  }
  if (layer == 1) {
    uv = iHoldX(uv, 1.);
  }
  if (layer == 2) {
    uv = iZoomOut(uv);
    uv = iShiftX(uv);
  }

  return uv;
}

vec4 post(in sampler2D tex, in vec2 uv, in int layer) {
  vec4 c = vec4(0);
  c = texture2D(tex, uv);

  if (layer == 2) {
    c = oGlitchGreen(c, tex, uv);
  }

  return c;
}

vec4 draw(in sampler2D tex, in vec2 uv, in int layer) {
  uv = pre(uv, layer);
  return post(tex, uv, layer);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec4 c0 = draw(v0, uv, 0);
  vec4 c1 = draw(v1, uv, 1);
  vec4 c2 = draw(v2, uv, 2);

  gl_FragColor = mix(c0, c1, clamp(0., 1., sin(time) + .5)) + c2;
}
