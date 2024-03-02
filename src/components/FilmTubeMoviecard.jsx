import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { img_300, img_500, noPicture, unavailable } from "../config/config";
import { MdOutlineStar } from "react-icons/md";
import { UserAuth } from "./FilTubeAuthentications";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { STORAGE } from "../Firebase/config";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlinePlayDisabled } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";

function FilmTubeMoviecard() {
  const { MovieID } = useParams();
  const { MediaType } = useParams();
  const [Movie, setMovie] = useState({});
  const [languages, setLanguages] = useState([]);
  const MovieLanguage = Movie.original_language;
  const FilmLanguageFind = languages.find(
    (target) => target.iso_639_1 === MovieLanguage
  );
  const [videoLink, setVideoLink] = useState([]);
  const [stars, setStars] = useState();
  const [image, setImage] = useState();
  const { user } = UserAuth();
  const [favorites, setFavorites] = useState([]);
  const [trailer, setTrailer] = useState(false);
  const [relatedCategory, setRelatedCategory] = useState([]);
  const [seasonContainer, setSeasonContainer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${MediaType}/${MovieID}?api_key=6a63466bd16b2f9626f41e66cf666555`,
          options
        );
        const data = await response.json();
        setMovie(data);
        setSeasonContainer(data.seasons);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    async function LanguageFetching() {
      let response = await fetch(
        `https://api.themoviedb.org/3/configuration/languages?api_key=6a63466bd16b2f9626f41e66cf666555`
      );
      let datum = await response.json();
      setLanguages(datum);
    }
    LanguageFetching();

    async function GetVideoLink() {
      const videoResponse = await fetch(
        `https://api.themoviedb.org/3/${MediaType}/${MovieID}/videos?api_key=6a63466bd16b2f9626f41e66cf666555`
      );
      const videoURL = await videoResponse.json();
      setVideoLink(videoURL.results);
    }
    GetVideoLink();

    async function getCrewMembers() {
      const crewRespone = await fetch(
        `https://api.themoviedb.org/3/${MediaType}/${MovieID}/credits?api_key=6a63466bd16b2f9626f41e66cf666555`
      );
      const crewData = await crewRespone.json();
      setStars(crewData.cast);
    }
    getCrewMembers();

    const options = { method: "GET", headers: { accept: "application/json" } };
    fetch(
      `https://api.themoviedb.org/3/${MediaType}/${MovieID}/images?api_key=6a63466bd16b2f9626f41e66cf666555`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setImage(response.backdrops);
      })
      .catch((err) => console.error(err));
  }, [MediaType, MovieID]);

  function color_picker(rating) {
    if (rating > 8) {
      return "text-green-500 ";
    } else if (rating >= 7 && rating <= 8) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  }
  const rating = parseFloat(Movie.vote_average) || 0;

  useEffect(() => {
    window.scroll(0, 0);
    if (user?.email) {
      const subscriber = onSnapshot(
        doc(STORAGE, "FilmTube User", user?.email),
        (target) => {
          if (target.exists()) {
            setFavorites(target.data().f_Favorite || []);
          } else {
            alert("Document Doesn't Exists!");
            setFavorites([]);
          }
        }
      );
      return () => {
        subscriber();
      };
    }
  }, [user?.email]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [Movie]);

  async function AddToFavorite() {
    if (user?.email) {
      const SelectedMovie = {
        id: Movie.id,
        poster: Movie.poster_path || "",
        title: Movie.title || Movie.name || "",
        vote_average: Movie.vote_average || 0,
        media_type: MediaType,
      };
      const updatedFavorites = [...favorites];
      if (!updatedFavorites.some((movie) => movie.id === SelectedMovie.id)) {
        updatedFavorites.unshift(SelectedMovie);

        try {
          await updateDoc(doc(STORAGE, "FilmTube User", user.email), {
            f_Favorite: updatedFavorites,
          });
        } catch (error) {
          console.error("Error adding movie to favorites:", error);
        }
      } else {
        alert("Movie already exists in favorites!");
      }
    } else {
      alert("Kindly Login to Continue");
      navigate("/Login");
    }
  }

  async function RemoveFromFav() {
    if (favorites.some((target) => target.id === Movie.id)) {
      const UpdatedFav = favorites.filter((target) => target.id !== Movie.id);
      await updateDoc(doc(STORAGE, "FilmTube User", user.email), {
        f_Favorite: UpdatedFav,
      });
    }
  }

  const ReletedCategoryMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${MediaType}?api_key=6a63466bd16b2f9626f41e66cf666555&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${suggestions}`
    );
    const datum = await response.json();
    setRelatedCategory(datum.results);
  };

  const [suggestions, setSuggestions] = useState("");

  function Makingcategory() {
    if (Movie && Movie.genres && Movie.genres.length > 0) {
      let FindedCategory = [];
      for (let i = 0; i < Movie.genres.length; i++) {
        const Presentcategory = Movie.genres.find(
          (target) => target.name === Movie.genres[i].name
        );
        FindedCategory.push(Presentcategory.id);
      }
      const result = FindedCategory.join("%2c");
      setSuggestions(result);
      ReletedCategoryMovies();
    }
  }
  useEffect(() => {
    Makingcategory();
  }, [Movie.genres]);

  useEffect(() => {
    ReletedCategoryMovies();
  }, [suggestions]);

  useEffect(() => {
    const FetchCategory = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/${MediaType}/list?api_key=6a63466bd16b2f9626f41e66cf666555&language=en`
      );
      const datum = await response.json();
      setRelatedCategory(datum.genres);
    };
    FetchCategory();
  }, [Movie.genres]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [scrollPosition, image]);

  return (
    <div>
      <div className="max-w-screen mx-auto bg-black">
        <div className="max-w-full w-[full] h-fit mx-auto bg-center relative bg-cover">
          {/* <img src={image && img_500 + image[0]?.file_path} alt="" width={"100%"}/> */}
          <img
            src={image && img_500 + Movie?.backdrop_path}
            alt=""
            width={"100%"}
          />
          <div
            className="w-full h-full absolute top-0"
            style={{
              background: `linear-gradient(to top, rgb(0,0,0,1), rgb(0,0,0,0.1))`,
            }}
          >
            <div className="w-[1400px] max-w-[90%] mx-auto">
              <div className=" lg:mt-28 md:mt-16 sm:mt-14 mt-5 px-3 py-1 md:border-l-[5px] border-zinc-200 flex items-center justify-between">
                <div className="md:flex hidden items-center gap-4">
                  <span className=" sm:text-[25px] text-xs  text-white font-[500]">
                    Rating
                  </span>
                  <span
                    className={`${color_picker(
                      Movie.vote_average
                    )} bg-white  font-bold px-2 py-2 sm:text-[20px] text-xs rounded-md flex items-center`}
                  >
                    {rating.toFixed(1)}{" "}
                    <MdOutlineStar className="sm:text-[20px] text-xstranslate-y-[-1.5px] ml-1" />
                  </span>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="">
                    <Link
                      to="/"
                      className="flex items-center gap-3 rounded-full bg-white hover:bg-opacity-100 bg-opacity-50"
                    >
                      <IoIosArrowRoundBack className="text-red-600 sm:text-[2.3rem] text-[1.5rem] font-[600]" />
                    </Link>
                  </div>
                  {favorites.some((target) => target.id === Movie.id) ? (
                    <div
                      title="This Entertainment is Added to Favorite"
                      className="flex items-center bg-slate-300 text-red-600 rounded-full p-[5px]"
                    >
                      <BiSolidBookmarkHeart className="sm:text-[25px] text-[16px]" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" xl:translate-y-[-380px] lg:translate-y-[-230px] md:translate-y-[-150px] sm:translate-y-[-120px] translate-y-[-70px] w-[90%] max-w-[100%] mx-auto flex flex-col sm:gap-4 gap-3">
          <div className="text-white sm:text-[30px] text-[25px] font-[900] text-center ">
            {" "}
            {Movie.title || Movie.name}{" "}
          </div>
          <div className="text-gray-300 flex items-center gap-2 justify-center">
            {MediaType === "tv" ? (
              <div className="text-gray-300 flex items-center gap-3 justify-center sm:translate-x-0 translate-x-[3px]">
                <div className="md:text-[1.2rem] sm:text-[1rem] text-[11.5px]">
                  {Movie.release_date?.split("").slice(0, 4) ||
                    Movie.first_air_date?.split("").slice(0, 4)}{" "}
                </div>{" "}
                |
                <div className="md:text-[1.2rem] sm:text-[1rem] text-[11.5px]">
                  {FilmLanguageFind?.english_name || "Language not available"}{" "}
                </div>{" "}
                |
                <div className="md:text-[1.2rem] sm:text-[1rem] text-[11.5px]">
                  TV Series
                </div>{" "}
                |
                <div>
                  <span className="md:text-[1.2rem] sm:text-[1rem] text-[11.5px]">
                    No of. Season
                  </span>
                  <span className="md:text-[1.2rem] sm:text-[1rem] text-[11.5px] px-2 py-1 rounded ">
                    {Movie.number_of_seasons}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-gray-300 flex items-center gap-2 text-[13px] justify-center">
                <div className="md:text-[1.2rem] sm:text-[1rem] text-[13px]">
                  {Movie.release_date?.split("").slice(0, 4) ||
                    Movie.first_air_date?.split("").slice(0, 4)}{" "}
                </div>{" "}
                |
                <div className="md:text-[1.2rem] sm:text-[1rem] text-[13px]">
                  {FilmLanguageFind?.english_name || "Language not available"}{" "}
                </div>{" "}
                |
                <div className="md:text-[1.2rem] sm:text-[1rem] text-[13px]">
                  Movie
                </div>
              </div>
            )}
          </div>
          {Movie.genres && (
            <div>
              <div className="flex flex-wrap  items-center justify-center gap-5">
                {Movie.genres.map((target) => (
                  <span
                    className="text-white sm:text-[16px] text-[11px] bg-red-600 px-3 py-1 rounded-md text-sm"
                    key={target.id}
                  >
                    {target.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="text-gray-400 sm:text-[16px] text-[12px] font-[400] tracking-wider text-justify w-[750px] max-w-[100%] mx-auto">
            {" "}
            {Movie.overview}{" "}
          </div>
          <div className="flex flex-col items-center gap-5 justify-center p-5 relative">
            <div className="flex items-center gap-5 justify-center">
              <div className="">
                <button
                  type="button"
                  className=""
                  onClick={() =>
                    favorites.some((target) => target.id === Movie.id)
                      ? RemoveFromFav()
                      : AddToFavorite()
                  }
                >
                  {favorites.some((target) => target.id === Movie.id) ? (
                    <span className="flex flex-col items-center gap-2  text-zinc-400">
                      <BiSolidBookmarkHeart className="sm:text-2xl text-xl" />
                      <span className="sm:text-[1rem] text-[13px]">
                        Remove From Favorite
                      </span>
                    </span>
                  ) : (
                    <span className="flex flex-col items-center gap-2  text-zinc-400">
                      <BiSolidBookmarkHeart className="sm:text-2xl text-xl" />
                      <span className="sm:text-[1rem] text-[13px]">
                        Add To Favorite
                      </span>
                    </span>
                  )}
                </button>
              </div>
              <div className="">
                {videoLink.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 px-5 py-[8px] text-red-600 cursor-default">
                    <MdOutlinePlayDisabled className="sm:text-2xl text-xl" />
                    <span className="sm:text-[1rem] text-[13px]">
                      Video Unavailable
                    </span>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center gap-2 px-5 py-[8px] text-red-600 cursor-pointer"
                    onClick={() => setTrailer(!trailer)}
                  >
                    <FaCirclePlay className="sm:text-2xl text-xl" />{" "}
                    <span className="sm:text-[1rem] text-[13px]">
                      Play Trailer
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              className={` ${
                trailer ? "flex ActiveFromTop2" : "hidden"
              } flex-col gap-2 text-white w-[300px]  max-w-[95%] p-2 rounded-lg bg-zinc-800 overflow-hidden text-nowrap text-ellipsis`}
            >
              {videoLink.map((target) => (
                <a
                  key={target.id}
                  href={`https://www.youtube.com/watch?v=${target.key}`}
                  target="_blank"
                  className="bg-zinc-700 rounded-md hover:bg-red-600 cursor-pointer w-[100%] p-2 flex items-center gap-2 overflow-hidden text-nowrap text-ellipsis"
                >
                  <span>
                    <FaCirclePlay />
                  </span>{" "}
                  <span className="text-[13px] w-[100%] text-nowrap overflow-hidden text-ellipsis">
                    {target.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <div className="w-[1400px] max-w-[100%] sm:text-xl text-[1rem] font-[500] mx-auto text-white ">
              Cast ({stars && stars.length})
            </div>
            <div className="w-[1400px] max-w-[100%] mx-auto overflow-x-scroll flex items-center gap-3 snap-x scroll-hide p-5">
              {stars &&
                stars.map((target, index) => (
                  <div
                    key={index}
                    className=" sm:min-w-[140px]  min-w-[100px] w-[100px]  min-h-[200px] flex items-center flex-col gap-2 scroll-m-1 snap-start"
                  >
                    <img
                      src={
                        target.profile_path == null
                          ? noPicture
                          : img_300 + target.profile_path
                      }
                      alt=""
                      className=" rounded-xl sm:w-[100px] w-[80px]"
                    />
                    <div className="text-white w-[100%] text-nowrap overflow-hidden text-ellipsis text-[13px]">
                      {target.name}
                    </div>
                    <div className="text-zinc-500 w-[100%] text-nowrap overflow-hidden text-ellipsis text-[13px] ">
                      {target.character}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {MediaType === "tv" ? (
            <div className="mt-10">
              <div className="w-[1400px] max-w-[100%] sm:text-xl text-[1rem] font-[500] mx-auto text-white ">
                No of Season ({seasonContainer && seasonContainer.length})
              </div>
              <div className="w-[1400px] max-w-[100%] mx-auto overflow-x-scroll flex items-center gap-3 snap-x scroll-hide p-5">
                {seasonContainer &&
                  seasonContainer.map((target, index) => {
                    return target.name !== "Specials" ? (
                      <img
                        src={
                          target.poster_path == null
                            ? noPicture
                            : img_300 + target.poster_path
                        }
                        alt=""
                        className="w-[150px] rounded-lg"
                      />
                    ) : (
                      ""
                    );
                  })}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mt-10">
            <div className="w-[1400px] max-w-[100%] text-xl font-[500] mx-auto text-white">
              ScreenShots ({image && image.length})
            </div>
            <div
              ref={containerRef}
              className="relative flex items-center gap-5 overflow-x-scroll w-[1400px] max-w-[100%] mx-auto bg-black scroll-hide p-5 snap-x"
            >
              {image &&
                image.map((target, index) => (
                  <img
                    key={index}
                    className=" duration-300 scroll-ms-3 rounded-lg snap-start "
                    src={img_500 + target.file_path}
                    alt={"image" + index}
                    width={"400px"}
                  />
                ))}
            </div>
          </div>
          <div className="w-[1400px] max-w-[100%] mx-auto mt-10">
            <div className="text-white font-[500] text-xl">
              {MediaType === "tv" ? "Related TV Series" : "Related Movies"}{" "}
            </div>
            <div className="w-[1400px] max-w-[100%] mx-auto overflow-x-scroll scroll-hide p-5 flex items-center gap-5">
              {relatedCategory &&
                relatedCategory.map((target, index) => (
                  <Link
                    to={`/MoviePage/${MediaType}/${target.id}`}
                    className="min-w-[150px] w-[150px] h-[250px]"
                    key={index}
                  >
                    <img
                      src={img_300 + target.poster_path}
                      alt=""
                      className="w-[100%] h-[100%] rounded-lg"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilmTubeMoviecard;
