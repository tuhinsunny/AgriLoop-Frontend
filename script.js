document.querySelector('.registerBtn').addEventListener('click', () => {
    document.querySelector('.registerform').classList.add('toggleActive');
    document.querySelector('.form-box').classList.remove('toggleLogin');
})
document.querySelector('.closePopUp').addEventListener('click', () => {
    document.querySelector('.registerform').classList.remove('toggleActive');
})
document.querySelector('.loginBtn').addEventListener('click', () => {
    document.querySelector('.form-box').classList.add('toggleLogin');
    document.querySelector('.registerform').classList.remove('toggleActive');
})
document.querySelector('.closeLogin').addEventListener('click', () => {
    document.querySelector('.form-box').classList.remove('toggleLogin');
})
document.querySelector('.goToSignIn').addEventListener('click', () => {
    document.querySelector('.form-box').classList.add('toggleLogin');
    document.querySelector('.registerform').classList.remove('toggleActive');
})
document.querySelector('.goToSignUp').addEventListener('click', () => {
    document.querySelector('.registerform').classList.add('toggleActive');
    document.querySelector('.form-box').classList.remove('toggleLogin');
})
