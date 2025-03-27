document.addEventListener('DOMContentLoaded', () => {
  const imageId = new URLSearchParams(window.location.search).get('id') || 'placeholder';

  const imageData = {
    placeholder: {
      src: 'assets/placeholder.png',
      title: 'Title',
      altTitle: 'Alternative title',
      author: 'Unknown',
      stock: 'Rolling stock',
      exif: 'EXIF info',
      comments: ['Nice shot!', 'Beautiful scenery.'],
      likes: 0
    },
    train1: {
      src: 'assets/train1.jpg',
      title: 'Evening Express',
      altTitle: 'Sunset Journey',
      author: 'Jane D.',
      stock: 'InterCity',
      exif: 'Nikon D750 | ISO 100 | 1/500s',
      comments: ['Love the lighting!', 'Feels nostalgic.'],
      likes: 12
    }
  };

  const data = imageData[imageId];

  // Populate image and data
  document.getElementById('imageElement').src = data.src;
  document.getElementById('title').textContent = data.title;
  document.getElementById('altTitle').textContent = data.altTitle;
  document.getElementById('author').textContent = data.author;
  document.getElementById('stock').textContent = data.stock;
  document.getElementById('exif').textContent = data.exif;
  document.getElementById('likesCount').textContent = `${data.likes}`;

  // Handle actions
  let likes = data.likes;

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
  data.comments.forEach(comment => {
    const div = document.createElement('div');
    div.className = 'comment-tile';
    div.textContent = comment;
    commentSection.appendChild(div);
  });
});

// Dark Mode Toggle
document.getElementById('darkToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode', this.checked);
});

// Comment logic
const commentList = document.getElementById('commentList');
const newCommentText = document.getElementById('newCommentText');
const submitCommentBtn = document.getElementById('submitCommentBtn');

// Load saved comments from localStorage
const savedComments = JSON.parse(localStorage.getItem(`comments_${imageId}`)) || [];
savedComments.forEach(comment => {
  const tile = document.createElement('div');
  tile.className = 'comment-tile';
  tile.textContent = comment;
  commentList.appendChild(tile);
});

// Post new comment
submitCommentBtn?.addEventListener('click', () => {
  const text = newCommentText.value.trim();
  if (!text) return;

  // Append to UI
  const newTile = document.createElement('div');
  newTile.className = 'comment-tile';
  newTile.textContent = text;
  commentList.appendChild(newTile);

  // Save to localStorage
  savedComments.push(text);
  localStorage.setItem(`comments_${imageId}`, JSON.stringify(savedComments));

  // Clear input
  newCommentText.value = '';
});

