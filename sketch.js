const tiles = []
const images = []
let shuffledTiles = []
let emptyImg;

function preload(){
  for(let i = 0; i < 15; i++){
    images[i] = loadImage("images/img" + i + ".png")

    tiles[i] = new Tiles(images[i])
  }
  emptyImg = loadImage("images/empty.png")
  tiles[15] = new Tiles(emptyImg) 
}

function setup() {
  createCanvas(400, 400);

  shuffledTiles = shuffle(tiles, false);
  console.log(shuffledTiles)
}

function draw() {
  background(0)
  for(let i = 0; i < shuffledTiles.length; i++){
    show(i)
  }
}

function show(index){

  let placementY = index % 4
  let placementX = floor(index / 4)

  image(shuffledTiles[index].image, placementX * 55, placementY * 55, 50, 50)
}
