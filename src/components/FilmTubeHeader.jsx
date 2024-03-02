import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlimTubeSideBar from "./FlimTubeSideBar";
import { HiFire } from "react-icons/hi";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaFilm } from "react-icons/fa";
import { UserAuth } from "./FilTubeAuthentications";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { doc, onSnapshot } from "firebase/firestore";
import { STORAGE } from "../Firebase/config";
import { IoHeartCircleSharp } from "react-icons/io5";
import Profile from "./Profile";
import FilmTubeFavorite from "./FilmTubeFavorite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

function FilmTubeHeader() {
  const [profile, setProfile] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const { user, RemoveAccount, LoginAccount } = UserAuth();
  const [userData, setUserData] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState("");

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      RemoveAccount();
      setProfile(!profile);
      navigate("/Login");
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        const fetchuser = onSnapshot(
          doc(STORAGE, "FilmTube User", user?.email),
          (target) => {
            if (target.exists()) {
              setUserData(target.data());
            }
          }
        );
        return () => {
          fetchuser();
        };
      }
    };

    const fetchProfilePicture = async () => {
      if (user?.email) {
        const storage = getStorage();
        const profilePictureRef = ref(
          storage,
          `profile_pictures/${user?.email}`
        );
        const downloadURL = await getDownloadURL(profilePictureRef);
        setProfilePictureURL(downloadURL);
      }
    };

    // fetchProfilePicture();

    fetchUserData();
  }, [user?.email]);

  return (
    <>
      <div className=" flex xl:px-20 sm:px-10 px-4 py-[16px] items-center bg-black bg-opacity-30 justify-between backdrop-blur-xl lg:fixed w-full top-0 z-50">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer scale-90"
            title="Click To Home Page"
          >
            <span className="text-white text-[20px] font-[600]">Film</span>
            <span className="bg-white text-red-500 w-fit h-[30px] leading-[30px] text-[20px] font-[600] py-0 px-1 rounded-lg">
              Tube
            </span>
          </Link>
          <div className="hidden xl:flex items-center gap-10">
            <Link
              to="/"
              className="text-zinc-300 hover:text-zinc-50  transition-all duration-200 cursor-pointer flex items-center gap-1"
            >
              <HiFire /> <span>Trending</span>
            </Link>
            <Link
              to="/Movies"
              className="text-zinc-300 hover:text-zinc-50  transition-all duration-200 cursor-pointer flex items-center gap-1"
            >
              <FaFilm /> <span>Movies</span>
            </Link>
            <Link
              to="/TV Series"
              className="text-zinc-300 hover:text-zinc-50  transition-all duration-200 cursor-pointer flex items-center gap-1"
            >
              <PiTelevisionSimpleFill /> <span>TV Series</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user && user ? (
            <div
              className="md:flex hidden items-center relative justify-between gap-7 bg-white bg-opacity-15 backdrop-blur-xl rounded-3xl px-2 py-1 cursor-pointer scale-[0.85]"
              onClick={() => setProfile(!profile)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={
                    userData.g_profile ||
                    "https://www.sekolahalbunyan.sch.id/wp-content/plugins/elementskit/widgets/yelp/assets/images/profile-placeholder.png"
                  }
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
                <p className="flex flex-col text-white ">
                  <span className="text-[15px] tracking-wider">
                    {userData.a_Name}
                  </span>
                  <span className="text-[12px] tracking-wider text-gray-300">
                    {user && user?.email}
                  </span>
                </p>
              </div>
              <div className="text-white">
                <MdOutlineKeyboardArrowDown
                  className={`text-2xl transition-all duration-300 ${
                    profile ? "rotate-180" : "rotate-360"
                  }`}
                />
              </div>
            </div>
          ) : (
            <Link
              to="/Login"
              className="px-4 py-1 text-zinc-100 bg-red-600 rounded-3xl"
            >
              Login
            </Link>
          )}
          <div
            className={` ${
              profile
                ? `block ActiveFromTop bg-zinc-800 bg-opacity-50 backdrop-blur-xl`
                : `hidden`
            }  absolute z-[2000]  px-2 w-[185px] top-14 rounded-xl transition-all duration-300`}
          >
            {/* <div className=" flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white hover:bg-zinc-700 cursor-pointer" >
              <IoHeartCircleSharp /> Favorites
            </div> */}
            <div
              className=" flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white hover:bg-zinc-700 cursor-pointer"
              onClick={() => {
                setShowProfile(!showProfile);
                setProfile(!profile);
              }}
            >
              <FaUserCircle /> Profile
            </div>

            <button
              type="button"
              onClick={() =>
                handleSubmit()
              }
              className="w-full flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
            >
              <IoLogOut /> Logout
            </button>
          </div>
          {user && user?.email ? (<div
            className="text-zinc-500 hover:text-zinc-200 bg-gray-800 rounded-full md:block hidden "
            onClick={() => {
              setShowFavorite(!showFavorite);
            }}
          >
            <IoHeartCircleSharp className="text-3xl" />
          </div>) : ""}
          <Link
            to="/Search"
            className=" text-zinc-100 cursor-pointer items-center gap-2 p-2 rounded-3xl w-[fit]  md:flex hidden"
          >
            <BsSearch />
          </Link>
          <div
            onClick={() => setSideBar(!sideBar)}
            className="xl:hidden block text-white hover:text-red-500 hover:bg-zinc-800 rounded-lg px-4 py-2"
          >
            <CiMenuFries className="text-2xl" />
          </div>
        </div>
      </div>
      <FlimTubeSideBar
        showFavorite={showFavorite}
        setShowFavorite={setShowFavorite}
        sideBar={sideBar}
        setSideBar={setSideBar}
        currentuser={userData.a_Name}
        currentmail={user?.email}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        profilePic={userData.g_profile}
      />
      <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
      <FilmTubeFavorite
        showFavorite={showFavorite}
        setShowFavorite={setShowFavorite}
      />
    </>
  );
}

export default FilmTubeHeader;
