const addNewComment = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const blogId = document.querySelector('#blog-id').value.trim();
  const comment = document.querySelector('#comment').value.trim();

  if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comment/create', {
      method: 'POST',
      body: JSON.stringify({ blogId, content: comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('response', response);

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/blog/${blogId}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#add-comment-form')
  .addEventListener('submit', addNewComment);
