gsap.to(".background", {
    scale: 1.1, 
    duration: 10,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});

document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth - 0.5) * 10;
    let y = (e.clientY / window.innerHeight - 0.5) * 10;
    gsap.to(".background", { x: x, y: y, duration: 0.5 });
});
