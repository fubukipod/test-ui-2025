// Dark Mode Toggle
document.getElementById('darkToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode', this.checked);
});

// Featured Image Switching by Tab
const featuredImage = document.getElementById('featuredImage');
const imageMap = {
  hour: 'assets/placeholder.png',
  week: 'assets/placeholder.png',
  month: 'assets/placeholder.png'
};

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.getAttribute('data-tab');
    featuredImage.src = imageMap[category];
  });
});

// Gallery Pagination
const gallery = document.getElementById('gallery');
const prevBtn = document.querySelector('.pagination button:first-child');
const nextBtn = document.querySelector('.pagination button:last-child');

const allImages = Array.from({ length: 36 }, (_, i) => ({
  title: `Title ${i + 1}`,
  likes: Math.floor(Math.random() * 20) + 1,
  src: 'assets/placeholder.png'
}));

let currentPage = 0;
const itemsPerPage = 12;

function renderGallery() {
  gallery.innerHTML = '';
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = allImages.slice(start, end);

  pageItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'image-card fade';
    card.innerHTML = `
      <img src="${item.src}" alt="${item.title}">
      <div class="card-footer">
        <span>${item.title}</span>
        <span>${item.likes} ❤️</span>
      </div>
    `;
    gallery.appendChild(card);
  });

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = end >= allImages.length;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderGallery();
  }
});

nextBtn.addEventListener('click', () => {
  const maxPage = Math.ceil(allImages.length / itemsPerPage) - 1;
  if (currentPage < maxPage) {
    currentPage++;
    renderGallery();
  }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', renderGallery);
