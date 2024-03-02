import React, { useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
import { useState } from "react";
import GuestPic from "../img/download-removebg-preview.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { UserAuth } from "./FilTubeAuthentications";
import { AUTH, GoogleAccount, STORAGE } from "../Firebase/config";
import { signInWithPopup } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

function FilmTubeLogin() {
  const { LoginAccount } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await LoginAccount(email, password);
      navigate("/");
    } catch (error) {
      alert("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    const allUsersfb = async () => {
      try {
        const datum = await getDocs(collection(STORAGE, "FilmTube User"));
        const data = datum.docs.map((target) => ({
          id: target.id,
          ...target.data(),
        }));
        setAllUsers(data);
      } catch (error) {
        console.log("Somthing is wrong!", error);
      }
    };

    allUsersfb();
  }, []);

  const googleAccountCreate = async () => {
    try {
      await signInWithPopup(AUTH, GoogleAccount).then(async (target) => {});
    } catch (error) {
      alert("error", error);
    }
    navigate("/");
  };

  return (
    <>
      <div className="md:mt-28">
        <div className=" max-w-4xl mx-auto sm:scale-100 scale-90">
          <div className=" items-center justify-center gap-2 md:flex hidden  ">
            <span className="text-white text-[25px] font-[600]">Film</span>
            <span className="bg-white text-red-600 w-fit h-[30px] leading-[30px] text-[25px] font-[600] py-0 px-1 rounded-lg">
              Tube
            </span>
          </div>
          <form
            action=""
            className="flex flex-col gap-2 max-w-[330px] mx-auto p-5 rounded-xl mt-5 text-zinc-300"
          >
            <div className="relative">
              <div className="font-[600] my-2 flex items-center gap-0">
                <Link to="/Login" className="text-[22px] mx-2  text-zinc-200">
                  Login
                </Link>{" "}
                |
                <Link
                  to="/Signup"
                  className="text mx-2 opacity-30  text-zinc-200 border px-1 py-1 rounded-lg hover:opacity-60"
                >
                  Signup
                </Link>
                <div className=""></div>
              </div>
              <div className=" text-gray-400 text-sm mx-2">
                Get login to access your account
              </div>
              <br />
              <label
                className="flex items-center justify-between pl-0 pr-4 bg-zinc-800 rounded-md w-[90%] mx-auto my-3"
                htmlFor="email "
              >
                <input
                  type="text"
                  placeholder="Email"
                  className=" px-3 py-2 rounded-md bg-zinc-800"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="text-gray-400">
                  <MdEmail className="text-[20px]" />
                </span>
              </label>
              <label
                className="flex items-center justify-between pl-0 pr-4 rounded-lg bg-zinc-800 w-[90%] mx-auto my-3"
                htmlFor="password"
              >
                <input
                  type="password"
                  placeholder="Password"
                  className=" px-3 py-2 rounded-md  bg-zinc-800 text-zinc-300"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className=" text-gray-400 ">
                  <FaLock className="text-[20px]" />
                </span>
              </label>
            </div>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-[90%] mx-auto rounded-md py-1 bg-red-500 hover:bg-red-600 text-white text-center"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <AiOutlineLoading3Quarters className="spinning" /> Getting
                  Account...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div
            onClick={() => {
              setEmail("guestmode@gmail.com");
              setPassword("guestmode");
            }}
            className=" scale-75 max-w-[260px] rounded-full mx-auto text-white text-center flex items-center justify-center gap-0 py-1 cursor-pointer hover:bg-zinc-700 bg-zinc-800"
          >
            <img src={GuestPic} alt="" width={"40px"} /> <span>Guest Mode</span>
          </div>
          <div className="flex items-center justify-center mt-5">
            <button
              onClick={() => googleAccountCreate()}
              type="button"
              className="max-w-[260px] mx-auto py-1 px-2 rounded-md bg-slate-50 text-black flex items-center justify-center gap-2 "
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                width={"30px"}
                alt=""
              />{" "}
              Continue With Google
            </button>
          </div>
        </div>
      </div>
      <div className=" absolute bottom-2 w-[100%] sm:bottom-14 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-5 w-full">
          <Link
            to="/"
            className="hover:text-red-500 text-zinc-300 text-[13px] sm:text-base"
          >
            Home
          </Link>
          <Link className="hover:text-red-500 text-zinc-300 text-[13px] sm:text-base">
            Blog
          </Link>
          <Link className="hover:text-red-500 text-zinc-300 text-[13px] sm:text-base">
            Contact
          </Link>
          <Link className="hover:text-red-500 text-zinc-300 text-[13px] sm:text-base">
            Terms & Condition
          </Link>
        </div>
        <div className="flex items-center gap-5 justify-center text-zinc-300">
          <FaFacebook />
          <RiTwitterXLine />
          <FaInstagramSquare />
        </div>
      </div>
    </>
  );
}

export default FilmTubeLogin;
