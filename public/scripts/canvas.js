var blobs, nBlobs = 16, theta = 0, autoPlay = true,
    colors = ['#67003a', '#600067', '#ff0090', '#201E50', '#b30065'];

// var chords = ['D#3', 'D#4', 'D#5', 'E2', 'F#2', 'F#3', 'F34', 'F#5', 'A2', 'A3','A4','A5', 'C3', 'C4', 'C5', 'C6','C#2'];   
var chords = ['A4', 'B4', 'G4', 'F4', 'A#4', 'G#4', 'F#4'];   


function Blob(radius, nSegments, magnitude, color) {
    this.radius = radius;
    this.magnitude = magnitude;
    this.color = color;
    this.center = {
        x: width / 2,
        y: height / 2
    };

    this.segments = new Array(nSegments);
    for (var i = nSegments; i--;) {
        this.segments[i] = random(PI * 2);
    }

    this.innerSegments = new Array(nSegments);
    for (var i = nSegments; i--;) {
        this.innerSegments[i] = random(PI * 2);
    }
}

Blob.prototype.render = function (offset) {
    noStroke();
    fill(this.color);

    var n = this.segments.length;
    beginShape();
    for (var i = n; i--;) {
        var r = this.radius + sin(offset + this.segments[i]) * this.magnitude,
            pr = this.radius + sin(offset + this.segments[(i + 1) % n]) * this.magnitude,
            c = (4 / 3) * tan(PI / (2 * n)) * r,
            pc = (4 / 3) * tan(PI / (2 * n)) * pr,
            t = PI * 2 / n * i,
            pt = PI * 2 / n * (i + 1),
            x = cos(t) * r,
            y = -sin(t) * r,
            px = cos(pt) * pr,
            py = -sin(pt) * pr,
            cx1 = px + cos(pt - PI / 2) * pc,
            cy1 = py - sin(pt - PI / 2) * pc,
            cx2 = x + cos(t + PI / 2) * c,
            cy2 = y - sin(t + PI / 2) * c;

        if (i === n - 1) vertex(px, py);
        bezierVertex(cx1, cy1, cx2, cy2, x, y);
    }
    endShape();

    fill(colors[colors.length - 1]);
    beginShape();
    var innerRadius = this.radius - this.magnitude * 0.75;
    for (var i = 0; i < n; i++) {
        var pi = i == 0 ? n - 1 : i - 1,
            r = innerRadius + sin(offset + this.innerSegments[i]) * this.magnitude,
            pr = innerRadius + sin(offset + this.innerSegments[pi]) * this.magnitude,
            c = (4 / 3) * tan(PI / (2 * n)) * r,
            pc = (4 / 3) * tan(PI / (2 * n)) * pr,
            t = PI * 2 / n * i,
            pt = PI * 2 / n * (pi),
            x = cos(t) * r,
            y = -sin(t) * r,
            px = cos(pt) * pr,
            py = -sin(pt) * pr,
            cx1 = px + cos(pt + PI / 2) * pc,
            cy1 = py - sin(pt + PI / 2) * pc,
            cx2 = x + cos(t - PI / 2) * c,
            cy2 = y - sin(t - PI / 2) * c;

        if (i === 0) vertex(px, py);
        bezierVertex(cx1, cy1, cx2, cy2, x, y);
    }
    endShape();
}




//____________________________________________________________________________________________
var guitar = SampleLibrary.load({
    instruments: 'guitar-nylon',
    minify:  true
});

guitar.toMaster();

var string;
var img;
var h;
var s;
var b;
var x;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    string = new String(80);
    stringTwo = new String(80);
    stringThree = new String(80);
    stringFour = new String(80);
    stringFive = new String(80);
    background(255, 0, 144);
    img - loadImage("/sources/icons/Guitar.svg");
    h = 46;
    s = 100;
    b = 100;
    x =0;

    //__________________________________________________________________________________________________


    for (var i = colors.length; i--;) {
        colors[i] = color(colors[i]);
    }

    blobs = new Array(nBlobs);

    var maxR = max(width, height) / 4;
    for (var i = blobs.length; i--;) {
        var r = map(i, 0, blobs.length, 16, maxR),
            m = map(i, 0, blobs.length, 2, maxR / (2 * nBlobs));
        blobs[i] = new Blob(r, 16, m, colors[i % (colors.length - 1)]);
    }
}

function draw() {

    fill(255, 0, 144, 50);
    noStroke();
    rect(0, 0, width, height);


    push();
    // colorMode(HSB,360,100,100,100);
    // fill(h,s,b,50);
    // ellipse(width/2,height/2,width/3,width/3)
    translate(width / 2, height / 2);

    if (autoPlay) {
        theta += PI * 2 / 120;
    }

    for (var i = blobs.length; i--;) {
        blobs[i].render(theta);
    }
    pop();


    fill(255);
    noStroke();
    rect(150, 200, 50, 600);



    push();
    translate(0, height / 2);
    string.display();
    string.update();
    pop();

    push();
    translate(0, height / 2 + 100);
    stringTwo.display();
    stringTwo.update();
    pop();

    push();
    translate(0, height / 2 + 200);
    stringThree.display();
    stringThree.update();
    pop();

    push();
    translate(0, height / 2 - 100);
    stringFour.display();
    stringFour.update();
    pop();

    push();
    translate(0, height / 2 - 200);
    stringFive.display();
    stringFive.update();
    pop();

}

var String = function (spacing) {
    this.k = random(0.1, 0.5);// wave speed [0 : 0.9] (h*T/m)
    this.rest = 1.0; // damping [1.0 : 0]
    this.s = spacing;
    this.ys = []; // y positions at time t
    for (let x = 0; x < width; x += spacing) {
        this.ys.push(0);
    }
    this.ysp = this.ys.slice(); // y positions at time t-1
}
String.prototype = {
    display: function () {
        noFill();
        stroke(255);
        strokeWeight(5);
        beginShape();
        for (let i = 1; i < this.ys.length; i++) {
            curveVertex(i * this.s, this.ys[i]);
        }
        endShape();
    },
    update: function () {
        let tmp = [];
        tmp[0] = 0 * sin(millis() / 500); // 0 no movement
        for (let i = 1; i < this.ys.length - 1; i++) {
            // from the differential equation d2y/dx2 = m/T*d2y/dt2 with finite difference
            tmp[i] = 2 * this.ys[i] - this.ysp[i] + this.k * (this.ys[i + 1] + this.ys[i - 1] - 2 * this.ys[i]);
            tmp[i] *= this.rest;

            // if (tmp[i] <=5) {
            // tmp[i] -=0.1;
            // k -=0.1;
            // rest -=0.1;
            // } 

            if (tmp[i] <= 0) {
                tmp[i] = 0;
                k = 0;
                rest = 0;
            }

        }

        
        if (mouseIsPressed) {
            tmp[0] = 100 * sin(millis() / 1000); // 0 no movement
           
            //   tmp[(mouseX/this.s)<<0] = mouseY-height/2; 
            
        }

        tmp[this.ys.length - 1] = 0;
        this.ysp = this.ys.slice();
        this.ys = tmp.slice();

    }
};


function mouseDragged() {
    autoPlay = false;
    theta += map(mouseX - pmouseX, 0, width, 0, PI * 2);
}

function mouseReleased() {
    autoPlay = true;
    x= parseInt(random(chords.length));
    console.log(x);
    
}

function mouseClicked() {
    document.getElementById('sketch-holder').addEventListener('click', function(){
        
            
            guitar.triggerAttackRelease(chords[x]);
            
     

     
        
    });
  }














