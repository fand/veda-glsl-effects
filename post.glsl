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
