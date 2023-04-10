import { Request, Response } from "express";
import format from "pg-format";
import { client } from "./database";
import { IMovie, IMovieData, IMovieResult } from "./interfaces";

const createMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const payload: IMovieData[] = request.body;

  const existingMovies: IMovieData[] = await client.query("SELECT * FROM movies WHERE name = ($1)", [payload.map(movie => movie.name)]);
  
  if (existingMovies.length > 0) {
    return response.status(409).json({ error: "Movie name already exists!" });
  }

  const values = payload.map(movie => Object.values(movie));

  const queryString: string = format(
    `
        INSERT INTO movies(%I)
        VALUES %L
        RETURNING *;
      `,
    Object.keys(payload[0]),
    values
  );

  const queryResult: IMovieResult = await client.query(queryString);
  const newMovies = queryResult.rows;

  return response.status(201).json(newMovies);
};

const getMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { category  } = request.query;

  let queryString : string = 'SELECT * FROM movies';
  let queryValues = [];

  if (category) {
    queryString += ' WHERE category = $1';
    queryValues.push(category);
  }

  const queryResult: IMovieResult = await client.query(queryString, queryValues);
  const movies = queryResult.rows;

  return response.status(200).json(movies);
};

const getMovieByID = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  const queryString = format(
    `
      SELECT * FROM movies
      WHERE id = %L;
      `,
    id
  );

  const queryResult: IMovieResult = await client.query(queryString);
  const movieByID = queryResult.rows;

  if (!movieByID) {
    return response.status(404).json({ error: "Movie not found!" });
  }

  return response.status(200).json(movieByID);
};

const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  const queryString = format(
    `
      DELETE FROM movies
      WHERE id = %L;
    `,
    id
  );

  const queryResult = await client.query(queryString);
  
  if (queryResult.rowCount === 0) {
    return response.status(404).json({ error: "Movie not found!" });
  }

  return response.status(204).json();
};

const updateMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const payload = request.body;

  const existingMovies: IMovieData[] = await client.query("SELECT * FROM movies WHERE name = ANY($1)", [[payload.name]]);
  
  if (existingMovies.length > 0 && existingMovies[0].id !== parseInt(id)) {
    return response.status(409).json({ error: "Movie name already exists!" });
  }

  const queryString = format(
    `
      UPDATE movies
      SET(%I) = ROW(%L)
      WHERE id = %L
      RETURNING *;
      `,
    Object.keys(payload),
    Object.values(payload),
    id
  );

  const queryResult: IMovieResult = await client.query(queryString);
  const updatedMovie = queryResult.rows[0];

  return response.status(200).json(updatedMovie);
};

export { deleteMovie, getMovieByID, updateMovie, getMovies, createMovies };
