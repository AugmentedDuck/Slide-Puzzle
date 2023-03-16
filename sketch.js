const tiles = []
const images = []
let emptyImg;
let windowSize;

function preload(){
  for(let i = 0; i < 15; i++){
    images[i] = loadImage("images/img" + i + ".png")

    tiles[i] = new Tiles(images[i], i)
  }
  emptyImg = loadImage("images/empty.png")
  tiles[15] = new Tiles(emptyImg, 15) 
}

function setup() {
  if(windowWidth < windowHeight) {
    windowSize = windowWidth;
  } else {
    windowSize = windowHeight;
  }

  createCanvas(windowSize, windowSize);

  //shuffle(tiles, true);
}

function draw() {
  background(0);

  for(let i = 0; i < tiles.length; i++){
    show(i);
  }
}

function show(index){
  let placementY = index % 4;
  let placementX = floor(index / 4);

  image(tiles[index].image, placementX * windowSize / 4, placementY * windowSize / 4, windowSize / 4 - 10, windowSize / 4 - 10);
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
    if(tiles[i].placement == 15){
      return i;
    }
  }
}

function mousePressed(){
  const coords = [0,0]

  if( 0 < mouseX && mouseX < windowSize / 4) {
    coords[0] = 0
  } else if (windowSize / 4 < mouseX && mouseX < windowSize / 4 * 2) {
    coords[0] = 1
  } else if (windowSize / 4 * 2 < mouseX && mouseX < windowSize / 4 * 3) {
    coords[0] = 2
  } else if (windowSize / 4 * 3 < mouseX && mouseX < windowSize) {
    coords[0] = 3
  }

  if( 0 < mouseY && mouseY < windowSize / 4) {
    coords[1] = 0
  } else if (windowSize / 4 < mouseY && mouseY < windowSize / 4 * 2) {
    coords[1] = 1
  } else if (windowSize / 4 * 2 < mouseY && mouseY < windowSize / 4 * 3) {
    coords[1] = 2
  } else if (windowSize / 4 * 3 < mouseY && mouseY < windowSize) {
    coords[1] = 3
  }

  let mouseIndex = coords[0] * 4 + coords[1]
  if (!isSolved()) {
    isNextTileEmpty(mouseIndex)
  }
}

function isNextTileEmpty(mouseIndex) {
  let i = findEmptyTile();
  
  if(mouseIndex + 1 == i || mouseIndex - 1 == i || mouseIndex + 4 == i || mouseIndex - 4 == i) {
    swapIndexes(tiles, i, mouseIndex)
  }
}

function swapIndexes(array, index1, index2){
  console.log(array + " : " + index1 + " : " + index2)

  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;

  console.log(array)
} 

