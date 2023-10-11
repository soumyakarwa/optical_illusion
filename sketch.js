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
    // Interpolate only if the transition flag is true
    currentColors.background = lerpColor(currentColors.background, targetColors.background, lerpSpeed); 
    currentColors.txt = lerpColor(currentColors.txt, targetColors.txt, lerpSpeed);

    console.log("passed")
    // Turn off the transition flag if the colors are close enough
    if (dist(red(currentColors.background), green(currentColors.background), blue(currentColors.background),
              red(targetColors.background), green(targetColors.background), blue(targetColors.background)) < 5) {
                console.log("distance is less than 2"); 
      currentColors = targetColors; 
      transition = false;
      console.log("transition ", transition)
    }
  }

  background(currentColors.background);
  let gradientColor = lerpColor(color1, color2, mouseX / width);
  noStroke(); 
  // Set the background color based on the gradient color
  fill(gradientColor)
  ellipse(mouseX, mouseY, noise(1)*width/4); 
  drawText(currentColors.txt);
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
  color1 = color(255, 0, 150);  // Neon Pink
  color2 = color(0, 255, 255); // Neon Cyan
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
  // 12X12 Grid
  // for(let i = 0; i <= width; i+=gridIncrement.width){
  //   for(let j = 0; j <= height; j+= gridIncrement.height){   
  //     stroke(255); 
  //     line(i, 0, i, height);
  //     line(0, j, width, j);
  //   }
  //
