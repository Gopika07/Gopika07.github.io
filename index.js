// Sample data for customer reviews (for demo purpose)
const customerReviews = [
    {
        name: "John Doe",
        image: "images/customer1.jpg",
        review: "I found my dream job within a week of using this platform. Highly recommended!",
    },
    {
        name: "Jane Smith",
        image: "images/customer2.jpg",
        review: "The job application process was smooth and hassle-free. Great experience!",
    },
    {
        name: "Diane Jacob",
        image: "images/customer3.jpg",
        review: "I'm amazed at how quickly I received responses from employers after applying through this website.",
    },
    {
        name: "Justin Farrow",
        image: "images/customer4.jpg",
        review: "Highly recommended for anyone looking to advance their career!",
    },
    // Add more customer reviews as needed
];


let currentReviewIndex = 0;
const carouselContainer = document.querySelector(".carousel-container");

// Function to display the current customer review
function displayCurrentReview() {
    const currentReview = customerReviews[currentReviewIndex];

    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review", "fade-in");

    const imageElement = document.createElement("img");
    imageElement.src = currentReview.image;
    imageElement.alt = currentReview.name;
    imageElement.classList.add("customer-image");

    const customerNameElement = document.createElement("p");
    customerNameElement.classList.add("customer-name");
    customerNameElement.textContent = currentReview.name;

    const reviewTextElement = document.createElement("p");
    reviewTextElement.classList.add("review-text");
    reviewTextElement.textContent = currentReview.review;

    reviewElement.appendChild(imageElement);
    reviewElement.appendChild(customerNameElement);
    reviewElement.appendChild(reviewTextElement);

    carouselContainer.innerHTML = ""; // Clear previous reviews
    carouselContainer.appendChild(reviewElement);

    setTimeout(() => {
        reviewElement.classList.remove("fade-in"); // Remove fade-in class
        setTimeout(() => {
            currentReviewIndex = (currentReviewIndex + 1) % customerReviews.length;
            displayCurrentReview(); // Move to the next review after 4 seconds
        }, 1000); // Stay visible for 1 seconds before moving to the next review
    }, 900); // Stay visible for 900 milliseconds before starting the fade-out
}

// Start displaying the reviews on page load
displayCurrentReview();

// Sample data for features (for demo purpose)
const features = [
    "Access to High-Quality Jobs",
    "Seamless Job Application Process",
    "Expert Career Guidance and Advice",
    "Global Reach for Job Opportunities",
    "Personalized Job Recommendations",
];

// Function to display features in the "Why Use Us?" section
function displayFeatures() {
    const featuresList = document.getElementById("features-list");

    features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
    });
}

// Call the function to display features on page load
displayFeatures();


// JavaScript code for the analytics part with logo animation
const logoAnimationContainer = document.querySelector(".logo-animation");

// Function to animate the logos in the background
function animateLogos() {
  const logos = logoAnimationContainer.querySelectorAll("img");

  // Set initial position for the logos
  logos.forEach((logo, index) => {
    logo.style.left = `${index * 150}px`;
  });

  // Animate the logos to move from right to left in a loop
  function moveLogos() {
    logos.forEach((logo) => {
      const leftPos = parseInt(logo.style.left, 10);
      logo.style.left = `${leftPos - 1}px`;

      // If a logo reaches the left edge, move it to the rightmost position
      if (leftPos <= -150) {
        logo.style.left = `${(logos.length - 1) * 150}px`;
      }
    });

    requestAnimationFrame(moveLogos);
  }

  moveLogos();
}

// Call the function to start the logo animation on page load
animateLogos();
