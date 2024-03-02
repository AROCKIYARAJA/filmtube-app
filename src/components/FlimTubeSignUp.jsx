import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
import { UserAuth } from "./FilTubeAuthentications";
import { AUTH, GoogleAccount } from "../Firebase/config";
import { signInWithPopup } from "firebase/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function FlimTubeSignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { CreateAccount, CreateAccountWithGoogle } = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await CreateAccount(email, password, confirmPassword);
    } catch (error) {
      alert("error", error);
    }
    setLoading(false);
    navigate("/");

  };

  const googleAccountCreate = async () => {
    try {
      const target = await signInWithPopup(AUTH, GoogleAccount);
      await CreateAccountWithGoogle(
        target.user.email,
        target.user.displayName,
        target.user.photoURL
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during Google account creation.");
    }
  };

  return (
    <>
      <div className="md:mt-28">
        <div className=" max-w-4xl mx-auto sm:scale-100 scale-90">
          <div className=" items-center justify-center gap-2 sm:flex hidden">
            <span className="text-white text-[25px] font-[600]">Film</span>
            <span className="bg-white text-red-600 w-fit h-[30px] leading-[30px] text-[25px] font-[600] py-0 px-1 rounded-lg">
              Tube
            </span>
          </div>
          <form
            action=""
            className="flex flex-col gap-2 max-w-[330px] mx-auto p-5 rounded-xl mt-5"
          >
            <div className="">
              <div className="font-[600] my-2 text-zinc-400">
                <Link
                  to="/Login"
                  className="text mx-2 opacity-30 text-zinc-200 border px-1 py-1 rounded-lg hover:opacity-60"
                >
                  Login
                </Link>{" "}
                |
                <Link to="/Signup" className=" text-[22px] mx-2 text-zinc-200">
                  Signup
                </Link>
              </div>
              <div className=" text-gray-400 text-sm mx-2">
                Get signup to Create your account
              </div>
              <br />
              <label
                className="flex items-center relative justify-between  rounded-md w-[90%] mx-auto my-4"
                htmlFor="email "
              >
                <input
                  type="text"
                  placeholder="Email"
                  className=" px-3 py-2 rounded-md w-full bg-zinc-800 text-zinc-300"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="text-gray-400 absolute right-5">
                  <MdEmail className="text-[20px]" />
                </span>
              </label>
              <label
                className="flex items-center relative justify-between rounded-md w-[90%] mx-auto my-4 "
                htmlFor="password"
              >
                <input
                  type="password"
                  placeholder="Password"
                  className=" px-3 py-2 rounded-md w-full bg-zinc-800 text-zinc-300"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className=" text-gray-400 absolute right-5">
                  <FaLock className="text-[20px]" />
                </span>
              </label>
              <label
                className="flex items-center relative justify-between rounded-md w-[90%] mx-auto my-4"
                htmlFor="confirmpassword"
              >
                <input
                  type="password"
                  placeholder="confirm Password"
                  className=" px-3 py-2 rounded-md w-full bg-zinc-800 text-zinc-300"
                  name="confirmpassword"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className=" text-gray-400 absolute right-5">
                  <FaLock className="text-[20px]" />
                </span>
              </label>
            </div>
            <button
              type="button"
              className="w-[90%] mx-auto rounded-md py-1 bg-red-600 hover:bg-red-700 text-white text-center"
              onClick={() => handleSubmit()}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <AiOutlineLoading3Quarters className="spinning" /> Creating
                  Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
            <button
              onClick={() => googleAccountCreate()}
              type="button"
              className=" w-[90%] mx-auto py-1 rounded-md bg-slate-50 text-black flex items-center justify-center gap-2"
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                width={"30px"}
                alt=""
              />{" "}
              Create Account With Google
            </button>
            <br />
          </form>
        </div>
      </div>
      <div className=" absolute bottom-2 sm:bottom-14 left-2/4 -translate-x-2/4 flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <Link to="/" className="hover:text-red-500 text-zinc-300">
            Home
          </Link>
          <Link className="hover:text-red-500 text-zinc-300">Blog</Link>
          <Link className="hover:text-red-500 text-zinc-300">Contact</Link>
          <Link className="hover:text-red-500 text-zinc-300">
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

export default FlimTubeSignUp;
