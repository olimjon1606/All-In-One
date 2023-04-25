const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn");
const linkContainer = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

document.addEventListener("DOMContentLoaded", getLinks)
inputBtn.addEventListener("click", addlink)
linkContainer.addEventListener("click", deleteLink)

function addlink(event) {
    event.preventDefault();
    if (inputEl.value !== "") {
        const linkDiv = document.createElement("div")
        linkDiv.classList.add("link")

        const newLink = document.createElement("li")
        newLink.classList.add("link-item")
        newLink.innerHTML = `<a href=${inputEl.value}
    translate="_blank">${inputEl.value}</a>`
        linkDiv.appendChild(newLink);

        saveLocalLinks(inputEl.value)

        const deleteLink = document.createElement("span");
        deleteLink.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`
        deleteLink.classList.add("delete-link")
        linkDiv.appendChild(deleteLink)

        linkContainer.appendChild(linkDiv)

        inputEl.value = ''
    }
}

function deleteLink(e) {
    const item = e.target
    if (item.classList[0] === "delete-link") {
        const link = item.parentElement;
        removeLocalLinks(link)
        link.remove()

    }
}

function saveLocalLinks(link) {
    let links;
    if (localStorage.getItem('links') === null) {
        links = [];
    } else {
        links = JSON.parse(localStorage.getItem("links"))
    }
    links.push(link);
    localStorage.setItem("links", JSON.stringify(links));
}

function getLinks() {
    let links;
    if (localStorage.getItem("links") === null) {
        links = [];
    } else {
        links = JSON.parse(localStorage.getItem('links'));
    }
    links.forEach(function (link) {
        const linkDiv = document.createElement("div");
        linkDiv.classList.add("link");

        const newLink = document.createElement("li");
        newLink.classList.add("link-item");
        newLink.innerHTML = `<a href=${link}
        translate="_blank">${link}</a>`
        linkDiv.appendChild(newLink);

        const deleteLink = document.createElement("span");
        deleteLink.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`
        deleteLink.classList.add("delete-link");
        linkDiv.appendChild(deleteLink);

        linkContainer.appendChild(linkDiv);
    });
}

function removeLocalLinks(link) {
    let links;
    if (localStorage.getItem('links') === null) {
        links = [];
    } else {
        links = JSON.parse(localStorage.getItem('links'))
    }
    const linkIndex = link.children[0].innerText
    console.log(linkIndex)
    links.splice(links.indexOf(linkIndex), 1);

    localStorage.setItem("links", JSON.stringify(links))
}

deleteBtn.addEventListener("dblclick", ()=> {
    localStorage.clear()
    links = []
    linkContainer.innerText = ''
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const linkDiv = document.createElement("div")
        linkDiv.classList.add("link")

        const newLink = document.createElement("li")
        newLink.classList.add("link-item")
        newLink.innerHTML = `<a href=${tabs[0].url}
    translate="_blank">${tabs[0].url}</a>`
        linkDiv.appendChild(newLink);

        saveLocalLinks(tabs[0].url)

        const deleteLink = document.createElement("span");
        deleteLink.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`
        deleteLink.classList.add("delete-link")
        linkDiv.appendChild(deleteLink)

        linkContainer.appendChild(linkDiv)

        inputEl.value = ''
    
    })
})