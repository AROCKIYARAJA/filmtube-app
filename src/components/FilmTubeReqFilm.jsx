import React from "react";

function FilmTubeReqFilm({ reqFilm, setReqFilm }) {
  return (
    <div
      className={` ${
        reqFilm ? "block" : "hidden"
      } fixed w-screen h-screen bg-black bg-opacity-50 z-[10] top-0 left-0`}
    >
      <div className="">
        <button
          onClick={() => setReqFilm(!reqFilm)}
          className="px-3 py-1 bg-red-500 text-white rounded-md absolute right-5 top-5"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default FilmTubeReqFilm;
