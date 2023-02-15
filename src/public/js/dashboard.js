const createNewBlog = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  console.log('request', title, content);

  if (title && content) {
    const response = await fetch('/api/blog/create', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('response', response);

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const deleteBlog = async (id) => {
  if (id) {
    const response = await fetch(`/api/blog/${id}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#create-blog-form')
  .addEventListener('submit', createNewBlog);
