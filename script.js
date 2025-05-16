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
          otherPlayers.forEach(player=>{
            if (this.checkCollision(
              hitbox,this.position,
              player.hurtbox,player.posotion)){
              player.hurt();
              this.animation.pause(5);
            }
          });
          }
        }
        break;
      case this.actions.HURT:
        if(this.animation.isDone){
          this.action=this.actions.NONE;
          this.animation=(!this.facingRight)?
            this.animations.stand:
            this.animations.standR;
        }
        break;

      default:
        break;
    }
  }

  setButton(button,value){
    this.input[button]=value;
  }
  
  hurt(){
    this.health=Math.mas(0,this.health-10);
    this.action=this.actions.HURT;
    this.animation=(!this.facingRight)?this.animations.hurt:
      this.animations.hurtR;
    this.animation.reset();
  }
  checkCollision(box1,box1Pos,box2,box2Pos){
    return(
      box1Pos.x + box1.offset.x < box2Pos.x + box2.offset.x + box2.size.x
      && box1Pos.x + box1.offset.x + box1.size
      && box1Pos.y + box1.offset.y < box2Pos.y + box2.offset.y + box2.size.y
      && box1Pos.y + box1.offset.y + box1.size.y > box2Pos.y + box2.offset.y
      );
  }

  getDrawInfo(){
    return{
      position:this.position,
      facingRight:this.facingRight,
      animation:{
        spriteKey:this.animation.spriteKey,index:
          this.animation.getDrawIndex(),
      },
      color:this.color,
      health:this.health
    };
  }
}

//Generate stick figure SVG for various positions
 function generateFigureSVG(color,pose='stand',frameIndex=0,facingRight=false){
   const svgNS="http:www.w3.org/2000/scg";
   const svg=document.createElementNS(svgNS,"svg");
   svg.setAttribute("width","64");
   svg.setAttribute("height","64");
   svg.setAttribute("viewBox","-32 -50 64 80");

//Shadow ellipse
   const shadow=document.createElementNS(svgNS,"ellipse");
   shadow.setAttribute("cx","0");
   shadow.setAttribute("cy","25");
   shadow.setAttribute("rx","20");
   shadow.setAttribute("ry","5");
   shadow.setAttribute("fill","rgba(0,0,0,0.2");
   svg.appendChild(shadow);
   
//BAD/IT/2324/F/081(finished)
   //BAD/IT/2324/093(statrting)
   // Generate stick figure SVG for various positions
    function generateStickFigureSVG(color, pose = 'stand', frameIndex = 0, facingRight = false) {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", "64");
      svg.setAttribute("height", "64");
      svg.setAttribute("viewBox", "-32 -50 64 80");

      // Shadow ellipse
      const shadow = document.createElementNS(svgNS, "ellipse");
      shadow.setAttribute("cx", "0");
      shadow.setAttribute("cy", "25");
      shadow.setAttribute("rx", "20");
      shadow.setAttribute("ry", "5");
      shadow.setAttribute("fill", "rgba(0,0,0,0.2)");
      svg.appendChild(shadow);

      // Group for the stick figure
      const group = document.createElementNS(svgNS, "g");
      const scale = facingRight ? -1 : 1;
      group.setAttribute("transform", scale(${scale}, 1));
 // Head
      const head = document.createElementNS(svgNS, "circle");
      head.setAttribute("cx", "0");
      head.setAttribute("cy", "-40");
      head.setAttribute("r", "10");
      head.setAttribute("fill", color);
      group.appendChild(head);

      // Create line function
      function createLine(x1, y1, x2, y2) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "2");
        return line;
      }

      // Different poses
      switch(pose) {
        case 'run':
          // Body
          group.appendChild(createLine(0, -30, 0, 0));
          
          // Legs with animation
          const legRotation = [0, 15, -15, 5][frameIndex % 4];
          const leg1 = createLine(0, 0, -15, 30);
          leg1.setAttribute("transform", rotate(${legRotation}, 0, 0));
          group.appendChild(leg1);
          
          const leg2 = createLine(0, 0, 15, 30);
          leg2.setAttribute("transform", rotate(${-legRotation}, 0, 0));
          group.appendChild(leg2);
          
          // Arms
          group.appendChild(createLine(0, -15, -20, -5));
          group.appendChild(createLine(0, -15, 20, -5));
          break;
          
        case 'punch':
          // Body
          group.appendChild(createLine(0, -30, 0, 0));
          
          // Legs
          group.appendChild(createLine(0, 0, -15, 30));
          group.appendChild(createLine(0, 0, 15, 30));
          
          // Arms with punch animation
          const armExtension = [0, 10, 20, 30, 20, 10][frameIndex % 6];
          group.appendChild(createLine(0, -15, -15, -15));
          group.appendChild(createLine(-15, -15, -(35 + armExtension), -15));
          group.appendChild(createLine(0, -15, 20, -5));
          break;
          
        case 'hurt':
          // Hurt body
          group.appendChild(createLine(0, -30, 5, -5));
 group.appendChild(createLine(5, -5, -10, 25));
          group.appendChild(createLine(5, -5, 20, 20));
          group.appendChild(createLine(0, -20, -25, -15));
          group.appendChild(createLine(0, -20, 15, -25));
          break;
          
        default: // stand
          // Body
          group.appendChild(createLine(0, -30, 0, 0));
          
          // Legs
          group.appendChild(createLine(0, 0, -15, 30));
          group.appendChild(createLine(0, 0, 15, 30));
          
          // Arms
          group.appendChild(createLine(0, -15, -20, -5));
          group.appendChild(createLine(0, -15, 20, -5));
          break;
      }

      svg.appendChild(group);
      return svg;
    }

    // Game class
    class Game {
      constructor() {
        this.players = [];
        this.playerCount = 2;
        this.gameStarted = false;
        this.playerColors = ['#FF5555', '#5555FF', '#55FF55', '#FFFF55'];
        this.animationFrame = null;
        
        // Control mapping
        this.controlSets = [
          { up: 'w', down: 's', left: 'a', right: 'd', attack: 'f' },
          { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', attack: '/' }
        ];

        // DOM elements
        this.gameContainer = document.getElementById('game-container');
        this.healthBarsContainer = document.getElementById('health-bars');
        this.playersContainer = document.getElementById('players');
        this.settingsPanel = document.getElementById('settings-panel');
        this.gameControls = document.getElementById('game-controls');
        this.instructions = document.getElementById('instructions');
        
        // Bind handlers
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        
        // Setup event listeners
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('player-count').addEventListener('change', (e) => {
          this.playerCount = parseInt(e.target.value);
          this.updateColorSettings();
        });
// Initial color settings
        this.updateColorSettings();
      }
      
      updateColorSettings() {
        const colorSettings = document.getElementById('color-settings');
        colorSettings.innerHTML = '<label>Player Colors:</label>';
        
        for (let i = 0; i < this.playerCount; i++) {
          const div = document.createElement('div');
          div.innerHTML = `
            <span>Player ${i + 1}: </span>
            <input type="color" id="color-${i}" value="${this.playerColors[i]}">
          `;
          colorSettings.appendChild(div);
        }
      }
      
      startGame() {
        // Get colors from inputs
        for (let i = 0; i < this.playerCount; i++) {
          const colorInput = document.getElementById(color-${i});
          if (colorInput) {
            this.playerColors[i] = colorInput.value;
          }
        }
        
        // Create players
        this.players = [];
        for (let i = 0; i < this.playerCount; i++) {
          const xPos = 200 + (i * 400 / this.playerCount);
          const player = new Player(i, xPos, 300, this.playerColors[i]);
          this.players.push(player);
        }
        
        // Setup DOM
        this.settingsPanel.style.display = 'none';
        this.gameContainer.style.display = 'block';
        this.gameControls.style.display = 'block';
        this.instructions.style.display = 'block';
        
        // Create health bars
        this.createHealthBars();
        
        // Create player elements
        this.createPlayerElements();
        
        // Add event listeners
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        
        // Set game state
        this.gameStarted = true;
        
        // Start game loop
        this.animationFrame = requestAnimationFrame(this.gameLoop);
      }
      
 resetGame() {
        // Clear animation frame
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
        }
        
        // Remove event listeners
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        
        // Reset DOM
        this.healthBarsContainer.innerHTML = '';
        this.playersContainer.innerHTML = '';
        this.gameContainer.style.display = 'none';
        this.gameControls.style.display = 'none';
        this.instructions.style.display = 'none';
        this.settingsPanel.style.display = 'block';
        
        // Reset game state
        this.gameStarted = false;
        this.players = [];
      }
      
      createHealthBars() {
        this.healthBarsContainer.innerHTML = '';
        
        for (let i = 0; i < this.players.length; i++) {
          const healthBar = document.createElement('div');
          healthBar.className = 'health-bar';
          healthBar.style.top = ${20 + (i * 30)}px;
          
          const healthFill = document.createElement('div');
          healthFill.className = 'health-fill';
          healthFill.style.width = '100%';
          healthFill.style.backgroundColor = this.players[i].color;
          healthBar.appendChild(healthFill);
          
          const healthText = document.createElement('div');
          healthText.className = 'health-text';
          healthText.textContent = Player ${i + 1}: 100%;
          healthBar.appendChild(healthText);
          
          this.healthBarsContainer.appendChild(healthBar);
        }
      }
      
      createPlayerElements() {
        this.playersContainer.innerHTML = '';
        
        for (let i = 0; i < this.players.length; i++) {
          const playerElement = document.createElement('div');
          playerElement.className = 'player';
          playerElement.id = player-${i};
          this.playersContainer.appendChild(playerElement);
        }
      }
updateHealthBars() {
        for (let i = 0; i < this.players.length; i++) {
          const healthBar = this.healthBarsContainer.children[i];
          if (healthBar) {
            const healthFill = healthBar.querySelector('.health-fill');
            const healthText = healthBar.querySelector('.health-text');
            
            healthFill.style.width = ${this.players[i].health}%;
            healthText.textContent = Player ${i + 1}: ${this.players[i].health}%;
          }
        }
      }
      
      updatePlayerElements() {
        for (let i = 0; i < this.players.length; i++) {
          const playerElement = document.getElementById(player-${i});
          if (playerElement) {
            const player = this.players[i];
            const info = player.getDrawInfo();
            
            // Update position
            playerElement.style.left = ${info.position.x - 32}px;
            playerElement.style.top = ${info.position.y - 62}px;
            
            // Get pose from animation
            let pose = 'stand';
            if (info.animation.spriteKey.includes('Attacks')) {
              pose = 'punch';
            } else if (player.animation.startIndex >= 7) {
              pose = 'hurt';
            } else if (player.animation.startIndex >= 3) {
              pose = 'run';
            }
            
            // Clear and draw new SVG
            playerElement.innerHTML = '';
            const svg = generateStickFigureSVG(
              info.color, 
              pose, 
              player.animation.index, 
              info.facingRight
            );
            playerElement.appendChild(svg);
          }
        }
      }
      
      handleKeyDown(e) {
        if (!this.gameStarted) return;
        
        const key = e.key;
        
        this.players.forEach((player, idx) => {
          const controls = this.controlSets[idx % this.controlSets.length];
          Object.entries(controls).forEach(([action, controlKey]) => {
            if (key === controlKey) {
              player.setButton(action, true);
            }
          });
        });
        
    // Clear and draw new SVG
            playerElement.innerHTML = '';
            const svg = generateStickFigureSVG(
              info.color, 
              pose, 
              player.animation.index, 
              info.facingRight
            );
            playerElement.appendChild(svg);
          }
        }
      }
      
      handleKeyDown(e) {
        if (!this.gameStarted) return;
        
        const key = e.key;
        
        this.players.forEach((player, idx) => {
          const controls = this.controlSets[idx % this.controlSets.length];
          Object.entries(controls).forEach(([action, controlKey]) => {
            if (key === controlKey) {
              player.setButton(action, true);
            }
          });
        });
 // Prevent scrolling with arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) {
          e.preventDefault();
        }
      }
      
      handleKeyUp(e) {
        if (!this.gameStarted) return;
        
        const key = e.key;
        
        this.players.forEach((player, idx) => {
          const controls = this.controlSets[idx % this.controlSets.length];
          Object.entries(controls).forEach(([action, controlKey]) => {
            if (key === controlKey) {
              player.setButton(action, false);
            }
          });
        });
      }
      
      gameLoop() {
        // Update players
        for (let i = 0; i < this.players.length; i++) {
          const otherPlayers = this.players.filter((_, j) => j !== i);
          this.players[i].update(otherPlayers);
        }
// Update DOM
        this.updateHealthBars();
        this.updatePlayerElements();
        
        // Continue loop
        this.animationFrame = requestAnimationFrame(this.gameLoop);
      }
    }

    // Start the game when the page loads
    window.addEventListener('DOMContentLoaded', () => {
      new Game();
    });
  </script>
</body>
</html>
BAD/IT/f/093(Finished)

    
    

  
 
        
      
    
    
      
  
