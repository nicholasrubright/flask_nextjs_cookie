"use client";

import { Movie } from "@/types/models";
import MovieList from "./Shared/MovieList";

export default function LikedMovies(props: LikedMoviesProps) {
  const { movies } = props;

  return (
    <div>
      <h2>Liked Movies</h2>
      <div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

interface LikedMoviesProps {
  movies: Movie[];
}
