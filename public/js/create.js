const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#createUsername').value.trim();
  const email = document.querySelector('#createEmail').value.trim();
  const password = document.querySelector('#createPassword').value.trim();
  const isAgentCheckbox = document.querySelector('#default-checkbox');

  //check if box is clicked
  const isAgent = isAgentCheckbox?.checked || false;
  // if isAgent, direct to agentRoutes, else userRoutes
  try {
    const response = await fetch(isAgent ? '/api/agent' : '/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, isAgent }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {

      document.location.replace('/profile');

    } else {
      console.error('Error', response.status);
      alert(`An error occurred:`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred. Please try again later.');
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

module.exports = isAgent;