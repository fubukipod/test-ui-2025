document.addEventListener('DOMContentLoaded', () => {
  // Display username
  const user = sessionStorage.getItem('username') || 'User';
  const profileName = document.getElementById('profileName');
  if (profileName) profileName.textContent = user;

  // Dark mode toggle
  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.addEventListener('change', function () {
      document.body.classList.toggle('dark-mode', this.checked);
    });
  }

function renderGallery() {
  const username = sessionStorage.getItem('username');
  const allImages = JSON.parse(localStorage.getItem('userImages') || '{}');
  const images = allImages[username] || [];

  if (!images.length) {
    return '<p>You have not uploaded any images yet.</p>';
  }

  return `
    <div class="gallery-grid">
      ${images.map((img, i) => `
        <div class="image-card">
          <a href="image.html?id=${username}_${i}" class="image-link">
            <img src="${img.image}" alt="${img.title}" />
          </a>
          <div class="card-footer">
            <span>${img.title}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

  // Profile picture preview and save
  const profilePicInput = document.getElementById('profilePic');
  const profilePreview = document.getElementById('profilePreview');
  const uploadForm = document.getElementById('uploadForm');

  // Load saved image
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage && profilePreview) {
    profilePreview.src = savedImage;
    profilePreview.style.display = 'block';
  }

  // Preview selected image
  profilePicInput?.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePreview.src = e.target.result;
        profilePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  // Save profile image to localStorage
  uploadForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (profilePreview.src) {
      localStorage.setItem('profileImage', profilePreview.src);
      alert('Profile updated!');
    }
  });

  // Tabs logic
  const tabs = document.querySelectorAll('.profile-tabs .tab');
  const content = document.querySelector('.profile-content');

  const tabContent = {
    'Your Gallery': renderGallery(),
    'Favourites': '<p>Your favourited artworks will appear here.</p>',
    'Your Comments': '<p>All comments you made or were mentioned in will show here.</p>'
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const label = tab.textContent.trim();
      content.innerHTML = tabContent[label] || '<p>Content not found.</p>';
    });
  });

  // Load default content
  const defaultTab = document.querySelector('.tab.active');
  if (defaultTab) content.innerHTML = tabContent[defaultTab.textContent.trim()];

  // Add upload button listener (global for header)
  const uploadBtn = document.getElementById('uploadImageBtn');
  
});

// === Upload Modal Logic ===
const modal = document.getElementById('uploadModal');
const uploadBtn = document.getElementById('uploadImageBtn');
const cancelBtn = document.getElementById('uploadCancel');
const submitBtn = document.getElementById('uploadSubmit');
const fileInput = document.getElementById('uploadFile');
const preview = document.getElementById('uploadPreview');

uploadBtn?.addEventListener('click', () => {
  modal.classList.add('active');
});

cancelBtn?.addEventListener('click', () => {
  modal.classList.remove('active');
  fileInput.value = '';
  preview.src = '';
});

fileInput?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      preview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

submitBtn?.addEventListener('click', () => {
  const title = document.getElementById('uploadTitle').value.trim();
  const description = document.getElementById('uploadDescription').value.trim();
  const image = preview.src;

  if (!title || !image) {
    alert('Please provide both title and image.');
    return;
  }

  const username = sessionStorage.getItem('username');
  const allImages = JSON.parse(localStorage.getItem('userImages') || '{}');

  if (!allImages[username]) {
    allImages[username] = [];
  }

  allImages[username].push({
    title,
    description,
    image,
    timestamp: Date.now()
  });

  localStorage.setItem('userImages', JSON.stringify(allImages));

  modal.classList.remove('active');
  fileInput.value = '';
  preview.src = '';
  document.getElementById('uploadTitle').value = '';
  document.getElementById('uploadDescription').value = '';
  alert('Image uploaded successfully!');

// Update gallery tab if visible
const activeTab = document.querySelector('.tab.active');
const content = document.querySelector('.profile-content');
if (activeTab?.textContent.trim() === 'Your Gallery') {
  content.innerHTML = renderGallery();
}


});

