vec2 iZoomOut(vec2 uv) {
  return (uv - .5) * 1.3 + .5;
}

vec2 iShiftX(vec2 uv) {
  if (mod(time, .71) < .1 || mod(time, 1.31) < .07) {
    float t = (sin(time * 3.) * 0.5 + 0.5) * 0.1 * sin(uv.y * 37. + time * 3.);
    uv.x += sin(uv.y * 800.) * sin(uv.y * 1500.) * t;
  }
  return uv;
}
