var cat, catImg, dog, dogImg, waterpuddle, waterpuddleImg, garden, gardenImg;

var invisibleGround;

var gameOver, gameOverImg;

var waterPuddleGroup;

var gardenSound, catSound;

var score=0;

var gameState = "PLAY";

function preload(){
  
  catImg = loadImage("cat.png");
  dogImg = loadImage("dog.png");
  waterpuddleImg = loadImage("water puddle.jpg");
  gardenImg = loadImage("garden.jpg");
  gameOverImg = loadImage("game over.png");
  
  waterPuddleGroup = new Group();
  
  gardenSound = loadSound("Calm-garden-sounds-for-relaxation.mp3");
  
  catSound = loadSound("Cat-sound-mp3.mp3");

}

function setup() {
  createCanvas(600,300);
  
  garden = createSprite(300,150);
  garden.addImage("garden", gardenImg);
  garden.velocityX = -6;
  
  cat = createSprite(50,270,10,3);
  cat.addImage("cat", catImg);
  cat.scale = 0.3;
  
  invisibleGround = createSprite(10,270,600,2);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,150);
  gameOver.addImage("gameOver", gameOverImg);
  
  waterPuddleGroup = createGroup();
  
  
  
}

function draw() {
  background(0);
  
  text("Score: "+ score, 500,50);
  
  if(garden.x < 275){
    garden.x = garden.width/2;
  }
    
    if(keyDown("space") && cat.y >= 159) {
      cat.velocityY = -12;
    }
    
    if(invisibleGround.x < 275){
    invisibleGround.x = invisibleGround.width/2;
  }
    
    cat.collide(invisibleGround);
    
  if(gameState === "PLAY"){
    
    gardenSound.play();

    gameOver.visible = false;
    
    
    garden.velocityX = -(4 + 3* score/100)

    score = score + Math.round(getFrameRate()/60);
    console.log(getFrameRate());
    
    
    if(score>0 && score%100 === 0){
       
    }
    
    if (garden.x < 0){
      garden.x = garden.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& cat.y >= 100) {
        cat.velocityY = -12;
       
    }
    
    
    cat.velocityY = cat.velocityY + 0.8;
  
    spawnwaterpuddle();
    
    if(waterPuddleGroup.isTouching(trex)){
        gameState = END;
       catSound.play();
      
    }
  } else if (gameState === END) {
      gameOver.visible = true;
     
      garden.velocityX = 0;
      cat.velocityY = 0;
      
  waterPuddleGroup.setLifetimeEach(-1);
     
   waterPuddleGroup.setVelocityXEach(0); 
  }
  
  cat.collide(invisibleGround);
  
  
 drawSprites();
}

function spawnwaterpuddle() {

  if (frameCount % 60 === 0) {
    var waterpuddle = createSprite(600,165,10,40);
    waterpuddle.y = Math.round(random(80,120));
    waterpuddle.addImage(waterpuddleImg);
    waterpuddle.scale = 0.5;
    waterpuddle.velocityX = -(6 + score/100);
    
    waterpuddle.lifetime = -1;
    
    waterPuddleGroup.add(waterpuddle);
  }
}

