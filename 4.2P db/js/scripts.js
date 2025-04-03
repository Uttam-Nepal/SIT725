$(document).ready(function () {
  // Initialize Materialize components
  $(".materialboxed").materialbox();
  $(".modal").modal();

  // Fetch data from MongoDB API and add cards to the page
  fetch("/api/data")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log data to the console
      addCards(data); // Function to generate and append cards to the page
    })
    .catch((err) => {
      console.error("Error fetching data:", err); // Handle fetch error
    });

  // Click event for the "Click Me" button
  $("#clickMeButton").click(() => {
    alert("Thanks for clicking me. Hope you have a nice day!");
  });
});

// Function to generate and append cards to the page
const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend = `
      <div class="col s4 center-align">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${item.image}" alt="${item.title}" />
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              ${item.title}
              <i class="material-icons right"></i>
            </span>
            <p><a href="#">${item.link}</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              ${item.title}
              <i class="material-icons right">close</i>
            </span>
            <p class="card-text">${item.description}</p>
          </div>
        </div>
      </div>
    `;
    // Append the generated card to the card list
    $("#cardList").append(itemToAppend);
  });
};
