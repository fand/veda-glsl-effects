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

vec2 iHoldX(vec2 uv, float t) {
  if (t > .0) {
    float tt = (sin(uv.y *8. + time) * sin(uv.y *19.)) * 0.5 + .5;
    if (tt < t) {
      uv.x = fract(uv.y +time * 0.1);
    }
  }
  return uv;
}

vec2 iKaleido(vec2 uv, float t) {
  if (t > .0) {
    uv -= .5;
    uv = abs(uv);

    uv = rot(uv, -sin(time * .1) * 7.);
    uv -= .2;
    uv = abs(uv);

    uv = rot(uv,-sin(time * .13) * -4.7);
    uv -= .3;
    uv = abs(uv);

    uv = rot(uv, time * .27);
    uv += .35;
    uv = abs(uv);

    uv += .5;
    uv = fract(uv);
  }
  return uv;
}

vec2 iLowRes(vec2 uv, float t) {
  if (t > .0) {
    vec2 m = vec2(1200, 20);
    uv = floor(uv * m) / m;
  }
  return uv;
}

vec2 iRandomHoldX(vec2 uv) {
  float xn = sin(uv.y * 179. - time * 1108.) * sin(uv.y * 329. + time * 207.) * 0.003;

  float tt = floor(time * 7.);
  float x1 = fract(tt * .23);
  float x2 = fract(tt * .37);

  float x = uv.x + xn;

  if (x > x1 && x <= x2) {
    uv.x = fract(x1 + uv.y * 3.);
  }

  return uv;
}

vec2 iRandomSlice(vec2 uv, float t, float seed) {
  vec2 uv1 = rot(uv, seed * 17.3);

  float amp = exp(t * -10.);
  uv1.x += sin(floor(uv1.y * 33.)) * amp * 0.5;
  uv = rot(uv1, -seed * 17.3);

  return uv;
}

vec2 iRandomZoom(vec2 uv, float t, float seed) {
  uv -= .5;
  uv *= sin(floor(time * 3.7)) * sin(floor(time * 2.3)) * 0.4 + 0.5;
  uv = uv + vec2(
    sin(floor(time * 4.91)) * sin(floor(time * 3.21)) * 0.3,
    sin(floor(time * 9.01)) * sin(floor(time * 5.01)) * 0.1
  );
  uv += .5;
  uv = fract(uv);

  return uv;
}

vec2 iZoomOutX(vec2 uv, float t) {
  uv -= .5;
  uv.x *= 4. * t;
  uv += .5;
  uv = fract(uv);

  return uv;
}

vec2 iSqueezeXY(vec2 uv) {
  // uv.y = fract(uv.y+max(fract(uv.x* 3.) * 4. - 3., uv.y));
  // uv.y = fract(uv.y - clamp(0., 1., fract(uv.x * 3. - time) * 4. - 3.));
  // float s = clamp(0., 1., fract(uv.x * 3. -uv.y * 0.5 - time) * 4. - 3.);
  // uv.y = fract(uv.y - fract(s * 3.));

  float x = uv.x - uv.y * 0.4;

  float offset = (
    sin(x * 4. - time) *
    sin(x * 17. - time) *
    sin(x * 1000. - time * 1000.)
  );

  offset *= offset * offset;

  uv.y += offset * 0.7;

  return uv;
}

vec2 iLensDist(vec2 uv, float power) {
  uv = uv * 2. - 1.;

  float l = length(uv);
  uv = normalize(uv) * atan(smoothstep(.0, 1., l * power) * 3.);

  uv = uv * 0.5 + 0.5;
  uv = clamp(uv, 0., 1.);

  return uv;
}
