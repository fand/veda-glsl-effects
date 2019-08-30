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

#include "./utils.glsl"
#include "./pre.glsl"
#include "./post.glsl"

vec2 pre(in vec2 uv, in int layer) {
  if (layer == 0) {
    // uv = iHoldX(uv, fract(time));
    // uv = iKaleido(uv, 1.);
    // uv = iRandomSlice(uv, fract(time), floor(time));
    // uv = iRandomZoom(uv, fract(time), floor(time));
    // uv = iZoomOutX(uv, clamp(0., 1., fract(time * 0.5) * 2.));
    uv = iLensDist(uv, sin(time)  +1.5);
  }
  if (layer == 1) {
    // uv = iHoldX(uv, 1.);
    // uv = iRandomHoldX(uv);
    // uv = iRandomSlice(uv, fract(time), floor(time));
    uv = iLensDist(uv, 1.);
  }
  if (layer == 2) {
    uv = iZoomOut(uv);
    // uv = iShiftX(uv);
    // uv = iLowRes(uv, fract(mod(time, 1.77)) - .7);
    // uv = iRandomHoldX(uv);
    // uv = iSqueezeXY(uv);
  }

  return uv;
}

vec4 post(in sampler2D tex, in vec2 uv, in int layer) {
  vec4 c = vec4(0);
  c = texture2D(tex, uv);

  if (layer == 1) {
    // c = oCircleInvert(c, tex, uv);
  }
  if (layer == 2) {
    // c = oRandomDouble(c, tex, uv);
    // c = oGlitchGreen(c, tex, uv);
    // c = oDiaInvert(c, tex, uv);
    // c = oRandomXInvert(c, tex, uv);
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

  vec4 c = c2;
  c = oFeedbackFlow(c, uv);

  // gl_FragColor = mix(c0, c1, clamp(0., 1., sin(time) + .5)) + c2;
  gl_FragColor = c;
}
