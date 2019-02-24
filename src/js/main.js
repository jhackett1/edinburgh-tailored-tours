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


// Trigger actions on scroll into viewport
const elementsToTrigger = document.querySelectorAll(".triggerable")

window.addEventListener("scroll", () => {


    // elementsToTrigger.forEach((element) => {

        const heightFromTopDocument = element.getBoundingClientRect().top

        console.log("Element height: ", heightFromTopDocument)
    //     // console.log("Scroll position: ", scrollPosition)

    //     // const heightFromTopViewport = scrollPosition 


    // })
})