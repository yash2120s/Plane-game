// defining  global vairiable

var PLAY  = 1;
var END  = 0;
var gameState = PLAY;

var plane, planeImage;
  
var sky ,skyImage;

var obstaclesGroup,bird,mountain,cloud;

var gameOver,gameoverImage ;

var score = 0;

// loading image and sound
function preload(){
  planeImage = loadImage("plane.png")
 
  skyImage = loadImage("sky.png")
  
  bird = loadImage("bird.png");
  mountain = loadImage("mountain.png");
  cloud = loadImage("cloud.png");   
gameOverImage = loadImage("gameover.png")
  restartImage = loadImage("restart.png")
}

function setup(){
  // creating canvas
    createCanvas(400,400)
  
  //creating sky ,adding image to it,start movig it 
  sky = createSprite(200,200,400,400)
  sky.addImage(skyImage)
  sky.velocityX = -8
  
  //creating ground ,start moving it 
  ground = createSprite(200,395,900,10)
  ground.velocityX  = -4
  
  // creating plane ,adding image to it , make it to copatiable size 
  plane = createSprite(80,40,10,10)
  plane.addImage(planeImage)
  plane.scale = 0.2;

  gameOver = createSprite(200,130,10,10)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.7
  
  restart  = createSprite(200,250,10,10)
  restart.addImage(restartImage)
  restart.scale = 0.5
  // creating group
  obstaclesGroup  = createGroup();
  
  // creating score
  
  score = 0;
  
}
   function draw(){
  background("white");
     
    
   
     
     //if game in play state
     if(gameState === PLAY){
     // reset ground and sky x position
     if(sky.x<0){
       sky.x = sky.width/2;
     }
     
       //adding score
       score = score + Math.round(getFrameRate()/60);
       
     if(ground.x<0){
       ground.x = ground.width/2
     }
     
  gameOver.visible = false;
       restart.visible = false;
     // to move plane 
     if(keyDown('up')){
       if(plane.y >40)
       plane.y = plane.y-10
     }
     
     if(keyDown("down")){
       if(plane.y<370){
         plane.y = plane.y+10
       }
     }
       //adding obstacles function
     obstacles();
    
     // changing gameState to end
if(obstaclesGroup.isTouching(plane)||plane.isTouching(ground)){
         gameState = END;
       }
   }  
     // if game in end state
     else if(gameState === END){
       ground.velocityX = 0;
       sky.velocityX = 0;
       obstaclesGroup.setVelocityXEach(0);
       obstaclesGroup.destroyEach();
       ground.visible = false;
       plane.visible = false;
        
  gameOver.visible = true;
       restart.visible = true;
     }
     
     // restarting game 
     if(mousePressedOver(restart)){
       reset();
     }
     drawSprites();
     
       text('Score: '+ score,305,15,textSize(20),fill('red'))
}

//making obstacles function
function obstacles(){
  //making obstacle sprites moving them giving them randomly y position adding image

  if(frameCount%100===0){
  obstacle = createSprite(430,200,10,10);
  obstacle.y = Math.round(random(10,350));

  r = Math.round(random(1,3))
  
  if(r === 1){
    obstacle.addImage(cloud)
    obstacle.scale = 0.5
  }
    if(r === 2){
      obstacle.addImage(bird)
        obstacle.scale = 0.2
    }
    if (r===3){
      obstacle.y = 390
      obstacle.addImage(mountain)
      obstacle.collide(ground)
    }
      obstacle.velocityX = -4
  //adding obstacles to the group
    obstaclesGroup.add(obstacle)
}}

// making function reset

function reset(){
  gameState = PLAY;
  
 obstaclesGroup.destroyEach();
  plane.visible = true;
  ground.visible = true;
  
  plane.x  = 80
  
  score  = 0;
  
}