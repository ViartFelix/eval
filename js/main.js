const imgShow = $("#slider img")
const imgTitle = $("#slider #image-title")
const minIndex = 1;
const maxIndex = 6;

const carouselTime = 3000;
let isSliderRunning = false;

let carouselBearer;

let currentIndex = minIndex;

$(()=>{
    initImages()
    hydrate()
})

function initImages() {
    displayImage(currentIndex)
}

function displayImage(index) {

    if(index > maxIndex) {
        currentIndex = index = minIndex;
    } else if(index < minIndex) {
        currentIndex = index = maxIndex;
    } else {
        currentIndex = index;
    }

    const imagesAlt = [
        "Colorfull, tagged street wall",
        "Beautiful road with a city background",
        "Colorfull building",
        "Night building",
        "Aerial view of a night city",
        "Evening view of Eiffel Tower"
    ]

    const title = imagesAlt[index - 1]

    imgShow
        .attr("src", "images/"+index+".jpg")
        .attr("alt", title)

    imgTitle
        .text(title)

    imgShow.attr("data-index", index)
}

function hydrate() {
    //Clicks de souris
    $("#toolbar-toggle").on("click", handleToggleToobar)

    $("#slider-previous").on("click", (event) => {
        event.preventDefault()
        currentIndex--;
        displayImage(currentIndex)
    })

    $("#slider-next").on("click", (event) => {
        event.preventDefault()
        currentIndex++;
        displayImage(currentIndex)
    })

    $("#slider-random").on("click", (event) => {
        event.preventDefault()
        currentIndex = getRandomImage();
        displayImage(currentIndex)
    })

    $("#slider-toggle").on("click", (event) => {
        event.preventDefault()
        handleToggleCaroussel()
    })

    //boutons du clavier
    $("html").on("keydown", handleKeyBoardPress)
}

function handleToggleToobar(event) {
    event.preventDefault()

    $(".target-buttons")
        .toggleClass("hide")
}

function getRandomImage() {
    return Math.floor(Math.random() * maxIndex) + minIndex
}

function handleToggleCaroussel() {
    isSliderRunning = !isSliderRunning

    if(isSliderRunning) {
        carouselBearer = setInterval(()=>{
            $("#slider-next").click()
        }, carouselTime)
    }
    else {
        clearInterval(carouselBearer)
    }

    $('#slider-toggle').attr('data-isRunning', isSliderRunning)
}

function handleKeyBoardPress(event) {
    const key = event.which

    console.log(key);

    switch(key) {
        case 32:
            handleToggleCaroussel()
        case 37:
            $("#slider-previous").click()
            break;
        case 39:
            $("#slider-next").click()
            break;
    }
}