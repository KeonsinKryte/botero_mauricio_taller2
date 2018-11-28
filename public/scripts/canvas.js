var string;

function setup() {
  createCanvas(windowWidth, windowHeight);
  string = new String(5);
  background(255,0,144);
}

function draw() {
  fill(255,0,144,20);
  noStroke();
  rect(0,0,width,height);
  
  translate(0,height/2);
  
  string.display();
  string.update();
}

var String = function(spacing){
  this.k = 0.1; // wave speed [0 : 0.9] (h*T/m)
  this.rest = 1.0; // damping [1.0 : 0]
  this.s = spacing;
  this.ys = []; // y positions at time t
  for(let x=0; x<width; x+=spacing){
    this.ys.push(0);
  }
  this.ysp = this.ys.slice(); // y positions at time t-1
}
String.prototype = {
  display: function(){
    noFill();
    stroke(255); 
    strokeWeight(2);
    beginShape();
    for(let i=1; i<this.ys.length; i++){
      curveVertex(i*this.s,this.ys[i]);
    }
    endShape();
  },
  update: function(){
    let tmp = [];
    tmp[0] = 0*sin(millis()/200); // 0 no movement
    for(let i=1; i<this.ys.length-1; i++){
      // from the differential equation d2y/dx2 = m/T*d2y/dt2 with finite difference
      tmp[i] = 2*this.ys[i]-this.ysp[i]+this.k*(this.ys[i+1]+this.ys[i-1]-2*this.ys[i]);
      tmp[i] *= this.rest;
    }
    if(mouseIsPressed){
        tmp[0] = 50*sin(millis()/200); // 0 no movement
    //   tmp[(mouseX/this.s)<<0] = mouseY-height/2; 
    }
    tmp[this.ys.length-1] = 0;
    this.ysp = this.ys.slice();
    this.ys = tmp.slice();
  }
};