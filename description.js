//ეს არის ერთი გვერდის ჩატვირთვისთვის

// გავამზადეთ აპი ინფორაციები რაებიც გვჭირდბეოდა
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
// აქ წამოვიღეთ ყველა ელემენტი რომელიც ჰტმლ ში იჯდა რომელზეც დამუშავება გვინდოდა რომ გაგვეკეთებინა
const main = document.getElementById("main");

const similar = document.getElementById("similar");

// აქ ლოკალურ მონაცეამთა ბაზიდან ამოვიღეთ ინორმაცია
const movie = localStorage.getItem("movie");
console.log(JSON.parse(movie));
// შემოსული ინფორმაცია თავიდან არის სტრქინგი და მაგის გამო json.parse მეთოდით გავხადეთ ობიექტად
const movieData = JSON.parse(movie);


// ახალი დივი შევქმენით
const movieDesc = document.createElement("div");
// კლასი რომლეიც არის bootstrap კლასი
movieDesc.classList.add("container");

// აქ უკვე პირდპაირ მაქვს movieData თი წვდომა ობიექტზე რომლეიც გამოიყრუება დაახლოებით
// {
//adult: false
// ​
// backdrop_path: "/cEyhk8tZWubni71M6plwLMQFOIX.jpg"
// ​
// genre_ids: Array(3) [ 28, 80, 53 ]
// ​
// id: 385687
// ​
// original_language: "en"
// ​
// original_title: "Fast X"
// ​
// overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever."
// ​
// popularity: 2667.036
// ​
// poster_path: "/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
// ​
// release_date: "2023-05-17"
// ​
// title: "Fast X"
// ​
// video: false
// ​
// vote_average: 6.8
// ​
// vote_count: 84
// }

// ამ ობქიეტის ქონის გამო პირდპაირ შემიძლია movieDAta.ნებისმიერი პარამტერი რაცაა მაგის გამახება
// და რადგანაც მასივი არაა არც foreach მჭირდება და არც map
// აქედან დავხატეთ უქვე ერტი ფილმის აღწერა
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
`;
// main დივში შვილებად ჩავ უგდეთ დახატული იფორმაცია
main.appendChild(movieDesc);



// დამატებით მოგვინდა რო 3 ელემენტი გამოჩნდეს რომლებიც არის მსგავსი ფილმები

// // პარამეტრად გადავაწოდეთ აპი
getMovies(API_URL);
// ასიქნრონული ფუნქცია იმისთვის რომ აპის ფეჩინგი გავაკეთოთ
// ასიქნრონულობას ვიყენებთ იმისთვის როცა სხვა მსიამართიდან ვიღებთ რამე ინფორამციას
// დროი რო ჭირდება ჩასატვირთად მაგისთვის გვინდა რო დალოდება (await) გამოვიძახოთ
// იქამდე დაელოდოს სანამ ყველაფერს არ ჩატვირთავს
async function getMovies(url) {
  console.log(url);


  // მისამართიდან მოაქვს ინფორამცია
  const res = await fetch(url);
  console.log(res);

  // ამას გადაყავს წამოღებული დატა ჯსონ ფორმატში
  const data = await res.json();
  console.log(data.results);

  // აქ ვაწყვდით პარამეტრად ჯსონ ფორმატის ელემენტებს
  // ეს მოდის როგორც
  // [
  //   {
  //     adult: false,
  //     backdrop_path: "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
  //     genre_ids: [28, 12, 53, 878],
  //     id: 460465,
  //   },
  //    {
  //     adult: false,
  //     backdrop_path: "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
  //     genre_ids: [28, 12, 53, 878],
  //     id: 460465,
  //   },
  // ]
  showMovies(data.results);
}
export default function showMovies(movies) {
  similar.innerHTML = " ";

  // აქ ახალი ცვლდაით ჩვენ გამოვიყენეთ math.rand რომელიც მოცემული მასივიდან 0-20 მდე ინდექსებს
  // შემთხვევითობის მეთოდით ალაგებს (012345 => 234612)
  const smallMovies = (movies = movies
    .sort(() => Math.random() - Math.random())
    // აქ შმთხვევითობით გადაცვლილ ინდექსებიდან მხოლოდ 3 ელემენტს იღებს
    .slice(0, 3));
  // დაგვჭირდა რო შეგვეცვალა foreEach ელემენტის მასივი და მიგვეწოდებინა ახალი smallMovies მასივი
  smallMovies.forEach((movie) => {
    // წინასწარ რა ელემენტებიც იქნებოდა ობიექტში ჩასმული რაც მოდიოდა აპი დან
    // წინასწარ შევქმენით ცვლადები რო აღარ დაგვეწერა movie.title
    const { title, overview, original_language, vote_average, poster_path } =
      movie;
    // ეს ქმნის div ელემენტს
    const movieEl = document.createElement("div");
    // ეს div ელემენტს უქმნის class col-4 ს
    movieEl.classList.add("col-4");
    // აქედან ვახდენთ დახატვას რო თითოეული ელემენტი როგორ გამოვიდეს
    movieEl.innerHTML = `
                <div class="p-4">
                <div class="movies">
                  <img src="${IMG_PATH + poster_path}" >
                  <div class="movie_content_box">
                    <h3>${title}</h3>
                    <p>${overview}</p>
                    <p>${original_language}</p>
                    </div>
                    <span>
                      <p class="${getClassByVote(
                        vote_average
                      )}">${vote_average}</p>
                    </span>
                    </div>
                </div>
            `;
    // ამით გამოძახებულ main დივს შიგნით შვილებად ვუმატებთ ყველა ელემენტს რომელიც ზემოით დავხატეთ
    similar.appendChild(movieEl);
    // დაჭერაზე ვქმნით ევენთს რომლეიც ბრაუზერის ლოკალურ მონაცემთა ბაზაში ამატებს ერთ ობიექტს
    // რომეზეც დაჭრას ვახდენთ
    movieEl.addEventListener("click", () => {
      // აქედან ჩაემატა
      localStorage.setItem("movie", JSON.stringify(movie));
      // ახალ გვერდზე გადაგიყვანოს
      window.location = "movie.html";
    });
  });
  showSeats(seats);
}

// ფუნქცია რომლეიც პარამეტრად იღებს vote_average რომ ფერების კონტროლი ქონდეს
function getClassByVote(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

// აქ უნდა შექმნათ ახალი ობიექტი თქვნეი ხლეით დაახლოებით უნდა იყოს

const seats = [
  {
    id: 1,
    price: 10,
  },
  {
    id: 2,
    price: 10,
  },
  {
    id: 3,
    price: 10,
  },
  {
    id: 4,
    price: 10,
  },
  {
    id: 5,
    price: 10,
  },
  {
    id: 6,
    price: 10,
  },
  {
    id: 7,
    price: 10,
  },
  {
    id: 8,
    price: 10,
  },
  {
    id: 9,
    price: 10,
  },
  {
    id: 10,
    price: 10,
  },
  {
    id: 11,
    price: 10,
  },
  {
    id: 12,
    price: 10,
  },
  {
    id: 13,
    price: 10,
  },
  {
    id: 14,
    price: 10,
  },
  {
    id: 15,
    price: 10,
  },
  {
    id: 16,
    price: 10,
  },
  {
    id: 17,
    price: 10,
  },
  {
    id: 18,
    price: 10,
  },
  {
    id: 19,
    price: 10,
  },
  {
    id: 20,
    price: 10,
  },
  {
    id: 21,
    price: 10,
  },
  {
    id: 22,
    price: 10,
  },
  {
    id: 23,
    price: 10,
  },
  {
    id: 24,
    price: 10,
  },
];

// seat ზე დაფუძნებიტ უნდა გამოიტანო ვიზაულირად

// [ 1 ]  [ 2 ]  [ 3 ]
// [ 4 ]  [ 5 ]  [ 6 ]
// [ 7 ]  [ 8 ]  [ 9 ]
let price = 0;
const price_p = document.getElementById('price-p');
price_p.textContent = `${seats[0].price}₾`
const choosenSeats = [];
const checkoutBtn = document.getElementById('checkout');
function showSeats(obj){
  const seatDiv = document.getElementById('seats-inner');
  
  obj.forEach(seat => {
    const seatEl = document.createElement('div');
    seatEl.classList.add('col-2');
    seatEl.innerHTML =
      `
        <div class="p-3">
          <div id='${seat.id}' class="seat">
          <p>${seat.id}</p></div>
        </div>
      `
      seatDiv.appendChild(seatEl);

  })
  const priceEl = document.getElementById('price');
  const seatCard = document.querySelectorAll('.seat');
  seatCard.forEach(seat => seat.addEventListener('click', () => {
    seat.classList.toggle('selected');

    if (seat.classList.contains('selected') && !(seat.id == choosenSeats.forEach(id => id))){
      price += seats[seat.id - 1].price
      choosenSeats.push(seat.id)
      console.log(choosenSeats)
    }
    else {
      price -= seats[seat.id - 1].price
      for (let each of choosenSeats){
        if (each === seat.id){
          choosenSeats.splice(choosenSeats.indexOf(each), 1);
          console.log(choosenSeats)
        }
      }
    }
    priceEl.innerHTML = `${parseInt(price)}₾`;
    localStorage.setItem('price', price);
    if (choosenSeats.length === 0){
      checkoutBtn.setAttribute('disabled', true);
    }else {
     checkoutBtn.removeAttribute('disabled'); 
    }
  }))
}
 
checkoutBtn.addEventListener('click', () => {
  localStorage.setItem('seats', choosenSeats.map(seat => seat));
  window.location = 'checkout.html';
})

// eachSeat.forEach(seat => seat.addEventListener('click', console.log('click')))




// დაჭერაზე უბრალოდ გადაიყვანეთ checkout გვერდზე რომელსაც ააწყობთ ადგილი ან იდ ს და ფასის შესაბამისად

/// დაჭრაზე ისევ localstraogeshი ჩააგდეთ ეგ ინფორმაცია და ააწყვეთ ახალი გვერდი checkout.html და იქ გამოიტანეთ ადგილი და ფილმის დასახელაბ

// 1) seats.forEach  და დახატე ყველა ადგილი

// 2)   movieEl.addEventListener("click", () => {
// აქედან ჩაემატა
//   localStorage.setItem("seats", JSON.stringify(seats));
//   // ახალ გვერდზე გადაგიყვანოს
//   window.location = "checkout.html";
// });

//3) /// რაც ამ გვერდში გვაქვს ეგ უნდა გამოიყენო უბრალოდ async function getMovies(url)  ესენი აღარ გამოიზძახოთ checkout ს გვერდზე
