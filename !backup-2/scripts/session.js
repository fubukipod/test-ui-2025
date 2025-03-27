document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = sessionStorage.getItem('username');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');
  const logoutLink = document.querySelector('.logout-link');
  const userProfile = document.querySelector('.user-profile');
  const userLink = document.getElementById('userLink');
  const userAvatar = document.getElementById('userAvatar');

  if (isLoggedIn) {
    loginLink?.classList.add('hidden');
    registerLink?.classList.add('hidden');
    logoutLink?.classList.remove('hidden');

    if (userProfile) {
      userProfile.classList.remove('hidden');
    }

    if (userLink) userLink.textContent = isLoggedIn;

    
  } else {
    loginLink?.classList.remove('hidden');
    registerLink?.classList.remove('hidden');
    logoutLink?.classList.add('hidden');

    if (userProfile) {
      userProfile.classList.add('hidden');
    }
  }

  logoutLink?.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = 'index.html';
  });
});
