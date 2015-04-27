// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.speed =0;
    this.y = 0;
    this.row = 0;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If player's coordinates collide with the enemies coordinate, collison is detected and player resets to original position.
    if(((player.x >=this.x && player.x <= (this.x+70)) || ((player.x+50) >= this.x && (player.x+50) <= (this.x+70))) && (player.row == this.row)) {
        player.x = 200; player.y = 403; player.row = 5;
    }
    //Check if enemy is out of the canvas context, then reset them back to original position.
    if(this.x >= 505) {
        this.x = -90;
    }
    //Moving the enemy on the x axis depeneding on its speed.
    this.x= this.x+this.speed*dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x+i, this.y);

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.x =200;
    this.y = 403;
    this.row = 5;
    this.sprite ="images/char-boy.png";
    this.points =0;

}

player.prototype.update = function() {

    //Check if the player y coordinate is in the water, indicating player has cleard all the three rows. So the point count increases.
    if(this.y <= 50) {
        this.points = this.points+1;
        var pointHeader = document.getElementById("point");
        pointHeader.innerHTML = "Points: " + this.points;
        this.x = 200;
        this.y = 403;
        this.row = 5;
    }
}

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

player.prototype.handleInput = function(key){
    //on input left, decrease x cordinate of the player by one column.
    if(key == "left" && this.x >=50) {
        this.x = this.x-100;
    }

     //on input right, increase x cordinate of the player by one column.
    if(key === 'right'&& this.x <=350) {
       this.x = this.x+100;
    }

     //on input up, decrease y cordinate of the player by one row and decrease the row number by one.
    if(key === 'up' && this.y >=50) {
       this.y = this.y-83;
       this.row--;
    }

     //on input up, increase y cordinate of the player by one row and increase the row number by one.
    if(key === 'down' && this.y <=400) {
       this.y = this.y+83;
       this.row++;
    }


}

var noenemies = 5;
var allEnemies = [];
//creating enemy objects
for(i=0;i<noenemies;i++) {
   allEnemies[i] = new Enemy();
}
// initializing enemy object properties.
allEnemies[0].x = -100; allEnemies[0].y = 70; allEnemies[0].speed = 100; allEnemies[0].row =1;
allEnemies[1].x = 100; allEnemies[1].y = 70;  allEnemies[1].speed = 150;  allEnemies[1].row =1;
allEnemies[2].x = -500; allEnemies[2].y = 150; allEnemies[2].speed = 500; allEnemies[2].row =2;
allEnemies[3].x = 0; allEnemies[3].y = 230; allEnemies[3].speed = 200; allEnemies[3].row =3;
allEnemies[4].x = 83; allEnemies[4].y = 230; allEnemies[4].speed = 400; allEnemies[4].row =3;

//Initializing player object.
var player = new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
