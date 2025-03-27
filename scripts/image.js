document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const imageId = params.get('id') || 'placeholder';
  const [username, index] = imageId.split('_');

  const allImages = JSON.parse(localStorage.getItem('userImages') || '{}');
  const data = allImages[username]?.[index];

  const fallback = {
    image: 'assets/placeholder.png',
    title: 'Title',
    altTitle: 'Alternative title',
    author: 'Unknown',
    stock: 'Rolling stock',
    exif: 'EXIF info',
    comments: ['Nice shot!', 'Beautiful scenery.'],
    likes: 0
  };

  const imageData = data || fallback;

  // Display logged-in user greeting if available
  const sessionUser = sessionStorage.getItem('username');
  const greeting = document.querySelector('.user-greeting');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');
  const logoutLink = document.querySelector('.logout-link');

  if (sessionUser) {
    if (greeting) {
      greeting.classList.remove('hidden');
      greeting.innerHTML = `Welcome, <a href="profile.html" id="userLink">${sessionUser}</a>`;
    }
    loginLink?.classList.add('hidden');
    registerLink?.classList.add('hidden');
    logoutLink?.classList.remove('hidden');

    logoutLink?.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  }

  // Populate image and data
  const imageElement = document.getElementById('imageElement');
  const imagePreview = document.querySelector('.image-preview');

  imageElement.src = imageData.image;
  document.getElementById('title').textContent = imageData.title;
  document.getElementById('altTitle').textContent = imageData.altTitle;
  document.getElementById('author').textContent = username || imageData.author;
  document.getElementById('stock').textContent = imageData.stock;
  document.getElementById('exif').textContent = imageData.exif;
  document.getElementById('likesCount').textContent = `${imageData.likes}`;

  // Fullscreen on click with actual size support
  imageElement.addEventListener('click', () => {
    imagePreview.classList.add('fullscreen-active');
    if (imagePreview.requestFullscreen) {
      imagePreview.requestFullscreen();
    } else if (imagePreview.webkitRequestFullscreen) {
      imagePreview.webkitRequestFullscreen();
    } else if (imagePreview.msRequestFullscreen) {
      imagePreview.msRequestFullscreen();
    }
  });

  // Exit fullscreen and remove class
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.fullscreenElement) {
      document.exitFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      imagePreview.classList.remove('fullscreen-active');
    }
  });

  // Handle actions
  let likes = imageData.likes;

  document.getElementById('likeBtn').addEventListener('click', () => {
    likes++;
    document.getElementById('likesCount').textContent = `${likes}`;
  });

  document.getElementById('dislikeBtn').addEventListener('click', () => {
    if (likes > 0) likes--;
    document.getElementById('likesCount').textContent = `${likes}`;
  });

  document.getElementById('favBtn').addEventListener('click', () => {
    alert('Image added to favorites!');
  });

  document.getElementById('shareBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Image link copied!');
    });
  });

  // Load comments
  const commentSection = document.getElementById('comments');
  (imageData.comments || []).forEach(comment => {
    const div = document.createElement('div');
    div.className = 'comment-tile';
    div.textContent = comment;
    commentSection.appendChild(div);
  });

  // Load saved comments from localStorage
  const commentList = document.getElementById('commentList');
  const newCommentText = document.getElementById('newCommentText');
  const submitCommentBtn = document.getElementById('submitCommentBtn');
  const savedComments = JSON.parse(localStorage.getItem(`comments_${imageId}`)) || [];

  savedComments.forEach(comment => {
    const tile = document.createElement('div');
    tile.className = 'comment-tile';
    tile.textContent = comment;
    commentList.appendChild(tile);
  });

  submitCommentBtn?.addEventListener('click', () => {
    const text = newCommentText.value.trim();
    if (!text) return;

    const newTile = document.createElement('div');
    newTile.className = 'comment-tile';
    newTile.textContent = text;
    commentList.appendChild(newTile);

    savedComments.push(text);
    localStorage.setItem(`comments_${imageId}`, JSON.stringify(savedComments));

    newCommentText.value = '';
  });

  // Dark Mode Toggle
  const toggle = document.getElementById('darkToggle');
  toggle?.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
  });
});
