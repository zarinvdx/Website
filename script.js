//setting user preferences//
function setUserPreferences(fontSize, bgColor) {
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('bgColor', bgColor);
  }
  
  //user preferences when page loads//
  function applyUserPreferences() {
    const fontSize = localStorage.getItem('fontSize');
    const bgColor = localStorage.getItem('bgColor');
  
    if (fontSize) {
      document.documentElement.style.fontSize = fontSize;
    }
  
    if (bgColor) {
      document.getElementById('mainHeader').style.backgroundColor = bgColor;
    }
  }
  
  //customize presentation//
  function customizePresentation() {
    const fontSizeInput = prompt('Enter font size (e.g., 16px):');
    const bgColorInput = prompt('Enter background color (e.g., black):');
  
    document.documentElement.style.fontSize = fontSizeInput;
    document.getElementById('mainHeader').style.backgroundColor = bgColorInput;
  
    //save in local storage//
    setUserPreferences(fontSizeInput, bgColorInput);
  }
  //apply preferences when page loads//
  applyUserPreferences();
  
  //footer scrolling function//
  document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('.footer');
    let lastScrollPosition = window.scrollY;
  
    if (window.scrollY > 100) {
      footer.style.display = 'block';
    } else {
      footer.style.display = 'none';
    }
  
    window.addEventListener('scroll', function () {
      const currentScrollPosition = window.scrollY;
  
      if (currentScrollPosition > lastScrollPosition) {
        if (currentScrollPosition > 50) {
          footer.style.display = 'block';
        }
      } else {
        footer.style.display = 'none';
      }
  
      lastScrollPosition = currentScrollPosition;
    });
  });

  //fetching events from json//
  fetch('json.json')
    .then(response => response.json())
    .then(events => {
      displayEvents(events); //loop functionality//
    })
    .catch(error => console.error('Error fetching events:', error));
  
    function displayEvents(eventsArray) {
        const eventsContainer = document.getElementById('eventsContainer');
      
        eventsContainer.innerHTML = '';
      
        eventsArray.forEach(event => { //loop functionality//
          const eventElement = createEventElement(event);
          eventsContainer.appendChild(eventElement);
        });
      }
      
      function createEventElement(event) { //generate events dynamically//
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
      
        eventElement.innerHTML = `
          <a href="${event.link}">
            <img src="images/${event.image}" alt="${event.name}">
          </a>
          <h2>${event.name}</h2>
          <p>Location: ${event.location}</p>
          <p>Date: ${event.date}</p>
        `;
      
        return eventElement;
      }      
  
  //search events//
  function searchEvents() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
  
    //fetching from json for search//
    fetch('json.json')
      .then(response => response.json())
      .then(events => {
    
        //filtering//
        const filteredEvents = events.filter(event =>
          event.name.toLowerCase().includes(searchValue) ||
          event.location.toLowerCase().includes(searchValue) ||
          event.date.toLowerCase().includes(searchValue)
        );

        displayEvents(filteredEvents);
      })
      .catch(error => console.error('Error fetching events:', error));
  }
  
  //sorting events using JSON//
  function sortEvents() {
    const sortSelect = document.getElementById('sortSelect');
    const sortBy = sortSelect.value;
  
    fetch('json.json')
      .then(response => response.json())
      .then(events => {
 
        const sortedEvents = events.slice().sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return -1;
          if (a[sortBy] > b[sortBy]) return 1;
          return 0;
        });

        displayEvents(sortedEvents);
      })
      .catch(error => console.error('Error fetching events:', error));
  }

  //validation//
  function validateForm() {
    var form = document.getElementById("contactForm");

    form.name.setCustomValidity(validateName(form.name.value));
    form.email.setCustomValidity(validateEmail(form.email.value));
    form.message.setCustomValidity(validateMessage(form.message.value));

    if (!form.checkValidity()) {
        return false;
    }

    alert('Form has been submitted successfully!');
    return true;
}

function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name) ? "" : "Name should contain only letters and spaces.";
}

function validateEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email) ? "" : "Invalid email address.";
}

function validateMessage(message) {
    return message.length >= 5 ? "" : "Message should be at least 5 characters long.";
}

