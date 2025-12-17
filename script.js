document.addEventListener("DOMContentLoaded", () => {

    // --- Animation Functions ---

    function talk(person, textBox) {
        // Animate head bobbing
        gsap.to(person.querySelector("circle"), {
            y: 3,
            repeat: 5,
            yoyo: true,
            duration: 0.2,
            ease: "power1.inOut"
        });

        // Fade in text
        gsap.to(textBox, {
            opacity: 1,
            duration: 1,
            y: -10
        });
    }

    function hug(personA, personB) {
        const tl = gsap.timeline();

        // Move them closer (overlap slightly for a hug)
        // Boy moves right, Girl moves left
        tl.to(personA, { x: 40, duration: 1.5, ease: "power2.inOut" })
            .to(personB, { x: -40, duration: 1.5, ease: "power2.inOut" }, "<")

            // Boy's Right Arm (wraps around girl)
            .to(personA.querySelector(".arm.right"), {
                attr: { x2: 160, y2: 80 }, // Reach forward/around
                duration: 0.5
            }, "-=0.5")

            // Girl's Left Arm (wraps around boy)
            .to(personB.querySelector(".arm.left"), {
                attr: { x2: 40, y2: 80 }, // Reach forward/around
                duration: 0.5
            }, "<")

            // Optional: Tilt heads slightly towards each other
            .to(personA.querySelector("circle"), { x: 5, rotation: 10, transformOrigin: "center bottom", duration: 0.5 }, "<")
            .to(personB.querySelector("circle"), { x: -5, rotation: -10, transformOrigin: "center bottom", duration: 0.5 }, "<");

        return tl;
    }

    // --- Main Story Timeline ---

    const story = gsap.timeline({ defaults: { ease: "power1.inOut" } });

    // Scene 1: Girl Waiting & Talking
    story.to("#scene1", { opacity: 1, duration: 1 })
        .call(() => talk(
            document.querySelector("#scene1 .person"),
            document.querySelector("#scene1 .speech")
        ))
        .to("#scene1", { opacity: 0, duration: 1, delay: 3 });

    // Scene 2: The Hug
    story.to("#scene2", { opacity: 1, duration: 1 })
        .add(hug(
            document.querySelector("#scene2 .personA"), // Boy
            document.querySelector("#scene2 .personB")  // Girl
        ))
        .to("#scene2", { opacity: 0, duration: 1, delay: 2 });

    // Scene 3: Ending
    story.to("#scene3", { opacity: 1, duration: 1 })
        .from(".final-text", { scale: 0, rotation: -180, duration: 1.5, ease: "elastic.out(1, 0.3)" }, "<");

});
