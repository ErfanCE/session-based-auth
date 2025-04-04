console.log(document.getElementById('login-btn'));

document.getElementById('login-btn').addEventListener('click', async (e) => {
  try {
    e.preventDefault();

    const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };

    const responseObject = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!responseObject.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const response = await responseObject.json();

    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
