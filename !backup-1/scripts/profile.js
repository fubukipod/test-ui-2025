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
    'Your Gallery': '<p>Here are your uploaded images (coming soon).</p>',
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
  uploadBtn?.addEventListener('click', () => {
    alert('Upload action triggered. You can hook this to a form or modal.');
  });
});
