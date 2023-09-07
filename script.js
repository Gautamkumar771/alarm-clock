const clock = document.getElementById("clock");
const alarmList = document.getElementById("alarmList");
let alarms = [];

function getTime() {
  const now = new Date(); // This creates a new Date object, representing the current date and time.
  const hours = now.getHours();   //This extracts the current hour from the now Date object.
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

   // This line checks if the hours is greater than or equal to 12. If it is, it sets the ampm variable to "PM,"
  //  otherwise, it sets it to "AM," 
  const ampm = hours >= 12 ? "PM" : "AM";   
  const timeString = `${padZero( hours % 12 || 12)}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;  // padZero() to ensure 01 instead of 1
  return timeString;
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

function updateClock() {
  clock.textContent = getTime();
}

function setAlarm() {
  const hourInput = document.getElementById("hour");
  const minuteInput = document.getElementById("minute");
  const secondInput = document.getElementById("second");
  const ampmSelect = document.getElementById("ampm");

  const hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const second = parseInt(secondInput.value);
  const ampm = ampmSelect.value;

  if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
    alert("Please enter valid values for hour, minute, and second.");
    return;
  }

  const alarmTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)} ${ampm}`;
  alarms.push(alarmTime);

  hourInput.value = "";
  minuteInput.value = "";
  secondInput.value = "";

  updateAlarmList();
}
  // to delete the alarms array index is the position of alarms array
function deleteAlarm(index) {
  alarms.splice(index, 1);
  updateAlarmList(); 
}

function updateAlarmList() {
  // Clear the existing content of the alarmList element.
  alarmList.innerHTML = "";

  // Loop through each alarm in the alarms array.
  for (let i = 0; i < alarms.length; i++) {
    const alarmTime = alarms[i]; // Get the current alarm object.

    // Create a new div element to represent the alarm.
    const alarmItem = document.createElement("div");
    alarmItem.textContent = alarmTime; // Set the text content of the div to the alarm time.

    // Create a "Delete" button for each alarm.
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    
    // Attach an onclick event handler to the delete button.
    deleteButton.onclick = () => deleteAlarm(i);

    // Append the delete button to the alarm div.
    alarmItem.appendChild(deleteButton);

    // Append the alarm div to the alarmList element in the HTML document.
    alarmList.appendChild(alarmItem);
  }
}


function checkAlarms() {
  const currentTime = getTime();
  if (alarms.includes(currentTime)) {
     alert("Alarm! Wake up! Gautam");
  }
}

function startClock() {
  setInterval(updateClock, 1000); // Update clock every second
}

function startAlarmCheck() {
  setInterval(checkAlarms, 1000); // Check alarms every second
}

startClock();
startAlarmCheck();



// Function to play the alarm tune
function playAlarmTune() {
  
  const audio = new Audio("./Alarm ClockAlarm.mp3");
  audio.play();
}

function checkAlarms() {
  const currentTime = getTime();
  if (alarms.includes(currentTime)) {
    playAlarmTune();
       alert("Alarm! Wake up! Gautam");

  }
}


