//BAD/IT/2324/F/076(starting)
//animation class
class animation{
  constructor(spriteKey='placeholder',startIndex=0,numIndicates=1,framesPerIndex=5,loop=true{
    this.spriteKey=spriteKey;
    this.startIndex=startIndex;
    this.numIndicates=numIndicates;
    this.framesPerIndex=framesPerIndex;
    this.loop=loop;
    
    this.isDone=false;
    this.frame=0;
    this.index=0;
    this.pauseFrames=0;
  }

update(){
  if(this.isDone){
    return;
  }

  if(this.pauseFrames>0){
    this.pauseFrames--;
    return;
  }

  this.frame++;
  if(this.frame===this.framesPerIndex){
    this.frame=0;
    this.index++;

  if(this.index===this.numIndices){
    if(this.loop){
      this.frame=0;
      this.index=0;
    }else{
      this.index=this.numIndices-1;
      this.isDone=true;
    }
  }
  }
}
  //BAD/IT/2324/F/076(FINISHED)
  //BAD/IT/2324/F/081(starting)
pause(pauseFrames){
  this.pauseFrames=pauseFrames;
}
 reset(){
   this.isDone=false;
   this.frame=0;
   this.index=0;
 }
  
  getDrawIndex(){
    return this.starIndex+this.index;
  }
}
//Player class
class Player{
  constructor(id,x,y,color){
    this.id=id;
    this.position={x,y};
    this.hurtbox={
      size:{x:44 , y:12},
      offset:{x:-22 , y:-6}
    }
    this.movespeed={x:6 , y:4};
    this.facingRight=false;
    this.input={};
    this.health=100;
    this.color=color || '#000000';
    
    //Actions
    this.actions={
      NONE:'none',
      HURT:'hurt',
      ATTACK:{PUNCH:'attack.punch'}
    };
    
    // Animations
        this.animations = {
          stand: new Animation('stickman', 0, 3, 4, true),
          standR: new Animation('stickmanR', 0, 3, 4, true),
          run: new Animation('stickman', 3, 4, 3, true),
          runR: new Animation('stickmanR', 3, 4, 3, true),
          hurt: new Animation('stickman', 7, 5, 3, false),
          hurtR: new Animation('stickmanR', 7, 5, 3, false),
          punch: new Animation('stickmanAttacks', 0, 6, 3, false),
          punchR: new Animation('stickmanAttacksR', 0, 6, 3, false)
        };
        
        this.action = this.actions.NONE;
        this.animation = this.animations.stand;
      }
        update(otherPlayers) {
          
       // Read inputs
        let xInput = 0;
        if (this.input.left) xInput--;
        if (this.input.right) xInput++;
        let yInput = 0;
        if (this.input.up) yInput--;
        if (this.input.down) yInput++;

        this.animation.update();

        // Handle actions
        switch(this.action) {
          case this.actions.NONE:
            
        // Movement
            this.position.x += xInput * this.movespeed.x;
            this.position.y += yInput * this.movespeed.y;
            
        // Boundary checks
            this.position.x = Math.max(50, Math.min(750, this.position.x));
            this.position.y = Math.max(100, Math.min(550, this.position.y));

        //Turn
            if(xInput>0)
              this.facingRight=true;
            else if(xInput<0)
              this.facingRight=false;
            
        //Set animation based on movement
            if(xInput===0&&yInput===0)
              this.animation=(!this.facingRight)?this.animations.stand:
                this.animations.standR;
            else
              this.animation=(!this.facingRight)?this.animations.run:
                this.animations.runR;
            
        //Attack
            if(this.input.attack){
              this.action=this.actions.ATTACK.PUNCH;
              this.animation=(!this.facingRight)?this.animations.punch:
                this.animations.punchR;
              this.animation.reset();

        //Check for hits on other players
              if(otherPlayers){
                const hitbox={
                  size:{x:56, y:24},
                  offset:!this.facingRight
                    ?{x:-56, y:-12}
                    :{x:0, y:-12}
                };
      //BAD/IT/2324/F/081(finished)
    
    

  
 
        
      
    
    
      
  
