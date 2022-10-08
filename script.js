
function scrollLoco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function slideClipPath(){
    document.querySelectorAll(".slide").forEach(function(elem){
        elem.addEventListener("mousemove",function(dets){
            var dim = elem.getBoundingClientRect()
            this.children[1].style.clipPath=` circle(15% at ${dets.clientX-dim.left}px ${dets.clientY-dim.top}px )` 
        })
    
        elem.addEventListener("mouseleave",function(dets){
            var dim = elem.getBoundingClientRect()
            this.children[1].style.clipPath=` circle(0% at ${dets.clientX-dim.left}px ${dets.clientY-dim.top}px )` 
            })
        })
}
function slideSkewer(){
        var dim =document.querySelector(".slide") .getBoundingClientRect();
        prev = dim.left;
        document.querySelector(".slider").addEventListener("scroll",function(){
            var dim2 = document.querySelector(".slide") .getBoundingClientRect();
            var diff = prev - dim2.left;
            document.querySelectorAll(".slide").forEach(function(elem){
                elem.style.transform = `skewX(${diff*.2}deg)`;
            })
            prev = dim2.left;
        })
   
}



function gsapAnim(){
    var tl = gsap.timeline();
    tl.from("#page1 #circle,#page1>img",{
        opacity:0,
        duration:0.8,
        stagger:0.7
    })
    .from("#top-left h2,#top-left h3,#top-left h3,#top-left h3",{
        opacity:0,
        x:-100,
        duration:1,
        stagger:0.2
    },"-=1 ")
    .from("#top-right h3,#top-right #plus",{
        opacity:0,
        x:100,
        duration:1,
        stagger:0.2
    },"-=1 ")
    .from("#btm-left h1,#btm-left h3",{
        opacity:0,
        y:-100,
        duration:1,
        stagger:0.2
    },"-=1 ")
    .from("#btm-right h3,#btm-right #arrow",{
        opacity:0,
        y:100,
        duration:1,
        stagger:0.2
    },"-=1 ") 
    gsap.from("#projects-top>h1,#projects-top>p,.slider",{
        scrollTrigger:{
            trigger:"#projects-top>h1,#projects-top>p,.slider",
            scroller:"#main",
            start:"top 80%",
            end:"top 30%",
            // markers:true,
            scrub:2
        },
        opacity:0,
        y:100,
        duration:0.5,
        stagger:0.3
    })
    gsap.from("#page3-left>h1,#page3-left>p",{
        scrollTrigger:{
            trigger:"#page3-left>h1,#page3-left>p",
            scroller:"#main",
            start:"top 80%",
            end:"top 30%",
            // markers:true,
            scrub:2
        },
        opacity:0,
        y:100,
        duration:0.5,
        stagger:0.3
    })
    gsap.from("#page3-right img,#page3-right h1",{
        scrollTrigger:{
            trigger:"#page3-right img,#page3-right h1",
            scroller:"#main",
            start:"top 80%",
            end:"top 30%",
            // markers:true,
            scrub:2
        },
        opacity:0,
        y:100,
        duration:0.5,
        stagger:0.3
    })
    gsap.from("#page4-left>h2,#page4-left a",{
        scrollTrigger:{
            trigger:"#page4-left>h2,#page4-left a",
            scroller:"#main",
            start:"top 80%",
            end:"top 30%",
        // markers:true,
            scrub:2
        },
        opacity:0,
        y:100,
        duration:0.5,
        // stagger:0.3
    })
    gsap.from("#page4-right img",{
        scrollTrigger:{
            trigger:"#page4-right img",
            scroller:"#main",
            start:"top 80%",
            end:"top 50%",
            // markers:true,
            scrub:2
        },
        scale:0,
        opacity:0,
        duration:0.7,
    })
}

scrollLoco();
gsapAnim();
slideSkewer();
slideClipPath();
