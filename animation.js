//
//  HTMLAnimation
//  Pablo R. Deving Dec 2015
//
//  Last update: 11 December 2015
//
//
//  Sprite based animations in pure DOM elements
//  No canvas needed.
//
//  IE8 or less not supported (gonna fix it eventually).
//
//  USE:
//  
//  // Add new animations to the pool
//  var animation = HTMLAnimation.New(
//                      QuerySelector ELEMENT,
//                      String        SPRITESHEET,
//                      Integer       NUMBER_OF_FRAMES,
//                      Integer       TILESIZE_X,
//                      Integer       TILESIZE_Y,
//                      Integer       ANIMATION_SPEED,
//                      boolean       DOES_IT_LOOP
//                  );
//
//  The "New" method gonna return the animation ID, so you can use the HTMLAnimation options.
//
//  HTMLAnimation.Pause() //Pause all
//  HTMLAnimation.Pause(ANIMATION_ID) //Pause animation
//  HTMLAnimation.Resume() //Resumes all
//  HTMLAnimation.Resume(ANIMATION_ID) //Resumes animation
//  HTMLAnimation.PlayFromTo(ANIMATION_ID, Integer FRAME_START, Integer FRAME_END) //Plays animation from FRAME_START to FRAME_END
//  HTMLAnimation.Loop(ANIMATION_ID, boolean DOES_IT_LOOP) //Enables/disable the loop once the animation ends
//
//

var HTMLAnimation = new function(){
    var _timer;
    var _tc;
    var _pool = [];
    var _stoped = [];

    var _new = function(el, sprite, frames, tilesizex, tilesizey, fps, loop){

        switch(el.charAt(0)){
            case "#":
                var an = document.getElementById(el.replace("#",""));
                var as = an.style;

                as.backgroundImage = "url("+sprite+")";
                as.backgroundPosition = "0 0";
                as.backgroundRepeat = "no-repeat";

                _pool.push([
                    an,
                    frames,
                    0, //cf
                    [0,frames], //from to
                    [tilesizex,tilesizey],
                    fps,
                    loop
                ]);
                return _pool.length-1;
            break;
            case ".":
                var els = document.getElementsByClassName(el.replace(".",""));
                var anids = [];

                for(var an  = 0; an < els.length; an++){
                    var as = els[an].style;

                    as.backgroundImage = "url("+sprite+")";
                    as.backgroundPosition = "0 0";
                    as.backgroundRepeat = "no-repeat";

                    _pool.push([
                        els[an],
                        frames,
                        0, //cf
                        [0,frames], //from to
                        [tilesizex,tilesizey],
                        fps,
                        loop
                    ]);
                    anids.push(_pool.length-1);
                }
                return anids;
            break;
        }
    }

    var _playPortion = function(id,s,e){
        if(!e) e = _pool[id][1];
        _pool[id][3] = [s,e];
    }

    var _pause = function(id){
        if(typeof id == "undefined"){
            _tc = false;
            clearInterval(_timer);

            for(var id = 0; id < _pool.length; id++){
                if(typeof _pool[id] == "number") continue;
                var sid = Math.floor(Math.random()*999999);
                _stoped[sid] = _pool[id].slice(0);
                _pool[id] = sid;
            }
        }else{
            var sid = Math.floor(Math.random()*999999);
            _stoped[sid] = _pool[id].slice(0);
            _pool[id] = sid;
        }
    }

    var _resume = function(id){
        if(!_tc) _startLoop();

        if(typeof id == "undefined"){
            for(var id = 0; id < _pool.length; id++){
                var i = _pool[id];
                if(typeof i != "number") continue;
                _pool[id] = _stoped[i].slice(0);
                delete _stoped[i];
            }
        }else{
            var i = _pool[id];
            _pool[id] = _stoped[i].slice(0);
            delete _stoped[i];
        }
    }

    var _doesItLoop = function(id,bool){
        _pool[id][6] = bool;
    }

    var _lc = 0;
    var _startLoop = function(){
        if(!_tc){
            _tc = true;
            _timer = setInterval(function(){
                _lc++;
                if(_lc > 1000) _lc = 0;
                for(var i in _pool){
                    if(typeof _pool[i] == "number") continue;
                    if(_lc % _pool[i][5] != 0) continue;

                    if(_pool[i][2] < _pool[i][3][1]){
                        _pool[i][2]++;
                    }else{
                        if(_pool[i][6]) _pool[i][2] = _pool[i][3][0];
                    }
                    _pool[i][0].style.backgroundPosition = -(_pool[i][2] * _pool[i][4][0]) + " 0";
                }
            },30);
        }
    }

    _startLoop();

    this.New = _new;

    // this.Start = _startLoop;
    this.Resume = _resume;

    this.Pause = _pause;
    this.PlayFromTo = _playPortion;
    this.Loop = _doesItLoop;
}














