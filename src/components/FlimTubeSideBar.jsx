import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import {  FaFilm } from "react-icons/fa6";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { SlLogout } from "react-icons/sl";
import { UserAuth } from "./FilTubeAuthentications";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoHeartCircleSharp, IoLogOut } from "react-icons/io5";
import FilmTubeFavorite from "./FilmTubeFavorite";
import Profile from "./Profile";

function FlimTubeSideBar({ 
  showFavorite,setShowFavorite,sideBar,setSideBar,showProfile,setShowProfile,currentuser,
  currentmail,profilePic
}) {
  const { user, RemoveAccount, } = UserAuth();
  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate();
  async function handleSubmit() {
    try {
      RemoveAccount();
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <><div
      className={`w-[425px] z-50 bg-zinc-900 fixed top-0 max-w-full h-screen transition-all duration-300 flex flex-col gap-5 py-5 ${sideBar ? "right-0" : "right-[-425px]"}`}
    >
      <div className=" text-white rounded-lg py-2 px-3 cursor-pointer w-[95%] mx-auto  flex items-center justify-between" onClick={() => setSideBar(!sideBar)}>
        <span>Menu</span> <IoIosArrowDroprightCircle className="text-2xl" />
      </div>

      {
        user && user ? (
          <div onClick={() => setDropDown(!dropDown)} className="flex items-center relative justify-between gap-7 bg-zinc-800 hover:bg-zinc-700 rounded-3xl px-2 py-1 cursor-pointer scale-[0.85]">
        <div className="flex items-center gap-2">
          <img src={profilePic || 'https://www.sekolahalbunyan.sch.id/wp-content/plugins/elementskit/widgets/yelp/assets/images/profile-placeholder.png'} alt="" className="w-[40px] h-[40px] rounded-full" />
          <p className="flex flex-col text-white ">
            <span className="text-[15px] tracking-wider">{currentuser}</span>
            <span className="text-[12px] tracking-wider text-gray-500">
              {currentmail}
            </span>
          </p>
        </div>
        <div className="text-white">
          <MdOutlineKeyboardArrowDown className="text-2xl" />
        </div>
      </div>
        ) : (<Link to='/Login' onClick={() => setSideBar(!sideBar)} className="w-[90%] mx-auto rounded-xl py-2 bg-red-600 text-white text-center">Login</Link>)
      }
      <div className={` ${dropDown ? `block ActiveFromTop` : `hidden`}  absolute bg-zinc-800 px-2 w-[89%] top-[110px]  rounded-xl transition-all duration-300`}>
        <div className=" flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white hover:bg-zinc-700" onClick={() => { setShowFavorite(!showFavorite);setDropDown(!dropDown) } }>
          <IoHeartCircleSharp /> Favorite
        </div>
        <div className=" flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white hover:bg-zinc-700" onClick={() => {setShowProfile(!showProfile);setDropDown(!dropDown)} }>
          <FaUserCircle /> Profile
        </div>
        <div onClick={() =>{ handleSubmit();setDropDown(!dropDown)}} className=" cursor-pointer flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white bg-red-600 hover:bg-red-700">
          <IoLogOut /> Logout
        </div>
      </div>

      <Link
        to="/Search" onClick={() => setSideBar(!sideBar)}
        className="flex items-center gap-2 bg-black bg-opacity-20 p-2 rounded-lg w-[90%] mx-auto"
      >
        <span className="text-[#7c7c7c]">
          <FiSearch className="text-[16px]" />
        </span>
        <span className="w-[190px] text-[#7c7c7c]">Search here</span>
      </Link>
      <Link
        to="/" onClick={() => setSideBar(!sideBar)}
        className="w-[90%] mx-auto p-2 hover:text-red-500 text-white rounded-lg cursor-pointer  transition-all duration-300 flex items-center gap-3"
      >
        <HiFire className="text-[20px]" /> <span>Trending Now</span>
      </Link>
      <Link
        to="/Movies" onClick={() => setSideBar(!sideBar)}
        className="w-[90%] mx-auto p-3 hover:text-red-500 text-white rounded-lg cursor-pointer  transition-all duration-300 flex items-center gap-3"
      >
        <FaFilm className="text-[20px] translate-x-[-4px]" />
        <span>Movies</span>
      </Link>
      <Link
        to="/TV Series" onClick={() => setSideBar(!sideBar)}
        className="w-[90%] mx-auto p-2 hover:text-red-500 text-white rounded-lg cursor-pointer   transition-all duration-300 flex items-center gap-3"
      >
        <PiTelevisionSimpleFill className="text-[20px]" />{" "}
        <span> TV Shows</span>
      </Link>
      {
        user && user ? (
          <button  onClick={() => handleSubmit()}  className="w-[100%] mx-auto text-red-500 py-3 rounded-lg flex gap-2 items-center absolute bottom-5   justify-center">
        <SlLogout /> Log Out
      </button>
        ) : (
          <Link to='/Login' onClick={() => setSideBar(!sideBar)}  className="w-[100%] mx-auto text-red-500 py-3 rounded-lg flex gap-2 items-center absolute bottom-5   justify-center"> <SlLogout className=" rotate-[180deg]" /> Login</Link>
        )
      }
    </div>
    <FilmTubeFavorite showFavorite={showFavorite} setShowFavorite={setShowFavorite} />
    <Profile showProfile={showProfile} setShowProfile={setShowProfile}/> 
    </>

  );
}

export default FlimTubeSideBar;
