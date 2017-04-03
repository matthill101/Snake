//SNAKE BY MATT HILL

var multiplesoffive = [];

var snake = [];

var food = [];

var snakeposx = 350;
var snakeposy = 350;

var foodposx;
var foodposy;

var gameover = false;

var snakespeed = 25;

var direction = 1;
var level = 0;

var imgfood0;
var imgsnake0;
var imgsnake1;
var imggrass0;

var gamestate = 0;

var prevscore = 0;

var underbodyworked = false;

var speed = 8;

function preload() {
    imgfood0 = loadImage("images/food0.png");
    imgsnake0 = loadImage("images/snake0.png")
    imggrass0 = loadImage("images/grass0.png")
    imgsnake1 = loadImage("images/snake1.png")
}


function setup() {
    
createCanvas(700,700);
    
textAlign(CENTER);
textSize(45);
textFont("Georgia");
    
}

function draw() {
    
    if (gamestate == 1) {
    frameRate(speed);
    }
    
    print(underbodyworked)
    //print(snake[1].x)
    
    image(imggrass0,0,0,800,800);
    
//MENU STUFF
    
    if (gamestate == 0) {
        if (mouseX > 172 && mouseX < 528 && mouseY > 375 && mouseY < 469) {
        image(imgsnake1,0,0); 
        
    }  
        if (mouseX > 172 && mouseX < 528 && mouseY > 375 && mouseY < 469 && mouseIsPressed) {
        gamestate = 1;
        level = 1;
        direction = 1;
        snakeposy = 350;
        snakeposx = 350;
        snake.push(new SnakePart(snakeposx,snakeposy))
        gameover = false;
    }  
        image(imgsnake0,0,0)
        
        fill(255);
        text(prevscore, 350,575)
        
        frameRate(60);
    }
    
//FILLING VAR WITH MULTIPLES OF FIVE
    for (var i = 0; i <= 27; i++) {
    multiplesoffive[i] = i * 25   
    }

//WHAT FOLLOWS AFTER GAMEOVER
    if(gameover) {
        snake.splice(0,snake.length)
        prevscore = level;
        gamestate = 0;
    }
    
//FOOD PIECE FUNCTIONS
    
//displaying food
    for (var i = food.length-1; i >= 0; i--) {
    if(gamestate == 1) {
    food[i].display();
    }
    }
        
//making new food
    if (food.length < 1) {
        food.push(new FoodPart(random(multiplesoffive),random(multiplesoffive)))
    }
  
//setting pos vars
    if (gamestate == 1) {
//    print(foodposx);
    
    foodposx = food[0].x;
    foodposy = food[0].y;
    }
    
//eating food
    for (var j = 0; j < food.length; j++) {
        if (food[j].intersects()) {
            food.splice(i,1);
            level++;
        for (var i = snake.length-1; i >= 0; i--) {
        snake[i].lifespan += 100;
        }       
        }
    }

//food underbody
    for (var i = 0; i < snake.length; i++) { 
        if (snake[i].x == foodposx && snake[i].y == foodposy && i != snake.length-1) {
            food.splice(0,1);
            underbodyworked = true;
        } else {
            underbodyworked = false;
        }
    }
    
    
        
//SNAKE BODY FUNCTIONS   
//displaying snake
    for (var i = snake.length-1; i >= 0; i--) {
    if (gamestate == 1) {
    snake[i].display();
    }

//checking snake intersection
    for (var j = 0; j < snake.length; j++) {
        if (i != j && snake[i].intersects(snake[j])) {
            gameover = true;
        }
    }
     
//removing dead snake pieces
    if (snake[i].isFinished()) {
        snake.splice(i,1);
    }
    }

//MOVE SNAKE POSITION
    if(gameover == false) {
    movesnakepos();
    }
    
//DIMINISHING SNAKE BODIES
        for (var i = snake.length-1; i >= 0; i--) {
    snake[i].lifespan = snake[i].lifespan - 50 
    }

//MAKING THE SNAKE BODIES
    if (gamestate == 1) {     
    snake.push(new SnakePart(snakeposx,snakeposy))
    }
    
//GAMEOVER IF OFF SCREEN
    if (snakeposx < 0 || snakeposx >= 700 || snakeposy < 0 || snakeposy >= 700) {
        snake.splice(0,snake.length)
        gameover = true;
    }
}

//SNAKE AND ITS FUNCTIONS
function SnakePart(x,y) {
    
    this.x = x;
    this.y = y;
    this.col = [0,153,0];
    this.lifespan = level*100
    
    this.display = function() {    
        stroke(0);
        fill(this.col);
        rect(this.x,this.y,25,25);        
    }
    
    this.isFinished = function() {
        if(this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }
    
    this.intersects = function(other) {
        var d = dist(this.x,this.y,other.x,other.y);
        if (d < 5) {
            return true;
        } else {
            return false;
        }
    }
    
}

//FOOD PART AND ITS FUNCTIONS
function FoodPart(x,y) {
    
    this.x = x;
    this.y = y;
    this.col = 150;
    this.lifespan = 1
    
    this.display = function() {    
        noStroke();
        fill(this.col);
        image(imgfood0,this.x,this.y);        
    }
    
    this.isEaten = function() {
        if(this.lifespan < 1) {
            return true;
        } else {
            return false;
        }
    }
    
    this.intersects = function() {
        var d = dist(this.x,this.y,snakeposx,snakeposy);
        if (d < 5) {
            return true;
        } else {
            return false;
        }
    }
}

//MOVING THE SNAKE POSITION
function movesnakepos() {
    if (direction == 0) {
        snakeposy = snakeposy - snakespeed
    } else if (direction == 1) {
        snakeposx = snakeposx + snakespeed
    } else if (direction == 2) {
        snakeposy = snakeposy + snakespeed
    } else if (direction == 3) {
        snakeposx = snakeposx - snakespeed
    }
}   

//SETTING DIRECTION
function keyPressed() {
    if (keyCode === UP_ARROW && direction != 2) {
        direction = 0;
    } else if (keyCode === RIGHT_ARROW && direction != 3) {
        direction = 1;
    } else if (keyCode === DOWN_ARROW && direction != 0) {
        direction = 2;
    } else if (keyCode === LEFT_ARROW && direction != 1) {
        direction = 3;
    } 
}



