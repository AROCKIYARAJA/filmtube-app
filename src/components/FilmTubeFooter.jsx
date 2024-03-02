import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { LuCopyright } from "react-icons/lu";
import { Link } from "react-router-dom";

function FilmTubeFooter() {
  return (
    <div className=" bg-black ">
      <div className="w-[1100px] max-w-[100%] mx-auto pt-10 pb-20 px-10 mt-10">
        <div className="flex items-center justify-between flex-wrap gap-5 ">
          <div className="flex flex-col gap-1 items-center justify-start">
            <div className="flex items-center gap-2 ">
              <span className="text-white text-[25px] font-[600]">Film</span>
              <span className="bg-white text-red-500 w-fit h-[30px] leading-[30px] text-[25px] font-[600] py-0 px-1 rounded-lg">
                Tube
              </span>
            </div>

            {/* <div className="flex items-center gap-1 justify-center my-2">
              <input type="text" placeholder='Email' className='border-b px-3 py-1 placeholder:text-zinc-600 bg-transparent border-zinc-900 text-zinc-400'/>
              <button className=' text-red-600 hover:text-zinc-300 bg-red-600 bg-opacity-30 hover:bg-red-600 transition-all duration-200 px-2 py-1 rounded-lg'>Subscribe</button>
            </div> */}
          </div>
          <div className="">
            <div className="  px-3 sm:px-0 text-zinc-300 tracking-wider text-[13px] py-2 font-[300] flex flex-col gap-2">
              <Link to="" className="text-zinc-400 hover:text-red-500 text-sm">
                Trending
              </Link>
              <Link to="" className="text-zinc-400 hover:text-red-500 text-sm">
                Movies
              </Link>
              <Link to="" className="text-zinc-400 hover:text-red-500 text-sm">
                Tv Series
              </Link>
              <Link to="" className="text-zinc-400 hover:text-red-500 text-sm">
                Popular
              </Link>
              <Link to="" className="text-zinc-400 hover:text-red-500 text-sm">
                Terms & Condition
              </Link>
            </div>
            <div className="text-zinc-600 font-[500] my-2">Connect with US</div>
            <div className=" flex items-center gap-3 text-zinc-600">
              <FaFacebook className="hover:text-zinc-300" />
              <FaTwitter className="hover:text-zinc-300" />
              <SlSocialInstagram className="hover:text-zinc-300" />
            </div>
          </div>
        </div>
        <div className="text-zinc-600 text-[12px] flex items-center justify-center gap-1 mt-5">
          <LuCopyright /> CopyRightes Owned from TMDB
        </div>
      </div>
    </div>
  );
}

export default FilmTubeFooter;
