let message = "hidden in plain sight"; 
let fontLiberation; 
let gridIncrement = {width: 0, height: 0};
let messageArray = []; 
let transition = false; 
let lightColors;
let darkColors;
let currentColors;
let targetColors; 
let lerpSpeed = 0.15; 
let color1, color2;
let polys = []; 
let polySize = {width: 225, height: 175}; 
let mouseSpeed;
let ellipseSize = 10;
let angle; 
let ellipsePositionX = []; 
let ellipsePositionY = []; 
let counter = 0; 

function preload(){
  fontLiberation = loadFont("LiberationSans-Regular.ttf");  
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvas-container');
  setupHelper(); 
}

function setupHelper() {
  setupColors(); 
  setupText(); 
}

window.themeChanged = (newTheme) => {
  transition = true;
  lightColors = {
    background: color(255, 255, 255),
    txt: color(255, 255, 255)
  };
  darkColors = {
    background: color(0, 0, 0),
    txt: color(0, 0, 0)
  };
  targetColors = (newTheme === 'light') ? lightColors : darkColors;
};

function draw() {
  if (transition) {
    currentColors.background = lerpColor(currentColors.background, targetColors.background, lerpSpeed); 
    currentColors.txt = lerpColor(currentColors.txt, targetColors.txt, lerpSpeed);
  
    if (dist(red(currentColors.background), green(currentColors.background), blue(currentColors.background),
              red(targetColors.background), green(targetColors.background), blue(targetColors.background)) < 5) {
      currentColors = targetColors; 
      transition = false;
    }
    background(currentColors.background);
  }

  
  let gradientColor = lerpColor(pink, cyan, mouseX / width);
  noStroke(); 
  // ellipse(mouseX, mouseY, noise(1)*width/4); 
  // if (pmouseX !== mouseX && pmouseY !== mouseY) {
  //   const v = [];
  //   const n = 5;
  //   for(let i = 0; i < n; i++) {
  //     let a = i * (TAU/n);
  //     v.push(createVector(mouseX + cos(a) * noise(a) * polySize.width, mouseY + sin(a) * noise(a) * polySize.height));
  //   }
  //   const poly = new Poly(v);
  //   polys.push({poly, time: millis()});
  // }
  // polys = polys.filter(p => {
  //   if (millis() - p.time < 2000) { 
  //     waterColour(p.poly, color(255, 0, 150));
  //     return true;
  //   }
  //   return false;
  // });
  drawEllipseInteraction(gradientColor); 
  drawText(currentColors.txt);
}
 
function drawEllipseInteraction(clr){
  if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
    ellipsePositionX.push(mouseX);
    ellipsePositionY.push(mouseY);
    counter++;
    
    if (counter > 40) {
      ellipsePositionX.shift();
      ellipsePositionY.shift();
      // ellipse_colors.shift();
      counter--;
    }

    for (let i = 0; i < ellipsePositionX.length; i++) {
      noStroke();  
      // fill(red(clr), green(clr), blue(clr), 100)
      // ellipse(ellipsePositionX[i], ellipsePositionY[i], width/15);
      fill(clr); 
      ellipse(ellipsePositionX[i], ellipsePositionY[i], width/16);
    }
  }
}

function drawText(color){
  for(let i = 0; i < messageArray.length; i++){
    textAlign(LEFT, BASELINE); 
    textSize(150); 
    textFont(fontLiberation); 
    noStroke(); 
    fill(color); 
    text(messageArray[i].txt, messageArray[i].x, messageArray[i].y); 
  }
}

function setupColors(){
  pink = color(247, 37, 133); 
  cyan = color(76, 201, 240); 
  lightColors = {
    background: color(255, 255, 255),
    txt: color(255, 255, 255)
  };
  darkColors = {
    background: color(0, 0, 0),
    txt: color(0,0,0)
  };
  currentColors = lightColors;
  targetColors = lightColors; 
}

function setupText(){
  gridIncrement.width = width / 12;
  gridIncrement.height = height / 12;
  let words = message.split(" ");
  messageArray[0] = {txt: words[0], x: calculatePosition(0, gridIncrement.width, 1.5), y: calculatePosition(0, gridIncrement.height, 3.5)};
  messageArray[1] = {txt: words[1], x: calculatePosition(messageArray[0].x, gridIncrement.width, 2.5), y: calculatePosition(messageArray[0].y, gridIncrement.height, 3)};
  messageArray[2] = {txt: words[2], x: calculatePosition(messageArray[1].x, gridIncrement.width, 1.5), y: calculatePosition(messageArray[0].y, gridIncrement.height, 3)}
  messageArray[3] = {txt: words[3], x: calculatePosition(messageArray[2].x, gridIncrement.width, 2), y: calculatePosition(messageArray[2].y, gridIncrement.height, 3)}
}

function calculatePosition(base, increment, multiplier){
  return base + increment*multiplier; 
}

// // POLYGON CLASS, WATERCOLOR, RAND, DISTRIBUTE FUNCTION BORROWED FROM BARNEY CODES: https://www.youtube.com/watch?v=olXv8GOfpNw
// class Poly {
//   constructor(vertices, modifiers) {
//     this.vertices = vertices;
//     if(!modifiers) {
//       modifiers = [];
//       for(let i = 0; i < vertices.length; i ++) {
//         modifiers.push(random(0.1, 0.8));
//       }
//     }
//     this.modifiers = modifiers;
//   }
  
//   grow() {
//     const grownVerts = [];
//     const grownMods = [];
//     for(let i = 0; i < this.vertices.length; i ++) {
//       const j = (i + 1) % this.vertices.length;
//       const v1 = this.vertices[i];
//       const v2 = this.vertices[j];
      
//       const mod = this.modifiers[i];
      
//       const chmod = m => {
//         return m + (rand() - 0.5) * 0.1;
//       }
      
//       grownVerts.push(v1);
//       grownMods.push(chmod(mod));
      
//       const segment = p5.Vector.sub(v2, v1);
//       const len = segment.mag();
//       segment.mult(rand());
      
//       const v = p5.Vector.add(segment, v1);
      
//       segment.rotate(-PI/2 + (rand()-0.5) * PI/4);
//       segment.setMag(rand() * len/2 * mod);
//       v.add(segment);
      
//       grownVerts.push(v);
//       grownMods.push(chmod(mod));
//     }
//     return new Poly(grownVerts, grownMods);
//   }
  
//   dup() {
//     return new Poly(Array.from(this.vertices), Array.from(this.modifiers));
//   }
  
//   draw() {
//     beginShape();
//     for(let v of this.vertices) {
//       vertex(v.x, v.y);
//     }
//     endShape(CLOSE);
//   }
// }

// function waterColour(poly, colour) {
//   const numLayers = 30;
//   fill(red(colour), green(colour), blue(colour), 255/(2 * numLayers));
//   noStroke();
  
//   poly = poly.grow().grow();
  
//   for(let i = 0; i < numLayers; i ++) {
//     if(i == int(numLayers/3) || i == int(2 * numLayers/3)) {
//       poly = poly.grow().grow();
//     }
    
//     poly.grow().draw();
//   }  
// }

// function rand() {
//   return distribute(random(1));
// }

// function distribute(x) {
//   return pow((x - 0.5) * 1.58740105, 3) + 0.5;
// }

//   // 12X12 Grid
  // for(let i = 0; i <= width; i+=gridIncrement.width){
  //   for(let j = 0; j <= height; j+= gridIncrement.height){   
  //     stroke(255); 
  //     line(i, 0, i, height);
  //     line(0, j, width, j);
  //   }
  //

  // let noiseValue = noise(frameCount * 0.1) * 200; // Adjust the multiplier values as needed
  // let w = noiseValue + 50; // Minimum width of 50
  // let h = noiseValue + 50; // Minimum height of 50
  
  // let gradientColor = lerpColor(color1, color2, mouseX / width);
  // fill(gradientColor);
  // noStroke();
  // ellipse(mouseX, mouseY, w, h);