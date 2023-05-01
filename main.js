const mainConteiners = document.querySelectorAll(".main-container")
const navBtns = document.querySelectorAll(".nav-btn")

navBtns.forEach(function (btn) {
    let choice
    btn.addEventListener("click", () => {
        if (btn.value === "tab") {
            btn.classList.add("active")
            containerF("tab")
        } else if (btn.value === "todo") {
            containerF("todo")
            btn.classList.add("active")
        } else if (btn.value === "weather") {
            containerF("weather")
            btn.classList.add("active")
        } else {
            containerF("hex")
            btn.classList.remove("active")
        }
    })
    
})
function containerF(choice) {
    mainConteiners.forEach(function (container) {
        if (container.id === choice && container.classList.contains("hide")) {
            container.classList.remove("hide")
        } else if (!container.classList.contains("hide")) {
            container.classList.add("hide")
        }
    })
}


function tabContent() {
    return `<input type="text" id="input-el" autofocus>
            <div class="btn-container">
                <button id="input-btn">Save Input</button>
                <button id="tab-btn">Save Tab</button>
                <button id="delete-btn">Delete All</button>
            </div>
            <div id="link-container">
                <ul id="ul-el">
                </ul>
            </div>`
}
function todoContent() {

}
function weatherContent() {

}
function hexContent() {

}