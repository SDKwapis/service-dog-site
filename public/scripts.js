document.addEventListener('DOMContentLoaded', () => {
  // Scroll-based fade-in animation
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1 };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  loadGoalAndVideos();
});

async function loadGoalAndVideos() {
  const goalText = document.getElementById('goal-text');
  const progressBar = document.getElementById('progress-bar');
  const videoList = document.getElementById('video-list');

  try {
    // Fetch goal data
    const goalRes = await fetch('/api/goal');
    const goal = await goalRes.json();
    const percent = Math.floor((goal.current / goal.target) * 100);

    progressBar.style.width = `${percent}%`;
    progressBar.textContent = `${percent}%`;
    goalText.textContent = `$${goal.current} raised of $${goal.target} goal`;
  } catch (err) {
    console.error('Failed to load goal:', err);
    goalText.textContent = 'Unable to load goal data';
  }

  try {
    // Fetch videos
    const videoRes = await fetch('/api/videos');
    const videos = await videoRes.json();

    videos.forEach(video => {
      const container = document.createElement('div');
      container.className = 'bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105';

      const frame = document.createElement('iframe');
      frame.src = video.url;
      frame.title = video.title;
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      frame.className = 'w-full h-64 rounded';

      const caption = document.createElement('p');
      caption.className = 'mt-2 font-medium';
      caption.textContent = video.description;

      container.appendChild(frame);
      container.appendChild(caption);
      videoList.appendChild(container);
    });
  } catch (err) {
    console.error('Failed to load videos:', err);
  }
}

// Admin password (change this to whatever you'd like)
const ADMIN_PASSWORD = "connor2025";

// Reveal admin form if password is correct
document.addEventListener('DOMContentLoaded', () => {
  const adminForm = document.getElementById('admin-form');
  const adminMsg = document.getElementById('admin-msg');
  const adminSection = document.getElementById('admin-section');

  if (adminForm) {
    adminForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const amount = parseInt(document.getElementById('amount').value);
      const pass = document.getElementById('admin-pass').value;

      if (pass !== ADMIN_PASSWORD) {
        adminMsg.textContent = "Incorrect password.";
        adminMsg.classList.add("text-red-500");
        return;
      }

      try {
        const res = await fetch('/api/goal/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        });

        if (!res.ok) throw new Error('Request failed');
        adminMsg.textContent = "Donation updated successfully!";
        adminMsg.classList.remove("text-red-500");
        adminMsg.classList.add("text-green-600");

        // Refresh bar
        loadGoalAndVideos();
        adminForm.reset();
      } catch (err) {
        adminMsg.textContent = "Error updating donation.";
        adminMsg.classList.add("text-red-500");
      }
    });
  }
});

