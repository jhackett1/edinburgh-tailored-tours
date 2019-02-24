import Instafeed from "instafeed.js"

// Documentation at http://instafeedjs.com/
new Instafeed({
    limit: 6,
    resolution: "low_resolution",
    template: "<a href='{{link}}'><img alt='{{caption}}' src='{{image}}' /></a>",
    get: "user",
    userId: "7048114720",
    tagName: "instafeed",
    accessToken: "7048114720.1677ed0.53b1176ce6c24e5fa9e0e0666e59057b"
}).run()