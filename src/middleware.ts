import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "./database";
import { IMovie, IMovieData, IMovieResult } from "./interfaces";
import { QueryResult } from "pg";

const checkName = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = request.body;

  const queryString: string = format(
    `
        SELECT * FROM movies
        WHERE name = %L;
        `,
    name
  );

  const queryResult: IMovieResult = await client.query(queryString);
  queryResult.rowCount > 0
    ? response.status(409).send({ error: "Movie name already exists" })
    : next();
};

const checkID = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = request.params;

  const queryString: string = format(
    `
        SELECT * FROM movies
        WHERE id = %L;
        `,
    Number(id)
  );

  const queryResult: IMovieResult = await client.query(queryString);
  queryResult.rowCount === 0
    ? response.status(404).send({ error: "Movie not found" })
    : next();
};

export { checkID, checkName };
