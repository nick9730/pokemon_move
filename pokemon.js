



const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

let key_board;

var keypressed =false;


canvas.width = 1024;
canvas.height = 576;

c.fillStyle= 'white'
c.fillRect(0,0,canvas.width,canvas.height)

const gameImage = new Image();
gameImage.src = "tiledmappokemon.png"


const characterImageDown= new Image();
characterImageDown.src = 'playerDown.png'



const characterImageLeft= new Image();
characterImageLeft.src = 'playerLeft.png'

const characterImageRight= new Image();
characterImageRight.src = 'playerRight.png'

const characterImageUp= new Image();
characterImageUp.src = 'playerUp.png'
 


var collision_map = []
for (let i = 0; i< coli_map.length; i+=70) {
     collision_map.push(coli_map.slice(i,70+i));
    }

  class spriteAnimationMap{
  constructor({position,velocity,image,frames={max:1},sprites}){
             this.position=position;
             this.image=image;
             this.velocity=velocity;      
              this.frames= {...frames,val:0,elapsed:0} 
              this.image.onload=() =>{
              this.width= this.image.width/this.frames.max
              this.height= this.image.height/this.frames.max 

              }
              this.sprites=sprites
              this.moving=false
        }   
        draw(){
            c.drawImage(this.image, 
                this.frames.val * this.width,
                0,
                this.image.width/this.frames.max,
                this.image.height,
              this.position.x,
              this.position.y,
                  this.image.width/this.frames.max,
                  this.image.height)
               

                  if(this.moving){
                    if(this.frames.max>1){
                        this.frames.elapsed++
                    }
                  if(this.frames.elapsed %10===0){
                  if(this.frames.val<this.frames.max){ this.frames.val++}
                  else{
                    this.frames.val=1;
                  }
                }
            }
        
        }
    
    }

const player_draw = new spriteAnimationMap({
    position:{
    x:canvas.width/2 + 150/4,
    y:canvas.height/2
},

  image:characterImageDown,
  frames:{
    max:4
  },
  sprites:{
    up:characterImageUp,
    left:characterImageLeft,
    down:characterImageDown,
    right:characterImageRight
  }
})
const offset={
    x:-600,
    y:-300
}
const background_draw = new spriteAnimationMap({
    position:{
        x:offset.x,
        y:offset.y
    },
    image:gameImage
})

class Boundary{
    static width =48;
    static height =48;
    constructor({position}){
        this.position = position;
        this.width = 48;
        this.height = 48 ;
    }
    draw_Collision(){
        c.beginPath()
        c.fillStyle='rgba(255,0,0,0.0)'
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
        c.closePath()
        
    }
}




const boundaries=[];


collision_map.forEach((row,i) => {
    row.forEach((symbol,j) =>{
        if(symbol===1026)
        { boundaries.push(new Boundary({
            position:{
                x:j* Boundary.width + offset.x +30,
                y:i*Boundary.height + offset.y 
            }   
        })
        )}
       
   }
    )
});






const testBoundart = new Boundary({
    position:{
        x:200,
        y:200
    }
})



let last_key;
window.addEventListener('keydown', (e)=>{
     key_board =e.key;
     switch (e.key){
        case "a":
            keypressed =true
           last_key='a'

            break;
        case "s":
            keypressed = true
            last_key='s'
            break; 
          
        case "d":
            keypressed =true
            last_key='d'
            break;
         case "w":
            keypressed = true
            last_key='w'
            break;

    }
})

window.addEventListener('keyup',(e)=>{
    switch (e.key){
        case "a":
         keypressed =false
            break;
        case "s":
            keypressed =false

                break; 
        case "d":
            keypressed = false

               
                break;
         case "w":
            keypressed = false

         
                break;

    }
})


function contact_bricks( {rectangle1,rectangle2}){
    return(
        rectangle1.position.x  + rectangle1.width >= rectangle2.position.x &&
rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )}



const movables = [background_draw,...boundaries]
let moving = true;

//sunarthn game
function animate(){
requestAnimationFrame(animate);

background_draw.draw();
boundaries.forEach((move)=>{
    move.draw_Collision();
}) 
player_draw.draw();
player_draw.moving=false


// if(player_draw.position.x  + player_draw.width >= testBoundart.position.x &&
//     player_draw.position.x <= testBoundart.position.x + testBoundart.width &&
//     player_draw.position.y <= testBoundart.position.y + testBoundart.height &&
//     player_draw.position.y + player_draw.height >= testBoundart.position.y)
//     {
//         console.log("collidibg")
//     }

 if(key_board=="a" && last_key==='a' && keypressed==true){
    player_draw.image = player_draw.sprites.left
    player_draw.moving=true
  moving=true
        for (let i = 0; i <  boundaries.length; i++) {
            const boundary = boundaries[i];
            if(contact_bricks({rectangle1: player_draw,rectangle2:
                {...boundary,
                position:{
                x:boundary.position.x+3,
                y:boundary.position.y
        }}}))
            {
                moving=false
                break
            }
         
        }
        if(moving){
        movables.forEach((move)=>{
            move.position.x+=3;
          })
        }
    }
else if(key_board=='w'&& last_key==='w' && keypressed==true){
    player_draw.image = player_draw.sprites.up
    moving=true
    player_draw.moving=true

    for (let i = 0; i <  boundaries.length; i++) {
        const boundary = boundaries[i];
        if(contact_bricks({rectangle1: player_draw,rectangle2:
            {...boundary,
            position:{
            x:boundary.position.x,
            y:boundary.position.y +3 
    }}}))
        { 
            moving=false
            break
        }
     
    }
   if(moving){

    movables.forEach((move)=>{
        move.position.y +=3
   })
}
   

}
else if(key_board=='s'&& last_key==='s'&& keypressed==true){
    player_draw.image = player_draw.sprites.down
    moving=true
    player_draw.moving=true


    for (let i = 0; i <  boundaries.length; i++) {
        const boundary = boundaries[i];
        if(contact_bricks({rectangle1: player_draw,rectangle2:
            {...boundary,
            position:{
            x:boundary.position.x,
            y:boundary.position.y -3
    }}}))
        {
        moving=false
             break
        }
     
    }
    if(moving){
 
    movables.forEach((move)=>{
        move.position.y -=3
   })
}


}

else if(key_board=='d' && last_key==='d'&& keypressed==true){
    player_draw.image = player_draw.sprites.right
    moving=true
    player_draw.moving=true

    for (let i = 0; i <  boundaries.length; i++) {
        const boundary = boundaries[i];
        if(contact_bricks({rectangle1: player_draw,rectangle2:
            {...boundary,
            position:{
            x:boundary.position.x-3,
            y:boundary.position.y
    }}}))
        { 
            moving=false
            break
        }
     
    }
    if(moving){
    movables.forEach((move)=>{
        move.position.x -=3
   })
}


}
}

 



animate();

