
#HTMLAnimation
P.R. Deving Dec 2015
####Last update: 11 December 2015


Sprite based animations in pure DOM elements
No canvas needed.


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

The "New" method gonna return the animation ID, so you can use the HTMLAnimation options.

HTMLAnimation.Pause() //Pause all
HTMLAnimation.Pause(ANIMATION_ID) //Pause animation
HTMLAnimation.Resume() //Resumes all
HTMLAnimation.Resume(ANIMATION_ID) //Resumes animation
HTMLAnimation.PlayFromTo(ANIMATION_ID, Integer FRAME_START, Integer FRAME_END) //Plays animation from FRAME_START to FRAME_END
HTMLAnimation.Loop(ANIMATION_ID, boolean DOES_IT_LOOP) //Enables/disable the loop once the animation ends
```
