"use strict";

const nav = document.querySelectorAll(".navbar_menu_item");

window.onload = function () {
  // Calculation of the number of years
  const now = new Date().getFullYear();
  //number of years
  const setYear = new Date("2018").getFullYear();
  const years = now - setYear;
  const yearList = document.getElementsByClassName("years");
  for (var i = 0; i < yearList.length; i++) {
    yearList[i].innerHTML = years;
  }
  // Number of years worked in Java
  const setJavaYear = new Date("2020").getFullYear();
  const javaYears = now - setJavaYear;
  const javaYearList = document.getElementsByClassName("javaYears");
  for (var i = 0; i < javaYearList.length; i++) {
    javaYearList[i].innerHTML = javaYears;
  }

  // Count Work filter
  const categoryBtn = document.getElementsByClassName("category__btn");
  for (var i = 0; i < categoryBtn.length; i++) {
    const filter = categoryBtn[i].dataset.filter;
    if (filter == "*") {
      const fullNum = document.getElementsByClassName("project").length;
      categoryBtn[i].lastChild.innerHTML = fullNum;
    } else {
      const projectType = document.getElementsByClassName("project");
      var cnt = 0;
      for (var j = 0; j < projectType.length; j++) {
        if (filter == projectType[j].dataset.type) {
          cnt++;
        }
      }
      document.querySelector(
        "button[data-filter=" + filter + "]"
      ).lastChild.innerHTML = cnt;
    }
  }
};

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }
  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  if (active != null) {
    active.classList.remove("selected");
  }
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  e.target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
