import React, { useEffect, useState } from "react";
import { UserAuth } from "./FilTubeAuthentications";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { STORAGE } from "../Firebase/config";
import { img_300 } from "../config/config";
import { Link } from "react-router-dom";
import { MdBookmarkRemove } from "react-icons/md";

function FilmTubeFavorite({showFavorite,setShowFavorite}) {
  const { user } = UserAuth();
  const [myFavorites, setMyFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function GetFavorites() {
      try {
        if (user) {
          onSnapshot(doc(STORAGE, "FilmTube User", user?.email), (target) => {
            if (target.exists()) {
              setMyFavorites(target.data().f_Favorite || []);
            } else {
              alert("Account doesn't exists");
            }
          });
          setLoading(false);
        }
      } catch (error) {
        window.alert("error", error);
        console.error("error", error);
      }
    }
    GetFavorites();
  }, [user]);

  async function RemoveFromFav(id){
    if(user?.email){
      if(myFavorites.some(target => target.id === id)){
        const UpdatedFav = myFavorites.filter((target) => target.id !== id);
        await updateDoc(doc(STORAGE, "FilmTube User", user?.email), {
          f_Favorite: UpdatedFav,
        });
      }
    }
  }

  return (
    <div>
      <div className={`w-[425px] z-[51] max-w-[100%] top-0 fixed ${showFavorite ? "right-0" : "right-[-425px]"} h-screen  bg-zinc-900 transition-all duration-300`}>
      <button className="px-3 py-1 bg-red-600 text-white absolute right-0" onClick={()=> setShowFavorite(!showFavorite)}>x</button>
      <div className="flex items-center gap-2 justify-center my-5 cursor-pointer" >
            <span className="text-white text-[25px] font-[600]">Film</span>
            <span className="bg-white text-red-500 w-fit h-[30px] leading-[30px] text-[25px] font-[600] py-0 px-1 rounded-lg">
              Favorite
            </span>
      </div>

      <div className={` ${myFavorites.length === 0 ? "block" : "flex"} flex-wrap w-[90%] mx-auto h-[600px] overflow-y-scroll scroll-small justify-center gap-5 px-0  pb-28`}>
        { myFavorites.length === 0 ? <div className="text-red-600 font-[500]  text-[25px]  px-0 text-center w-[100%] mt-20">Favorite is Empty</div> : myFavorites && myFavorites.map((target,index) => 
        <div key={index} className="w-fit h-fit relative fav-card ">
        <button className=" absolute p-1 roufull bg-white text-red-600 rounded-full top-2 right-3 add-fav-btn" onClick={() => RemoveFromFav(target.id)}><MdBookmarkRemove className="text-[17px]" /></button>
          <Link to={`/MoviePage/${target.media_type}/${target.id}`} onClick={()=> setShowFavorite(!showFavorite)} key={index} className="text-white text-center flex items-center justify-center ">
              <img src={myFavorites && img_300 + target.poster } alt={`${target.title}_image`}  className="min-w-[100px] w-[140px] rounded-md"/>
            </Link>
        </div>)
          }
      </div>
      
      </div>
    </div>
  );
}

export default FilmTubeFavorite;
