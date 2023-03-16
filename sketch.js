const tiles = []
const images = []
let sourceImage;
let emptyImg;
let windowSize;
let gameSize = 4;

function preload(){
  sourceImage = loadImage("images/choochoobot.png")

  for(let i = 0; i < gameSize * gameSize - 1; i++){

    images[i] = sourceImage //NOT WORKING :(

    tiles[i] = new Tiles(images[i], i)
  }
  emptyImg = loadImage("images/empty.png")
  tiles[gameSize * gameSize - 1] = new Tiles(emptyImg, gameSize * gameSize - 1) 
}

function setup() {
  if(windowWidth < windowHeight) {
    windowSize = windowWidth;
  } else {
    windowSize = windowHeight;
  }

  createCanvas(windowSize, windowSize);

  shuffle(tiles, true);
}

function draw() {
  background(0);

  for(let i = 0; i < tiles.length; i++){
    show(i);
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
    swapIndexes(tiles, i, mouseIndex)
  }
}

function swapIndexes(array, index1, index2){
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
} 

