const pixelContainer = document.querySelector('.pixel-container');
const containerHeight = pixelContainer.clientHeight;
const sizeSLider = document.querySelector('.grid-size-slider > input');
const colorPicker = document.querySelector('#color-picker');
const fakeColorPicker = document.querySelector('.color-picker-fake');
let chosenColor = '#000000';
let coloredPixels = []
fakeColorPicker.style.backgroundColor = chosenColor;
colorPicker.addEventListener('change',(e)=>
{
    chosenColor = e.target.value;
    fakeColorPicker.style.backgroundColor = e.target.value
})
pixelContainer.addEventListener('dragstart',(e)=>{e.preventDefault()});
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
createPixelPpool(50);
updateGridSize(20);
function updateGridSize(gridSize)
{
    resetColoredPixels(coloredPixels);
    coloredPixels = [];
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
    console.log(`pixels with size updated:`,pixelsHeight);
    console.log(`pixels enabled and size updated:`,pixelsHeightShown);
    console.log(`pixels disabled:`,pixelsDisabled);
    pixelsDisabled = pixelsHeight = pixelsHeightShown = 0;
}
let isMouseDown = false;
document.addEventListener('mousedown',(e)=>{
    if(e.button == 0)
    {
        isMouseDown = true;
    }
    if(isMouseDown && e.target.classList.contains('pixel'))
    {
        colorPixel(e.target);
    }
})
document.addEventListener('mouseup',(e)=>{
    if(e.button == 0)
    {
        isMouseDown = false;
    }
})
pixelContainer.addEventListener('mouseover',(e)=>{
    if(e.target.classList.contains('pixel') && isMouseDown)
    {
        colorPixel(e.target);
    }
    else if(e.target.classList.contains('pixel'))
    {
        lastHoveredPixel = e.target;
    }
});
function colorPixel(pixel)
{
    pixel.style.backgroundColor = chosenColor;
    pixel.classList.add('colored-pixel');
    coloredPixels.push(pixel);
}
function resetColoredPixels(pixels)
{
    pixels.forEach((pixel)=>{
        resetPixel(pixel);
    })
    console.log(`reset`,pixels.length,`pixels`);
}
function resetPixel(pixel)
{
    pixel.classList.remove('colored-pixel');
    pixel.style.backgroundColor = 'white';
}