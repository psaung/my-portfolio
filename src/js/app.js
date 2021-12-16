import gsap from "gsap";
import Vivus from "vivus";
import theaterJS from "theaterjs";
import imagesLoaded from "imagesloaded";

import "../css/onepage-scroll.css";
import { disableScroll, enableScroll } from "./utils";

const theater = theaterJS();
let currentStep = 1;
let history = [];
const trailAnimation = new Vivus("link-trail").play(-5);

function initMouseMoveHandler() {
  let init = false;
  const cursor = document.querySelector(".cursor-pointer");
  const cursorTrail = document.querySelector(".cursor-pointer-trail");
  const cursorArea = cursor.getBoundingClientRect();
  const cursorTrailArea = cursorTrail.getBoundingClientRect();

  const anchorElements = document.querySelectorAll("a");

  const onMouseHoverAnimation = new Vivus("cursor-pointer").play(5);

  const cursortrailAnimation = new Vivus("cursor-pointer-trail").play(5);

  const handleMouseEnter = (event) => {
    cursortrailAnimation.play(-5);
    onMouseHoverAnimation.play(-5, () => {
      if (event.target.id === "mailto") {
        trailAnimation.play(5);
      }
    });
  };

  const handleMouseOut = (event) => {
    cursortrailAnimation.play(5);
    trailAnimation.play(-5, () => {
      onMouseHoverAnimation.play(5);
    });
  };

  const handleMouseMove = (event) => {
    let attr = {};
    if (!init) {
      attr - { opacity: 1 };
      init = true;
    }
    const { clientX, clientY } = event;
    gsap.to(cursor, {
      x: clientX - cursorArea.width / 2,
      y: clientY - cursorArea.height / 2,
      alpha: 1,
    });

    gsap.to(cursorTrail, {
      x: clientX - cursorTrailArea.width / 2,
      y: clientY - cursorTrailArea.height / 2,
      alpha: 1,
      delay: 0.1,
    });
  };

  document.addEventListener("mousemove", handleMouseMove);

  anchorElements.forEach((a) => {
    a.addEventListener("mouseenter", handleMouseEnter);
    a.addEventListener("mouseleave", handleMouseOut);
  });
}

const handlePagination = (idx) => {
  if (history.includes(idx)) {
    return false;
  }

  history.push(idx);

  switch (true) {
    case idx === 2 && !history[idx]:
      break;
    case idx === 3 && !history[idx]:
      break;
    default:
      break;
  }
};

const bootstrapPagination = () => {
  const sections = document.querySelectorAll(".slide-content");

  const paginationContainer = document.querySelector(".pagination-container");

  const sectionLength = sections.length;
};

const handleBorderLine = (idx) => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <line class="top" x1="0" y1="0" x2="900" y2="0"></line>
    <line class="left" x1="0" y1="460" x2="0" y2="-920"></line>
    <line class="bottom" x1="300" y1="460" x2="-600" y2="460"></line>
    <line class="right" x1="300" y1="0" x2="300" y2="1380"></line>
  </svg>
  `;
};

function createSVGLine(element) {
  const { offsetWidth: width, offsetHeight: height } = element;

  const template = `
    <div class="overlay"></div>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="position: absolute; top: 0; left: 0">
      <line class="line-top" x1="0" y1="0" x2="${width * 3}" y2="0"></line>
      <line class="line-left" x1="0" y1="${height}" x2="0" y2="-${
    height * 2
  }"></line>
      <line class="line-bottom" x1="${width}" y1="${height}" x2="-${
    width * 2
  }" y2="${height}"></line>
      <line class="line-right" x1="${width}" y1="0" x2="${width}" y2="${
    height * 3
  }"></line>
    </svg>

    <div class="link-icon">
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>
    </div>
  `;

  element.insertAdjacentHTML("beforeend", template);
}

function bootstrapProjectHoverAnimation() {
  const item = document.querySelectorAll(".work-item");
  item.forEach((element) => {
    createSVGLine(element);
  });
}

function bootstrapSocialIconHover() {
  const container = document.querySelector(".social-icons-container");

  const children = container.querySelectorAll("li");

  const template = `<div class="social-icon-hover-item"></div>`;
  children.forEach((child) => {
    child.insertAdjacentHTML("beforeend", template);
  });
}

function handleImageLoaded() {
  // Preload images
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll("img"),
      { background: true },
      resolve
    );
  });
}

disableScroll();

function onComplete() {
  enableScroll();
  setTimeout(() => {
    $(".main").onepage_scroll({
      sectionContainer: "section",
      loop: false,
      easing: "cubic-bezier(0.8, 0.1, 0.420, 0.9)",
      beforeMove: (idx) => {
        currentStep = idx;
        handlePagination(idx);
      },
      pagination: false,
      duration: 500,
    });
  }, 1000);
  bootstrapSocialIconHover();
  bootstrapProjectHoverAnimation();
  bootstrapPagination();

  initMouseMoveHandler();

  theater
    .on("type:start, erase:start", () => {
      const actor = theater.getCurrentActor();

      actor.$element.classList.add("is-typing");
    })
    .on("type:end erase:end", () => {
      const actor = theater.getCurrentActor();
      actor.$element.classList.remove("is-typing");
    });

  theater.addActor("intro").addActor("bio");

  theater
    .addScene("intro:Hello everybody...", 300, 30)
    .addScene("bio:Welcome to my website", 200, 430)
    .addScene("intro: I am", 200, ".", 200, ".", 200, ". ", " Pyae!", 430)
    .addScene("bio:Fullstack", 200, " Dev", 200, " From Myanmar", 430);
}

handleImageLoaded().then(() => {
  const loadingContainer = document.querySelector("#loading-container");
  const loader = document.querySelector(".loader-wrapper");
  const loadingName = document.querySelector(".loading-name");
  const headerName = document.querySelector(".name");
  const rect = loader.getBoundingClientRect();
  const headerNameRect = headerName.getBoundingClientRect();

  const introDash = document.querySelector(".intro-dash");
  const introNextDash = document.querySelector(".intro-next-dash");
  const mailToContainer = document.querySelector(".mail-to-container");

  gsap.from(mailToContainer, {
    right: "150px",
    alpha: 0,
    easing: "Elastic",
    delay: 2.3,
    duration: 1,
  });

  gsap.from(headerName, {
    top: "50%",
    duration: 0.5,
    easing: "power1",
  });

  gsap.to(headerName, {
    alpha: 1,
    duration: 0.5,
    easing: "power1",
  });

  gsap.to(headerName, {
    top: `calc(5% - 10px)`,
    left: `calc(5% - 55px)`,
    duration: 1.2,
    delay: 2,
    scale: 0.5,
    easing: "Elastic",
  });

  gsap.from(loader, {
    y: "100px",
    duration: 0.5,
    scale: 0,
    delay: 0.2,
    easing: "power1",
  });

  gsap.to(loader, {
    duration: 0.5,
    alpha: 1,
    delay: 0.2,
    easing: "power1",
  });

  gsap.from(introDash, {
    easing: "Elastic",
    scaleX: 0,
    x: "-20px",
    alpha: 0,
    delay: 3,
    duration: 0.5,
    transformOrigin: "center left",
  });

  gsap.from(introNextDash, {
    easing: "Elastic",
    scaleX: 0,
    x: "-20px",
    alpha: 0,
    delay: 6.3,
    duration: 0.5,
    transformOrigin: "center left",
  });

  gsap.to(loadingName, {
    easing: "power2",
    duration: 0.4,
    delay: 1.8,
    y: -rect.top + headerNameRect.top + headerName.offsetHeight + 10,
    x: -rect.left + headerNameRect.left,
    scale: 0.5,
    alpha: 1,
  });

  gsap.to(loader, {
    easing: "ease",
    duration: 0.4,
    delay: 1.9,
    y: "-10px",
    scale: 0,
    alpha: 0,
    transformOrigin: "top center",
  });

  gsap.to(loadingContainer, {
    height: 0,
    duration: 1,
    easing: "cubic-bezier(0.7,0,0.3,1)",
    delay: 2.2,
    onComplete: () => onComplete(),
  });
});
