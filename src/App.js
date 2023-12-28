import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const dummyMovies = [
    {
      id: 1,
      title: "Some Dummy Movie",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some Dummy Movie 2",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setIsLoading(true);

      const response = await fetch("https://swapi.py4e.com/api/films/");
      if (!response.ok) {
        throw new Error("somthing went wrong ....Retrying");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      // setIsLoading(false);
    } catch (error) {
      setError(error.message);
      // setIsLoading(false);
      // setError(false);
      setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
    }
    setIsLoading(false);
  }, []);

  useEffect (() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    if (isRetrying) {
      fetchMoviesHandler();
      setIsRetrying(false);
    }
  }, [isRetrying]);

  const cancelHandler = () => {
    setIsLoading(false);
    setError(null);
    setIsRetrying(false);
  };

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <p>
        {error}
        <br />
        <br />
        <button onClick={cancelHandler}>Cancel</button>
      </p>
    );
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {/* <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Movies not found</p>}
        {isLoading && <p>Loading...</p>}
      </section> */}
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
