vec4 oGlitchGreen(vec4 c, sampler2D tex, vec2 uv) {
  float t = (
    sin(floor(uv.y * 19. + time * .3 + floor(time *13.7))) *
    sin(floor(uv.y * 27. + time * -.8 + floor(time * -5.7)))
  );
  if (abs(t) > .8) {
    c.g += texture2D(tex, uv + vec2(t * 0.01, 0)).r;
  }
  return c;
}

vec4 oRandomDouble(vec4 c, sampler2D tex, vec2 uv) {
  if (mod(time, 2.91) > .5) { return c; }

  uv -= .5;
  uv *= sin(floor(time * 8.1)) * sin(floor(time * 11.1)) * 0.5 + 0.8;
  uv = uv + vec2(
    sin(floor(time * 11.91)) * sin(floor(time * 3.91)) * 0.3,
    sin(floor(time * 9.01)) * sin(floor(time * 7.01)) * 0.1
  );
  uv += .5;

  c = texture2D(tex, uv) * 0.7;


  uv -= .5;
  uv *= sin(floor(time * 2.)) * sin(floor(time * 4.1)) * 0.5 + 0.8;
  uv = uv + vec2(
    sin(floor(time * 10.91)) * sin(floor(time * 8.91)) * 0.3,
    sin(floor(time * 7.01)) * sin(floor(time * 3.01)) * 0.1
  );
  uv += .5;

  c += texture2D(tex, uv) * 0.3;


  return c;
}

vec4 oCircleInvert(vec4 c, sampler2D tex, vec2 uv) {
  vec2 p = uv * 2. - 1.;
  p.x *= resolution.x / resolution.y;

  if (length(p) < .9) {
    c.rgb = 1. - c.rgb;
  }

  return c;
}

vec4 oDiaInvert(vec4 c, sampler2D tex, vec2 uv) {
  vec2 p = uv * 2. - 1.;
  p.x *= resolution.x / resolution.y;
  p = rot(p, -time);

  if (abs(p.x) + abs(p.y) < .9) {
    c.rgb = 1. - c.rgb;
  }

  return c;
}

vec4 oRandomXInvert(vec4 c, sampler2D tex, vec2 uv) {
  float f = (
    sin(uv.y * 0.09 + floor(time * 19.7) * 3.7) *
    sin(uv.y * 0.17 + floor(time * 80.2) * 1.9) *
    sin(uv.y * 3.2 + floor(time * 7.3))
  );

  if (f > .8) {
    c.rgba = 1. - texture2D(tex, uv + vec2(sin(f *20.) *0.02, 0));
  }

  return c;
}

vec4 oFeedbackFlow(vec4 c, vec2 uv) {
  vec2 uv1 = uv + vec2(0.001, 0);

  uv1.y += sin(
    floor(sin(floor(uv.x *80.) / 3. + uv.y * 87. + time) * 32.) / 1.7
  ) * 0.003;

  c += texture2D(backbuffer, uv1) * abs(sin(uv.x * 12.+ uv.y * 11. + time) *0.7);

  c.b += texture2D(backbuffer, uv1 +0.0023).r;
  c.r /= texture2D(backbuffer, uv1 -0.0019).g;
  c.gb /= texture2D(backbuffer, uv1 +vec2(0., sin(time *0.2 + uv.x *2. + sin(uv.y* 8. +time) *8.) * 0.01)).gb;

  return c;
}
