import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import FilmTubeVideoCard from "./FilmTubeVideoCard";
import { MdMovieFilter } from "react-icons/md";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import FilmtubePagination from "./FilmtubePagination";

function FilmTubeSearch() {
  const [termWord, setTermWord] = useState("");
  const [apiMovies, setApiMovies] = useState([]);
  const [SearchType, setSearchType] = useState("movie");
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);
  const [accessAll, setAccessAll] = useState(false);
  

  useEffect(() => {
    fetch( `https://api.themoviedb.org/3/search/${SearchType}?api_key=6a63466bd16b2f9626f41e66cf666555&include_adult=${accessAll}&query=${termWord}&page=${page}`)
      .then((response) => response.json())
      .then((response) => {
        setApiMovies(response.results);
        setNumOfPages(response.total_pages);
      })
      .catch((err) => console.error(err));
  }, [termWord, SearchType, page]);

  function HandleSearchType(event) {
    setSearchType(event.target.value);
  }

  function ui(target) {
    if (target.vote_average !== undefined && target.vote_average !== 0) {
      return (
        <FilmTubeVideoCard
          key={target.id}
          id={target.id}
          poster={target.poster_path}
          title={target.title || target.name}
          date={target.release_date}
          vote_average={target.vote_average}
          media_type={SearchType}
        />
      );
    }
  }

  return (
    <><br /><br /><br /><div className="p-5">
      <div className=" w-[600px] mt-10 mx-auto max-w-[95%] flex items-center gap-3 border-b border-zinc-700 py-[3px] px-5  justify-center">
        <span className="text-zinc-400"><FiSearch className="text-[20px]" /></span>
        <input
          autoFocus
          type="text"
          placeholder="Search Entertainment Movies, TV Series"
          className="w-full py-[5px] bg-transparent text-zinc-700 placeholder:text-zinc-600"
          onChange={(e) => setTermWord(e.target.value)} />
      </div>
      <div className="flex items-center flex-wrap w-fit mx-auto mt-5">
        <label htmlFor="movie" className="flex items-center cursor-pointer">
          <input
            type="radio"
            className=" opacity-0"
            name="yes/no"
            id="movie"
            value={"movie"}
            checked={SearchType === "movie"}
            onChange={HandleSearchType} />{" "}
          <span className="px-5 text-sm py-1 rounded-md bg-red-500 text-white flex items-center gap-2 ">
            <MdMovieFilter /> Movies
          </span>
        </label>
        <label htmlFor="tv" className="flex items-center cursor-pointer">
          <input
            type="radio"
            className=" opacity-0"
            name="yes/no"
            id="tv"
            value={"tv"}
            checked={SearchType === "tv"}
            onChange={HandleSearchType} />{" "}
          <span className="px-5 text-sm py-1 rounded-md bg-red-500 text-white flex items-center gap-2 ">
            <PiTelevisionSimpleDuotone /> TV Shows
          </span>
        </label>
      </div>
      <div>
        <div
          className={`w-[1500px] max-w-[100%] mx-auto flex sm:gap-9 sm:px-2 gap-2 items-center justify-center flex-wrap scroll-bar mt-10`}
        >
          {apiMovies.length === 0 ? (
            <div></div>
          ) : (
            apiMovies.map((target, index) => ui(target, index))
          )}
        </div>
        <br />
        <br />
      </div>
      {numOfPages > 1 && (
        <FilmtubePagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div></>
  );
}

export default FilmTubeSearch;
