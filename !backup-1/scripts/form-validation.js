document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  // === Registration ===
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const password = this.password.value.trim();
      const confirm = this.confirm.value.trim();

      if (!name || !email || !password || !confirm) {
        alert("All fields are required.");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }

      if (password !== confirm) {
        alert("Passwords do not match.");
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || {};

      if (users[email]) {
        alert("This email is already registered.");
        return;
      }

      users[email] = { username: name, password };
      localStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('username', name);

      alert("Registration successful!");
      window.location.href = 'profile.html';
    });
  }

  // === Login ===
  if (loginForm) {
    const rememberedEmail = localStorage.getItem('rememberedUser');
    if (rememberedEmail) {
      const emailInput = loginForm.querySelector('input[type="email"]');
      const rememberCheckbox = loginForm.querySelector('#rememberMe');
      if (emailInput) emailInput.value = rememberedEmail;
      if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value.trim();
      const password = this.querySelector('input[type="password"]').value.trim();
      const remember = this.querySelector('#rememberMe')?.checked;

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || {};

      if (!users[email] || users[email].password !== password) {
        alert("Invalid email or password.");
        return;
      }

      sessionStorage.setItem('username', users[email].username);

      if (remember) {
        localStorage.setItem('rememberedUser', email);
      } else {
        localStorage.removeItem('rememberedUser');
      }

      window.location.href = 'profile.html';
    });
  }
});
