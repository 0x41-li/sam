let top250movies = null;
let moviesResult = document.querySelector(".movies-result-row");
let loadMoreBtn = document.getElementById("load-more-btn");
let modal = new bootstrap.Modal(document.getElementById("movie-modal"), {
  keyboard: false,
});

let modalTitle = document.getElementById("modal-title");
let modalBody = document.getElementById("modal-body");


fetch("test-api.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    top250movies = data.items;
    showMovies();
  })
  .catch((err) => {
    console.error(err);
  });

// load more click event
loadMoreBtn.addEventListener("click", showMovies);

// The Modal for every movie
function movieModal(movie) {
  console.log(movie);
  modal.toggle();
  modalTitle.textContent = movie.title;
  modalBody.innerHTML = `
  <div class="fluid-container">
    <div class="row">
      <div class="col-12 col-lg-4 mb-4 mb-lg-0">
        <div class="modal-image-movie movie-image img-loading cursor-pointer">
          <img class="img-fluid w-100" src="${movie.image}" alt="">
        </div>
      </div>
      <div class="col">
        <div class="movie-info">
          <h2 class="mb-4">${movie.fullTitle}<h2>
          <p class="fs-5 fw-normal">Year published: <span class="fw-light text-secondary">${movie.year}</span></p>
          <p class="fs-5 fw-normal">Crew: <span class="fw-light text-secondary">${movie.crew}</span></p>
          <p class="fs-5 fw-normal">Rate: <span class="fw-light text-secondary">${movie.imDbRating}</span></p>
          <p class="fs-5 fw-normal">Rate Count: <span class="fw-light text-secondary">${movie.imDbRatingCount}</span></p>
          <p class="fs-5 fw-normal">Rank: <span class="fw-light text-secondary">${movie.rank}</span></p>
        </div>
      </div>
    </div>
  </div>
  `;
}

// show movies on the page
function showMovies() {
  top250movies.forEach((movie, key) => {
    if (key < 10) {
      //create a div
      let movieCol = document.createElement("div");

      // adding classes to the above div
      movieCol.className = "movie-box col-sm-6 col-md-4 col-lg-3";

      movieCol.setAttribute("data-toggle", "modal");
      movieCol.setAttribute("role", "button");
      movieCol.setAttribute("data-target", "#movie-modal");

      // add the div to the parent div
      moviesResult.appendChild(movieCol);

      // create a wrapper div for the image element
      let imageDiv = document.createElement("div");

      // adding classes to this div
      imageDiv.className = "movie-image img-loading";

      // create image element
      let imgElement = document.createElement("img");

      // Appending elements to the DOM
      movieCol.appendChild(imageDiv);
      imageDiv.appendChild(imgElement);

      // if so add it to the relative img's src attribute
      imgElement.src = movie.image;

      imgElement.style.opacity = "0";

      // check if any image has been load
      imgElement.addEventListener("load", () => {
        // check if the images are rendered by checking the natural height and width
        if (imgElement.naturalHeight > 0 && imgElement.naturalWidth > 0) {
          imgElement.style.opacity = "1";
          imageDiv.className = "movie-image";
        }
      });

      movieCol.addEventListener("click", movieModal.bind(this, movie));
    }
  });

  for (let i = 0; i < 10; i++) {
    top250movies.shift();
  }
}
