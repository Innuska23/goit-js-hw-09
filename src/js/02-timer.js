import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const myInput = document.querySelector("#datetime-picker");
let selectedDate;

const handleOnClose = (date) => {
    if (date < new Date(Date.now())) {
        startBtn.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
    } else {
        startBtn.disabled = false;
        selectedDate = date;
    }
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

const renderCountTime = (convertedDate) => {
    const days = document.querySelector('[data-days]');
    const hours = document.querySelector('[data-hours]');
    const minutes = document.querySelector('[data-minutes]');
    const seconds = document.querySelector('[data-seconds]');

    days.innerHTML = convertedDate.days
    hours.innerHTML = convertedDate.hours
    minutes.innerHTML = convertedDate.minutes
    seconds.innerHTML = convertedDate.seconds
}

const startCountTime = () => {
    const timerId = setInterval(() => {
        const deltaMs = selectedDate - new Date(Date.now());
        if (deltaMs <= 0) {
            clearInterval(timerId);
            return;
        }
        const date = convertMs(deltaMs)
        renderCountTime(date)
    }, 1000);
}

startBtn.disabled = true;
startBtn.addEventListener('click', startCountTime);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        handleOnClose(selectedDates[0])
    },
};

flatpickr(myInput, options);

