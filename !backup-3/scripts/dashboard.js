document.addEventListener('DOMContentLoaded', () => {
  // Example: pull user name from sessionStorage or fallback
  const user = sessionStorage.getItem('username') || 'User';
  const userNameEl = document.getElementById('userName');
  if (userNameEl) userNameEl.textContent = user;

  // Dark mode toggle
  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.addEventListener('change', function () {
      document.body.classList.toggle('dark-mode', this.checked);
    });
  }

});
