const userEmail = document.getElementById('user-email')
const emailContent = document.getElementById('email')
const submitButton = document.getElementById('submit-button')
const dismissButton = document.getElementById('dismiss-button')

function emailValidation(email){
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailContent.value.trim()

    if (emailValidation(email)){
      document.getElementById('email-success').style.display = 'flex';
      document.getElementById('container').style.display = 'none';
      userEmail.innerText = email
    } else{
        document.getElementById('email-error').textContent = 'Valid email required';
        document.getElementById('email-error').style.display = 'block';
    }
})

dismissButton.addEventListener('click', () => {
  document.getElementById('email-success').style.display = 'none';
  document.getElementById('container').style.display = 'block';
  location.reload();
})