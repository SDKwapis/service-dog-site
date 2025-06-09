// public/update.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/goal')
    .then(res => {
      if (!res.ok) throw new Error('Goal fetch failed');
      return res.json();
    })
    .then(({ current, target }) => {
      const percent = Math.min(100, Math.round((current / target) * 100));
      renderProgress(percent);
    })
    .catch(err => {
      console.error(err);
      renderProgress(0);
    });
});

function renderProgress(progress) {
  const bar = document.getElementById('progress-bar');
  const text = document.getElementById('goal-text');
  bar.innerHTML = '';

  for (let i = 1; i <= 10; i++) {
    const block = document.createElement('div');
    block.className = 'h-6 w-6 border rounded transition-all duration-300';
    block.style.backgroundColor = (i <= progress / 10) ? 'red' : 'transparent';
    bar.appendChild(block);
  }

  text.textContent = `Progress: ${progress}%`;
}

