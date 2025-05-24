let progress = 20; // 0 to 100 in 10% steps

function renderProgress() {
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

function incrementProgress() {
  if (progress < 100) {
    progress += 10;
    renderProgress();
  }
}

document.addEventListener('DOMContentLoaded', renderProgress);
