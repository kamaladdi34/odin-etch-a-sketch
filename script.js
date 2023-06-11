const pixelContainer = document.querySelector('.pixel-container');
const containerHeight = pixelContainer.clientHeight;
const sizeSLider = document.querySelector('.grid-size-slider > input');
const colorPicker = document.querySelector('#color-picker');
const fakeColorPicker = document.querySelector('.color-picker-fake');
const pencils = document.querySelectorAll('.pencil');
let penEnabled = true;
let eraserEnabled = false;
let rainbowPenEnabled = false;
let pixels = [];
let currentPixelAmount = 0;
let chosenColor = '#000000';
let coloredPixels = [];
let isMouseDown = false;
fakeColorPicker.style.backgroundColor = chosenColor;
pixelContainer.addEventListener('dragstart',(event)=>{event.preventDefault()});
sizeSLider.addEventListener('input',(event)=>{
    updateGridSize(sizeSLider.value)
    resetColoredPixels(coloredPixels);
    coloredPixels = [];
});
colorPicker.addEventListener('change',(event)=>
{
    chosenColor = event.target.value;
    fakeColorPicker.style.backgroundColor = event.target.value
})
createPixelPool(50);
updateGridSize(20);
document.addEventListener('mousedown',(event)=>{
    isMouseDown = event.button == 0;
    if(isMouseDown && event.target.classList.contains('pixel'))
    {
        colorPixel(event.target,chosenColor);
    }
})
document.addEventListener('mouseup',(event)=>{
    if(event.button == 0)
    {
        isMouseDown = false;
    }
})
pixelContainer.addEventListener('mouseover',(event)=>{
    if(event.target.classList.contains('pixel') && isMouseDown)
    {
        colorPixel(event.target,chosenColor);
    }
    else if(event.target.classList.contains('pixel'))
    {
        lastHoveredPixel = event.target;
    }
});
pencils.forEach((pencil)=>{
    pencil.addEventListener('click',(event)=>
    {
        let pencilType = event.target.getAttribute('data-pencil-type');
        updateChosenPencilUI(pencils,event.target);
        penEnabled = pencilType == 'pen';
        eraserEnabled = pencilType == 'eraser';
        rainbowPenEnabled = pencilType == 'rainbow';
    })
})
function updateChosenPencilUI(pencils,chosenPencil)
{
    pencils.forEach(pencil=>{
        if(pencil == chosenPencil)
        {
            pencil.classList.add('pencil-selected');
        }
        else
        {
            pencil.classList.remove('pencil-selected');
        }
    })
}
function createPixel(gridSize){
    let pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.width = pixel.style.height = `${containerHeight/gridSize}px`;
    pixels.push(pixel);
    return pixel;
}
function createPixelPool(gridSize){
    for (let i = 0; i < gridSize*gridSize; i++) {
        pixelContainer.appendChild(createPixel(gridSize));
    }
}
function updateGridSize(gridSize)
{

    const pixelAmount = gridSize*gridSize;
    const newPixelSize = `${containerHeight/gridSize}px`;
    let pixelsHeight = 0, pixelsHeightShown = 0,pixelsDisabled =0 ;
    for (let i = 0; i < pixels.length; i++) {
        if(i < pixelAmount)
        {
            pixels[i].style.height = pixels[i].style.width = newPixelSize;
        }
        if(i < pixelAmount && i < currentPixelAmount)
        {
            pixelsHeight++;
        }
        else if(i < pixelAmount)
        {
            pixels[i].classList.remove('hidden');
            pixelsHeightShown++;
        }
        else
        {
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
function colorPixel(pixel,color)
{
    if(eraserEnabled)
    {
        resetPixel(pixel);
        return;
    }
    color = rainbowPenEnabled? generateRandomColor() : color;
    pixel.style.backgroundColor = color;
    pixel.classList.add('colored-pixel');
    coloredPixels.push(pixel);
}
function generateRandomColor()
{
    return `rgb(${randomBetween(0,255)},${randomBetween(0,255)},${randomBetween(0,255)})`
}
const randomBetween = (min,max) => random(max - min) + min; 
const random = number => Math.floor(Math.random()*number);
function resetColoredPixels(pixels)
{
    pixels.forEach((pixel)=>{
        resetPixel(pixel);
    })
    console.clear();
    console.log(`reset`,pixels.length,`pixels`);
}
function resetPixel(pixel)
{
    pixel.classList.remove('colored-pixel');
    pixel.style.backgroundColor = 'white';
}