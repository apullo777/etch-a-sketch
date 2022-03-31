const defaultColor = '#333333'
const defaultMode = 'color'
const defaultSize = 32

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

const colorSelector = document.getElementById('colorSelector');
const colorBtn = document.getElementById('colorBtn');
const warmBtn = document.getElementById('warmBtn');
const coldBtn = document.getElementById('coldBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeRange = document.getElementById('sizeRange');
const grid = document.getElementById('gridContainer');

colorSelector.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
warmBtn.onclick = () => setCurrentMode('warm');
coldBtn.onclick = () => setCurrentMode('cold');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => resetGrid();
sizeRange.onmousemove = (e) => updateSizeValue(e.target.value);
sizeRange.onchange = (e) => changeSize(e.target.value);


function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    changeMode(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function changeSize(size) {
    setCurrentSize(size)
    updateSizeValue(size)
    resetGrid()
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'warm') {
        const randomR = Math.floor(Math.random() * (1-0.5) * 256 + 128)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * (0.5-0) * 256 + 0)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'cold') {
        const randomR = Math.floor(Math.random() * (0.5-0) * 256 + 0)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * (1-0.5) * 256 + 128)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode = 'eraser') {
        e.target.style.backgroundColor = '#e7eff6'
    }
}

function changeMode(newMode) {
    if (currentMode === 'warm') {
        warmBtn.classList.remove('active')
    } else if (currentMode === 'cold') {
        coldBtn.classList.remove('active')
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'warm') {
        warmBtn.classList.add('active')
    } else if (newMode === 'cold') {
        coldBtn.classList.add('active')
    } else if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }
  }

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i=0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('girdElement')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

function resetGrid() {
    clearGrid()
    createGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}


window.onload = () => {
    createGrid(defaultSize)
    changeMode(defaultMode)
}
