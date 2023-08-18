


var typed = new Typed("#texting-el", {
    strings: ['🌟 Key Benefits of Our Program: 🌟'],
   typeSpeed: 100,
   backSpeed: 100,
    backDelay: 1000,
    loop: true
})



var typed = new Typed("#texting-el0", {
    strings: ['Search your favourite mentor'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})


const meetingForm = document.getElementById('meeting-form');
const meetingsList = document.getElementById('meetings-list');

meetingForm.addEventListener('submit', scheduleMeeting);

function scheduleMeeting(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  
  const meetingDateTime = new Date(`${date}T${time}`);
  
  const meeting = {
    title,
    datetime: meetingDateTime,
  };
  
  // Save meeting to Local Storage or backend
  
  displayMeeting(meeting);
  
  // Schedule notification
  const now = new Date();
  const timeUntilMeeting = meetingDateTime - now;
  setTimeout(() => {
    showNotification(`Reminder: Upcoming meeting - ${title}`);
  }, timeUntilMeeting);
  
  meetingForm.reset();
}

function displayMeeting(meeting) {
  const li = document.createElement('li');
  li.textContent = `${meeting.title} - ${meeting.datetime.toLocaleString()}`;
  meetingsList.appendChild(li);
}

function showNotification(message) {
  // Display a notification (you can use Web Notifications API or a library)
  alert(message);
}

const scheduleLink = document.getElementById('schedule-link');
const meetingContainer = document.getElementById('meeting-container');

// Add click event listener to the "Schedule a meet" link
scheduleLink.addEventListener('click', () => {
    // Toggle the display property of the container
    if (meetingContainer.style.display === 'none') {
        meetingContainer.style.display = 'block';
    } else {
        meetingContainer.style.display = 'none';
    }
});

const closeButton = document.getElementById('close-button');
const container = document.getElementById('meeting-container');

closeButton.addEventListener('click', () => {
  container.style.display = 'none';
});