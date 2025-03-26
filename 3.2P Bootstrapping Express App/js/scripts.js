const cardList = [
  {
    title: "Kitten 1",
    image: "../public/images/kitten1.jpg",
    link: "About Kitten 2",
    description: "Demo description about kitten 2",
  },
  {
    title: "Kitten 2",
    image: "../public/images/kitten2.jpg",
    link: "About Kitten 3",
    description: "Demo description about kitten 3",
  },
  {
    title: "Kitten 3",
    image: "../public/images/kitten3.jpg",
    link: "About Kitten 4",
    description: "Demo description about kitten 4",
  },
];

const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
      item.image +
      '"></div>' +
      '<div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right"></i></span>' +
      '<p><a href="#">' +
      item.link +
      "</a></p>" +
      "</div>" +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      item.description +
      "</p>" +
      "</div></div></div>";
    $("#cardList").append(itemToAppend); // Corrected ID
  });
};

$(document).ready(function () {
  $(".materialboxed").materialbox();

  $("#clickMeButton").click(() => {
    clickMe();
  });

  addCards(cardList);
  $(".modal").modal();
});
