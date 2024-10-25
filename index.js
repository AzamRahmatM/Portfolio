const imagesToPreload=["assets/img/bg.png","assets/img/big_cricle.png","assets/img/Group_1.png","assets/img/cricle_blur.png","assets/img/podium.png","assets/img/luxury.png","assets/img/cursor.png","assets/img/arrow_leftpng.svg","assets/img/arrow_right.svg"],lazyLoadImages=["assets/img/gift/bg.png","assets/img/gift/big cricle.png","assets/img/gift/Group 1.png","assets/img/gift/Group 7.png","assets/img/bags/bg.png","assets/img/bags/big cricle.png","assets/img/bags/Group 1.png","assets/img/bags/cricle blur.png","assets/img/bags/Group 7.png","assets/img/uniforms/bg.png","assets/img/uniforms/big cricle.png","assets/img/uniforms/Group 1.png","assets/img/uniforms/cricle blur.png","assets/img/uniforms/Group 7.png","assets/img/events/big cricle.png","assets/img/events/bg.png","assets/img/events/Group 1.png","assets/img/events/cricle blur.png","assets/img/events/Group 6.png","assets/img/events/Group 7.png"];function loadImageWithRetry(e,t=3,i=1e3){return new Promise((r,s)=>{let n=0;!function a(){let o=new Image;o.onload=r,o.onerror=r=>{++n>=t?s(Error(`Failed to load image after ${t} attempts: ${e}`)):(console.warn(`Retrying to load image (${n}/${t}): ${e}`),setTimeout(a,i))},o.src=e}()})}function preloadImages(e){return Promise.all(e.map(e=>loadImageWithRetry(e)))}function lazyLoad(e,t){e.forEach(e=>{if(e.isIntersecting){let i=e.target,r=i.getAttribute("data-src");r&&(i.src=r,i.removeAttribute("data-src"),t.unobserve(i))}})}function setupLazyLoading(){let e=document.querySelectorAll(".sliderc-inner-circle, .sliderc-inner-door, .sliderc-pedestal img, .sliderc-award img, .sliderc-giftbox img, .sliderc-bag img, .sliderc-uniform img, .sliderc-events img"),t=new IntersectionObserver((e,t)=>{e.forEach(e=>{if(e.isIntersecting){let i=e.target;i.dataset.src&&(i.src=i.dataset.src,i.removeAttribute("data-src")),t.unobserve(i)}})},{root:null,rootMargin:"0px",threshold:.1});e.forEach(e=>{e.dataset.src&&t.observe(e)})}function createLoadingOverlay(){let e=document.createElement("div");return e.className="sliderc-loading-overlay",e.textContent="Loading...",document.body.appendChild(e),e}const items=[...document.querySelectorAll(".sliderc-slider .sliderc-list .sliderc-item")];console.log("Initial slide order:"),items.forEach((e,t)=>{let i=e.querySelector(".sliderc-content h2").textContent;console.log(`${t+1}: ${i}`)});const prevBtn=document.getElementById("prev"),nextBtn=document.getElementById("next"),totalItems=items.length;let active=0,isFirstCycle=!0;const navigate=e=>{items[active].classList.remove("sliderc-active"),items[active=(active+e+totalItems)%totalItems].classList.add("sliderc-active"),updateRotations(),0===active&&(isFirstCycle=!1),"hidden"!==document.querySelector(".sliderc-slider").style.visibility&&updateRotations()},updateRotations=()=>{items.forEach((e,t)=>{let i=e.querySelector(".sliderc-pedestal-container"),r=gsap.getProperty(i,"rotation")||0,s=t<active?90:t>active?-90:0,n=45>Math.abs(s),a=0!==r&&0===s,o=a?1:.3;gsap.to(i,{rotation:s,opacity:n?1:0,duration:isFirstCycle?.9:o,ease:isFirstCycle?"none":"power2.inOut",force3D:!0,overwrite:"auto"})})},memoize=e=>{let t=new Map;return function(...i){let r=JSON.stringify(i);if(t.has(r))return t.get(r);let s=e.apply(this,i);return t.set(r,s),s}},setDiameter=memoize(()=>{let e=document.querySelector(".sliderc-slider");if(e){let t=Math.hypot(e.offsetWidth,e.offsetHeight);document.documentElement.style.setProperty("--diameter",`${t}px`)}}),debounce=(e,t)=>{let i;return function r(...s){clearTimeout(i),i=setTimeout(()=>e(...s),t)}};function createCircularText(e,t,i,r=75){let s=document.createElement("div");s.style.cssText="position:relative;width:100%;height:100%;animation:rotate 20s linear infinite";let n=document.createDocumentFragment(),a=360/t.length;t.split("").forEach((e,t)=>{let i=document.createElement("span");i.textContent=e,i.style.cssText=`position:absolute;left:50%;transform-origin:0 ${r}px;transform:rotate(${a*t}deg)`,n.appendChild(i)}),s.appendChild(n);let o=document.createElement("div");o.className="sliderc-icon-container";let l=new Image;l.src=i,l.alt="Icon",o.appendChild(l),e.innerHTML="",e.appendChild(s),e.appendChild(o)}function addEventListeners(){nextBtn.addEventListener("click",()=>navigate(1)),prevBtn.addEventListener("click",()=>navigate(-1)),document.addEventListener("keydown",e=>["ArrowRight","ArrowLeft"].includes(e.key)&&navigate("ArrowRight"===e.key?1:-1)),window.addEventListener("resize",debounce(setDiameter,250))}function initializeCircularTexts(){let e=document.querySelectorAll(".sliderc-circular-text"),t=[{text:"CLICK THE TROPHY • CLICK THE TROPHY • ",iconSrc:"assets/img/luxury_icon.png"},{text:"CLICK THE BAG • CLICK THE BAG • ",iconSrc:"assets/img/bags/bag-icon.png"},{text:"CLICK THE GIFT • CLICK THE GIFT • ",iconSrc:"assets/img/gift/gift-icon.png"},{text:"CLICK THE UNIFORM • CLICK THE UNIFORM • ",iconSrc:"assets/img/uniforms/uniform-icon.png"},{text:"CLICK THE BOOTH • CLICK THE BOOTH • ",iconSrc:"assets/img/events/event-icon.png"}];e.forEach((e,i)=>{let r=t[i]||{text:"CLICK HERE • CLICK HERE • ",iconSrc:""};createCircularText(e,r.text,r.iconSrc,75)})}function initializeProductInteraction(e){let t=e.querySelector(".sliderc-award, .sliderc-giftbox, .sliderc-bag, .sliderc-uniform, .sliderc-events");t&&(t.style.cursor="pointer",t.addEventListener("click",t=>{t.stopPropagation(),e.classList.contains("sliderc-active")&&revealProductInfo(e)}))}function revealProductInfo(e){let t=e.querySelector(".sliderc-award, .sliderc-giftbox, .sliderc-bag, .sliderc-uniform, .sliderc-events"),i=e.querySelector(".sliderc-product-info");if(gsap.isTweening(t)||gsap.isTweening(i))return;if(i.classList.contains("sliderc-active")){closeProductInfo(e);return}let r=gsap.timeline();r.to(t,{y:"-=50",duration:.5,ease:"power2.out",force3D:!0}),gsap.set(i,{y:"20",opacity:0,display:"block"}),r.to(i,{y:"0",opacity:1,duration:.5,ease:"power2.out",onStart:()=>i.classList.add("sliderc-active"),force3D:!0},"-=0.25");let s=r=>{r.target===i||i.contains(r.target)||(closeProductInfo(e),t.removeEventListener("click",s))};t.addEventListener("click",s);let n=i.querySelector(".sliderc-close-button");n.addEventListener("click",t=>{t.stopPropagation(),closeProductInfo(e)})}function closeProductInfo(e){let t=e.querySelector(".sliderc-award, .sliderc-giftbox, .sliderc-bag, .sliderc-uniform, .sliderc-events"),i=e.querySelector(".sliderc-product-info");if(gsap.isTweening(t)||gsap.isTweening(i))return;let r=gsap.timeline();r.to(i,{y:"20",opacity:0,duration:.4,ease:"power2.in",onComplete(){i.style.display="none",i.classList.remove("sliderc-active")},force3D:!0}),r.to(t,{y:"0",duration:.5,ease:"power2.in",force3D:!0},"-=0.3"),t.style.cursor="pointer"}function preInitializeAnimations(){items.forEach((e,t)=>{let i=e.querySelector(".sliderc-pedestal-container"),r=t<active?90:t>active?-90:0;gsap.set(i,{rotation:r,force3D:!0})})}function init(){let e=createLoadingOverlay();Promise.all([preloadImages(imagesToPreload),new Promise(e=>{"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()})]).then(()=>{document.body.classList.add("images-loaded"),setDiameter(),preInitializeAnimations(),initializeCircularTexts(),items.forEach(initializeProductInteraction),items[0].classList.add("sliderc-active"),gsap.to(items[0],{opacity:1,duration:.5,force3D:!0}),e.remove(),document.querySelector(".sliderc-slider").style.visibility="visible",addEventListeners(),updateRotations(),setupLazyLoading()}).catch(t=>{console.error("Error during initialization:",t),e.remove()}),document.querySelector(".sliderc-slider").style.visibility="hidden"}init(),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{console.log("Service Worker registered with scope:",e.scope)}).catch(e=>{console.error("Service Worker registration failed:",e)})}),window.addEventListener("load",function(){init();let e=0,t=items.length;function i(){if(e<2*t){let r=e%t;items[active].classList.remove("sliderc-active"),items[active=r].classList.add("sliderc-active"),updateRotations(),e++,setTimeout(i,300)}else{let s=document.getElementById("preloader");s.style.opacity="0",s.style.transition="opacity 0.5s ease",setTimeout(()=>{s.style.display="none"},500),items[active].classList.remove("sliderc-active"),items[active=0].classList.add("sliderc-active"),updateRotations()}}setTimeout(i,1e3)}),gsap.registerPlugin(ScrollTrigger);const tl=gsap.timeline({scrollTrigger:{trigger:".curtain-container",start:"top top",end:"bottom bottom",scrub:1,pin:!0}});tl.to(".curtain-left",{x:"-100%",ease:"power2.inOut"},0).to(".curtain-right",{x:"100%",ease:"power2.inOut"},0).to(".center-text",{opacity:0,y:-50,ease:"power2.inOut"},0).to(".scroll-indicator",{opacity:0,y:50,ease:"power2.inOut"},0).to(".image-container",{opacity:1,ease:"power2.inOut"},.5);const glitterText=document.querySelector(".center-text h1");function glitter(){let e=document.querySelectorAll(".center-text h1 .letter"),t=gsap.timeline();return t.to(e,{opacity:.5,duration:.2,stagger:{amount:.5,from:"random"}}).to(e,{opacity:1,duration:.2,stagger:{amount:.5,from:"random"}}),t}glitterText.innerHTML=glitterText.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),gsap.set(".letter",{display:"inline-block"}),gsap.fromTo(".letter",{opacity:0,y:50},{opacity:1,y:0,duration:.1,stagger:.05,ease:"back.out(1.7)"});let mainTimeline;function startGlitter(){mainTimeline&&mainTimeline.kill(),mainTimeline=gsap.timeline({repeat:-1});for(let e=0;e<5;e++)mainTimeline.add(glitter(),2*e)}document.addEventListener("visibilitychange",function(){"visible"===document.visibilityState?startGlitter():mainTimeline&&mainTimeline.pause()});let glitterInterval;function startGlitter(){glitterInterval=setInterval(glitter,2e3)}function stopGlitter(){clearInterval(glitterInterval)}function initStatsAnimation(){let e=document.querySelector(".stats-display-x8f2 .cards-container"),t=gsap.utils.toArray(".stats-display-x8f2 .card"),i=gsap.timeline({scrollTrigger:{trigger:e,pin:!0,pinSpacing:!0,start:"top top",end:"+=300%",scrub:1,onRefresh(e){0===e.progress&&-1===e.direction&&(i.progress(0).pause(),gsap.set(t,{clearProps:"all"}),gsap.set([t[1],t[2]],{xPercent:75,opacity:0}))}}});i.addLabel("card1"),i.to(t[0],{xPercent:0,opacity:1}),i.from(t[1],{xPercent:75,opacity:0}),i.addLabel("card2"),i.to(t[0],{scale:.95,xPercent:-.5,opacity:.5},"-=0.3"),i.to(t[1],{xPercent:0,opacity:1}),i.from(t[2],{xPercent:75,opacity:0}),i.addLabel("card3"),i.to(t[1],{scale:.98,xPercent:-.4,opacity:.6},"-=0.3"),i.to(t[2],{xPercent:0,opacity:1})}function refreshScrollTrigger(){ScrollTrigger.refresh()}startGlitter(),document.addEventListener("visibilitychange",function(){"visible"===document.visibilityState?startGlitter():stopGlitter()}),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector("header"),t=document.querySelector(".progress-bar");document.getElementById("header-logo"),window.addEventListener("scroll",()=>{let i=window.pageYOffset||document.documentElement.scrollTop;i>50?e.classList.add("scrolled"):e.classList.remove("scrolled");let r=document.documentElement.scrollHeight-document.documentElement.clientHeight,s=i/r*100;t.style.width=`${s}%`})}),gsap.registerPlugin(ScrollTrigger),document.addEventListener("DOMContentLoaded",initStatsAnimation),window.addEventListener("load",refreshScrollTrigger),window.addEventListener("resize",refreshScrollTrigger);const observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?e.target.classList.add("show"):e.target.classList.remove("show")})}),hiddenElements=document.querySelectorAll(".hidden");function activateBrand(e){["bag","gifts","luxurys","events","uniforms"].forEach(t=>{let i=document.getElementById(t);t===e?i.classList.add("active"):i.classList.remove("active")})}hiddenElements.forEach(e=>observer.observe(e)),document.addEventListener("DOMContentLoaded",()=>{let e=["bag","gifts","luxurys","events","uniforms"];e.forEach(e=>{let t=document.getElementById(e);t.addEventListener("mouseenter",()=>activateBrand(e))}),setTimeout(()=>{activateBrand("bag")},100)}),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("ai-assistant-icon"),t=0,i=.5;function r(){((t+=i)>10||t<0)&&(i*=-1),e.style.transform=`translateY(${-t}px)`,requestAnimationFrame(r)}r(),e.addEventListener("click",()=>{console.log("AI assistant clicked")}),e.addEventListener("mouseover",()=>{e.style.transform="scale(1.1)"}),e.addEventListener("mouseout",()=>{e.style.transform="scale(1)"})}),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("ca_col1"),t=document.getElementById("ca_col2"),i=document.getElementById("ca_col3");function r(e){let t=document.createElement("img");return t.src=`assets/ourclients/${e}.png`,t.alt=`Client Logo ${e}`,t.loading="lazy",t}function s(e,t,i){let s=document.createElement("div");s.className="ca_pingpong";for(let n=t;n<=i;n++)s.appendChild(r(n));for(let a=t;a<=i;a++)s.appendChild(r(a).cloneNode(!0));e.appendChild(s)}s(e,1,5),s(t,5,10),s(i,10,16)});