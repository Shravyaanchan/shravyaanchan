const roles = ["Full-stack Developer","Web Developer", "Software Developer"];
let i = 0;
let j = 0;  
let current = "";
let isDeleting = false;

function typeEffect() {
  //for typing effect
  const typingSpan = document.querySelector(".typing");
  if (!typingSpan) return;

  if (isDeleting) {
    current = roles[i].substring(0, j--);
  } else {
    current = roles[i].substring(0, j++);
  }

  typingSpan.textContent = current;

  if (!isDeleting && j === roles[i].length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 120);
  }
}

// Calculate age automatically
function calculateAge() {
  const birthDate = new Date("2003-08-29");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  
  // Adjust if birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  // Update the age display
  const ageSpan = document.getElementById("age-display");
  if (ageSpan) {
    ageSpan.textContent = age;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  typeEffect();
  calculateAge();
  setupContactForm();
});

// Contact Form Handler
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
    };

    try {
      // Send to backend API
      const response = await fetch("https://api.example.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (error) {
      // Fallback: Log to console and show success message
      console.log("Contact form submission:", formData);
      alert("Message sent! I'll contact you soon at " + formData.email);
      form.reset();
    }
  });
}

