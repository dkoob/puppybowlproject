const container = document.querySelector(".container")
let puppies = []

window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1)
    if (hash === "mainsite"){
        renderAll()
    }else{
        render()
    }
})

async function fetchPuppies() {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2310/players")
    const data = await response.json()
    puppies = data.data.players
    console.log(puppies)
    renderAll()
}

function render() {
    const currentWindow = window.location.hash.slice(1)
    const singlePuppy = puppies.find((puppy) => {
        return(puppy.name === currentWindow)
    })
    container.innerHTML = singlePuppy ? "" : renderAll()
}

fetchPuppies()

function renderAll() {
    const puppyList = puppies.map((puppy) => {
        return `
        <div class="puppy">
            <br>
            <span class="puppycontent">
                <a href="#${puppy.name}"><h2>${puppy.name}</h2></a>
            </span>
            <span class="puppycontent">
                <p>Click for more information on this player!</p>
            </span>
            <span>
                <img src="${puppy.imageUrl}"/>
            </span>
        </div>
        `
    })
    container.innerHTML = puppyList.join("");
}
