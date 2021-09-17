let top250movies = null;
let moviesLefted = [];
let moviesResult = document.querySelector(".movies-result-row");
let scrollEventAllow = true;

fetch("test-api.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    top250movies = data.items;
    showMovies(top250movies);
  })
  .catch((err) => {
    console.error(err);
  });

// The Modal for every movie
function movieModalInfo(movieInfo) {
  console.log(movieInfo);
}

// show movies on the page
function showMovies(movies) {
  movies.forEach((movie, key) => {
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

      load(movie.image).then(() => {
        imageDiv.style.backgroundImage = "url(" + movie.image + ")";
        imageDiv.className = "movie-image";
      });

      movieCol.addEventListener("click", movieModalInfo.bind(this, movie));
    } else {
      moviesLefted.push(movie);
    }
  });
}

// Code for checking if image loaded
function load(src) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.addEventListener("load", resolve);
    image.addEventListener("error", reject);
    image.src = src;
  });
}
