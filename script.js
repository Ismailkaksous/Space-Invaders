let spaceinvader = document.querySelector('#jeu');
let invader = document.createElement("img");
let missile = document.createElement("img");
let compt = document.querySelector("#score")
let score = 0;
let speed = document.querySelector("#level");
console.log(speed);
let topP=1;

invader.src = "img/vaiseau100px.png";
invader.style.height = "100px";
invader.style.width = "100px";
invader.style.display = "block";
invader.style.position = "absolute";
invader.style.left = (screen.width/2 - parseInt(invader.style.width)/2) + "px"; 
invader.style.bottom = (screen.height/14 - parseInt(invader.style.height)/2) + "px";
spaceinvader.appendChild(invader);

let iscollide = function(a, b){
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}
//-----------------------------MoveVaisseau----------------------//
window.addEventListener('keydown', function(e) {
    let invaderWidth = parseInt(invader.style.width);
    let invaderLeft = parseInt(invader.style.left);

//    console.log(missile.style.left);
//    console.log(missile.style.bottom);
//    console.log(invader.height);
//    console.log(invader.style.height);
    
    //console.log(e);
    switch(e.code) {
        case "ArrowLeft":
            if(invaderLeft <= 10){
                invader.style.left = "10px"    
            } else {
                invader.style.left = (invaderLeft -= 30) + "px";
            }
        break;
        case "ArrowRight":
            //console.log(invaderLeft, invaderWidth, document.body.clientWidth);
            if(invaderLeft + invaderWidth >= 1060){
                invader.style.left = "1000px";
            } else {
                invader.style.left = (invaderLeft += 30) + "px";
            }
        break;
//--------------------------------------MoveMissile-------------------------------//        
        case "Space":
            missile.src = "img/missile.png";
            missile.style.height = "73px";
            missile.style.width = "17px";
            missile.style.display = "block";
            missile.style.position = "absolute";
            missile.style.left = invaderLeft + (invaderWidth/2) - 9; 
            missile.style.bottom = (invader.style.height);
            //console.log(invaderLeft, invaderWidth, document.body.clientWidth);
            spaceinvader.appendChild(missile);
            //console.log(missile.top, missile.style.left, missile.style.bottom, invader.style.height, document.body.clientHeight);
            let missileMove = setInterval(function() {
                let missilePos = parseInt(missile.style.bottom);
                let missileMovement = missilePos += 50;
                missile.style.bottom = missileMovement + "px";
//-------------------------------CollisionMonster---------------------------//
                let aliens = document.querySelectorAll(".alien");
                let alienbeam = document.querySelectorAll(".alienbeam");
                for(i=0; i < aliens.length; i++){
                    let collision = iscollide(missile,aliens[i]);
                    //  let collisionV = iscollide(invader,aliens[i]);
                    //  if(collisionV){
                    //      //clearInterval(missileMove);
                    //      alert("perdu");
                    // }
                    if(collision){
                       clearInterval(missileMove);
                       spaceinvader.removeChild(missile);
                        //alert("perdu");
                        //console.log("BOUM");
                        score ++;
                        compt.innerHTML = score;
                        spaceinvader.removeChild(aliens[i]);  // Supprimer carrément les ennemies de tableau
                       //aliens[i].style.display='none'; // Masquer .........
                       let aliencount = document.querySelectorAll(".alien").length;
                       //console.log(aliencount);
                       if(aliencount <= 0){
                           //topP++;
                           speed.innerHTML = topP++;
                           gamloop(speed.innerHTML);
                           console.log(speed.innerHTML);
                          // console.log(Em);
                           //console.log("aliencount");
                       }
                    }
                }
            },100);
            break;      
        default:
    }
})
//-------------------------------------TireMonstre-------------------------//
let gamloop =function(level){
let Monster = document.querySelector('#jeu')
let ennemies = 5;
for (i=0; i < ennemies; i++ ){
    let image = document.createElement('img');
    image.id="monster"+i;
    image.className="alien";
    image.src="img/alien1.gif";
    image.style.position="absolute";
    image.style.height="90px"
    image.style.width="90px"
    image.style.top = "Opx"
    image.style.left = i * 140 + "px";

    //-----------------------------Movement Monstre--------------------------//
    Monster.appendChild(image);
    let dir = 1;
    let topP = 0;
    let move = function (){ 
        if(topP >= 600){dir = -1}
        else if(topP <= -60){ dir = 1}
        topP += (level * 1) * dir; // 
        image.style.top = topP + "px";
        requestAnimationFrame(move);
   }
     requestAnimationFrame(move);
 }
}
gamloop(topP);
function shoot(){
    //let Alienbeam = document.querySelector('#jeu');
    let imagebeam = document.createElement('img');
    let imageWidth = parseInt(image.style.width);
    let imageLeft = parseInt(image.style.left);
    imagebeam.id="alienbeam"+i;
    imagebeam.className="alienbeam";
    imagebeam.src="img/missile.png";
    imagebeam.style.position="absolute";
    imagebeam.style.height="100px";
    imagebeam.style.width="24px";
    imagebeam.style.top = image.style.height;
    imagebeam.style.left = i * 140 + "px";
    imagebeam.style.left = imageLeft + (imageWidth/2) - 9; 
    imagebeam.style.top = (image.style.height);
    Monster.appendChild(imagebeam);
    //console.log(image.style.left, imagebeam.style.left);
}
//--------------------------------MyAudio-----------------------------------//
let playButton = document.querySelector("button");
let pauseButton = document.querySelector("#pause");

let monAudio = document.querySelector("audio");
playButton.addEventListener('click', function(){ 
    //console.log("OK");
    monAudio.play();
})
pauseButton.addEventListener('click', function(){ 
    //console.log("OK");
    monAudio.pause();
})
