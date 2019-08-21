vec2 rot(in vec2 uv, in float t) {
  float c = cos(t), s = sin(t);
  return mat2(c, -s, s, c) * uv;
}
