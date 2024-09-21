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

// Odometer 
const createOdometer = (el, value) => {
    const odometer = new Odometer({
        el: el,
        value: 0,
    });
    odometer.update(value);
};

const membersOdometer = document.querySelector('.members-odometer');
createOdometer(membersOdometer, 250);
const wasteOdometer = document.querySelector('.waste-odometer');
createOdometer(wasteOdometer, 20);
const productOdometer = document.querySelector('.products-odometer');
createOdometer(productOdometer, 70);
const educationOdometer = document.querySelector('.education-odometer');
createOdometer(educationOdometer, 100);