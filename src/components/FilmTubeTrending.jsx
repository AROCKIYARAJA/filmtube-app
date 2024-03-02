import React, { useEffect, useState } from "react";
import FilmtubePagination from "./FilmtubePagination";
import FilmTubeVideoCard from "./FilmTubeVideoCard";
import FilmTubeFooter from "./FilmTubeFooter";
// import FilmTubeSearch from "./FilmTubeSearch";

function FilmTubeTrending() {
  const [page, setPage] = useState(1);
  const [apiMovies, setApiMovies] = useState([]);

  useEffect(() => {
    try {
      async function getMovies() {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=6a63466bd16b2f9626f41e66cf666555&page=${page}`
        );
        const data = await res.json();
        setApiMovies(data.results);
        console.log(data.results);
      }
      getMovies();
    } catch (error) {
      alert(`Oops! Something is wrong ${error}`);
    }
  }, [page]);

  return (
    <div>
      {apiMovies.length === 0 ? (
        <div className="text-white text-center w-full h-screen bg-black grid place-items-center">
          <img
            src="https://i.pinimg.com/originals/f9/0f/76/f90f7689233948005f465d98ead56d44.gif"
            alt=""
            className="w-[400px] max-w-[400px]"
          />
        </div>
      ) : (
        <>
          <div className="w-[1500px] max-w-[100%] mx-auto flex sm:gap-4 sm:px-2 gap-2 items-center justify-center flex-wrap scroll-bar mt-20">
            {apiMovies.map((target) => (
              <div className="m-1" key={target.id}>
                <FilmTubeVideoCard
                  id={target.id}
                  poster={target.poster_path}
                  title={target.title || target.name}
                  vote_average={target.vote_average}
                  media_type={target.media_type}
                />
              </div>
            ))}
          </div>
          <FilmtubePagination setPage={setPage} />
          <FilmTubeFooter />
        </>
      )}
    </div>
  );
}

export default FilmTubeTrending;
