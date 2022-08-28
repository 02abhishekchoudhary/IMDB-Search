const apiUrl = "https://www.omdbapi.com/?i=tt3896198&apikey=a6069641";

// Create Object using DOM
const searchBar = document.getElementById("searchBar");
const searchDownbar = document.getElementById("search");

// Handling searchbar innput
function inputHandle(e) {
  let result = e.target.value;
  handleMoiveTitle(result);
}

// Adding fav movies in local storage
function handleFavBtn(e, data) {
  e.preventDefault();
  searchDownbar.innerHTML = "";
  let favMoviesInfo = [];
  let tempData = JSON.parse(localStorage.getItem("favourite movies"));
  if (tempData) {
    favMoviesInfo.unshift(tempData);
    favMoviesInfo.unshift(data);
    localStorage.setItem("favourite movies", JSON.stringify(favMoviesInfo));
  } else {
    localStorage.setItem("favourite movies", JSON.stringify(data));
  }
}

// fetching data from the API
async function handleMoiveTitle(result) {
  searchDownbar.innerHTML = "";
  if (result.length > 2) {
    const res = await fetch(apiUrl + `&t=${result}`);
    let data = await res.json();
    if (data.Response === "False") {
      console.log("Not found");
      return;
    } else {
      //change inside html
      searchDownbar.innerHTML = `
        <div class="poster_container container">
        <img src=${data.Poster} alt="movie_poster"></img>
        </div>
        <div class="card-body">
            <div id="headerContainer">
              <h2 class="card-title" >${data.Title}</h2>
              <i id="info" class="fas fa-info-circle fa-2x"></i>
            </div>
            <p class="card-text" ><b>Actors :</b> ${data.Actors}</p>
            <p class="card-text"><b>Year :</b> ${data.Year}</p>
            <p class="card-text"><b>IMDB Rating :</b> ${data.imdbRating}</p>
            <button id="fav_btn" class="btn btn-outline-danger" type="submit" >
            My Favourite Movie
            </button>
            </div>
            `;

      // Adding click event on fav button
      document
        .getElementById("fav_btn")
        .addEventListener("click", (e) => handleFavBtn(e, data));

      // calling ifo.html page
      function openPage() {
        localStorage.setItem("Movies Information", JSON.stringify(data));
        parent.location = "./html/info.html";
      }

      // adding click event on info icon
      document.getElementById("info").addEventListener("click", openPage);
    }
  }
}

// Adding input event on search bar
searchBar.addEventListener("input", inputHandle);
