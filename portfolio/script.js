document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle Functionality
  const themeToggle = document.querySelector(".theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use the system preference
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", function () {
    const theme =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });

  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
      navLinks.classList.remove("active");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu after clicking a link
        navLinks.classList.remove("active");
      }
    });
  });

  // CTA Button
  const ctaButton = document.getElementById("cta");
  ctaButton.addEventListener("click", function () {
    const projectsSection = document.getElementById("projects");
    window.scrollTo({
      top: projectsSection.offsetTop - 70,
      behavior: "smooth",
    });
  });

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }

    // Check for elements to animate on scroll
    animateOnScroll();
  });

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".timeline-item, .project-card, .blog-card, .fade-in"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 50) {
        element.classList.add("visible");
      }
    });
  }

  // Initialize animations on page load
  setTimeout(animateOnScroll, 200);

  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress");

  function animateProgressBars() {
    progressBars.forEach((progress) => {
      const width = progress.getAttribute("data-width");
      progress.style.width = width + "%";
    });
  }

  // Initialize progress bars animation
  setTimeout(animateProgressBars, 500);

  // Close modal when clicking outside of modal content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("ioWPrEKJg");
  const formStatus = document.querySelector(".form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic form validation
      let isValid = true;
      const formElements = contactForm.elements;

      for (let i = 0; i < formElements.length; i++) {
        if (
          formElements[i].type !== "submit" &&
          formElements[i].value.trim() === ""
        ) {
          formElements[i].classList.add("error");
          isValid = false;
        } else {
          formElements[i].classList.remove("error");
        }
      }

      if (!isValid) {
        formStatus.textContent = "Please fill out all fields.";
        formStatus.className = "form-status error";
        formStatus.style.display = "block";
        return;
      }

      // Simulate form submission
      const formData = new FormData(contactForm);
      const formDataObj = {};

      for (const [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }

      // Success message (in a real scenario, this would be after an AJAX call)
      formStatus.textContent =
        "Thank you! Your message has been sent successfully.";
      formStatus.className = "form-status success";
      formStatus.style.display = "block";

      // Reset form
      contactForm.reset();

      // Hide status message after 3 seconds
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 3000);
    });
  }

  // Typewriter Effect for Home Section
  const typewriterElement = document.querySelector(".typewriter h1");
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = "";

    let i = 0;
    const typeSpeed = 100; // milliseconds

    function type() {
      if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, typeSpeed);
      }
    }

    setTimeout(type, 1000);
  }
});
