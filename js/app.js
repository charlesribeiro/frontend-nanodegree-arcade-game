const _defaultPlayerXPos = 200;
const _defaultPlayerYPos = 450;
const _playerXMoveStep = 80;
const _playerYMoveStep = 80;

const _canvasWidth = 505;
const _canvasHeigth = 606;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.spriteWidth = 171*0.66;
    this.spriteHeight = 101*0.0;

    this.speed = +100;

    this.initialXPosition;
    this.initialYPosition;

    this.x = 0;
    this.y = 0;

    this.changeDirection = function ()
    {
        this.x = this.x-500;
    }

    this.renderSpecial= function(x, y) //draws a single instance of the player sprite
    {
        ctx.drawImage(Resources.get(this.sprite), x, y);
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

Enemy.prototype.setInitialFeatures = function(defaultX, defaultY, defaultSpeed)
{
    this.initialXPosition = defaultX;
    this.initialYPosition = defaultY;
    this.initialSpeed = defaultSpeed;

    this.x = defaultX;
    this.y = defaultY;
    this.speed = defaultSpeed;
}

Enemy.prototype.resetPositions = function()
{
    this.x = this.initialXPosition;
    this.y = this.initialYPosition;
    this.speed = this.initialSpeed;

}


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



};


shouldSpriteChangeDirection = function(x)
{
     return (x>= _canvasWidth || x<0);
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

        this.spriteWidth = 171;
        this.spriteHeight = 101*0.2
        
        this.lifes = 3;
    }

    setLifes(num)
    {
        // debugger;
        this.lifes+=num;
        alert("Perdeu uma vida");
    }

    getLifes()
    {
        return this.lifes;
    }

    update(){

        setPlayerPos(this.x, this.y);

        //console.log(playerPosX, playerPosY);
    }

    render()
    {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    renderSpecial(x, y) //draws a single instance of the player sprite
    {
        ctx.drawImage(Resources.get(this.sprite), x, y);
    }
    handleInput(a){

        switch (a)
        {

            case 'right':{
                if(this.isMoveLegal(this.x, a))
                    {
                     this.x = this.x+_playerXMoveStep;
                    }
                    //console.log(this.x);
                }
                break;

            case 'left':{
                if(this.isMoveLegal(this.x, a))
                    {
                     this.x = this.x-_playerXMoveStep;
                    }
                    //console.log(this.x);
                }
                break;

            case 'up':{
                if(this.isMoveLegal(this.y, a))
                {
                 this.y = this.y-_playerYMoveStep;
                }
                //console.log(this.y);
            }
            break;

            case 'down':{
                if(this.isMoveLegal(this.y, a))
                {
                 this.y = this.y+_playerYMoveStep;
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
                        // if(position-_playerYMoveStep<20)
                        // {
                        //     this.win();
                        //     ret = false;
                        // }

                    }
                ret = true;
            }
            break;
            case 'down':{
                if(position < 450) ret = true;
            }
            break;

            case 'enter':{
            }
            break;


        }

        return ret;

    }

    win()
    {
        // setTimeout(function(){ 

        //         this.x = _defaultPlayerXPos;
        //         this.y = _defaultPlayerYPos;
        //         debugger;
        //  }, 3000);

         this.x = _defaultPlayerXPos;
         this.y = _defaultPlayerYPos;


    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var allEnemies = new Array();
var enemyEvilBug0 = new Enemy();
var enemyEvilBug1 = new Enemy();
var enemyEvilBug2 = new Enemy();
var enemyEvilBug3 = new Enemy();
var enemyEvilBug4 = new Enemy();

enemyEvilBug0.setInitialFeatures(10,55, 100);
enemyEvilBug1.setInitialFeatures(20,140, 200);
enemyEvilBug2.setInitialFeatures(40, 310, 100);
enemyEvilBug3.setInitialFeatures(140, 310, 100);
enemyEvilBug4.setInitialFeatures(140, 225, 100);


allEnemies.push(enemyEvilBug0);
allEnemies.push(enemyEvilBug1);
allEnemies.push(enemyEvilBug2);
allEnemies.push(enemyEvilBug3);
allEnemies.push(enemyEvilBug4);


// Place the player object in a variable called player

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

