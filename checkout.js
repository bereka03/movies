const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const movie = localStorage.getItem('movie');
const movieData = JSON.parse(movie);
const seats = localStorage.getItem('seats');
const price = localStorage.getItem('price');

const movieDesc = document.createElement("div");
const container = document.getElementById('container');
movieDesc.innerHTML = `
    <img src="${IMG_PATH + movieData.backdrop_path}" >
    <div class="row mt-5"> 
    <div class="col-4">
    <img src="${IMG_PATH + movieData.poster_path}" >
    </div>
    <div class="col-8">
    <h3 class="text-white">${movieData.title}</h3> 
    <p class="text-white">${movieData.overview}</p>
    <p class="text-white">${movieData.original_language}</p>
    <p class="text-white">${movieData.vote_average}</p>
    </div>
    </div>
    <div>
        <p id='choosenSeats'>არჩეული ადგილები: </p>
        <p>გადასახდელი თანხა: ${price}₾</p>
    </div>
`;
container.appendChild(movieDesc);
const seat_p = document.getElementById('choosenSeats');
function showSeats(){
    for (each of seats){
        const eachSeat = document.createElement('span');
        eachSeat.textContent = each;
        seat_p.appendChild(eachSeat);
    }  
}
showSeats();
