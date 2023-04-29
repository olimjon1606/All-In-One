const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn")
const color = document.getElementById("color")
var inputEl 
btn.addEventListener('click',function(){
    let hexColor = '#'
    for(let i = 0; i<6; i++){
        hexColor += hex[getRandomNumber()]
    }
    color.textContent = hexColor
    document.body.style.backgroundColor = hexColor
    inputEl = hexColor
    
})

function getRandomNumber(){
    return Math.floor(Math.random()*hex.length)
} 


const inputBtn = document.getElementById('btn-save')
const colContainer = document.getElementById("ul-elm")
document.addEventListener("DOMContentLoaded", getCols)
inputBtn.addEventListener("click", addCol)
colContainer.addEventListener("click", deleteCols)
function addCol(event) {
    event.preventDefault();
    if (inputEl!== "") {
        
        const colDiv = document.createElement("div")
        colDiv.classList.add("col")

        const newCol = document.createElement("li")
        newCol.classList.add("col-item")
        newCol.innerHTML = `<p style="color:${inputEl};border: 1px solid black; padding: 5px;border-radius: 2px;
        background-color:#fff;">${inputEl}</p>`
        colDiv.appendChild(newCol);

        saveLocalCols(inputEl)

        const deleteCols = document.createElement("span");
        deleteCols.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`
        deleteCols.classList.add("delete-col")
        colDiv.appendChild(deleteCols)

        colContainer.appendChild(colDiv)

        inputEl = ''
    }
}
function deleteCols(e) {
    const item = e.target
    if (item.classList[0] === "delete-col") {
        const col = item.parentElement;
        removeLocalCols(col)
        col.remove()

    }
}
function saveLocalCols(col) {
    let cols;
    if (localStorage.getItem('cols') === null) {
        cols = [];
    } else {
        cols = JSON.parse(localStorage.getItem("cols"))
    }
    cols.push(col);
    localStorage.setItem("cols", JSON.stringify(cols));
}
function getCols() {
    let cols;
    if (localStorage.getItem("cols") === null) {
        cols = [];
    } else {
        cols = JSON.parse(localStorage.getItem('cols'));
    }
    cols.forEach(function (col) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col");

        const newCol = document.createElement("li");
        newCol.classList.add("col-item");
        newCol.innerHTML = `<p style="color:${col};border: 1px solid black;border-radius: 2px;background-color:#fff;">${col}</p>`
        colDiv.appendChild(newCol);

        const deleteCols = document.createElement("span");
        deleteCols.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`
        deleteCols.classList.add("delete-col");
        colDiv.appendChild(deleteCols);

        colContainer.appendChild(colDiv);
    });
}

function removeLocalCols(col) {
    let cols;
    if (localStorage.getItem('cols') === null) {
        cols = [];
    } else {
        cols = JSON.parse(localStorage.getItem('cols'))
    }
    const colIndex = col.children[0].innerText
    console.log(colIndex)
    cols.splice(cols.indexOf(colIndex), 1);

    localStorage.setItem("cols", JSON.stringify(cols))
}


