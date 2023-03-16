const tiles = []
const images = []
let sourceImage;
let emptyImg;
let windowSize;
let playerMoves = 0;

let gameSize = 3;

function preload(){
  sourceImage = loadImage("images/choochoobot.png")

  emptyImg = loadImage("images/empty.png")
}

function setup() {

  windowSize = sourceImage.width;

  for(let i = 0; i < gameSize * gameSize - 1; i++){
    let placementY = i % gameSize;
    let placementX = floor(i / gameSize);

    images[i] = createImage(windowSize / gameSize, windowSize / gameSize)
    images[i].copy(sourceImage, placementX * windowSize / gameSize, placementY * windowSize / gameSize, windowSize / gameSize, windowSize / gameSize, 0, 0, windowSize / gameSize, windowSize / gameSize)

    tiles[i] = new Tiles(images[i], i)
  }
  tiles[gameSize * gameSize - 1] = new Tiles(emptyImg, gameSize * gameSize - 1) 

  createCanvas(windowSize, windowSize);

  shuffle(tiles, true);
}

function draw() {
  background(127);

  for(let i = 0; i < tiles.length; i++){
    show(i);
  }

  textAlign(CENTER, CENTER)
  textSize(20)
  text("MOVES: " + playerMoves, 50, 15)

  if(isSolved()){
    stroke(255)
    textSize(32)
    text("YOU WIN", width / 2, height / 2 - 15);
    text("Moves: " + playerMoves, width / 2, height / 2 + 15)
  }
}

function show(index){
  let placementY = index % gameSize;
  let placementX = floor(index / gameSize);

  image(tiles[index].image, placementX * windowSize / gameSize, placementY * windowSize / gameSize, windowSize / gameSize - 10, windowSize / gameSize - 10);
}

function isSolved(){
  for(let i = 0; i < tiles.length; i++){
    if(i != tiles[i].placement){
      return false;
    }
  }

  return true;
}

function findEmptyTile(){
  for(let i = 0; i < tiles.length; i++){
    if(tiles[i].placement == gameSize * gameSize - 1){
      return i;
    }
  }
}

function mousePressed(){
  const coords = [0,0]

  for (let i = 0; i < gameSize; i++){
    if ((windowSize / gameSize) * i < mouseX && mouseX < (windowSize / gameSize) * (i + 1)) {
      coords[0] = i;
    }
  }
  
  for (let i = 0; i < gameSize; i++){
    if ((windowSize / gameSize) * i < mouseY && mouseY < (windowSize / gameSize) * (i + 1)) {
      coords[1] = i;
    }
  }

  let mouseIndex = coords[0] * gameSize + coords[1]
  if (!isSolved()) {
    isNextTileEmpty(mouseIndex)
  }
}

function isNextTileEmpty(mouseIndex) {
  let i = findEmptyTile();
  
  if(mouseIndex + 1 == i || mouseIndex - 1 == i || mouseIndex + gameSize == i || mouseIndex - gameSize == i) {
    swapIndexes(tiles, i, mouseIndex);
    playerMoves++;
  }
}

function swapIndexes(array, index1, index2){
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
} 

