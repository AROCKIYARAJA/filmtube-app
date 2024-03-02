import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FilmTubeTrending from "./components/FilmTubeTrending";
import FilmTubeTV from "./components/FilmTubeTV";
import FilmTubeMovie from "./components/FilmTubeMovie";
import FilmTubeSearch from "./components/FilmTubeSearch";
import FilmTubeMoviecard from "./components/FilmTubeMoviecard";
import FilmTubeLogin from "./components/FilmTubeLogin";
import FlimTubeSignUp from "./components/FlimTubeSignUp";
import { AuthContextProvider } from "./components/FilTubeAuthentications";
import FilmTubeHeader from "./components/FilmTubeHeader";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <FilmTubeHeader />
      <Routes>
        <Route path="/" element={<FilmTubeTrending />} />
        <Route path="/TV Series" element={<FilmTubeTV />} />
        <Route path="/Movies" element={<FilmTubeMovie />} />
        <Route path="/Search" element={<FilmTubeSearch />} />
        <Route path="/MoviePage/:MediaType/:MovieID" element={<FilmTubeMoviecard />} />
        <Route path="/Login" element={<FilmTubeLogin />} />
        <Route path="/Signup" element={<FlimTubeSignUp />} />
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);

reportWebVitals();
