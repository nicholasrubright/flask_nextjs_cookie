"use client";

import { Movie } from "@/types/models";
import MovieList from "./Shared/MovieList";

export default function Movies(props: MoviesProps) {
  const { movies } = props;

  return (
    <div>
      <h2>Movies</h2>
      <div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

interface MoviesProps {
  movies: Movie[];
}
