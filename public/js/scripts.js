document.addEventListener("DOMContentLoaded", () => {
  // Scroll-based fade-in animation
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.1 };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  loadGoalAndVideos();
});

async function loadGoalAndVideos() {
  const goalText = document.getElementById("goal-text");
  const progressFill = document.getElementById("progress-fill");
  const videoList = document.getElementById("video-list");

  try {
    // Fetch goal data
    const goalRes = await fetch("/api/goal");
    const goal = await goalRes.json();
    const percent = Math.floor((goal.current / goal.target) * 100);

    progressFill.style.width = `${percent}%`;
    progressFill.textContent = percent > 10 ? `${percent}%` : "";
    goalText.textContent = `$${goal.current} raised of $${goal.target} goal`;
  } catch (err) {
    console.error("Failed to load goal:", err);
    goalText.textContent = "Unable to load goal data";
  }

  try {
    // Fetch videos
    const videoRes = await fetch("/api/videos");
    const videos = await videoRes.json();

    videos.forEach((video) => {
      const container = document.createElement("div");
      container.className =
        "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105";

      const frame = document.createElement("iframe");
      frame.src = video.url;
      frame.title = video.title;
      frame.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      frame.allowFullscreen = true;
      frame.className = "w-full h-64 rounded";

      const caption = document.createElement("p");
      caption.className = "mt-2 font-medium";
      caption.textContent = video.description;

      container.appendChild(frame);
      container.appendChild(caption);
      videoList.appendChild(container);
    });
  } catch (err) {
    console.error("Failed to load videos:", err);
  }
}

// Hero image slideshow logic
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll("#hero-slideshow img");
  let current = 0;

  function showNextSlide() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("opacity-100", i === current);
      slide.classList.toggle("opacity-0", i !== current);
    });

    current = (current + 1) % slides.length;
  }

  // Initial state
  slides[0].classList.add("opacity-100");
  setInterval(showNextSlide, 5000); // change every 5 seconds
});

