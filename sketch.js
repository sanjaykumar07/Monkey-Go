var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup,bg,bgImage,roof,sound1,sound2,sound3;
var score = 0;


function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png  ");
  
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 bgImage = loadImage("bg.jpg");
  
 sound1 = loadSound("Bite.mp3");
 sound2 = loadSound("monkeypatas.mp3");
 sound3 = loadSound("breathing.mp3");
}


function setup() {
  createCanvas(600,300);
  
  bg = createSprite(300,150);
  bg.addImage(bgImage);
  bg.velocityX = -6;
  bg.scale = 0.15;
  
  monkey = createSprite(35,250);
  monkey.addAnimation("asd",monkey_running);
  monkey.scale = 0.13;
  
  ground = createSprite(300,290,1200,5);
  ground.visible = false;
  

  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  
}


function draw() {
 background("white");
  
  
 monkeyMovement();
 spawnObstacles();
 spawnBanana();
  
 monkey.velocityY+=0.8;
 monkey.collide(ground);
  
 if(bg.x <-200){
    bg.x=300;
  }
  
  if(frameCount%250  === 0){
    sound3.play();
  }
  
  
  drawSprites();
  
  textSize(20);
  text("Survival Time : "+score,190,50);
 
  if(frameCount%30 === 0){
  score = score+1;
 }
}


function spawnObstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(600,250);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 125;
    obstacleGroup.add(obstacle);
  }
    
   if(monkey.scale>0.10 ) {
    if(monkey.isTouching(obstacleGroup)){
      monkey.scale = monkey.scale -0.01;
       sound2.play();
 }
}
   
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
 } 
}


function monkeyMovement(){
 if(monkey.y>150){
  if(monkey.y>50){
   if(keyDown("space")){
    monkey.velocityY=monkey.velocityY-4;  
   }
 }
}
  
if(monkey.x<570){  
  if(keyDown("RIGHT_ARROW")){
    monkey.x = monkey.x+5;
  }
}
  
 if(monkey.x>0){
  if(keyDown("LEFT_ARROW")){
    monkey.x = monkey.x-5;
  }
 }
}


function spawnBanana(){
  
 if(frameCount %150 === 0){ 
  banana = createSprite(600,100);
   banana.addImage(bananaImage);
   banana.velocityX = -5;
   banana.lifetime = 125;  
   banana.scale = 0.1;
   
  foodGroup.add(banana);
 }
  
 if(monkey.scale <0.18){
  if(monkey.isTouching(foodGroup)){
    monkey.scale = monkey.scale+0.01;
  }
 }
  

  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
   sound1.play();
  }
}

