import { useState } from "react";

export const MovieApp = () => {
  const API_KEY = "fbd014910de062b9e5cb62b01c5e89ff";

  const [pelicula, setPelicula] = useState("");
  const [listPelicula, setListPelicula] = useState([]);

  const changePelicula = (e) => {
    const valorPelicula = e.target.value;
    setPelicula(valorPelicula);
  };

  const fetchPelicula = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${pelicula}&api_key=${API_KEY}`
      );
      const dataPelicula = await response.json();

      setListPelicula(dataPelicula?.results);
    } catch (error) {
      console.log("Error... ", error);
    }
  };

  const buscarPelicula = (e) => {
    e.preventDefault();
    if (pelicula < 1) return;

    fetchPelicula();
  };

  return (
    <div className="container">
      <h1>Buscador de Peliculas</h1>
      <hr />
      <form onSubmit={buscarPelicula}>
        <input type="text" onChange={changePelicula} />
        <button>Buscar</button>
      </form>
      <div className="movie-list">
        {listPelicula.length > 0 ? (
          listPelicula.map((p) => (
            <div key={p.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${p.poster_path}`} />
              <h2>{p.title}</h2>
              <p>{p.overview}</p>
            </div>
          ))
        ) : (
          <div>
            <p>Sin Registros...</p>
          </div>
        )}
      </div>
    </div>
  );
};
