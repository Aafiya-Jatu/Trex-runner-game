var gameState = "play";
var trex, trex_running, edges;
var trex_jump;
var groundImage;
var ground;
var invisibleGround;
var cloud, cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacle;
var rand;
var score = 0;
var obstaclesGroup,cloudsGroup;
var collidedImage;
var gameOver,gameOverImage;
var restart,restartImage;
var jumpSound,dieSound,checkpointSound;

function preload(){
  trex_running =  loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  collidedImage = loadImage("trex_collided.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkPoint.mp3");
  trex_jump = loadAnimation("trex1.png")
  
  
  
}

function setup(){
  createCanvas(600,200);
  
  //creating obstacles and clouds Group
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", collidedImage);
  trex.addAnimation("jump", trex_jump);
  //adding scale and position to trex
  trex.scale = 0.5;
  //trex.debug = true;
  //trex.setCollider("rectangle",0,0,400,trex.height);

  
  edges = createEdgeSprites();
  
  
  //creating ground
   ground = createSprite(300,180,600,20);
   ground.addImage("ground_running",groundImage);
   
  
  
  //creating the invisibleGround
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  
  //Creating gameOver and Restart
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale = 0.5;
}

function draw(){
  
    //console.log(getFrameRate());
   

    //set background color 
    background("#29D2E4");
    //Adding console
    console.log(trex.y);
  
    if(gameState === "play"){
    score = score + Math.round(getFrameRate()/60);
      
    trex.changeAnimation("running" , trex_running);
     
   
    if(score % 500 == 0 && score>0){
    checkpointSound.play();
       
    }
    
      
    ground.velocityX = -(2 + score / 100);
      
    //Making gameOver and restart invisible
     gameOver.visible = false;
     restart.visible = false;
    
      
    if(obstaclesGroup.isTouching(trex)){
    gameState = "end";
    dieSound.play();
    //trex.velocityY = -10;
    //jumpSound.play();
       
       
    }
      
   //Spawning the obstacles and clouds
    spawnObstacles();      
    spawnClouds();
      
    trex.velocityY = trex.velocityY + 0.5; 
    
    //jump when space key is pressed 
    if(keyDown("space")&&trex.y>=161.5){
    trex.velocityY = -10;  
    jumpSound.play();
    }
    
    if(ground.x<0){
    ground.x = ground.width/2;
      
    }
      
      if(trex.y<161.5){
        trex.changeAnimation("jump");
         
    }
  
    }
    else if(gameState === "end"){
      
    if(mousePressedOver(restart)){
      reset();
      
      
    }
    
    
    //Making the gameOver and restart visible
    gameOver.visible = true;
    restart.visible = true;
       
       
    //stop the ground       
    ground.velocityX = 0;
    trex.velocityY = 0;
       
       
    //Change trex animation      
    trex.changeAnimation("collided");
      
    obstaclesGroup.setVelocityXEach(0); 
      
    cloudsGroup.setVelocityXEach(0);  
      
    obstaclesGroup.setLifetimeEach(-1);
      
    cloudsGroup.setLifetimeEach(-1);
      
    }  
  
  //Scoring system
  text(" Score: "+ score,500,50); 
  
  
 
  
  
  
 
  
  //logging the y position of the trex
 // console.log(trex.y)
  
  
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  
  
  
  drawSprites();
  
}

   function reset(){
     
    //change the gameState back to play
      gameState = "play";
      
      //making the gameover and restart sprites not visible
      gameOver.visible = false;
      restart.visible = false;
      
      //destroy all obstacles and clouds
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      
      
      //changing the trex animation from collided to running
      trex.changeAnimation("running" , trex_running);
     
      //reseting the score back to zero
      score = 0;
     
     
   }


  function spawnObstacles(){
    
    if(frameCount % 60==0){
    obstacle = createSprite(600,165,20,20);
    obstacle.velocityX = -(6 + score / 100);
    rand = Math.round(random(1,6));
    
      
    switch(rand){
    
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break; 
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
        
      default:break;        
    }
    
     obstacle.scale = 0.5;
     obstacle.lifetime = 120;
     obstacle.depth = trex.depth;
      
      
    obstaclesGroup.add(obstacle);
    }
  
  
  }



function spawnClouds(){
 
  if(frameCount % 60 === 0){
  cloud = createSprite(600,100,20,20);
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;
  cloud.velocityX = -3;
  cloud.y = Math.round(random(60,120));
  cloud.depth = trex.depth;
  trex.depth = trex.depth +1;
    
  //Giving the lifetime to the clouds
    cloud.lifetime = 200;
    
  cloudsGroup.add(cloud);
  }
  
 
  
}
