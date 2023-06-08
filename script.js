const pixelContainer = document.querySelector('.pixel-container');
const containerHeight = pixelContainer.clientHeight;
const sizeSLider = document.querySelector('.grid-size-slider > input');
let currentPixelAmount = 0;
let pixels = [];
sizeSLider.addEventListener('input',(e)=>{updateGridSize(sizeSLider.value)});
function createPixel(gridSize){
    let pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.width = pixel.style.height = `${containerHeight/gridSize}px`;
    pixels.push(pixel);
    return pixel;
}
function createPixelPpool(gridSize){
    for (let i = 0; i < gridSize*gridSize; i++) {
        pixelContainer.appendChild(createPixel(gridSize));
    }
}
createPixelPpool(100);
updateGridSize(20);
function updateGridSize(gridSize)
{
    const pixelAmount = gridSize*gridSize;
    const newPixelSize = `${containerHeight/gridSize}px`;
    let pixelsHeight = 0, pixelsHeightShown = 0,pixelsDisabled =0 ;
    for (let i = 0; i < pixels.length; i++) {
        if(i<pixelAmount && i < currentPixelAmount){
            pixels[i].style.height = pixels[i].style.width = newPixelSize;
            pixelsHeight++;
        }
        else if(i<pixelAmount){
            pixels[i].classList.remove('hidden');
            pixels[i].style.height = pixels[i].style.width = newPixelSize;
            pixelsHeightShown++;
        }else{
            pixels[i].classList.add('hidden');
            pixelsDisabled++;
        }
    }
    currentPixelAmount = pixelAmount;
    console.log(`pixels with size updated:${pixelsHeight}`);
    console.log(`pixels enabled and size updated: ${pixelsHeightShown}`);
    console.log(`pixels disabled: ${pixelsDisabled}`);
    pixelsDisabled = pixelsHeight = pixelsHeightShown = 0;
}