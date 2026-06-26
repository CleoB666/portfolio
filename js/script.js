// hämtar alla element som har klassen "fade-in"
const fadeElements = document.querySelectorAll(".fade-in");
// kollar att det finns element
if (fadeElements.length > 0) {
    // kör callbacken varje gång ett observerat element ändrar synlighet
    const observer = new IntersectionObserver (
        (entries) => {
            // entries = lista med element som observeras
            entries.forEach(entry => {
                // isIntersecting = true när elementet är synligt i viewport
                if (entry.isIntersecting) {
                    // lägger till klass, används i css för att trigga animation
                    entry.target.classList.add("show");
                }
            });
        },
        // nställningar för observern
        {
            threshold: 0.2
        }
    );
    // observerar varje fade-element
    fadeElements.forEach(el => observer.observe(el));
}
// hämtar element med id "date"
const dateElement = document.getElementById("date");
// säkerhetscheck
if (dateElement) {
    //skapar nytt datum
    const today = new Date();
   // formaterar datum enligt svensk standard
    const formattedDate = today.toLocaleDateString("sv", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    });
    // sätter texten i html
    dateElement.textContent = formattedDate;
}
// hämtar alla länkar som börjar med "#", interna länkar (anchor links)
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
    // lyssnar på click
    link.addEventListener("click", function (e) {
        // hämtar interna länkar, t.ex. "#about"
        const targetId = this.getAttribute("href");
        // hittar element med samma id
        const targetElement = document.querySelector(targetId);
      // om element finns
        if (targetElement) {
            // stoppar standard-beteende
            e.preventDefault();
         // scrollar "smooth" till elementet
            targetElement.scrollIntoView( {
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

   document.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector(".typing");

    if (!el) {
        return;
    }

    const text = `I am a UX/UI Designer with a background in Frontend Development and a strong interest in creating accessible and user-centered digital experiences.

Through academic and collaborative projects I have worked with user research, wireframing, prototyping, usability testing and interface design.

I enjoy transforming complex problems into intuitive solutions and designing products that create real value for users.

Currently I am seeking internship and junior opportunities where I can continue developing my skills while contributing to meaningful digital products.`;

    el.textContent = "";

    let i = 0;

    function type() {
        if (i < text.length) {
            el.textContent += text[i];
            i++;
            setTimeout(type, 20);
        }
    }

    type();
});

if (window.lucide) {
    lucide.createIcons();
}

window.addEventListener("scroll", () => {
    document
        .querySelector(".navbar")
        .classList.toggle(
            "scrolled",
            window.scrollY > 50
        );
});