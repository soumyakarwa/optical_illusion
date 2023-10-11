let message = "hidden in plain sight"; 
let fontLiberation; 
let gridIncrement = {width: 0, height: 0};
let messageArray = []; 

function preload(){
  fontLiberation = loadFont("LiberationSans-Regular.ttf");  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("beofre set up helper ", messageArray); 
  setupHelper(); 
}

function draw() {
  background(0);

  // 12X12 Grid
  // for(let i = 0; i <= width; i+=gridIncrement.width){
  //   for(let j = 0; j <= height; j+= gridIncrement.height){
  //     stroke(255); 
  //     line(i, 0, i, height);
  //     line(0, j, width, j);
  //   }
  // }
  drawText(255); 
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

function setupHelper() {
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
