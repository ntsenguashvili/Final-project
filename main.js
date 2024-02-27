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


    // Attach Filter Hooks
    let filterUl = document.getElementById("filter-ul");
    filterUl.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            const clickedItemId = event.target.id;
            filterList(clickedItemId);
        }
    });

    // Send Data to API
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", postFormToJson);
});



// slider

const sliderArray = [
    "images/slide-image1.jpg",
    "images/slide-image2.jpg",
    "images/slide-image3.jpg",
]

let currentSlide = 0;

function changeSlider() {
    document.getElementById('slider')
        .setAttribute("style", "background-image: url(" + sliderArray[currentSlide] + ")");

    currentSlide++;


    if (currentSlide >= sliderArray.length) {
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




const slideItems = [
    {
        text: "sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore..",
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

    imgElement.setAttribute("src", slideObject.img);

    let titleElement = document.getElementById("slider-central-title");
    titleElement.innerHTML = slideItems[slideNo].title;

    let nameElement = document.getElementById("slider-central-name");
    nameElement.innerHTML = slideItems[slideNo].name;

    for (let i = 0; i < slideItems.length; i++) {
        let checkbox = document.getElementById(`slider-central-box-${i}`);
        if (i === slideNo) {
            checkbox.classList.add("selected-checkbox")
        } else {
            checkbox.classList.remove("selected-checkbox")
        }
    }


}

/* Filter List */
function filterList(filterText) {
    let filterDiv = document.getElementById("filter-div");
    let divContent = Array.from(filterDiv.children);


    // Filter out all unselected items 
    divContent.forEach(element => {
        if (`div-${filterText}` === element.id) {
            element.setAttribute("style", "display:grid");
        } else {
            element.setAttribute("style", "display:none");
        }
    });



    // Special Case for Select All
    if (filterText === "select-all") {
        divContent.forEach(element => {
            element.setAttribute("style", "display:grid");
        });

        document.getElementById("select-all").classList.add("selected-project");
    }


    // Mark Correct Ul>Li

    let ulItems = document.getElementById("filter-ul");
    let ulArray = Array.from(ulItems.children);

    ulArray.forEach(element => {
        if (element.id === filterText) {
            element.classList.add("selected-project");
        } else {
            element.classList.remove("selected-project");
        }
    });
}



// Post to jsonplaceholder

function postFormToJson(event) {
    event.preventDefault();

    // prepare data 

    let toSend = {
        name: document.getElementById("form-name").value,
        email: document.getElementById("form-email").value,
        website: document.getElementById("form-website").value,
        message: document.getElementById("form-message").value,
    }

    const url="https://jsonplaceholder.typicode.com/posts"

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState===4) {
            if (this.status>=200&&this.status<300) {
            alert("succesfully");
            } else {
                alert("try again");
                
            } 
        }
       
    };



    try {
        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify(toSend);
        xhr.send(data);
    } catch (ex) {
        console.log(ex);
    }
}