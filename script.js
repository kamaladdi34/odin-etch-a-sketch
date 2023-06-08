const pixelContainer = document.querySelector('.pixel-container');
const containerHeight = pixelContainer.clientHeight;
const sizeSLider = document.querySelector('.grid-size-slider > input');
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
    for (let i = 0; i < pixels.length; i++) {
        if(i<gridSize*gridSize)
        {
            pixels[i].classList.remove('hidden');
            pixels[i].style.height = pixels[i].style.width = `${containerHeight/gridSize}px`;
        }
        else
        {
            pixels[i].classList.add('hidden');
        }
    }
}