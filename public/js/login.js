const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#loginUsername').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (name && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to Log In');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#createUsername').value.trim();
  const email = document.querySelector('#createEmail').value.trim();
  const password = document.querySelector('#createPassword').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);