# Assignment 02

## Brief

Choose a “mini-game” to rebuild with HTML, CSS and JavaScript. The requirements are:

- The webpage should be responsive
- Choose an avatar at the beginning of the game
- Keep track of the score of the player
- Use the keyboard to control the game (indicate what are the controls in the page). You can also use buttons (mouse), but also keyboard.
- Use some multimedia files (audio, video, …)
- Implement an “automatic restart” in the game (that is not done via the refresh of the page)

## Screenshots

![Screenshot](./assets/images/Screenshot%202025-11-21%20at%2000.24.37%20(2).png)
![Screenshot](./assets/images/Screenshot%202025-11-21%20at%2000.24.37.png)
![Screenshot](./assets/images/Screenshot%202025-11-21%20at%2000.24.21.png)

## Project description

The "Snake" game is an action video game where a player controls a line, or "snake," that moves around a bordered area, eating food to grow longer. The objective is to eat as much food as possible while avoiding a collision with the walls and the snake's own body. When the snake eats food, it grows, making the game increasingly difficult as it becomes longer and requires more careful navigation. 

In my version, the difficulty increases based on the score, with an increase in speed at 2 points, at 10 and at 15.

The graphics are custom svg's using a more modern aesthetic compared to the original snake game.

## Flowchart

![Flow chart](./assets/images/flowchart.svg)

## Function list


### resizeCanvas()
 
- Description:
  Functionality: Adjusts the canvas dimensions and scaling for responsiveness when the window is resized or when the game starts.
- How:
 It recalculates tileSize based on the new canvas display width and tileCount
 then: Calls drawGame() to render the content immediately with the new dimensions.
    

### updateTimer()
 
- Description:
  Functionality: Updates the in-game timer displayed to the user every second. 
- How:
    - If gameStarted is true, it calculates the elapsed time (currentTime) in seconds since the startTime using Date.now().
    - It converts currentTime (seconds) into minutes and remaining seconds.
    - It formats the output using padStart(2, '0') to make sure both minutes and seconds are always two digits (e.g., "05:07" instead of "5:7").
    - Updates the timerDisplay text content.

### drawGame()

- Description:
  This is the main game loop function, it updates the game state and redraws the screen at set intervals based on fps.

### isGameOver()

- Description:
  Functionality: Determines if the current game state could be a Game Over.
- How:
    - It immediately returns false if the snake is not moving (xVelocity === 0 && yVelocity === 0), to avoid an immediate game over when the game starts.
    - It checks for wall collision: if headX or headY is less than 0 or greater than tileCount.
    - It checks for self-collision by checking through all existing SnakeParts (the body) and seeing if any part's coordinates match the current head position.

### resetGame()

- Description:
  Resets all game state variables to their initial values to allow the player to start a new game.

### updateScoreDisplay()

- Description:
  Updates the score displayed in the dedicated HTML element.

### clearScreen()

- Description:
  Clears the entire canvas area and draws the background color.

### drawGridPoints()

- Description:
  Draws small, white dots at the center of every tile space on the canvas to simulate a grid and therefore to define and make visible the playing area.


### drawSnake()

- Description:
  Draws the snake body and head onto the canvas and updates the SnakeParts array for movement.
- How:
    - Loops through the SnakeParts array and draws the bodyImage at the location of each part.
    - Pushes a new SnakePart (the current headX, headY) onto the end of the SnakeParts array. This effectively tracks the head's current position.
    - Draws the headImage at the current headX and headY.

### drawApple()

- Description:
  Draws the food item (apple) onto the canvas.
- How:
    - appleImage at the current appleX and appleY coordinates.

### checkAppleCollision()

- Description:
  Checks if the snake's head has reached the apple's location.
- How:
    - Compares headX and headY with appleX and appleY.

### changeSnakePosition()

- Description:
  Updates the snake's head coordinates based on the current velocity.
- How:
    - xVelocity to headX and yVelocity to headY. The velocity values are either -1, 0, or 1, effectively moving the snake one tile unit in the corresponding direction.

### changeSnakePosition()

- Description:
  Handles all keyboard input to control the snake and manage game state.
- How:
    - Checks for the Up (38), Down (40), Left (37), and Right (39) key codes and increases or decreases to +1 or -1 x and Y velocity.