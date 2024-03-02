import React, { useEffect, useState } from "react";
import FilmtubePagination from "./FilmtubePagination";
import useGenres from "../Hooks/useGenres";
import FilmTubeVideoCard from "./FilmTubeVideoCard";
import FilmTubeFooter from "./FilmTubeFooter";
import FilmTubeTVGenersPage from "./FilmTubeTVcategory";

function FilmTubeTV() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genresforURL = useGenres(selectedGenres);
  const [page, setPage] = useState(1);
  const [apiMovies, setApiMovies] = useState([]);

  useEffect(() => {
    async function getMovies(url) {
      const res = await fetch(url);
      const data = await res.json();
      setTimeout(() => {
        setApiMovies(data.results);
        console.log(url);
      }, 2000);
    }
    getMovies(
      `https://api.themoviedb.org/3/discover/tv?api_key=6a63466bd16b2f9626f41e66cf666555&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresforURL}`
    );
  }, [page, genresforURL]);

  return (
    <div>
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
            <div className="lg:mt-20 md:mt-5">
              <FilmTubeTVGenersPage
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
              />
            </div>
            <div
              className={`w-[1500px] max-w-[100%] mx-auto flex sm:gap-9 sm:px-2 gap-2 items-center justify-center flex-wrap scroll-bar mt-3`}
            >
              {apiMovies.map((target) => (
                <FilmTubeVideoCard
                  key={target.id}
                  id={target.id}
                  poster={target.poster_path}
                  title={target.title || target.name}
                  date={target.release_date}
                  vote_average={target.vote_average}
                  media_type="tv"
                />
              ))}
            </div>
            <FilmtubePagination setPage={setPage} />
            <FilmTubeFooter />
          </>
        )}
      </div>
    </div>
  );
}

export default FilmTubeTV;
