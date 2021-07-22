var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6 ;
var obstaclesGroup
var cloudsGroup
var score = 0;
var PLAY = 1
var END = 0
var gameState = PLAY
var restart,restartImage,gameOver,gameOverImage;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOverImage = loadImage("gameOver.png");

  restartImage = loadImage("restart.png");



}

function setup() {

  createCanvas(600,200);
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)

  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  gameOver = createSprite(300,100,300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5
  gameOver.visible = false

  restart = createSprite(300,140,300,300);
  restart.addImage(restartImage);
  restart.scale = 0.5
  restart.visible = false
  

}

function draw() {
  //set background color
  background(180);
  
  // console.log(trex.y)
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);

  text("Score  :"+score,500,50);
  
  
  //Spawn Clouds
  

  if (gameState===PLAY){
    ground.velocityX = -4;

    score += Math.round(frameCount/60);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    // jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 150) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8

    spawnClouds()
  
    spawnObstacles()

    if(obstaclesGroup.isTouching(trex)){
      gameState = END
    }
  }

  else if (gameState===END){
    ground.velocityX = 0;

    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)

    trex.changeAnimation("collided",trex_collided)
    trex.velocityY = 0

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    restart.visible = true
    gameOver.visible = true
  }

  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
  if (frameCount%120===0){
    var cloud = createSprite(600,100,10,20)
    cloud.y = Math.round(random(10,60))
    cloud.velocityX = -2 

    cloud.addImage(cloudImage)

    cloud.scale = 0.5

    console.log(cloud.depth)
    cloud.depth= trex.depth

    trex.depth +=1
    cloud.lifetime = 300
    cloudsGroup.add(cloud)

    
    }

 
}

function spawnObstacles(){
  if (frameCount%120===0){
    var obstacle = createSprite(600,165,10,40)
    obstacle.velocityX=-6

    var rand1 = Math.round(random(1,6))

    switch(rand1){
      case 1: obstacle.addImage(obstacle1);break;
      case 2: obstacle.addImage(obstacle2);break;
      case 3: obstacle.addImage(obstacle3);break;
      case 4: obstacle.addImage(obstacle4);break;
      case 5: obstacle.addImage(obstacle5);break;
      case 6: obstacle.addImage(obstacle6);break;
      default : break;
    }

    obstacle.scale = 0.5 ; 
    obstacle.lifetime = 100 ; 

    obstaclesGroup.add(obstacle)

  }


}

