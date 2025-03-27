  document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;

    const allUsers = JSON.parse(localStorage.getItem('userImages') || '{}');
    let combinedImages = [];

    for (const [username, images] of Object.entries(allUsers)) {
      images.forEach((img, index) => {
        combinedImages.push({ username, index, ...img });
      });
    }

    if (!combinedImages.length) {
      gallery.innerHTML = '<p>No user images found yet.</p>';
      return;
    }

    gallery.innerHTML = combinedImages.map(({ username, index, image, title }) => `
      <div class="image-card">
        <a href="image.html?id=${username}_${index}" class="image-link">
          <img src="${image}" alt="${title}" />
        </a>
        <div class="card-footer">
          <span>${title}</span>
        </div>
      </div>
    `).join('');
  });
