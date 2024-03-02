import React, { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { img_300, unavailable } from "../config/config";
import { FaHeart } from "react-icons/fa";
import { UserAuth } from "./FilTubeAuthentications";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { STORAGE } from "../Firebase/config";
import { MdBookmarkRemove } from "react-icons/md";
import { BsBookmarkHeartFill } from "react-icons/bs";

function FilmTubeVideoCard({ id, poster, title, vote_average, media_type }) {
  const { user } = UserAuth();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(
        doc(STORAGE, "FilmTube User", user.email),
        (snapshot) => {
          if (snapshot.exists()) {
            setFavorites(snapshot.data().f_Favorite || []);
          } else {
            console.log("Document does not exist!");
            setFavorites([]);
          }
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [user?.email]);

  async function AddToFavorite() {
    if (user?.email) {
      const SelectedMovie = {
        id: id,
        poster: poster,
        title: title,
        vote_average: vote_average,
        media_type: media_type,
      };
      favorites.unshift(SelectedMovie);
      await updateDoc(doc(STORAGE, "FilmTube User", user.email), {
        f_Favorite: favorites,
      });
    } else {
      window.alert("Kindly Login Please");
      navigate("/Login");
    }
  }

  async function RemoveIt() {
    if (favorites.some((target) => target.id === id)) {
      const UpdatedFav = favorites.filter((target) => target.id !== id);
      await updateDoc(doc(STORAGE, "FilmTube User", user?.email), {
        f_Favorite: UpdatedFav,
      });
    }
  }

  function color_picker(rating) {
    if (rating > 8) {
      return "text-green-500 bg-green-500";
    } else if (rating >= 7 && rating <= 8) {
      return "text-orange-500 bg-orange-500";
    } else {
      return "text-red-500 bg-red-500";
    }
  }
  //w-[110px] p-1 h-[210px] max-w-[191px] max-h-[335px]
  return (
    <>
      <div className=" sm:w-[195px] sm:h-[350px] w-[140px] h-[260px] flex justify-center sm:p-2 p-2 hover cursor-default show border border-zinc-800 hover:border-zinc-700 relative z-0 hover:shadow-lg  duration-500 hover:border flex-col items-center gap-2 rounded-lg">
        {favorites.some((target) => target.id === id) ? (
          <div className="p-2 rounded-full backdrop-blur-lg bg-[#212121] bg-opacity-40 absolute w-fit right-5 top-5 text-white">
            <BsBookmarkHeartFill className="text-xl" />
          </div>
        ) : (
          ""
        )}
        <Link
          to={`/MoviePage/${media_type}/${id}`}
          title="Click to View"
          className="show flex flex-col border-gray-500 justify-end  cursor-pointer bg-center bg-cover w-[100%] h-[85%]  md:rounded-lg rounded "
          style={{
            backgroundImage: `url(${poster ? img_300 + poster : unavailable})`,
          }}
        ></Link>
        <button
          type="button"
          onClick={() =>
            favorites.some((target) => target.id === id)
              ? RemoveIt()
              : AddToFavorite()
          }
          className="hide2 absolute  w-fit flex items-center gap-2 sm:scale-90 scale-75 sm:px-4 px-2 py-[5px] rounded-3xl bg-red-500  backdrop-blur-xl text-sm mx-auto text-white mb-5 "
        >
          {favorites.some((target) => target.id === id) ? (
            <>
              <MdBookmarkRemove className="text-[15px]" /> Remove From Favorite
            </>
          ) : (
            <>
              <FaHeart className="text-[15px]" /> Add to Favorite
            </>
          )}
        </button>
        <div className=" text-[11px] md:text-[13px] font-[300] tracking-wide w-[90%] make-bold overflow-hidden text-nowrap text-ellipsis text-zinc-200">
          {title}
        </div>
        <div className="flex justify-start w-full">
          <div
            className={`${color_picker(
              vote_average
            )} bg-opacity-15 scale-90 w-fit rounded text-sm px-3 py-1 font-[500] flex items-center  justify-start`}
          >
            <span className="text-[10px] md:text-[13px]">
              {vote_average.toFixed(1)}
            </span>
            <span>
              {" "}
              <MdOutlineStar className="text-[10px] md:text-[13px] ml-1 -translate-y-[1px]" />{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilmTubeVideoCard;
