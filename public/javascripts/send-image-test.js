document.getElementById('submit-btn').addEventListener('click', async (e) => {
  e.preventDefault();

  const formData = new FormData();

  const firstnameValue = document.getElementById('firstname').value;
  const profileImage = document.getElementById('profile').files[0];

  formData.append('firstname', firstnameValue);
  formData.append('profile', profileImage);

  const response = await fetch('http://localhost:8000/api/image-test', {
    method: 'POST',
    body: formData
  });

  const responseAsJSon = await response.json();

  console.log(responseAsJSon);
});
