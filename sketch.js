let message = "hidden in plain sight"; 
let fontLiberation; 
let gridIncrement = {width: 0, height: 0};

function preload(){
  fontLiberation = loadFont("LiberationSans-Regular.ttf");  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  messageArray = message.split(" "); 
  gridIncrement.width = width/12;
  gridIncrement.height = height/12; 
}

function draw() {
  background(0); 
  textFont(fontLiberation); 
  textSize(150); 
  stroke(255);
  for(let i = 0; i <= width; i+=gridIncrement.width){
    for(let j = 0; j <= height; j+= gridIncrement.height){
      line(i, 0, i, height);
      line(0, j, width, j);
    }
  }

  fill(255); 
  textAlign(LEFT, TOP); 
  text(messageArray[0], gridIncrement.width*2, gridIncrement.height*2);  
  text(messageArray[1], gridIncrement.width*4, gridIncrement.height*5);  
  text(messageArray[2], gridIncrement.width*5.5, gridIncrement.height*5);
  text(messageArray[3], gridIncrement.width*7, gridIncrement.height*8);  
}
