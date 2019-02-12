// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.speed = +100;

    this.x = 0;
    this.y = 0;

    this.changeDirection = function ()   
    {
        this.speed = -this.speed;
    }



};


var playerPosX =2;
var playerPosY =2;

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

    if(playerPosX-5 <this.x && this.x< playerPosX+5 && playerPosY-5 <this.x &&this.x < playerPosY+5)
    {
        alert("evento");
    }




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
        this.x = 50;
        this.y = 50;
    }

    update(){

        playerPosX = this.x;
        playerPosY = this.y;

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
                     this.x = this.x+1;
                    }
                    //console.log(this.x);
                }
                break;

            case 'left':{
                if(this.isMoveLegal(this.x, a))
                    {               
                     this.x = this.x-1;
                    }
                    //console.log(this.x);
                }
                break;

            case 'up':{
                if(this.isMoveLegal(this.y, a))
                {               
                 this.y = this.y-1;
                }
                //console.log(this.y);
            }
            break;

            case 'down':{
                if(this.isMoveLegal(this.y, a))
                {               
                 this.y = this.y+1;
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
                            win();
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
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var allEnemies = new Array();
var enemyEvilBug = new Enemy();
var enemyEvilBug2 = new Enemy();
var enemyEvilBug3 = new Enemy();

enemyEvilBug.x = 10;
enemyEvilBug.y = 30;

enemyEvilBug2.x = 20;
enemyEvilBug2.y = 250;

enemyEvilBug3.x = 120;
enemyEvilBug3.y = 150;

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
