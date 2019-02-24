import Instafeed from "instafeed.js"

// Instagram feed
new Instafeed({
    limit: 6,
    resolution: "standard_resolution",
    template: "<a target='blank' class='parallax-image recent-photos__link' href='{{link}}'><img class='recent-photos__image' alt='{{caption}}' src='{{image}}' /></a>",
    get: "user",
    userId: "7048114720",
    tagName: "instafeed",
    accessToken: "7048114720.1677ed0.53b1176ce6c24e5fa9e0e0666e59057b"
}).run()


// Parallax scroll
const element = document.querySelector(".parallax")
window.addEventListener("scroll", () => {
    window.requestAnimationFrame(()=>{
        element.style.transform = `translateY(${window.scrollY/3}px)`
    })
})


// Asynchronous form submission
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Disable form
    const elements = form.elements
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true
    }

    // Submit data
    let formData = new FormData(form)
    fetch(form.getAttribute("action"), {
        method: "post",
        body: formData
    })
        .then(()=>{
            form.classList.add("enquire__form--submitted")


        })
})