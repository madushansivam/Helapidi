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
  //BAD/IT/2324/F/081(STARTED)
pause(pauseFrames){
  this.pauseFrames=pauseFrames;
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
    

  
 
        
      
    
    
      
  
