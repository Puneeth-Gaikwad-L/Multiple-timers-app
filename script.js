const timersContainer = document.getElementById("timersContainer");
const form = document.getElementById("form");
const timers = timersContainer.children;


// eventlister to extract the text from the form 
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const secondInput = document.getElementById('second');

    // converting into integer value
    const hour = parseInt(hourInput.value, 10);
    const minute = parseInt(minuteInput.value, 10);
    const second = parseInt(secondInput.value, 10);

    if (hour === 0 && minute === 0 && second === 0) {
        // Display an error message if the input is not valid
        const errors = document.getElementById('errors');
        errors.innerText = 'Invalid input. Please enter valid numbers !';
        errors.style.display = "flex";
    } else {
        createTimer(hour, minute, second);
        clearFormInputs();
    }
});

function clearFormInputs() {
    document.getElementById('hour').value = '00';
    document.getElementById('minute').value = '00';
    document.getElementById('second').value = '00';
}



function createTimer(hour, minute, second) {
    const timerElement = document.createElement('div');
    timerElement.classList.add('StartedTimer');

    const label = document.createElement('p');
    label.textContent = "Time Left:";

    const timeDisplay = document.createElement('div');
    const delButton = document.createElement('button');
    delButton.innerText = "Delete";
    delButton.classList.add("btn");

    timerElement.appendChild(label);
    timerElement.appendChild(timeDisplay);
    timerElement.appendChild(delButton);

    let pTag = document.getElementById("pTag");
    pTag.style.display = "none";
    timersContainer.appendChild(timerElement);

    const timerInterval = setInterval(function () {
        if (hour === 0 && minute === 0 && second === 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up";
            timerElement.classList.add("timesUp");
        } else {
            timeDisplay.textContent = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`;

            if (second === 0) {
                if (minute === 0) {
                    if (hour === 0) {
                        clearInterval(timerInterval);
                    } else {
                        hour--;
                        minute = 59;
                        second = 59;
                    }
                } else {
                    minute--;
                    second = 59;
                }
            } else {
                second--;
            }
        }
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}


function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

