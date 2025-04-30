// Connect to Socket.io
const socket = io();

// Listen to 'number' event from server
socket.on("number", (msg) => {
  console.log("Random number:", msg);
  const numberElement = document.getElementById("number");
  if (numberElement) {
    numberElement.innerText = msg;
  } else {
    console.warn("Element with ID #number not found.");
  }
});

// Fetch and render cards from /api/data
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/data"); // Relative path works on same domain
    const data = await response.json();

    console.log("Fetched data:", data);

    if (!Array.isArray(data)) {
      console.error("Expected an array but got:", data);
      return;
    }

    const cardContainer = document.getElementById("cardList");
    if (!cardContainer) {
      console.error("Error: #cardList not found!");
      return;
    }

    cardContainer.innerHTML = ""; // Clear previous content

    data.forEach((item) => {
      console.log("Processing item:", item);

      const cardHTML = `
        <div class="col s12 m6 l4">
          <div class="card">
            <div class="card-image">
              <img src="${item.image || "/images/default.jpg"}" alt="${
        item.title || "No Title"
      }">
            </div>
            <div class="card-content">
              <span class="card-title">${item.title || "No Title"}</span>
              <p>${item.description || "No description available"}</p>
            </div>
            <div class="card-action">
              <a href="#">${item.link || "Learn More"}</a>
            </div>
          </div>
        </div>
      `;

      cardContainer.innerHTML += cardHTML;
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
