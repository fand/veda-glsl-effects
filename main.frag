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

vec2 pre(vec2 uv, float layer) {
  if (layer == 2.) {
    // uv = (uv - .5) * 1.3 + .5;

    if (mod(time, .71) < .1 || mod(time, 1.31) < .07) {
      float t = (sin(time * 3.) * 0.5 + 0.5) * 0.03;
      uv.x += sin(uv.y * 800.) * sin(uv.y * 1500.) * t;
    }
  }

  return uv;
}

vec4 post(vec4 c, vec2 uv, float layer) {
  if (layer == 2.) {
    if (mod(time, .71) < .1 || mod(time, 1.31) < .07) {
      float t = (sin(time * 3.) * 0.5 + 0.5) * 0.03;
      uv.x += sin(uv.y * 800.) * sin(uv.y * 1500.) * t;
    }
  }

  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec2 uv0 = pre(uv, 0.);
  vec4 c0 = texture2D(v0, uv0);
  c0 = post(c0, uv0, 0.);

  // vec2 uv1 = pre(uv, 1.);
  // vec4 c1 = texture2D(v1, uv1);
  // c1 = post(c1, uv1, 1.);

  vec2 uv2 = pre(uv, 2.);
  vec4 c2 = texture2D(v2, uv2);
  c2 = post(c2, uv2, 2.);

  // gl_FragColor = mix(c0, c1, fract(time * 0.5)) + c2;
  gl_FragColor = c0 + c2;
}
