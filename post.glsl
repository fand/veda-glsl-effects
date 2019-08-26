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
