import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  const deleteHandler = () => {
    props.ondelete(props.id);
  };
  console.log(props);

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button className={classes.btn} onClick={deleteHandler}>Delete Movie</button>
    </li>
  );
};

export default Movie;
