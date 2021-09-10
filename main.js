let top250movies = null;
let moviesResult = document.querySelector(".movies-result-row");

fetch("test-api.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    top250movies = data.items;
    top250movies.forEach((movie, key) => {
      if (key < 10) {
        //create a div
        let movieCol = document.createElement("div");

        // adding class to the above div
        movieCol.className = "movie-box col-sm-6 col-md-4 col-lg-3";

        // apending the div to the parent div
        moviesResult.appendChild(movieCol);

        // showing the image of the movie
        let imageDiv = document.createElement("div");
        imageDiv.className = "movie-image img-loading"; // adding class to this div
        movieCol.appendChild(imageDiv); // appending the image div to the movie column

        let imageEl = document.createElement("img"); // create img element
        imageEl.setAttribute("loading", "lazy");
        imageEl.className = "img-fluid object-fit-contain img-loading";
        imageEl.src = movie.image; // adding the source of the movie image
        imageDiv.appendChild(imageEl); // appending the image element

        imageEl.style.opacity = "0";

        imageEl.addEventListener("load", () => {
          imageEl.classList.add("img-loaded");
          imageEl.style.opacity = "1";
          imageDiv.classList.remove("img-loading");
        });

        movieCol.addEventListener("click", movieModalInfo.bind(this, movie));
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });

function movieModalInfo(movieInfo) {
  console.log(movieInfo);
}
