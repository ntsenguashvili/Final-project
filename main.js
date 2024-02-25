
// slider

const sliderArray = [
    "images/twitter.png",
    "images/google+.png",
    "images/rss.png",
]

let currentSlide = 0;

function changeSlider() {
    document.getElementById('slider')
        .setAttribute("style", "background-image: url(" + sliderArray[currentSlide] + ")");

    currentSlide++;


    if (currentSlide > sliderArray.length) {
        currentSlide = 0;
    }

}


//  Stats
const statsVallue = [
    {
        name: "HTML",
        value: 80
    },
    {
        name: "Css",
        value: 70
    },
    {
        name: "javascript",
        value: 60
    },
    {
        name: "git",
        value: 99
    },
]

let sliderTimer = 0;
let timerStep = 0;


function updateStats() {
    let statsItems = Array.from(document.getElementsByClassName("stats-inner-container"));
    let i = 0;


    statsItems.forEach(element => {
        let newValue = timerStep
        if (timerStep >= statsVallue[i].value) {
            newValue = statsVallue[i].value;
        }
        element.children[0].innerHTML = `${statsVallue[i].name} <span>( ${newValue}% )</span>`;
        let secondChild = Array.from(element.children[1].children);
        secondChild[0].setAttribute("style", `width: ${newValue}%`)
        i++;
    });

    timerStep++;
    if (timerStep >= 100) {
        clearInterval(sliderTimer)
    }
}

function statsVisible(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // #stats-container is in view, call your function here
            sliderTimer = setInterval(updateStats, 20);
            // Unobserve to stop unnecessary calls
            observer.unobserve(entry.target);
        }
    });
}


document.addEventListener("DOMContentLoaded", function (event) {
    // Run All Tasks when Loaded
    setInterval(changeSlider, 5000);


    //  Stats Loader, with intersection Observer
    let target = document.querySelector("#stats-container");

    if (target) {
        const observer = new IntersectionObserver(statsVisible, {
            root: null, // Use the viewport as the root
            threshold: 1, // Trigger when 100% of the element is visible
        });
        observer.observe(target);

    }

    // load default slider
    loadFeedbackSlide(0);

});


const slideItems = [
    {
        text: "asfasfas sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore..",
        img: "images/d3.svg",
        title: "Dr.",
        name: "John A. Zoidberg",
    },
    {
        text: "x sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore..",
        img: "images/d4.svg",
        title: "Executive Delivery Boy",
        name: "Phillip J. Fry"
    },
    {
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore..",
        img: "images/d5.svg",
        title: "Janitor",
        name: "Scruffy"
    },
]


/* Click Functions */
function loadFeedbackSlide(slideNo) {
    let textElement = document.getElementById("cr-div1");
    textElement.innerHTML = slideItems[slideNo].text;

    let imgElement = document.getElementById("slider-central-image");
    
    
    let slideObject = slideItems[slideNo];

    imgElement.setAttribute("src",slideObject.img);

    let titleElement =document.getElementById("slider-central-title");
    titleElement.innerHTML=slideItems[slideNo].title;

    let nameElement =document.getElementById("slider-central-name");
    nameElement.innerHTML=slideItems[slideNo].name;

    for (let i = 0; i < slideItems.length; i++) {
        let checkbox = document.getElementById(`slider-central-box-${i}`);
        if(i===slideNo) {
            checkbox.classList.add("selected-checkbox")
        }   else { 
            checkbox.classList.remove("selected-checkbox")
        }     
    }
    
    
}

