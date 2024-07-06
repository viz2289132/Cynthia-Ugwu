// SCROLL TRIGGER CODEPEN JS FILE ....

function locomotiveCodepen() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveCodepen();

var currentdate = new Date();
var datetime = currentdate.getHours() + ":" + currentdate.getMinutes();

const elem = document.querySelector(".left-p");
elem.innerHTML = datetime;

function firstPageAnim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: `-10`,
    opacity: 0,
    ease: Expo.easeInOut,
    duration: 1.5,
  })
    .to(".boundingelem,.boundingelem2,.boundingelem3", {
      y: `0`,
      ease: Expo.easeInOut,
      duration: 1.5,
      stagger: 0.2,
      delay: -1,
    })
    .from("#chhotiHeadings", {
      y: `-10`,
      opacity: 0,
      ease: Expo.easeInOut,
      duration: 1.5,
      delay: -1,
    });
}

firstPageAnim();

function mousePointerDesigning() {
  function mouseCircleChaptaKaro() {
    // define default scale value

    var xScale = 1;
    var yScale = 1;

    var xPrev = 0;
    var yPrev = 0;

    window.addEventListener("mousemove", function (dets) {
      var xDifference = dets.clientX - xPrev;
      var yDifference = dets.clientY - yPrev;

      xScale = gsap.utils.clamp(0.795, 1.225, xDifference);
      yScale = gsap.utils.clamp(0.795, 1.225, yDifference);

      xPrev = dets.clientX;
      yPrev = dets.clientY;

      circleMouseFollower(xScale, yScale);
    });
  }

  mouseCircleChaptaKaro();

  function circleMouseFollower(xScale, yScale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector(
        "#mini-circle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xScale},${yScale})`;
    });
  }

  circleMouseFollower();
}

mousePointerDesigning();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diff = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      display: `none`,
      ease: Power3,
      duration:.5
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var difference = dets.clientY - elem.getBoundingClientRect().top;
    diff = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      display: `block`,
      ease: Power3,
      top: difference,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diff),
    });
  });
});
