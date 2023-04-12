// Navigation

const scrollToTargetElement = targetElement => targetElement.scrollIntoView({ behavior: "smooth" });

class LinkGroup {
    constructor(link) {
        this.links = [document.getElementById(link + '-link'), document.getElementById(link + '-link-mobile'), document.getElementById(link + '-span')]
        this.targetScreen = document.getElementById(link + '-screen')

        const target = this.targetScreen
        const filteredLinks = this.links.filter(Boolean)
        filteredLinks.forEach(link => link.addEventListener('click', function () { scrollToTargetElement(target) }))
    }
}

const projectsLinks = new LinkGroup('projects')
const aboutLinks = new LinkGroup('about')
const helloLinks = new LinkGroup('hello')

const downArrow = document.getElementById('down-arrow')
downArrow.addEventListener('click', function () { scrollToTargetElement(helloLinks.targetScreen) })

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

slider.addEventListener('scroll', function () {
    const currentSlide = checkAllSliderLefts()
    const currentIlluminations = illuminateIconsAtIndeces[currentSlide]
    if (currentSlide === undefined) {
        $(".icon-img").fadeOut(175)
    } else {
        currentIlluminations.forEach(index => {
            $(`[index=${index}]`).fadeIn(250)
        })
    }
})

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

aboutButtons.on("click", function () {
    toggleAboutDiv($(this))
})