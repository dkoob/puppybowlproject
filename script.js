const container = document.querySelector(".container")
let puppies = []

window.addEventListener("hashchange", () => {
    render()
})

async function fetchPuppies() {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2310/players")
    const data = await response.json()
    puppies = data.data.players
    console.log(puppies)
    render()
}

function render() {
    const currentWindow = window.location.hash.slice(1)
    console.log("The current window is: " + currentWindow)
    const singlePuppy = puppies.find((puppy) => {
        return(puppy.name === currentWindow)
    })
    if (singlePuppy) {
        container.innerHTML = ""
        container.innerHTML = `
        <div class="singlePup">
            <br>
            <span class="puppycontent">
                <h1>${singlePuppy.name}</h1>
                <p>"${singlePuppy.breed}</p>
                <p>This puppies field status is - ${singlePuppy.status}</p>
            <span>
                <img class="singlePupPic" src="${singlePuppy.imageUrl}"/>
            </span>
        </div>
        `
    }else{
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
}

fetchPuppies()

// function renderAll() {
//     const puppyList = puppies.map((puppy) => {
//         return `
//         <div class="puppy">
//             <br>
//             <span class="puppycontent">
//                 <a href="#${puppy.name}"><h2>${puppy.name}</h2></a>
//             </span>
//             <span class="puppycontent">
//                 <p>Click for more information on this player!</p>
//             </span>
//             <span>
//                 <img src="${puppy.imageUrl}"/>
//             </span>
//         </div>
//         `
//     })
//     container.innerHTML = puppyList.join("");
// }

// old render all function