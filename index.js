/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(dodgeThis) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(dodgeThis.style.top);
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  //  The DODGER is 40 pixels wide -- how do we get the right edge?
  //  The rock is 20 pixel's wide -- how do we get the right edge?
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)-20;
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+20;
    const rockLeftEdge = positionToInteger(dodgeThis.style.left)-10;
    const rockRightEdge = positionToInteger(dodgeThis.style.left)+10;
      if ((rockRightEdge > dodgerLeftEdge && rockRightEdge > dodgerRightEdge-40)||(rockLeftEdge < dodgerRightEdge && rockLeftEdge < dodgerLeftEdge+40)) {
        return true;
      } else {
        return false;
      }
  }
}

function createRock(x) {
  var rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  // Hmmm, why would we have used `var` here?
  var top = 0;
  rock.style.top = top;
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock);
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(ROCKS[0]) === true) {
       endGame();
     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     else if (top < GAME_HEIGHT-20) {
       function step() {
       var top = top +2;
       window.requestAnimationFrame(step())
      }
     }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     else if (top >= GAME_HEIGHT) {
       function dropOff() {
         ROCKS = ROCKS.shift();
       }
     }
  }
  // We should kick of the animation of the rock around here
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
  // Finally, return the rock element you've created
  return rock
}
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  gameInterval = null;
  ROCKS.remove;
  moveDodger.remove;
  if (confirm("Anyway, you lost... and yet not all is lost. Try again?")) {
    start();
  } else {
    window.close();
  }
  alert("#BoxFriendNotFood")
  alert("And about the scourge of box cannibalism.");
  alert("Still here, huh? Must be a glutton for punishment. I guess we all learned something about ourselves today.");
  alert("...");
  alert("And by 'psychopaths' I guess I mean me.");
  alert("And by 'they' I mean psychopaths.");
  alert("I mean, they do say that pain is the best teacher.");
  alert("Rather than crushing your soul.");
  alert("So think of this as improving your resolve.");
  alert("... but without consequence, there's no motivation to improve!");
  alert("I'm sorry to have to do this to you...");
  alert("As punishment, you have to click your way through all of these annoying alerts.");
  alert("Which is another way of saying 'You lose'.");
  alert("And nobody wins when cannibalism is involved.");
  alert("Basically, box cannibalism.");
  alert("Your box got crushed by one of the other boxes.");
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if (e.which === LEFT_ARROW) {
       moveDodgerLeft();
     }
     else if (e.which === RIGHT_ARROW) {
       moveDodgerRight();
     }
     else {
       return
     }
}

function moveDodgerLeft() {
  var dodgerCoord = positionToInteger(DODGER.style.left);
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   if (dodgerCoord >24) {
     function step() {
     DODGER.style.left = dodgerCoord - 4 + 'px';
     window.requestAnimationFrame(step());
    }
  } else {
    return
  }
}

function moveDodgerRight() {
  var dodgerCoord = positionToInteger(DODGER.style.left);
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   if (dodgerCoord <376) {
     function step() {
     DODGER.style.left = dodgerCoord + 4 + 'px';
     window.requestAnimationFrame(step());
    }
  } else {
    return
  }
}


function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
