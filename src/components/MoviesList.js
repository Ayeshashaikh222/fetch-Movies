import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const deleteHandler = (id) => {
    props.movies.filter((movie) => movie.id !== id);
    props.ondelete(id);
  };
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          ondelete={deleteHandler}
        />
      ))}
    </ul>
  );
};

export default MovieList;
