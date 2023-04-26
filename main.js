// Navigation

class FullPage {
    constructor(link) {
        this.links = [document.getElementById(link + '-link'), document.getElementById(link + '-link-mobile'), document.getElementById(link + '-span')]
        this.targetScreen = document.getElementById(link + '-screen')
        this.roundedTargetTop = Math.floor(this.targetScreen.getBoundingClientRect().top / 100)

        const target = this.targetScreen
        const filteredLinks = this.links.filter(Boolean)
        filteredLinks.forEach(link => link.addEventListener('click', function () { 
            scrollToTargetElement(target)
            checkCurrentScrollPosition()
        }))
    }
}

const scrollToTargetElement = targetElement => targetElement.scrollIntoView({ behavior: "smooth" });

const projectsLinks = new FullPage('projects')
const aboutLinks = new FullPage('about')
const helloLinks = new FullPage('hello')

const downArrow = document.getElementById('down-arrow')
downArrow.addEventListener('click', function () { scrollToTargetElement(helloLinks.targetScreen) })


// throttler for scroll events

const throttledScrollEvent = (func, delay) => {
    let time = Date.now()

    return () => {
        if ((time + delay - Date.now()) <= 0) {
            func()
            time = Date.now()
        }
    }
}


// Update nav link highlights
const mainContainer = document.getElementById('main-container')

const checkCurrentScrollPosition = () => {
    const currentScrollPointTop = Math.floor(mainContainer.scrollTop / 100)

    console.log(currentScrollPointTop, aboutLinks.roundedTargetTop);

    switch (currentScrollPointTop) {
        case helloLinks.roundedTargetTop:
            $(helloLinks.links.filter(Boolean)).addClass('highlighted')
            break;
        case projectsLinks.roundedTargetTop:
            $(projectsLinks.links).addClass('highlighted')
            break;
        case aboutLinks.roundedTargetTop:
            $(aboutLinks.links).addClass('highlighted')
            break;
        default:
            $(helloLinks.links.filter(Boolean)).removeClass('highlighted')
            $(projectsLinks.links).removeClass('highlighted')
            $(aboutLinks.links).removeClass('highlighted')
    }   
}

mainContainer.addEventListener('scroll', throttledScrollEvent(checkCurrentScrollPosition, 200))


// Project Slider Behaviour

const sliderIcons = Array.prototype.slice.call(document.getElementsByClassName('icon-img'))
const slides = Array.prototype.slice.call(document.getElementsByClassName('slide'))

let sliderLeft = 0
const getSliderLeft = () => sliderLeft = document.getElementById('slider').getBoundingClientRect().left
getSliderLeft()
window.onresize = getSliderLeft

const checkAllSliderLefts = () => {
    for (let i = 0; i < 7; i++) {
        if (checkSliderLeft(i, sliderLeft)) {
            return i
        }
    }
}

const checkSliderLeft = (index, checkpoint) => {
    const proximityBetweenElements = (slides[`${index}`].getBoundingClientRect().left / checkpoint)
    return (proximityBetweenElements > 0.9 && proximityBetweenElements < 1.1)
}

const illuminateIconsAtIndeces = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [0, 1, 2, 4, 5, 6, 7, 12, 13, 14],
    [0, 1, 2, 3],
    [0, 1, 2, 4, 5, 6, 7, 12, 13, 14],
    [0, 1, 8, 9, 10, 12],
    [0, 1, 2, 4, 5, 7, 11, 15],
    [0, 1, 2, 15],
]

const handleSliderScroll = () => {
    const currentSlide = checkAllSliderLefts()
    const currentIlluminations = illuminateIconsAtIndeces[currentSlide]
    if (currentSlide === undefined) {
        $(".icon-img").fadeOut(175)
    } else {
        currentIlluminations.forEach(index => {
            $(`[index=${index}]`).fadeIn(250)
        })
    }
}

slider.addEventListener('scroll', throttledScrollEvent(handleSliderScroll, 10))

const slideBody = {};

for (let i = 1; i < 7; i++) {
    slideBody[`slideIndex${i}`] = {
        buttons: $('#slide-' + i + '-btn').children().toArray(),
        slides: $('#slide-' + i + '-body').children().toArray()
    }
}

for (let slideIndex in slideBody) {

    const slideButtons = slideBody[slideIndex].buttons
    const slideSlides = slideBody[slideIndex].slides

    slideButtons.forEach(button => {

        const targetSlide = '#item' + button.id.slice(-4)
        button.addEventListener('click', function () {

            showTargetedSlide(targetSlide, slideSlides)

            slideButtons.forEach(eachButton => {
                $(eachButton).removeClass('bold-highlighted')
            })
            $(button).addClass('bold-highlighted')
        })

    })
}

const showTargetedSlide = (targetSlide, slideArray) => {
    slideArray.forEach(slide => {
        $(slide).fadeOut(200)
    })
    $(targetSlide).fadeIn(400)
}

// About show/hide:
const aboutMenu = $('#about-menu')
const aboutButtons = $('.about-button')

const toggleAboutDiv = buttonClicked => {
    const targetElement = $(buttonClicked[0].getAttribute('target'))
    aboutMenu.toggle()
    targetElement.toggle()
}

aboutButtons.on("click", function() {
    toggleAboutDiv($(this))
})