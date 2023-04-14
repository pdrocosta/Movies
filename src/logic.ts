import { Request, Response } from "express";
import format from "pg-format";
import { client } from "./database";
import { IMovieData, IMovieResult } from "./interfaces";

const createMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const payload: IMovieData = request.body;

  const queryString: string = format(
    `
        INSERT INTO movies(%I)
        VALUES %L
        RETURNING *;
      `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: IMovieResult = await client.query(queryString);
  const newMovies = queryResult.rows[0];

  return response.status(201).json(newMovies);
};

const getMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let queryString: string = "SELECT * FROM movies";

  const queryResult: IMovieResult = await client.query(queryString);
  const movies = queryResult.rows;

  return response.status(200).send(movies);
};

const getMovieByID = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  const queryString: string = format(
    `
      SELECT * FROM movies
      WHERE id = %L;
      `,
    Number(id)
  );

  const queryResult: IMovieResult = await client.query(queryString);
  const movieByID = queryResult.rows;

  return response.status(200).send(movieByID);
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
    Number(id)
  );

  const queryResult = await client.query(queryString);

  return response.status(204).send();
};

const updateMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const payload: IMovieData = request.body;

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

  return response.status(200).send(updatedMovie);
};

export { deleteMovie, getMovieByID, updateMovie, getMovies, createMovies };
