import { Vector2 } from "three";

const bravias = {
  uniforms: {
    progress: { value: 0 },
    iTime: { value: 0 },
    // tDiffuse: { value: null },
    iResolution: { type: "vec2", value: new Vector2(1000, 1000) },
  },
  vertexShader: /*glsl*/ `
    varying vec2 vUv;
    varying vec3 vNormal;
    // attribute vec2 uv;
		void main() {
			vUv = uv;
            vNormal = normalize( normalMatrix * normal );
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}
  `,
  fragmentShader: /*glsl*/ `

  #define PI 3.14159265359
  #define PERIOD 16.
  varying vec2 vUv;
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec3 vNormal;
  // Line function taken from our lord and savior IQ
  // https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
  vec2 sdLine( in vec2 p, in vec2 a, in vec2 b)
  {
      vec2 pa = p-a, ba = b-a;
      float h = clamp(dot(pa,ba)/(dot(ba,ba)),0.0, 1.0);
      return pa-ba*h;
  }
  float sdLineLength( in vec2 p, in vec2 a, in vec2 b)
  {
      return length(sdLine(p,a,b));
  }
  
  void main(){
      vec4 fragColor = vec4(0.);
      float pi_time = iTime*2.*PI/10.0;
  
  
      // This turns our square lattice to a hexagonal lattice
      float x0 =  0.25 + 0.25/2. + 0.5*0.2499*max(-1., min(1., 3.0*sin(4.*pi_time)));
      // float x1 = 0.75 - 0.2499*sin(4.*pi_time);
      float x1 = 1.0 - x0;
  
      /* If I were going strictly bravais motivated here, only x0 would be necessary.
       * "i"  -> "invariant" to say these points are static, not parametized
       * The idea here is to take the rhombus lattice (a bravais lattice) and turn it 
       * to a hexagonal lattice (non bravais)
       */ 
      vec2 r0 = vec2(x0, 0.5);
      vec2 r0_i = vec2(0.0, 0.5);
      vec2 r1 = vec2(x1, 0.0);
      vec2 r1_i = vec2(1.0, 0.0);
      vec2 r2 = vec2(x1, 1.0);
      vec2 r2_i = vec2(1.0, 1.0);
  
      // Capture frag coord into convenient UV variable, transform!
      float zoom = (1.0 - 0.07*pow(sin(pi_time), 2.));
      float aspect = iResolution.x/iResolution.y;
      vec2 drift = vec2(iTime*0.0001, 0.1*sin(pi_time));
      vec2 uv = zoom
          *PERIOD*(vNormal.xy*10./iResolution.xy*20. - 0.5 + drift);
        //   *PERIOD*(vNormal.xy*10./iResolution.xy - 0.5 + drift);
  
    //   vec2 uv = zoom
    //       *PERIOD*(vUv.xy/iResolution.xy - 0.5 + drift);
  
      uv.x*=aspect;
    //   uv*=
  
      // Index and fract feed into each other - index is used to know if this is odd or even
      // and whether the cell should be offset or not
      // First, find out if we should be offset or not
      vec2 indexUVProto = floor(uv);
      vec2 columnOffset = + vec2(0., mod(indexUVProto,2.0)/2.0);
  
      vec2 indexUV = floor(uv + columnOffset);
      vec2 fractUV = fract(uv + columnOffset); 
  
  
      // Correct indexUV accounting for which cell we're in. By far the most finicky part
      // first calclute shortest vector to line
      // "bottom" line
      vec2 sd_1 = sdLine(fractUV , r0, r1);
      // "top" line
      vec2 sd_2 = sdLine(fractUV , r0, r2);
  
  
      /* Make some "debug colors" so that we can see which area we're tageting
       */
  
      // black out the area we want to target
      float sd_1_debug_intensity = 1.0 - max(
          // First line, give angled section
          0.5 + 0.5*sign(sd_1.x),
          // Sign of sd_2, gives halfway point
          0.5 + 0.5*sign(sd_2.y)
      );
      vec3 sd_1_debug_color = vec3(
          sd_1_debug_intensity
      );
  
      // black out the area we want to target
      float sd_2_debug_intensity = 1.0 - max(
          // First line, give angled section
          0.5 + 0.5*sign(sd_2.x),
          // Sign of sd_2, gives halfway point
          0.5 + 0.5*sign(-sd_1.y)
      );
      vec3 sd_2_debug_color = vec3(
          sd_2_debug_intensity
      );
  
      // Reduce index by one if we're "to the left"
      indexUV.x -= max(sd_1_debug_intensity, sd_2_debug_intensity);
      // Up in y if we're "to the left above"
      indexUV.y += sd_2_debug_intensity * (0.5 - 0.5*sign(columnOffset.y - 0.25));
      // Down in y if we're "to the left below"
      indexUV.y -= sd_1_debug_intensity * (0.5 + 0.5*sign(columnOffset.y - 0.25));
  
      /* We draw the cell walls with the shortest distance function of the point
       * to the line which is finally put into the smoothstep function
       */
  
      // 2 angled lines
      float intensity = min(sdLineLength(fractUV, r0, r1) ,sdLineLength(fractUV, r0, r2));
      // First, middle horizontal line
      intensity = min(intensity, sdLineLength(fractUV, r0_i, r0));
      // Botom hirozontal line
      intensity = min(intensity, sdLineLength(fractUV, r1_i, r1));
      // Top hirozontal line
      intensity = min(intensity, sdLineLength(fractUV, r2_i, r2));
  
  
      float edge = 0.0;
      float margin = 0.045*zoom; 
  
      // Turn distance field to line
      intensity = 1.0 - smoothstep(
          edge + margin,
          edge + 0.0,
          intensity
      );
  
  
      vec3 cell_color = vec3(
        1.5 + 0.5*sin(indexUV.y + 2.*pi_time)*sin(indexUV.y + 6.*pi_time),
        .8 + 0.5*cos(indexUV.y/2. + 2.*pi_time),
        .3
    );
    //   vec3 cell_color = vec3(
    //       0.5 + 0.5*sin(indexUV.y + 2.*pi_time)*sin(indexUV.y + 6.*pi_time),
    //       0.5 + 0.5*cos(indexUV.y/2. + 2.*pi_time),
    //       1.0
    //   );
  
      vec3 color_mix = mix(
          vec3(0.), 
          cell_color, 
          intensity
      );
  
      fragColor = vec4(color_mix, 1.0);
      gl_FragColor = fragColor;
    //   gl_FragColor = vec4(vUv.x);
    //   gl_FragColor = vec4(vNormal.x);
    //   gl_FragColor = vec4(vUv.x);
    //   gl_FragColor = vec4(1.);
    //   gl_FragColor= vec4(vec3(.5), 1.);
  }
  `,
};

export default bravias;
