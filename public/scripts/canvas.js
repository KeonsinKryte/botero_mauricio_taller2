// string dance
function setup() {
    createCanvas(windowWidth, windowHeight); 
  }
  
  var t = 0;
  
  function draw() {
    background(255);
    noFill();
    strokeWeight(15);
  
    amp = map(sin(t/5), -1, 1, 0, 300);
  
    stroke(255, 0, 0, 100);
    beginShape();
        for(var w = 0; w < width; w += 5) {
          var h = height / 2;
          h += amp * sin(w * 0.03 + t * 3 ) *  pow(abs(sin(w * 0.001 + t)), 5);
          curveVertex(w, h);
        }    
    endShape();
    
    stroke(0, 255, 0, 100);
    beginShape();
        for(var w = 0; w < width; w += 5) {
          var h = height / 2;
          h += amp * sin(w * 0.03 + t * 3 + TWO_PI / 3  ) *  pow(abs(sin(w * 0.001 + t)), 5);
          curveVertex(w, h);
        }    
    endShape();
    
    stroke(0, 0, 255, 100);
    beginShape();
        for(var w = 0; w < width; w += 5) {
          var h = height / 2;
          h += amp * sin(w * 0.03 + t * 3 + 2* TWO_PI / 3 ) *  pow(abs(sin(w * 0.001 + t)), 5);
          curveVertex(w, h);
        }    
    endShape();
    
    t += 0.02
  }