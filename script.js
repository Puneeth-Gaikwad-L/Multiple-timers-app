const timersContainer = document.getElementById("timersContainer"); //container to add all the timers
const form = document.getElementById("form");

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
        let displayDuration = 2;

        // Display the error message immediately before starting the interval
        errors.style.display = "flex";

        let timerInterval = setInterval(function () {
            displayDuration--;

            if (displayDuration === 0) {
                errors.style.display = "none";
                clearInterval(timerInterval);
            }
        }, 1000);
    } else {
        createTimer(hour, minute, second);
        clearFormInputs();
    }
});

function clearFormInputs() {
    // this function resets the timer sets all the values to 0
    document.getElementById('hour').value = '00';
    document.getElementById('minute').value = '00';
    document.getElementById('second').value = '00';
}

function createTimer(hour, minute, second) {
    let pTag = document.getElementById("pTag");
    // creating a new parent element
    const timerElement = document.createElement('div');
    timerElement.classList.add('StartedTimer');
    const label = document.createElement('p');
    label.textContent = "Time Left:";

    const timeDisplay = document.createElement('div');

    // setting up delete button
    const delButton = document.createElement('button');
    delButton.innerText = "Delete";
    // function to delete a timer
    delButton.addEventListener("click", function () {
        timersContainer.removeChild(timerElement);
        console.log(timersContainer.children.length);
        // Check if there are no more timer elements in timersContainer
        if (timersContainer.children.length === 1) {
            console.log(timersContainer.children.length);
            pTag.style.display = "flex";
        }
    });
    delButton.classList.add("btn");

    //adding all the children 
    timerElement.appendChild(label);
    timerElement.appendChild(timeDisplay);
    timerElement.appendChild(delButton);


    pTag.style.display = "none";

    // adding a new timer
    timersContainer.appendChild(timerElement);

    // timer logic using setInterval()
    const timerInterval = setInterval(function () {
        if (hour === 0 && minute === 0 && second === 0) {
            // when timer is complete clear the values
            clearInterval(timerInterval);
            // adding the text
            timerElement.textContent = "Time's up";
            timerElement.classList.add("timesUp");
            let audio = new Audio('./mixkit-alarm-tone-996.wav');
            audio.play();
        } else {
            timeDisplay.textContent = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`;
            if (second === 0) {
                if (minute === 0) {
                    if (hour === 0) {
                        // if I am inside this condition the timer is completed
                        clearInterval(timerInterval);
                    } else {
                        // reduce the hr by 1 value
                        hour--;
                        minute = 59;
                        second = 59;
                    }
                } else {
                    // reduce the minute by 1 value
                    minute--;
                    second = 59;
                }
            } else {
                // reduce the sec by 1 value
                second--;
            }
        }
    }, 1000);  //interval is 1 sec
}

function formatTime(time) {
    // if time value is single digit then append after 0 else keep it as it is
    return time < 10 ? `0${time}` : time;
}