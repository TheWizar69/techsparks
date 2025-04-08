document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")

      // Change icon based on menu state
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Tabs functionality
  const tabs = document.querySelectorAll(".tab")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabs.length && tabContents.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))

        // Add active class to clicked tab and corresponding content
        tab.classList.add("active")
        const target = tab.getAttribute("data-target")
        document.getElementById(target).classList.add("active")
      })
    })
  }

  // Countdown timer
  const countdownElement = document.getElementById("countdown")
  const countdownSection = countdownElement?.closest('section')

  if (countdownElement && countdownSection) {
    const eventDate = new Date("April 24, 2025 10:00:00").getTime()
    const now = new Date().getTime()

    if (now >= eventDate) {
      // If event has started, remove the countdown section
      countdownSection.remove()
    } else {
      function updateCountdown() {
        const currentTime = new Date().getTime()
        const distance = eventDate - currentTime

        if (distance < 0) {
          countdownSection.remove()
          return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        document.getElementById("days").innerText = days.toString().padStart(2, "0")
        document.getElementById("hours").innerText = hours.toString().padStart(2, "0")
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0")
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0")
      }

      // Update countdown every second
      updateCountdown()
      setInterval(updateCountdown, 1000)
    }
  }

  // Registration form steps
  const registrationForm = document.getElementById("registration-form")
  if (registrationForm) {
    const steps = document.querySelectorAll(".registration-step")
    const stepIndicators = document.querySelectorAll(".step")
    const progressBar = document.querySelector(".step-progress-bar")
    const nextButtons = document.querySelectorAll(".next-step")
    const prevButtons = document.querySelectorAll(".prev-step")
    let currentStep = 0

    // Show initial step
    showStep(currentStep)

    // Next button click
    nextButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
          currentStep++
          showStep(currentStep)
        }
      })
    })

    // Previous button click
    prevButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--
          showStep(currentStep)
        }
      })
    })

    function showStep(stepIndex) {
      // Hide all steps
      steps.forEach((step) => (step.style.display = "none"))

      // Show current step
      steps[stepIndex].style.display = "block"

      // Update step indicators
      stepIndicators.forEach((indicator, index) => {
        if (index <= stepIndex) {
          indicator.classList.add("active")
        } else {
          indicator.classList.remove("active")
        }
      })

      // Update progress bar
      const progress = (stepIndex / (steps.length - 1)) * 100
      progressBar.style.width = `${progress}%`
    }
  }
})

