var w = window.innerWidth;
var h = 1800; 
var myCanvas;

const insertInput = document.getElementById('to-insert');
const deleteInput = document.getElementById('to-delete');
const findInput = document.getElementById('to-find');

const insertButton = document.getElementById('to-insert-btn');
const deleteButton = document.getElementById('to-delete-btn');
const findButton = document.getElementById('to-find-btn');

let hashTable;

let sizeX = 70;
let sizeY = 30;
let rectGroupSizeX = sizeX * 2;

let rectX;
let rectY;

let stringX = 0;
let stringY = 0;
let index = 0;


let insertClick = false;
let findClick = false;
let deleteClick = false;

let findIndexY;
let findIndexX;
let findString;

let animationStart;
let animationString = ""
let animationEnd = false;

let equationImg;
let moveX = 0;

function preload(){
  equationImg = loadImage("equationImg.png");
  notes = loadStrings("ht_instructions.txt");
}

function setup() {
  myCanvas = createCanvas(w, h);
  myCanvas.parent("container");

  equationImg.resize(w / 2, equationImg.height)

  hashTable = new HashTable();
// hashTable.setItem("hello world");
// hashTable.setItem("lovely day");
// hashTable.setItem("morning sun");
// hashTable.setItem("museum");
// hashTable.setItem("engineering");
// hashTable.setItem("computer SCIENCE");
// hashTable.setItem("EIFFEL TOWer");
// hashTable.setItem("What a lovely day");
// hashTable.setItem("binary sEaRCH TReEs");
// hashTable.setItem("covid");
// hashTable.setItem("blue lagoon");
// hashTable.setItem("afternoon nap");
// hashTable.setItem("mississippi");
// hashTable.setItem("BurGer KinG");
// hashTable.setItem("mercedes");
// hashTable.setItem("greased Lightning");

//console.log(hashTable);
// console.log(hashTable.getItem("mercedes"));
// hashTable.removeItem("morning sun");
// console.log(hashTable);

}

function draw() {
  background(250);
  
  // notes
  textSize(20);
  fill(0);
  strokeWeight(0.5);
  //textAlign(LEFT)
  text("Enter a string (max 10 characters) above to be inserted/deleted/searched.", w/3, 30);
  
  // animation
  
  image(equationImg, w / 12, 650);

  textAlign(CENTER)
  textSize(20)
  text("String =     ", w / 4, 800)
  if(animationStart > 0){
    text(" '" + animationString + "' ", w / 4 + 100, 800)
      for (var i = 0; i < animationString.length; i++) {
        if(millis() - animationStart > 1000 * i){
          var overNumber = (animationString.length - i - 1)
          var subStr = animationString.substring(i, i + 1)
          text("charCode(" + subStr + ") x 7919 ^ " + overNumber, w / 3.5, 900 + i * 60);
          if( i < animationString.length - 1){
             text("\n + ",w / 3.5, (900 + i * 60) + 5)
          }
      }
    }
    if(i >= animationString.length){
      text("% \n Hash Table Size", w / 3.5, 900 + i * 60)
    }
  }
  
  let notesY = 50;

  //textSize(20);
  //text("NOTES ABOUT HASH TABLES.", w - w / 4, notesY);
  //text("NOTES ABOUT HASH TABLES.", w - w / 4, notesY + 100);
  //text("NOTES ABOUT HASH TABLES.", w - w / 4, notesY + 200);

  //let paragraph = createP(join(notes, "<br/>"));
  //paragraph.position(w - w/2.55, notesY + 50);
  
  //paragraph.textSize(20);
  //paragraph.fill(0);
  //paragraph.strokeWeight(1);

  textAlign(LEFT)
  textSize(16);
  textWrap(WORD);
  fill(0);
  strokeWeight(1);
  if (notes.length > 0) {
    for (let i = 0; i < notes.length; i++) {
        text(notes[i], w - w/2.55, notesY);
        notesY = notesY + 15 + 5;        
    }
  }


  //borders
  strokeWeight(1);
  line(w - w / 2.5, 0, w - w / 2.5, h);

  // hash table
  drawHashArr();

  // buttons && inputs
  insertButton.addEventListener("click", function () {
    if(!insertClick){
      animationString = insertInput.value
      animationStart = millis();
      hashTable.setItem(insertInput.value);
      insertInput.value = ""
      insertClick = true;
    }
  })

  deleteButton.addEventListener("click", function () {
    if(!deleteClick){
      hashTable.removeItem(deleteInput.value)
      deleteInput.value = ""
    }
  })

  findButton.addEventListener("click", function () {
    if(!findClick){
      findIndexY = hashTable.getItemIndex(findInput.value)
      findString = hashTable.getItem(findInput.value)
      findInput.value = ""
      findClick = true;
    }
  })

  stringX = w / 6;
  stringY = 70 + (hashTable.hash(animationString) + 1) * sizeY


  textAlign(CENTER)
  textSize(15);
  fill(0);
  strokeWeight(1);
  if(millis() - animationStart > 1000 * animationString.length){
    if(animationEnd){
      text("" , stringX + sizeX/2 + moveX , stringY);
    }else{
      text(animationString , stringX + sizeX/2 + moveX , stringY);
    }
  }


  if(insertClick){
    insertClick = false;
    animationEnd = false
    moveX = 0
  }

  if(findClick){
    findClick = false
  }

  if(deleteClick){
    deleteClick = false;
  }

    for(let i = 0; i < hashTable.buckets.length; i++){
      insertClick = false;
      if(hashTable.buckets[i]){
        stringY = 70 + (i + 1) * sizeY
        for(let j = 0; j < hashTable.buckets[i].length; j++){
          if(findString == (hashTable.buckets[i][j])){
            findIndexX = j + 1;
          }
          if(j < 3){
            if(animationString == hashTable.buckets[i][j]){
              if(millis() - animationStart > 1000 * (animationString.length + 2)){
                let x = stringX + sizeX * 2 + rectGroupSizeX * (j + 1) 
                text(hashTable.buckets[i][j], x, stringY)
                if(moveX < x - stringX - sizeX / 2){
                  moveX += 15
                }else {
                  moveX = 0;
                  animationEnd = true;
                }
              }
            }else{
              text(hashTable.buckets[i][j], stringX + sizeX * 2 + rectGroupSizeX * (j + 1) , stringY)
            }
          }
        }
      }
    }
}

// draw Hash Table
function drawHashArr(){
  for (let y = 0; y < 17; y++) {
    for (let x = 0; x < 1; x++) {
      
      rectX = w / 6 + x * 20;
      rectY = 80 + y * sizeY;
      
      //let index = y + x;   // find the index
      
      // index
      fill(0);  
      strokeWeight(1);
      textSize(15)
      text(y, rectX - 30, rectY + sizeY / 1.5);

      // index rectangle
      noFill();
      stroke(0);
      strokeWeight(1.5);
      rect(rectX, rectY, sizeX, sizeY);
      
      // rect group
      for(let j = 1; j < 4; j++){
        noFill();
        if(findIndexY == y && findIndexX == j){
          stroke(255, 0, 0)
          strokeWeight(4);
        }else{
          stroke(0);
          strokeWeight(1.5)
        }
        rect(rectX + sizeX + rectGroupSizeX * j, rectY, rectGroupSizeX, sizeY);
      }

      // arrow
      line(rectX + sizeX/2, rectY + sizeY / 2, rectX + sizeX + rectGroupSizeX, rectY + sizeY / 2);
      fill(0);
      triangle(rectX + sizeX + rectGroupSizeX, rectY + sizeY / 2, 
        rectX + sizeX / 1.5 + rectGroupSizeX, rectY + sizeY / 2 - sizeY / 6,
        rectX + sizeX / 1.5 + rectGroupSizeX, rectY + sizeY / 2 + sizeY / 6)
    }
  }
}
      

//resize
window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;  
  myCanvas.size(w,h);
}


