const _defaultPlayerXPos = 200;
const _defaultPlayerYPos = 450;


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.spriteWidth = 171;
    this.spriteHeight = 101;

    this.speed = +100;

    this.initialXPosition;
    this.initialYPosition;

    this.x = 0;
    this.y = 0;

    this.changeDirection = function ()   
    {
        this.speed = -this.speed;
    }





};


var playerPosX = _defaultPlayerXPos;
var playerPosY = _defaultPlayerYPos;

setPlayerPos = function(x, y)
{
    playerPosX = x;
    playerPosY = y;

}

getPlayerXPos = function()
{
    return playerPosX;
}

getPlayerYPos = function()
{
    return playerPosY;
}


Enemy.prototype.setInitialPositions = function(defaultX, defaultY)
{
    this.initialXPosition = defaultX;
    this.initialYPosition = defaultY;

    this.x = defaultX;
    this.y = defaultY;
}

Enemy.prototype.resetPositions = function()
{


    this.x = this.initialXPosition;
    this.y = this.initialYPosition;
    
}



// Enemy.prototype.lose = function()
// {
//     console.log("perdeu");
//     alert("lose");

//     setPlayerPos(defaultPlayerXPos, defaultPlayerYPos);
// }

// Enemy.prototype.collisionDetection = function(enemyX, enemySpriteW, enemyY, enemySpriteH)
// {
//     // if(playerPosX-enemySpriteW <enemyX && x< playerPosX+enemySpriteW && playerPosY-enemySpriteH <enemyX && enemyY< playerPosY+enemySpriteH)
//     // {
//     //     alert("AAAAh");
//     //     this.lose();
//     // }   

//     console.log(enemyX, enemySpriteW, enemyY, enemySpriteH, playerPosX, playerPosY);

//     if(playerPosX > enemyX && playerPosX < enemyX +enemySpriteW && playerPosY > enemyY  && playerPosY < enemyY+enemySpriteH) 
//     {

//         this.lose();

//     }


// }


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(shouldSpriteChangeDirection(this.x))
    {
        this.changeDirection();

    }
    this.x = this.x+dt*this.speed;

    //if play.

    //console.log(playerPosY, playerPosX, this.x, this.y);

    // this.collisionDetection(this.x, this.spriteWidth, this.y, this.spriteHeight);






    //console.log("está fazendo update");

    
};






shouldSpriteChangeDirection = function(x)
{
     return (x>= 500 || x<0);
}




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log("render");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{




    constructor()
    {
        this.sprite = 'images/char-boy.png';
        this.x = _defaultPlayerXPos;
        this.y = _defaultPlayerYPos;
        this.lifes = 3;
    }

    setLifes(num)
    {
        debugger;
        this.lifes+=num;
        alert(this.lifes);
    }

    update(){

        setPlayerPos(this.x, this.y);

        //console.log(playerPosX, playerPosY);



    }

    render()
    {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        //console.log("render do personagem");
    }
    handleInput(a){
        
        switch (a)
        {

            case 'right':{
                if(this.isMoveLegal(this.x, a))
                    {               
                     this.x = this.x+10;
                    }
                    //console.log(this.x);
                }
                break;

            case 'left':{
                if(this.isMoveLegal(this.x, a))
                    {               
                     this.x = this.x-10;
                    }
                    //console.log(this.x);
                }
                break;

            case 'up':{
                if(this.isMoveLegal(this.y, a))
                {               
                 this.y = this.y-10;
                }
                //console.log(this.y);
            }
            break;

            case 'down':{
                if(this.isMoveLegal(this.y, a))
                {               
                 this.y = this.y+10;
                }
                //console.log(this.y);
            }
            break;

        }   
    }

    isMoveLegal(position, key)
    {

        var ret = false;

        //console.log("position ", position);

        switch (key)
        {
            case 'right':{
                if(position < 450) ret = true;
            } 
            break;
            case 'left':{
                if(position >0) ret = true;
            } 
            break;
            case 'up':{
                if(position >0) 
                    {
                        if(position<20)
                        {
                            this.win();
                        }

                    }
                ret = true;
            } 
            break;
            case 'down':{
                if(position < 450) ret = true;
            } 
            break;

            
        }

        return ret;

    }   

    win()
    {
        console.log("win");
        alert("win");
        this.x = _defaultPlayerXPos;
        this.y = _defaultPlayerYPos;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var allEnemies = new Array();
var enemyEvilBug = new Enemy();
var enemyEvilBug2 = new Enemy();
var enemyEvilBug3 = new Enemy();

enemyEvilBug.setInitialPositions(10,30);
enemyEvilBug2.setInitialPositions(20,250);
enemyEvilBug3.setInitialPositions(40, 79);


// enemyEvilBug.x = 10;
// enemyEvilBug.y = 30;

// enemyEvilBug2.x = 20;
// enemyEvilBug2.y = 250;

// enemyEvilBug3.x = 120;
// enemyEvilBug3.y = 150;

allEnemies.push(enemyEvilBug);
allEnemies.push(enemyEvilBug2);
allEnemies.push(enemyEvilBug3);


// Place the player object in a variable called player

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    //console.log(e.keyCode);

    player.handleInput(allowedKeys[e.keyCode]);
});
