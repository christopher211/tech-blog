const login = async (event) => {
  event.preventDefault();

  document.location.replace('/account/login');
};

const signup = async (event) => {
  event.preventDefault();

  document.location.replace('/account/signup');
};

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// check if the element exists before adding the event listener
if (
  document.querySelector('#login-button') &&
  document.querySelector('#signup-button')
) {
  document.querySelector('#login-button').addEventListener('click', login);
  document.querySelector('#signup-button').addEventListener('click', signup);
}

document.querySelector('#logout-button').addEventListener('click', logout);
