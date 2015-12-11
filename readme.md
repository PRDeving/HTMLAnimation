
#HTMLAnimation
P.R. Deving Dec 2015
####Last update: 11 December 2015


Sprite based animations in pure DOM elements.
No canvas needed.

Rigth now the sprites has to be each frame following the last one, without margin and just in one row (example in img/)


IE8 or less not supported (gonna fix it eventually).

##USE:

```javascript
// Add new animations to the pool
var animation = HTMLAnimation.New(
    QuerySelector ELEMENT,
    String        SPRITESHEET,
    Integer       NUMBER_OF_FRAMES,
    Integer       TILESIZE_X,
    Integer       TILESIZE_Y,
    Integer       ANIMATION_SPEED,
    boolean       DOES_IT_LOOP
);

//EXAMPLE
// Displays an animation from the img/anim.png spritesheet in all DOMElements with the class "animation",
// The animation has 9 frames, each tile is 50x72px, it has to run at level '4' of speed and looping
var animation = HTMLAnimation.New(".animation","img/anim.png",9,50,72,4,true)

//in this case, animation is an array with all the ids from each animation the method has trigged.

//I can pause the second animation from animation with
HTMLAnimation.Pause(animation[1]);

//This does the same but in an element with "animation" ID
var animationinid = HTMLAnimation.New("#animation","img/anim.png",9,50,72,4,true)

//animationinid is the id of the animation fired (an integer)

//I can pause it
HTMLAnimation.Pause(animationid);
```


The "New" method gonna return the animation ID, so you can use the HTMLAnimation options.
```javascript
HTMLAnimation.Pause() //Pause all
HTMLAnimation.Pause(ANIMATION_ID) //Pause animation
HTMLAnimation.Resume() //Resumes all
HTMLAnimation.Resume(ANIMATION_ID) //Resumes animation
HTMLAnimation.PlayFromTo(ANIMATION_ID, Integer FRAME_START, Integer FRAME_END) //Plays animation from FRAME_START to FRAME_END
HTMLAnimation.Loop(ANIMATION_ID, boolean DOES_IT_LOOP) //Enables/disable the loop once the animation ends
```
