// Search Button 
const searchBtn = document.querySelector(".search-btn");
const valueSearch = document.querySelector(".input-keyword");
searchBtn.addEventListener("click", 
function myfucntion() {
  fetch(`http://www.omdbapi.com/?apikey=3242dc3b&s=${valueSearch.value}`)
    .then((response) => response.json())
    .then((result) => {
      const movie = result.Search;
      let cards = "";
      movie.forEach((m) => {
        cards += showCards(m);
      })
      const movieContainer = document.querySelector(".movies");
      movieContainer.innerHTML = cards;

      // modal function
      const modalBtn = document.querySelectorAll(".modal-btn");
      modalBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch(`http://www.omdbapi.com/?apikey=3242dc3b&i=${imdbid}`)
            .then((response) => response.json())
            .then((result) => {
              const movieDetail = showMovie(result);
              document.querySelector(".modal-body").innerHTML = movieDetail;
            })
        });
      });
    });
});

function showCards(m) {
  return `<div class="col-md-4 my-4">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-danger modal-btn" data-bs-toggle="modal" data-bs-target="#movie-modal" data-imdbid="${m.imdbID}">Movies Detail</a>
                    </div>
                </div>
            </div>`;
}

function showMovie(m) {
  return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : </strong> ${m.Director} </li>
                            <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
