import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TbCategoryFilled } from "react-icons/tb";

function FilmTubeGenersPage({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) {
  function handleAdd(genre) {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((target) => target.id !== genre.id));
    setPage(1);
  }
  function handleRemove(genre) {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  }

  async function GetGenersMovies() {
    const response = await fetch( `https://api.themoviedb.org/3/genre/movie/list?api_key=6a63466bd16b2f9626f41e66cf666555&language=en-US`);
    const data = await response.json();
    setGenres(data.genres);
  }
  useEffect(() => {
    GetGenersMovies();
    return () => {
      setGenres({});
    };
  }, [setGenres]);

  const [closeCategory, setCloseCategoryste] = useState(false);
  return (
    <>
      <div className="flex items-center justify-end w-full relative">
        <button
          className=" text-white text-right font-[500] text-[20px] flex items-center gap-2 px-10 my-2 cursor-pointer"
          onClick={() => setCloseCategoryste(!closeCategory)}
        >
          Genres <TbCategoryFilled />
        </button>
      </div>
      <div
        className={`w-[300px] h-screen fixed ${
          closeCategory ? "right-[0px]" : `right-[-300px]`
        } top-0  bg-zinc-800 p-5 transition-all duration-300 z-[50]`}
      >
        <div className="flex items-center justify-center text-white font-[600] text-[20px] gap-1">
          Categories <TbCategoryFilled className="text-[20px]" />
        </div>
        <div className=" grid grid-cols-2 gap-5 flex-wrap justify-center my-5">
          {selectedGenres &&
            selectedGenres.map((target) => (
              <Chip
              color="error"

                label={target.name}
                key={target.id}
                clickable
                size="small"
                onDelete={() => handleRemove(target)}
                style={{ color: "white" }}
              />
            ))}
          {genres && genres && genres.map((target) => (
              <Chip
              color="error"
                label={target.name}
                key={target.id}
                clickable
                size="small"
                onClick={() => handleAdd(target)}
                className="w-[95%] text-sm"
                style={{ color: "white",background:"#414141" }}

              />
            ))}
        </div>
        <div className={`bg-red-600 cursor-pointer  text-white py-1 w-[fit] px-4  mx-auto text-center rounded-lg absolute top-2 left-2`} onClick={() => setCloseCategoryste(!closeCategory)}>
          x
        </div>
      </div>
    </>
  );
}

export default FilmTubeGenersPage;
