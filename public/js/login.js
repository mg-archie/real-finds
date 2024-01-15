const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#loginEmail').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  // Determine if the user is an agent
  const isAgentCheckbox = document.querySelector('#default-checkbox');
  const isAgent = isAgentCheckbox?.checked || false;

  if (email && password) {
    try {
      // Send a POST request to the appropriate API endpoint based on the user type
      const response = await fetch(isAgent ? '/api/agent/login' : '/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
          document.location.replace('/profile');

      } else {
        const errorMessage = await response.json();
        alert(`Failed to Log In: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred. Please try again later.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
