document.addEventListener("DOMContentLoaded", () => {
  const heroContainer = document.getElementById("heroProfileContainer");
  const heroImage = document.getElementById("profileImage");
  const navbarImageWrapper = document.getElementById("navbarProfileWrapper");
  let hasAnimated = false;

  const siteLogo = document.getElementById("siteLogo");
  if (siteLogo) {
    siteLogo.addEventListener("click", () => {
      window.location.reload();
    });
  }

  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close-btn");

  if (burger && sidebar) {
    burger.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("active");
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
      });
    }

    document.addEventListener("click", (e) => {
      const clickedInsideSidebar = sidebar.contains(e.target);
      const clickedBurger = burger.contains(e.target);
      if (!clickedInsideSidebar && !clickedBurger) {
        sidebar.classList.remove("active");
      }
    });
  }

  // ✅ Profile image scroll animation — desktop only
  const animateProfileTransition = (fromEl, toEl, onEnd) => {
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const clone = fromEl.cloneNode(true);
    clone.classList.add("clone-img");

    document.body.appendChild(clone);

    clone.style.top = `${fromRect.top}px`;
    clone.style.left = `${fromRect.left}px`;
    clone.style.width = `${fromRect.width}px`;
    clone.style.height = `${fromRect.height}px`;

    clone.getBoundingClientRect(); // force reflow

    clone.style.top = `${toRect.top}px`;
    clone.style.left = `${toRect.left}px`;
    clone.style.width = `${toRect.width}px`;
    clone.style.height = `${toRect.height}px`;

    setTimeout(() => {
      clone.remove();
      onEnd();
    }, 800);
  };

  window.addEventListener("scroll", () => {
    // 👇 Run animation only if screen width >= 768px (desktop)
    if (window.innerWidth < 768) return;

    const scrolledDown = window.scrollY > 50;
    const atTop = window.scrollY === 0;

    if (scrolledDown && !hasAnimated) {
      hasAnimated = true;
      animateProfileTransition(heroContainer, navbarImageWrapper, () => {
        navbarImageWrapper.classList.add("visible");
        heroContainer.style.visibility = "hidden";
      });
    } else if (atTop && hasAnimated) {
      hasAnimated = false;
      animateProfileTransition(navbarImageWrapper, heroContainer, () => {
        navbarImageWrapper.classList.remove("visible");
        heroContainer.style.visibility = "visible";
      });
    }
  });

  // ✅ Contact Form — EmailJS Integration
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // stop page reload on form submit

      // ⚙️ Replace with your actual EmailJS credentials
      const serviceID = "service_t8t718h";
      const templateID = "template_ejiixei";
      const publicKey = "w-DY1T4UQlHKiLTwb";

      // Initialize EmailJS
      emailjs.init(publicKey);

      // Send the form data
      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          alert("✅ Message sent successfully! I'll get back to you soon.");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("❌ EmailJS Error:", error);
          alert("❌ Failed to send message. Please try again later.");
        });
    });
  }
});
