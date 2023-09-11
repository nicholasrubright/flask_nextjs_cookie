"use client";

import { Movie } from "@/types/models";

export default function Movies(props: MoviesProps) {
  const { movies } = props;

  return (
    <div id="movie_list">
      <ul>
        {movies.map((movie) => {
          return (
            <li>
              <strong>{movie.id}</strong> {movie.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface MoviesProps {
  movies: Movie[];
}
