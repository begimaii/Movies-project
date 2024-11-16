import React from "react";
import { useLocation } from "react-router-dom";

export default function MovieDetails() {
  const { state } = useLocation();
  return (
    <div>
      <h3>{state.title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${
          state.poster_path ? state.poster_path : state.backdrop_path
        }`}
        alt="state.title"
      />
      <p>{state.overview}</p>
    </div>
  );
}
