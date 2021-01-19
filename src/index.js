document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(res => {
            res.forEach(function(dog) {
                renderDog(dog)
            })
            document.querySelector('#good-dog-filter').addEventListener('click', (event) => {
                filterDogs(event.target, res)
            })
        })
    })
    
function filterDogs(dogFilter, dogObject) {
    dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = ""
    // document.querySelector('#good-dog-filter').addEventListener('click', (event) => {
        if (dogFilter.innerText === "Filter good dogs: OFF") {
            dogFilter.innerText = "Filter good dogs: ON"
            dogObject.filter(function(dog) {
                if (dog.isGoodDog === true || dog.isGoodDog === "true") {
                    renderDog(dog)
                }
            })
        } else {
            dogFilter.innerText = "Filter good dogs: OFF"
            dogObject.forEach(function(dog) {
                renderDog(dog)
            })
        }
    // })

}

function renderDog(dog) {
    dogBar = document.querySelector('#dog-bar')
    span = document.createElement('span')
    span.textContent = dog.name
    span.addEventListener('click', () => {
        dogInfo(dog)
    }) 
    dogBar.appendChild(span)
}

function dogInfo(dog) {
    document.querySelector('#dog-info').innerHTML = ""
    dogShow = document.querySelector('#dog-info')
    img = document.createElement('img')
    img.src = dog.image
    h2 = document.createElement('h2')
    h2.innerText = dog.name
    btn = document.createElement('button')
    if (dog.isGoodDog === true || dog.isGoodDog === "true") {
        btn.innerText = "Good Dog!"
    } else {
        btn.innerText = "Bad Dog!"
    }
    btn.addEventListener('click', () => {
        editDog(dog)
    })
    dogShow.append(img, h2, btn)
}

function editDog(dog) {
    if (dog.isGoodDog === true || dog.isGoodDog === "true") {
        goodDogStatus = {
            isGoodDog: false
        }
    } else {
        goodDogStatus = {
            isGoodDog: true
        }
    }

    let reqPackage = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(goodDogStatus)
    }

    fetch(`http://localhost:3000/pups/${dog.id}`, reqPackage)
        .then(res => res.json())
        .then(dog => dogInfo(dog))
}