const menuButton = document.querySelector("#mobile-button");
const navInMobile = document.querySelector("nav");
const closeNav = document.querySelector("nav > button");
const overlay = document.querySelector(".overlay");
const darkmodeButton = document.querySelector("#dark-mode");
const categories = document.querySelectorAll(".category-bar >li");
let fetchedProjects = null;

// render projects fron json file + apply dark mode
window.addEventListener("load", function () {
    // dark mode from local storage 
    if (this.localStorage.getItem("dark-mode") === "dark") {
        this.document.body.classList.add("dark");
        if (this.document.body.classList.contains("dark"))
            darkmodeButton.innerHTML = "<i class='fa-solid fa-lightbulb'></i>";
    } else
        this.document.body.classList.remove("dark");

    // get projects data from json file 
    fetch('./data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            fetchedProjects = result.projects;
            displayProjects();
        })
        .catch(error => {
            console.error("Error loading projects:", error);
        });

});

function displayProjects(filter = "All") {
    console.log(fetchedProjects);
    const projectContainer = document.querySelector(".project-container");
    let filterdProjects = filter === "All" ? fetchedProjects : fetchedProjects.filter(project => project.category === filter);
    console.log();
    if (filterdProjects.length === 0) {
        projectContainer.innerHTML = '<p>Not Available Now</p>';
        projectContainer.classList.remove("grid");
    }
    else {
        projectContainer.innerHTML = filterdProjects.map(proj => createProjectCard(proj)).join("");
        projectContainer.classList.add("grid");
    };
}

function createProjectCard(project) {
    return `<div class="project ${project.type === "Frontend" ? "front-end" : "full-stack"}">
                <div class="project-image">
                    <img src=${project.image}  alt='Interactive Rating Component'>
                </div>
                <div class="project-content">
                    <h3 class="project-name">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <ul class="project-skills">
                    ${project.technologies.map(tech => `<li>${tech}</li>`).join("")}
                    </ul >
                    <div class="project-buttons">
                        <a target="_blank" href="${project.demoUrl}"><iclass="fa-solid fa-arrow-up-right-from-square"></i>Live Demo</a>
                        <a target="_blank" href="${project.githubUrl}"><i class="fa-brands fa-github"></i>GitHub</i></a >
                    </div >
                </div >
            </div > `;
}

// open nav when user click the burger button in header 
menuButton.addEventListener("click", function () {
    overlay.classList.add("show");
    navInMobile.classList.add("show");
});

// close nav when user click the burger button in header 
closeNav.addEventListener("click", function () {
    overlay.classList.remove("show");
    navInMobile.classList.remove("show");
});



// to change icon into darkmode button between light and dark mode 
darkmodeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark") ? "dark" : "light");
    this.children[0].classList.toggle("fa-lightbulb");
    this.children[0].classList.toggle("fa-moon");
});


// toggle class in project section when user click category + filter projects
categories.forEach(categorey => {
    categorey.addEventListener("click", function () {
        // To Clear categories from selected class 
        categories.forEach(category => category.classList.remove("selected"));
        this.classList.add("selected");
        displayProjects(this.getAttribute("category-type"));
    });
});
;
