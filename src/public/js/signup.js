const signupFormSubmission = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#signup-name').value.trim();
  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (name && username && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ name, username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('response', response);

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormSubmission);
