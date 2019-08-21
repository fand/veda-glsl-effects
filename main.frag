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

vec2 pre(in vec2 uv, in int layer) {
  if (layer == 2) {
    // uv = (uv - .5) * 1.3 + .5;

    if (mod(time, .71) < .1 || mod(time, 1.31) < .07) {
      float t = (sin(time * 3.) * 0.5 + 0.5) * 0.1 * sin(uv.y * 37. + time * 3.);
      uv.x += sin(uv.y * 800.) * sin(uv.y * 1500.) * t;
    }
  }

  return uv;
}

vec4 post(in sampler2D tex, in vec2 uv, in int layer) {
  vec4 c = vec4(0);
  c = texture2D(tex, uv);

  if (layer == 2) {
    float t = (
      sin(floor(uv.y * 19. + time * .3 + floor(time *13.7))) *
      sin(floor(uv.y * 27. + time * -.8 + floor(time * -5.7)))
    );
    if (abs(t) > .8) {
      c.g += texture2D(tex, uv + vec2(t * 0.01, 0)).r;
    }
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

  gl_FragColor = c0 + c2;
}
