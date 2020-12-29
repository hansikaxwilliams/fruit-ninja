var PLAY=1;
var END=0;
var gameState=1;
var knife,knife_cut
var enemyGroup, alien, alienImage, monster, monsterImage,position;
var fruitsGroup, fruit1,fruit2,fruit3,fruit4,friut5,fruit6,fruit, gameOver,restart,game_over,restart_1;
var fruit_1,fruit_2,fruit_3,fruit_4,fruit_5,fruit_6;
var score;
var gameOver, restart_
var knifeSound , gameoverSound


function preload(){
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  knife_cut = loadImage("sword.png");
  gameOver= loadImage("gameover.png");
  alienImage = loadAnimation("alien1.png","alien2.png");

   knifeSound = loadSound("knifeSwooshSound.mp3")
  gameoverSound = loadSound("gameover.mp3")
}

function setup() {
  createCanvas(600, 200);
   knife = createSprite(50,180,20,50);
  knife.addImage(knife_cut);
  knife.scale = 0.5;
  fruitsGroup= new Group();
  enemyGroup= new Group();
  game_over= createSprite(300,100);
  game_over.addImage("gameOver",gameOver);
  game_over.scale=0.5;
  fruitsGroup = createGroup();
  enemysGroup = createGroup();
  
  console.log("Hello" + 5);
  score = 0
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    game_over.visible= false;
    enemy();
    fruits();
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    if(fruitsGroup.isTouching(knife)){
    fruitsGroup.destroyEach();
        knifeSound.play();
      score=score+2;
    }
    if(enemysGroup.isTouching(knife)){
        gameState = END;
        gameoverSound.play();
    }
  }
else if(gameState === END) {
  game_over.visible= true;
 
  enemysGroup.setVelocityXEach(0);
    fruitsGroup.setVelocityXEach(0);
  fruitsGroup.destroyEach();
  enemyGroup.destroyEach();
   }
  drawSprites();
}
   function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruit.velocityX= (7+(score/4));
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
    
    fruit.y=Math.round(random(50,340));
   
    
    fruit.setLifetime=100;
    
    fruitsGroup.add(fruit);
  }
}
function enemy() {
   if (frameCount % 200 === 0) {
     alien = createSprite(600,100,40,10);
    alien.y = Math.round(random(10,60));
    alien.addAnimation("alienkill",alienImage);
    alien.scale = 0.5;
     alien.velocityX=-(8+(score/10));
     enemysGroup.add(alien);
   }
}

