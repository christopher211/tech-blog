const createNewBlog = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  console.log('request', title, content);

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blog/create', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
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
  .querySelector('#create-blog-form')
  .addEventListener('submit', createNewBlog);
