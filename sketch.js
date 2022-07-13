var wizard, wizardImage;
var bird, birdImage, birdsGroup;
var sky, skyImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var gameOver, gameOverImage;
var restart, restartImage;
var score = 0 

function preload(){
  //Loading Images
    skyImage = loadImage("skyImage.png");
    wizardImage = loadImage("wizardImage.png");
    birdImage = loadImage("birdImage.png");

}

function setup() {
  createCanvas(350,350)
  //create sky
  sky = createSprite(175,175);
  sky.addImage("sky",skyImage);
  sky.velocityX = 1;
  //create wizard
  wizard = createSprite(45,175,10,10);
  wizard.addImage("wizard", wizardImage);
  wizard.scale = 0.8;

  wizard.setCollider("rectangle",0,0,40,40);

  birdsGroup = new Group();

}

function draw() {
  background(225);


  if (gameState === PLAY){
 
  score = score + Math.round(getFrameRate()/60);
  //infinite sky
    if(sky.x > 250){
    sky.x = width/2;
    }

  wizard.y = World.mouseY;

  edges = createEdgeSprites();
  wizard.collide(edges);

  SpawnBirds();

  if (birdsGroup.isTouching(wizard)){
    gameState = END;
  }
}
 if (gameState === END){
  //gameOver.visible = true;
  //restart.visible = true;
  background(0);
  textSize(15);
  fill("blue");
  stroke("blue");
  text("Game Over. Press the left arrow to restart", 20, 175);
  sky.visible = false;


  sky.velocityX = 0;
  wizard.velocityY = 0;

  birdsGroup.setVelocityXEach(0);
  birdsGroup.setLifetimeEach(-1);
 

  if(keyDown("left_arrow")){
    reset();
  }

}

  drawSprites();

  text("Score: "+ score, 275,20);
}


function SpawnBirds(){
  if (frameCount % 50 === 0){
    bird = createSprite(345,300,10,10);
    bird.y = Math.round(random(0,300));
    bird.addImage("bird", birdImage);
    bird.velocityX = -(3 + 3*score/100);
    bird.scale = 0.2;

    bird.lifetime = 200;

    birdsGroup.add(bird);

  }
}

function reset(){
  gameState = PLAY;
  sky.visible = true;
  sky.velocityX = 1;

  birdsGroup.destroyEach();

  score = 0;
}