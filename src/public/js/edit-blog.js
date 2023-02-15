const editBlog = async (event) => {
  event.preventDefault();

  const blogId = document.querySelector('#blog-id').value.trim();
  const title = document.querySelector('#edit-blog-title').value.trim();
  const content = document.querySelector('#edit-blog-content').value.trim();

  console.log('request', title, content);

  if (title && content) {
    const response = await fetch(`/api/blog/${blogId}/update`, {
      method: 'PUT',
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

document.querySelector('#blog-edit-form').addEventListener('submit', editBlog);
