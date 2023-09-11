"use client";

import { Movie } from "@/types/models";
import { useState, useEffect } from "react";

export default function Movies(props: MoviesProps) {
  const { movies } = props;

  const [movieIds, setMoviesId] = useState<number[]>([]);

  const [myLikedMovies, setMyLikedMovies] = useState<Movie[]>([]);

  const handleCheck = (e: any) => {
    if (e.target.checked) {
      const temp = movieIds.filter((id) => id !== parseInt(e.target.value, 10));
      temp.push(parseInt(e.target.value, 10));
      setMoviesId(temp);
    } else {
      const temp = movieIds.filter((id) => id !== parseInt(e.target.value, 10));
      setMoviesId(temp);
    }
  };

  const handleLikeMovies = async (e: any) => {
    let formData: string[] = [];
    movieIds.forEach((movieId) => {
      formData.push(`movies=${encodeURIComponent(movieId)}`);
    });

    setMoviesId([]);

    await fetch("http://localhost:3000/api", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        console.log("response: ", response);

        const likedMoviesResponse = await fetch("http://localhost:3000/api", {
          method: "GET",
          cache: "no-cache",
        });

        if (likedMoviesResponse.ok) {
          const movies = await likedMoviesResponse.json();
        }
      })
      .catch((error) => {
        console.error("there was a problem liking movies");
      });
  };

  useEffect(() => {}, [movieIds]);

  return (
    <div id="movie_list">
      <ul>
        {movies.map((movie) => {
          return (
            <li key={Math.random()}>
              <input
                type="checkbox"
                id={movie.title + "_mark"}
                name={movie.title + "_mark"}
                value={movie.id}
                checked={movieIds.find((m) => m === movie.id) !== undefined}
                onChange={(e) => handleCheck(e)}
              />
              <strong>{movie.id}</strong> {movie.title}
            </li>
          );
        })}
      </ul>
      <button onClick={(e) => handleLikeMovies(e)} type="button">
        Like Movies
      </button>
      <div>
        <h2>My lIked movies</h2>
        {myLikedMovies.length === 0 && <p>No Liked moveis...</p>}
        <ul>
          {myLikedMovies.map((movie) => {
            return <li key={Math.random()}>{movie.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

interface MoviesProps {
  movies: Movie[];
}
