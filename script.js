"use strict";

var APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
var IMGPATH = "https://image.tmdb.org/t/p/w1280";
var SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
var main = document.querySelector("main");
var form = document.querySelector("form");
var search = form.querySelector("input");
var term = document.querySelector(".term").querySelector("span");

// Pirmas užkrovimas popularių filmų
getMovieData(APIURL);

// Gauna info iš duomenų bazės pagal API
async function getMovieData(url){
    try {
        var response = await fetch(url);
        var data = await response.json();
        appendMovieData(data);
    } catch(e){
        alert(e);
    }
}

// Užkrauna info į svetainę per DOM
function appendMovieData(data){
    console.log(data);
    var data = data.results;
    data.map(x => {
        // Variables for innerHTML
        var createMovieEl = document.createElement("div");
        var poster_path = x.poster_path;
        var image = IMGPATH + poster_path;
        var title = x.title;
        var vote_average = x.vote_average;
        var overview = x.overview;

        // Adds class movie to movie element
        createMovieEl.classList.add("movie");

        // Innerhtml
        createMovieEl.innerHTML =
        `
           <img src="${image}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `

        // Append
        main.append(createMovieEl);
    })
    console.log(data);
}

// Pakeičia reitingo spalvą
function getClassByRate(vote_average){
    if(vote_average >= 8) return "green"
    else if(vote_average >= 5) return "orange"
    else return "red"
}

// Randą visus filmus pagal search input raktažodžius
form.addEventListener("submit", function(e){
    e.preventDefault();

    // Clears main data
    main.innerHTML = "";
    if(search.value){
        // Užkrauna pagal search raktažodžius
        getMovieData(SEARCHAPI + search.value);

        // Pakeičia dom raktažodį pagal kurį ieškome
        term.innerText = search.value;
        } else {

        // Užkrauna populiarius filmus
        getMovieData(APIURL);

        // Pakeičia dom raktažodį pagal kurį ieškome
        term.innerText = "popular";
    }

    // Clears input value
    search.value = "";
});


// console.log(IMGPATH + "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg");
// console.log(APIURL);