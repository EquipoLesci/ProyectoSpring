const apiKey = "7b1aed5e60fd4f6da976d1f8df1e8e7b";
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

const url_detalles = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es`;

window.onload = function () {
  getPelis(url_detalles);
  getRecomendaciones(url_recomendaciones);
};

function getPelis(url_detalles) {
  fetch(url_detalles)
    .then((res) => res.json())
    .then((data) => {
      buildPerfil(data);
    });
}

function buildPerfil(data) {
  let section = document.getElementsByClassName("section")[0];

  //RECOJO EN VARIABLE CONT DE LAS CARDS
  let contenedorPerfil = document.getElementById("contenedorPerfil");
  //CREO ROW DONDE IRAN TODAS LAS CARDS
  let row = document.createElement("div");
  row.classList.add("row");

  //ESPACIO DE LA CARD
  let col = document.createElement("div");
  col.classList.add("col-sm-12");

  //CREO LA CARD
  let card = document.createElement("div");
  card.classList.add("card");

  //CREO CARD-BODY
  let cuerpoCard = document.createElement("div");
  cuerpoCard.classList.add("card-body");

  //AÑADIR LA IMAGEN
  let imagen = new Image();
  imagen.src = "https://image.tmdb.org/t/p/w500/" + data.poster_path;
  imagen.alt = "Cartel de la película";
  imagen.classList.add("card-img-top");

  //AÑADIR EL TÍTULO
  section.innerText = data.title;

  //SINOPSIS
  let sinopsis = document.createElement("p");
  sinopsis.classList.add("card-text");
  sinopsis.innerText = data.overview;

  cuerpoCard.appendChild(imagen);

  //AÑADIR GÉNERO
  let cuerpoGenero = document.createElement("div");
  let generoT = document.createElement("span");
  generoT.innerText = "Género: ";
  cuerpoGenero.appendChild(generoT);

  for (let i = 0; i < data.genres.length; i++) {
    let genero = document.createElement("span");
    genero.innerText = data.genres[i].name + " ";
    cuerpoGenero.appendChild(genero);
    cuerpoCard.appendChild(cuerpoGenero);
  }

  //AÑADIR DURACIÓN
  let duracion = data.runtime;
  let duraciontxt = document.createElement("p");
  duraciontxt.innerText = duracion + " minutos";
  cuerpoGenero.appendChild(duraciontxt);

  cuerpoGenero.appendChild(sinopsis);

  card.appendChild(cuerpoCard);
  col.appendChild(card);
  row.appendChild(col);

  contenedorPerfil.appendChild(row);

  const url_creditos = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es`;

  getCreditos(url_creditos);
  function getCreditos(url_creditos) {
    fetch(url_creditos)
      .then((res) => res.json())
      .then((data) => {
        buildCreditos(data);
      });
  }

  function buildCreditos(data) {
    let nameD = "";
    let nameA =[];
    // Recorre el array de equipo
    for (let i = 0; i < data.crew.length; i++) {
      const crewMember = data.crew[i];

      // Verifica si el miembro del equipo tiene "Directing" como valor de "known_for_department"
      if (crewMember.known_for_department === "Directing") {
        // Extrae el primer nombre del campo "name" del miembro del equipo
        nameD = "Director: "+crewMember.name;
        break;
      }

      
    }
    for (let i = 0; i < data.cast.length; i++) {
    const castMember = data.cast[i];
      if(castMember.known_for_department === "Acting"){
        nameA.push(castMember.name);
        if (nameA.length === 4) {
            break;
          }
      }
    }

    let director = document.createElement("p");
    director.innerText = nameD;
    cuerpoGenero.appendChild(director);
    let actores = document.createElement("p");

    actores.innerText = "Reparto: "+nameA;
    cuerpoGenero.appendChild(actores);
  }
}

const url_recomendaciones = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=es`;

function getRecomendaciones(url_recomendaciones) {
  fetch(url_recomendaciones)
    .then((res) => res.json())
    .then((data) => {
      buildRecomendaciones(data);
    });
}

function buildRecomendaciones(data) {
  //RECOJO EN VARIABLE CONT DE LAS CARDS
  let contenedorRecomendacion = document.getElementById(
    "contenedorRecomendacion"
  );
  //CREO ROW DONDE IRAN TODAS LAS CARDS
  let row1 = document.createElement("div");
  row1.classList.add("row");
  tituloRec = document.createElement("h1");
  tituloRec.innerText = "Películas Similares";
  contenedorRecomendacion.appendChild(tituloRec);

  for (let i = 0; i < 8; i++) {
    //ESPACIO DE LA CARD
    let col1 = document.createElement("div");
    col1.classList.add("col-sm-3");

    //CREO LA CARD
    let card1 = document.createElement("div");
    card1.classList.add("card");

    //CREO CARD-BODY
    let cuerpoCard1 = document.createElement("div");
    cuerpoCard1.classList.add("card-body");

    //AÑADIR LA IMAGEN
    let imagen = new Image();
    imagen.src =
      "https://image.tmdb.org/t/p/w500/" + data.results[i].poster_path;
    imagen.alt = "Cartel de la película";
    imagen.classList.add("card-img-top");

    cuerpoCard1.appendChild(imagen);
    card1.appendChild(cuerpoCard1);
    col1.appendChild(card1);
    row1.appendChild(col1);

    cuerpoCard1.addEventListener("click", verDetalles);

    function verDetalles(event) {
      let id = data.results[i].id;
      window.location.href = "detalles.html?id=" + id;
    }

    contenedorRecomendacion.appendChild(row1);
  }
}
